# Cloudflare R2 画像移行方案

## 目的

当前 Hugo 页面中如果继续使用大量 base64 图片，会带来几个问题：

- Markdown 可读性下降，后续维护困难。
- Git diff 和仓库体积快速膨胀。
- Hugo / Goldmark 对 raw HTML、data URI、长行处理容易出现不可控问题。
- 浏览器无法像普通图片 URL 一样充分复用 CDN 缓存。

建议改为：

```text
图片文件
↓
Cloudflare R2 bucket
↓
R2 public custom domain 或 r2.dev public URL
↓
Hugo Markdown / front matter 引用远程图片 URL
```

这样可以让仓库只保存文本内容，图片由 R2 和 Cloudflare 缓存负责分发。

## 推荐架构

### 访问方式

优先级：

1. R2 自定义域名，例如 `https://assets.st6160.click`
2. R2 Public Development URL，例如 `https://pub-xxxx.r2.dev`
3. 私有 bucket + signed URL 不建议用于公开 portfolio 图片，因为 Hugo 静态页不适合维护过期签名 URL

生产页面建议使用自定义域名，理由是：

- URL 稳定，可长期写入 Markdown。
- 未来可以替换 bucket 或缓存策略，而不需要大规模改文章。
- 对招聘方、技术负责人、搜索引擎都更自然。

参考：

- Cloudflare R2 public buckets: <https://developers.cloudflare.com/r2/buckets/public-buckets/>
- Cloudflare R2 rclone example: <https://developers.cloudflare.com/r2/examples/rclone/>
- Cloudflare R2 CORS: <https://developers.cloudflare.com/r2/buckets/cors/>

## 命名规则

建议统一使用下面结构：

```text
portfolio/
  cases/
    <case-slug>/
      <original-or-semantic-name>.<ext>
  docs/
    <doc-slug>/
      <image-name>.<ext>
  shared/
    <image-name>.<ext>
```

当前 HP-UX / RHEL 案例可以使用：

```text
portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg
```

推荐公开 URL：

```text
https://assets.st6160.click/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg
```

如果暂时没有自定义域名，则使用：

```text
https://pub-xxxx.r2.dev/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg
```

## 本地变量约定

不要把 R2 access key、secret key 写入仓库。

本方案假设 rclone 已经配置好 R2 remote。

在本地执行时，用下面占位符替换：

```powershell
$R2_REMOTE = "r2"
$R2_BUCKET = "portfolio-assets"
$R2_PUBLIC_BASE_URL = "https://assets.st6160.click"
```

如果 rclone remote 名称或 bucket 名称不同，只替换变量，不修改文档中的目录规则。

## 上传流程

### 1. 确认 rclone 可以访问 R2

```powershell
rclone lsd ${R2_REMOTE}:
rclone lsf "${R2_REMOTE}:${R2_BUCKET}"
```

### 2. 上传单张图片

以当前 HP-UX / RHEL 案例图片为例：

```powershell
rclone copyto `
  "static/images/cases/legacy-platform-discovery-modernization.jpg" `
  "${R2_REMOTE}:${R2_BUCKET}/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg"
```

如果源文件在仓库外，例如：

```text
C:\zwData\zwtxt20\当前记录\找工作2602\LKN五连发\SES五连发\615HPUX_Large.jpg
```

则执行：

```powershell
rclone copyto `
  "C:\zwData\zwtxt20\当前记录\找工作2602\LKN五连发\SES五连发\615HPUX_Large.jpg" `
  "${R2_REMOTE}:${R2_BUCKET}/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg"
```

### 3. 验证对象存在

```powershell
rclone lsf "${R2_REMOTE}:${R2_BUCKET}/portfolio/cases/legacy-platform-discovery-modernization/"
```

### 4. 验证公网 URL

```powershell
curl -I "${R2_PUBLIC_BASE_URL}/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg"
```

期望结果：

```text
HTTP/2 200
content-type: image/jpeg
```

如果返回 `403` 或 `404`：

- 检查 bucket 是否开启 public access 或自定义域名是否绑定到正确 bucket。
- 检查 object key 是否大小写一致。
- 检查 URL 是否多了一层 bucket 名。

## Hugo 引用方式

### Markdown 正文图片

迁移前：

```markdown
![HP-UX legacy platform discovery and modernization](/images/cases/legacy-platform-discovery-modernization.jpg)
```

迁移后：

```markdown
![HP-UX legacy platform discovery and modernization](https://assets.st6160.click/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg)
```

日文页面：

```markdown
![HP-UX レガシープラットフォーム発掘と近代化](https://assets.st6160.click/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg)
```

### Front matter hero image

迁移前：

```yaml
hero_image: "/images/cases/613springbootFast.jpg"
```

迁移后：

```yaml
hero_image: "https://assets.st6160.click/portfolio/cases/spring-boot-data-ingestion-acceleration/613springbootFast.jpg"
```

注意：

- 先确认当前 layout 是否支持绝对 URL。
- 如果 layout 使用 `relURL` 或 `absURL` 强行处理图片路径，需要先调整模板或继续使用 Markdown 正文图片。

## 迁移顺序

推荐按页面逐个迁移，不要一次性全站替换。

```text
1. 扫描图片引用
2. 生成迁移清单
3. 上传一页需要的图片到 R2
4. 验证公网 URL
5. 修改对应 EN / JA Markdown
6. 运行 hugo
7. rg 确认没有遗留 base64 或旧路径
8. 必要时删除仓库内已迁移的大图
9. 原子提交
```

## 扫描命令

查找 base64 图片：

```powershell
rg -n "data:image|base64" content docs layouts
```

查找本地图片引用：

```powershell
rg -n "!\[.*\]\(/images/|hero_image: \"?/images/|src=\"/images/" content docs layouts
```

查找当前 HP-UX 图片引用：

```powershell
rg -n "legacy-platform-discovery-modernization|615HPUX|HP-UX|RHEL" content docs static
```

查找大图文件：

```powershell
Get-ChildItem -Recurse static/images | Sort-Object Length -Descending | Select-Object -First 30 FullName,Length
```

## 删除本地大图的条件

只有同时满足下面条件，才删除仓库内图片：

- R2 URL 已经通过 `curl -I` 返回 `200`。
- EN / JA 页面都已经改为 R2 URL。
- `rg` 确认仓库内没有其他页面引用该本地图片。
- `hugo` 编译通过。
- 这张图片不是主题、favicon、OG preview 等全站共享基础资产。

删除前检查：

```powershell
rg -n "legacy-platform-discovery-modernization.jpg" content layouts hugo.toml
```

如果没有引用，再删除：

```powershell
git rm static/images/cases/legacy-platform-discovery-modernization.jpg
```

## 缓存策略

公开 portfolio 图片通常适合长缓存。

推荐策略：

- 文件名带语义和版本，例如 `615HPUX_Large.jpg`。
- 如果图片内容改变，不覆盖旧文件，上传新文件名，例如 `615HPUX_Large_v2.jpg`。
- Markdown 更新到新 URL。

这样可以避免浏览器和 Cloudflare 边缘缓存导致旧图残留。

如果需要更精细缓存控制，优先在 Cloudflare 自定义域名上配置 Cache Rules，而不是在每次上传时手工维护复杂 header。

## CORS 说明

普通 `<img>` 展示公开图片通常不需要额外 CORS。

只有下面情况才需要配置 CORS：

- 前端 JavaScript `fetch()` 读取图片。
- Canvas 读取远程图片像素。
- 浏览器端图片处理、OCR、截图、WebGL 纹理等。

Portfolio 文章里的普通图片展示，默认可以不配置 CORS。

## 不建议做法

不要：

- 把大图转换成 base64 写入 Markdown。
- 为了 data URI 或 raw HTML 打开 Hugo `unsafe = true`。
- 把 R2 access key 写入文档、脚本或 Git commit。
- 在页面中引用需要鉴权的 R2 私有 URL。
- 上传后不验证公网 URL 就删除本地文件。
- 同一次提交里混入无关内容修改。

## Codex 详细提示词步骤

下面是后续执行迁移时可以直接复制给 Codex 的提示词。

### Prompt 1: 扫描清单

```text
在当前 Hugo 仓库中扫描图片使用情况，不修改文件。

重点查找：
1. Markdown 或 HTML 中的 data:image / base64 图片
2. content 下的 /images/ 本地图片引用
3. front matter 中的 hero_image
4. static/images 下体积较大的图片

输出一个迁移清单，字段包括：
- 页面路径
- 当前图片路径或 base64 位置
- 建议 R2 object key
- 是否同时存在 EN / JA 页面
- 是否可以删除本地文件

不要提交，不要删除文件。
```

### Prompt 2: 上传到 R2

```text
按照 docs/cloudflare-r2-image-migration-plan.md 的命名规则，把以下图片上传到 Cloudflare R2。

前提：
- rclone 已经配置好 R2 remote
- 不要读取或输出任何 R2 access key
- R2 remote 名称是：<填入 remote 名>
- R2 bucket 名称是：<填入 bucket 名>
- R2 public base URL 是：<填入 public URL>

请执行：
1. rclone copyto 上传图片
2. rclone lsf 验证 object 存在
3. curl -I 验证公网 URL 返回 200

图片清单：
- <本地图片路径> -> <R2 object key>

如果公网 URL 不是 200，停止，不要改 Markdown。
```

### Prompt 3: 修改 Hugo 页面引用

```text
把以下 Hugo 页面中的图片引用从本地路径或 base64 改为 R2 公网 URL。

要求：
1. 保留原有 alt 文本
2. EN / JA 对应页面都要同步
3. 不要引入 raw HTML
4. 不要启用 Hugo unsafe
5. 不要改无关文案
6. 修改后运行 hugo

替换关系：
- <旧图片路径或 base64 所在页面> -> <R2 public URL>

如果 layout 不支持 front matter 的绝对 URL，请说明问题并改用 Markdown 正文图片。
```

### Prompt 4: 验证和清理

```text
验证刚才的 R2 图片迁移。

请执行：
1. rg 查找旧图片路径
2. rg 查找 data:image 和 base64
3. hugo 编译
4. 如果旧本地图片已经没有任何引用，说明是否可以 git rm

不要删除不确定是否仍被使用的图片。
不要提交无关文件。
```

### Prompt 5: 原子提交

```text
把这次 R2 图片迁移做成一个原子提交。

要求：
1. git status 检查工作区
2. 只 stage 本次迁移相关文件
3. 不要 stage 无关修改
4. 提交信息使用：
   docs: move case images to cloudflare r2
   或
   chore: migrate portfolio images to r2
5. 提交前确认 hugo 已通过
6. 提交后输出 commit hash
```

## 当前 HP-UX 页面建议迁移目标

当前页面：

```text
content/cases/legacy-platform-discovery-modernization.md
content/cases/legacy-platform-discovery-modernization.ja.md
```

当前本地图片：

```text
static/images/cases/legacy-platform-discovery-modernization.jpg
```

建议 R2 object key：

```text
portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg
```

建议 URL：

```text
https://assets.st6160.click/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg
```

对应 Markdown：

```markdown
![HP-UX legacy platform discovery and modernization](https://assets.st6160.click/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg)
```

```markdown
![HP-UX レガシープラットフォーム発掘と近代化](https://assets.st6160.click/portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg)
```

## 最小安全迁移标准

一次合格的迁移至少满足：

```text
rclone upload OK
curl -I public URL = 200
EN page updated
JA page updated
hugo OK
rg old path OK
git diff only contains intended files
```

满足这些条件后，再决定是否删除仓库内图片。
