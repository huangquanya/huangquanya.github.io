# Next.js 14 个人博客模板

基于 Next.js 14 App Router + TypeScript + Tailwind CSS v4 的个人博客模板，使用本地 MDX 文件作为内容源，无需数据库。

## 特性

- **文章列表与分页** — 首页展示文章列表（标题/摘要/标签/日期），支持分页
- **MDX 渲染** — 文章详情页渲染 Markdown，支持 GFM 语法和代码高亮
- **代码高亮** — 基于 Shiki（rehype-pretty-code），明暗双主题自动切换
- **标签系统** — 标签总览页 + 单标签筛选页
- **深色模式** — 基于 next-themes，跟随系统设置，无闪烁
- **响应式布局** — 适配移动端和桌面端
- **SEO 优化** — metadata、OpenGraph、sitemap.xml、robots.txt
- **静态生成** — 所有页面预渲染为静态 HTML

## 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 14 (App Router) | 框架 |
| TypeScript | 类型安全 |
| Tailwind CSS v4 | 样式（CSS-first 配置） |
| next-mdx-remote | MDX 运行时渲染 |
| rehype-pretty-code + Shiki | 代码高亮 |
| gray-matter | frontmatter 解析 |
| next-themes | 深色模式 |
| remark-gfm | GitHub Flavored Markdown |
| lucide-react | 图标 |

## 快速开始

### 环境要求

- Node.js >= 18（推荐 20+）
- npm >= 9

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问 http://localhost:3000
```

### 生产构建

```bash
npm run build
npm start
```

## 目录结构

```
blog/
├── app/                    # App Router 页面
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页（第1页）
│   ├── page/[page]/        # 分页第2+页
│   ├── posts/[slug]/       # 文章详情
│   ├── tags/               # 标签页
│   ├── about/              # 关于页
│   ├── sitemap.ts          # 站点地图
│   ├── robots.ts           # robots.txt
│   └── globals.css         # 全局样式
├── components/             # React 组件
├── lib/                    # 工具函数（数据层、MDX 配置、站点配置）
├── content/posts/          # MDX 文章源
├── types/                  # TypeScript 类型定义
└── public/                 # 静态资源
```

## 添加文章

在 `content/posts/` 目录下创建 `.mdx` 文件：

```mdx
---
title: "文章标题"
date: "2025-08-01"
excerpt: "一两句话摘要，用于列表页和 SEO。"
tags: ["标签1", "标签2"]
---

# 正文标题

这里是 Markdown 正文，支持所有 GFM 语法。
```

**frontmatter 字段说明：**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | 是 | 文章标题 |
| `date` | string | 是 | 发布日期，ISO 8601 格式 |
| `excerpt` | string | 是 | 摘要 |
| `tags` | string[] | 是 | 标签数组 |
| `draft` | boolean | 否 | true 则生产环境不发布 |

文件名即为 URL slug（如 `hello-world.mdx` → `/posts/hello-world`）。

## 配置

### 站点信息

修改 `lib/site.ts` 更新站点名称、描述、URL：

```typescript
export const siteConfig = {
  name: "我的博客",
  description: "站点描述",
  url: "https://your-domain.com",
  author: "你的名字",
  ogImage: "/og-default.png",
};
```

### 每页文章数

修改 `lib/posts.ts` 中的 `PER_PAGE` 常量：

```typescript
const PER_PAGE = 5; // 改为你想要的数字
```

### 代码高亮主题

修改 `lib/mdx-options.ts` 中的 Shiki 主题：

```typescript
theme: {
  light: "github-light",      // 可换其他 Shiki 主题
  dark: "github-dark-dimmed",
}
```

可用主题见 [Shiki Themes](https://shiki.style/themes)。

## 部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入仓库
3. 自动识别 Next.js，无需额外配置

### 其他平台

确保部署前运行 `npm run build`，部署 `npm start` 启动的服务。

## 许可证

MIT
