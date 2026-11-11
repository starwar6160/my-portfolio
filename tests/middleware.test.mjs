// Unit tests for functions/_middleware.ts (visitor session logging).
// Run: node --experimental-strip-types --test tests/
// No dependencies: uses node:test, the global Request/Response, and a mocked D1 binding.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequest } from '../functions/_middleware.ts';

const BASE = 'https://portfolio.st6160.click';
const CHROME = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const VISITOR_IP = '203.0.113.10'; // TEST-NET-3 documentation address

// Minimal D1 mock: records every SQL statement and its bound values.
function mockDB({ existingSession = null, pastVisits = 0, failWith = null } = {}) {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      const stmt = {
        sql: sql.replace(/\s+/g, ' ').trim(),
        args: [],
        bind(...args) { stmt.args = args; return stmt; },
        async first() {
          calls.push({ sql: stmt.sql, args: stmt.args });
          if (failWith) throw failWith;
          if (stmt.sql.startsWith('SELECT COUNT(*)')) return { count: pastVisits };
          return existingSession;
        },
        async run() {
          calls.push({ sql: stmt.sql, args: stmt.args });
          if (failWith) throw failWith;
          return { success: true };
        },
      };
      return stmt;
    },
  };
}

async function invoke(path, { ua = CHROME, ip = VISITOR_IP, db = mockDB(), env } = {}) {
  const waitUntilPromises = [];
  let nextCalls = 0;
  const request = new Request(BASE + path, {
    headers: { 'User-Agent': ua, 'CF-Connecting-IP': ip },
  });
  const response = await onRequest({
    request,
    env: env ?? { DB: db },
    next: async () => { nextCalls++; return new Response('ok'); },
    waitUntil: (p) => { waitUntilPromises.push(p); },
  });
  await Promise.all(waitUntilPromises);
  return { response, db, waitUntilCount: waitUntilPromises.length, nextCalls };
}

test('HTML page: logs via context.waitUntil and creates a session', async () => {
  const r = await invoke('/zh/cases/');
  assert.equal(await r.response.text(), 'ok');
  assert.equal(r.nextCalls, 1);
  assert.equal(r.waitUntilCount, 1);
  const sqls = r.db.calls.map(c => c.sql);
  assert.match(sqls[0], /^SELECT id, landing_page/);
  assert.match(sqls[1], /^SELECT COUNT\(\*\)/);
  assert.match(sqls[2], /^INSERT INTO sessions/);
  assert.deepEqual(r.db.calls[2].args.slice(0, 2), [VISITOR_IP, '/zh/cases/']);
});

test('HTML page with active session: updates hits and pages_viewed', async () => {
  const db = mockDB({ existingSession: { id: 7, landing_page: '/', hits: 2, pages_viewed: 2, session_start: '' } });
  const r = await invoke('/cv/', { db });
  assert.equal(r.waitUntilCount, 1);
  const update = r.db.calls.find(c => c.sql.startsWith('UPDATE sessions'));
  assert.ok(update, 'expected an UPDATE');
  assert.deepEqual(update.args, [3, 3, 7]);
});

test('real routes that resemble scanner patterns are still logged', async () => {
  for (const path of ['/categories/resume/', '/contact/', '/ja/portfolio-ses/', '/zh/contact/']) {
    const r = await invoke(path);
    assert.equal(r.waitUntilCount, 1, path);
  }
});

test('static assets: no waitUntil and no D1 queries', async () => {
  for (const path of ['/assets/css/stylesheet.css', '/images/cases/613springbootFast.jpg', '/favicon.ico', '/index.xml', '/a.webp']) {
    const r = await invoke(path);
    assert.equal(r.waitUntilCount, 0, path);
    assert.equal(r.db.calls.length, 0, path);
    assert.equal(r.nextCalls, 1, path);
  }
});

test('scanner paths and scanner user agents: no D1 queries', async () => {
  const cases = [
    ['/.env', CHROME], ['/wp-admin/', CHROME], ['/resume', CHROME], ['/?x=.git/config', CHROME],
    ['/', 'curl/8.0'], ['/', ''], ['/', 'LinkedInBot/1.0'],
  ];
  for (const [path, ua] of cases) {
    const r = await invoke(path, { ua });
    assert.equal(r.waitUntilCount, 0, `${path} ${ua}`);
    assert.equal(r.db.calls.length, 0, `${path} ${ua}`);
    assert.equal(r.nextCalls, 1, `${path} ${ua}`);
  }
});

test('API requests (e.g. dashboard polling /api/stats): served but not logged', async () => {
  const r = await invoke('/api/stats?password=x');
  assert.equal(r.nextCalls, 1);
  assert.equal(r.waitUntilCount, 0);
  assert.equal(r.db.calls.length, 0);
});

test('internal IP prefix: not logged', async () => {
  const r = await invoke('/', { ip: '2a06:98c0::1' });
  assert.equal(r.waitUntilCount, 0);
  assert.equal(r.db.calls.length, 0);
});

test('D1 failure: page is still served and the error is reported via console.error', async (t) => {
  const errors = [];
  t.mock.method(console, 'error', (...args) => { errors.push(args.join(' ')); });
  const r = await invoke('/', { db: mockDB({ failWith: new Error('D1_ERROR: no such table: sessions') }) });
  assert.equal(await r.response.text(), 'ok');
  assert.equal(r.nextCalls, 1);
  assert.equal(r.waitUntilCount, 1);
  assert.ok(errors.some(e => e.includes('Session logging error for /') && e.includes('no such table')), errors.join('\n'));
});

test('missing DB binding: page is served and the misconfiguration is reported', async (t) => {
  const errors = [];
  t.mock.method(console, 'error', (...args) => { errors.push(args.join(' ')); });
  const r = await invoke('/', { env: {} });
  assert.equal(r.nextCalls, 1);
  assert.equal(r.waitUntilCount, 0);
  assert.ok(errors.some(e => e.includes('D1 binding "DB" is not configured')));
});

test('next() is called exactly once and its error propagates (page and non-page requests)', async (t) => {
  t.mock.method(console, 'error', () => {});
  t.mock.method(console, 'warn', () => {});
  for (const path of ['/', '/zh/', '/assets/css/stylesheet.css', '/.env', '/api/stats']) {
    let nextCalls = 0;
    const waitUntilPromises = [];
    const boom = new Error('downstream failure');
    await assert.rejects(
      onRequest({
        request: new Request(BASE + path, { headers: { 'User-Agent': CHROME, 'CF-Connecting-IP': VISITOR_IP } }),
        env: { DB: mockDB() },
        next: async () => { nextCalls++; throw boom; },
        waitUntil: (p) => { waitUntilPromises.push(p); },
      }),
      (err) => err === boom,
      path,
    );
    await Promise.all(waitUntilPromises);
    assert.equal(nextCalls, 1, path);
  }
});

test('an error while scheduling the log does not break the page or call next() twice', async (t) => {
  const errors = [];
  t.mock.method(console, 'error', (...args) => { errors.push(args.join(' ')); });
  let nextCalls = 0;
  const response = await onRequest({
    request: new Request(BASE + '/zh/', { headers: { 'User-Agent': CHROME, 'CF-Connecting-IP': VISITOR_IP } }),
    env: { DB: mockDB() },
    next: async () => { nextCalls++; return new Response('ok'); },
    waitUntil: () => { throw new Error('waitUntil unavailable'); },
  });
  assert.equal(await response.text(), 'ok');
  assert.equal(nextCalls, 1);
  assert.ok(errors.some(e => e.includes('Logging error') && e.includes('waitUntil unavailable')), errors.join('\n'));
});

// ---- Language auto-redirect on "/" ----
async function invokeRoot(headers = {}, { path = '/', method = 'GET' } = {}) {
  let nextCalls = 0;
  const db = mockDB();
  const waits = [];
  const response = await onRequest({
    request: new Request(BASE + path, {
      method,
      headers: { 'User-Agent': CHROME, 'CF-Connecting-IP': VISITOR_IP, ...headers },
    }),
    env: { DB: db },
    next: async () => { nextCalls++; return new Response('ok'); },
    waitUntil: (p) => { waits.push(p); },
  });
  await Promise.all(waits);
  return { response, nextCalls, db };
}

test('redirect: Japanese browser on / goes to /ja/ with 302 and no logging', async () => {
  const r = await invokeRoot({ 'Accept-Language': 'ja,en;q=0.8' });
  assert.equal(r.response.status, 302);
  assert.equal(r.response.headers.get('Location'), BASE + '/ja/');
  assert.match(r.response.headers.get('Vary'), /Accept-Language/);
  assert.equal(r.nextCalls, 0);
  assert.equal(r.db.calls.length, 0);
});

test('redirect: any zh variant goes to /zh/ and the query string is kept', async () => {
  for (const al of ['zh-CN', 'zh-TW,zh;q=0.9', 'zh-HK']) {
    const r = await invokeRoot({ 'Accept-Language': al }, { path: '/?utm=x' });
    assert.equal(r.response.status, 302, al);
    assert.equal(r.response.headers.get('Location'), BASE + '/zh/?utm=x', al);
  }
});

test('redirect: q-values decide the winner', async () => {
  const r = await invokeRoot({ 'Accept-Language': 'en;q=0.5, ja;q=0.9' });
  assert.equal(r.response.headers.get('Location'), BASE + '/ja/');
  const en = await invokeRoot({ 'Accept-Language': 'en-US,ja;q=0.5' });
  assert.equal(en.response.status, 200);
});

test('no redirect: English, unsupported or missing Accept-Language serve / normally', async () => {
  for (const al of ['en-US,en;q=0.9', 'fr-FR,de;q=0.8', '*', undefined]) {
    const r = await invokeRoot(al ? { 'Accept-Language': al } : {});
    assert.equal(r.response.status, 200, String(al));
    assert.equal(r.nextCalls, 1, String(al));
    assert.match(r.response.headers.get('Vary'), /Accept-Language/);
  }
});

test('cookie overrides the browser language in both directions', async () => {
  const toEn = await invokeRoot({ 'Accept-Language': 'ja', Cookie: 'x=1; lang=en' });
  assert.equal(toEn.response.status, 200);
  const toZh = await invokeRoot({ 'Accept-Language': 'en-US', Cookie: 'lang=zh' });
  assert.equal(toZh.response.status, 302);
  assert.equal(toZh.response.headers.get('Location'), BASE + '/zh/');
});

test('no redirect: crawlers, non-root paths and non-GET requests', async () => {
  const bot = await invokeRoot({ 'Accept-Language': 'ja', 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' });
  assert.equal(bot.response.status, 200);
  const deep = await invokeRoot({ 'Accept-Language': 'ja' }, { path: '/cases/' });
  assert.equal(deep.response.status, 200);
  const post = await invokeRoot({ 'Accept-Language': 'ja' }, { method: 'POST' });
  assert.equal(post.response.status, 200);
});
