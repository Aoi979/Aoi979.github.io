# Aoi979.github.io

这个仓库现在是最简写作流：**直接写 Markdown，自动发布网站**。

## 你只需要改这两类内容

- `md/*.md`：笔记正文
- `md/res/*`：图片等资源

## 新建一篇笔记

1. 在 `md/` 下新建一个 `xxx.md`
2. 正文第一行尽量写标题，例如 `# 我的标题`
3. 图片直接写 `![说明](res/xxx.png)`
4. 提交并推送：

```bash
git add .
git commit -m "add note"
git push
```

## 本地预览（可选）

```bash
npm install
npm run docs:dev
```

## 自动部署

- push 到 `main` 后会自动执行 `.github/workflows/deploy.yml`
- 产物会发布到 GitHub Pages
- 首次启用时，在仓库设置里把 Pages Source 设为 **GitHub Actions**
