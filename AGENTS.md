# Repository Guidelines

## Project Structure & Module Organization
This repository is a Hugo-based portfolio site with Cloudflare Pages deployment.

- `content/`: bilingual site content (`.md`, `.ja.md`) for home, cases, projects, CV, and docs.
- `layouts/`, `archetypes/`, `themes/`: Hugo templates and the PaperMod theme override.
- `assets/`, `static/`, `resources/`, `public/`: source assets, static files, generated resources, and build output.
- `functions/`: Cloudflare Pages Functions and middleware, including `functions/_middleware.ts` and API routes.
- `data/`, `i18n/`, `types/`: structured data, translations, and shared type definitions.
- `docs/` and the root `*.md` files: operational notes, analytics docs, security notes, and deployment guides.

## Build, Test, and Development Commands
- `hugo server`: run the site locally with live reload.
- `hugo`: generate the production site into `public/`.
- `npx wrangler pages dev ./public --binding=DB:visitor_log`: preview the built site with Cloudflare Pages Functions and D1 locally.
- `npx wrangler pages deploy ./public`: deploy the generated site to Cloudflare Pages.
- `python scripts/pii_check.py`: scan staged files for PII and high-entropy secrets before committing.

## Coding Style & Naming Conventions
- Use the existing file format for each area: Markdown for content/docs, TOML for `hugo.toml`, JSONC for `wrangler.jsonc`, TypeScript for `functions/`, and Python for utility scripts.
- Keep Markdown headings short and descriptive; use bilingual filenames when the content is language-specific, such as `cv.ja.md` or `_index.ja.md`.
- Prefer clear, lower-case commit and file names in the existing style, such as `refine-jp-homepage-positioning` or `portfolio-ses.ja.md`.
- Match the surrounding indentation and formatting of each file; do not introduce a new formatter unless the file already uses one.

## Testing & Validation
- There is no dedicated automated test suite in the root. Validate changes by building the site and checking the rendered pages in `hugo server` or `npx wrangler pages dev`.
- For content changes, verify both English and Japanese routes when applicable.
- For security-sensitive edits, run `python scripts/pii_check.py` before staging or committing.

## Commit & Pull Request Guidelines
- Recent commits use short, imperative prefixes such as `feat:`, `docs:`, and `chore:` followed by a concise summary.
- Keep each commit focused on one change.
- Pull requests should explain the content or behavior change, mention any Cloudflare or D1 impact, and include screenshots for visible UI updates.

## Security & Configuration Tips
- Do not commit secrets. Keep local values in `.dev.vars` or environment-specific files, and confirm `wrangler.jsonc` only contains non-sensitive identifiers.
- When changing analytics or API behavior, update the related docs in `docs/` or the root `*.md` guides at the same time.

## AI / Portfolio Content Rules
- For AI experience pages, keep English and Japanese versions as separate files and keep their structure aligned.
- Keep the tone technical, factual, and engineering-first; avoid hype, emotional framing, or negative wording that does not help the reader understand the work.
- Order projects by business and technical value, with the highest-value work first.
- Remove duplicate or redundant sentences. If two lines describe the same technical action, keep the clearer single version.
- For workflow optimization case studies, lead with the numeric result first, then explain the maintainability or operational impact.
- For summary sections, emphasize production AI systems, LLM integration, workflow engineering, real-time applications, and AI as a force multiplier for software engineering.
- If a standalone portfolio page benefits from quick scanning, add a short `Focus Areas` block near the top.
- When a new case page is added, sync the homepage links and any bilingual index pages that surface selected work.
