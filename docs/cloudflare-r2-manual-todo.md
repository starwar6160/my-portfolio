# Cloudflare R2 手工配置待办

这份待办记录那些必须由你手工补齐的部分。当前仓库已经做了兼容改造：

- `layouts/partials/case_hero.html` 已支持 `r2ImageBaseURL`
- `content/cases/legacy-platform-discovery-modernization.md` 已加入 `hero_image_r2_key`
- `content/cases/legacy-platform-discovery-modernization.ja.md` 已加入 `hero_image_r2_key`
- `hugo.toml` 已预留 `params.r2ImageBaseURL`

## 你需要手工完成

1. 在 Cloudflare 里创建或确认 R2 公网访问域名。
1. 确认你要用于 portfolio 图片的 bucket 名称。
1. 在 `hugo.toml` 里把 `params.r2ImageBaseURL` 改成真实的公开基址，例如 `https://assets.st6160.click`。
1. 在本机 `rclone` 里补一个 R2 remote，或确认现有 remote 名称。
1. 把 `615HPUX_Large.jpg` 上传到：

```text
portfolio/cases/legacy-platform-discovery-modernization/615HPUX_Large.jpg
```

1. 用 `curl -I` 验证公开 URL 返回 `200`。
1. 确认页面上的 EN / JA 两个案例页都能正确显示。
1. 如果后续验证稳定，再删除仓库内本地图片文件。

## 这个仓库里已经完成的部分

- HPUX 案例页已经准备好 R2 key。
- 案例图显示逻辑已经支持后续从本地路径切到 R2 公网基址。
- 迁移方案文档已经写在 [docs/cloudflare-r2-image-migration-plan.md](./cloudflare-r2-image-migration-plan.md)。

## 建议的下一步

等你把 R2 域名和 bucket 配好之后，只需要做这三步：

```text
1. 改 `hugo.toml`
2. 上传图片到 R2
3. 运行 `hugo`
```

如果 `hugo` 通过且页面正常，再补 `git add` / `git commit` / `git push`。
