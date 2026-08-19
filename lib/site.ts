// 站点配置：集中管理元数据，供 layout 和 sitemap 复用
// 部署时修改此处即可更新全站 SEO 信息
export const siteConfig = {
  name: "我的博客",
  description: "分享前端开发、Next.js、TypeScript 的技术心得与实践笔记。",
  // 部署后替换为实际域名
  url: "https://example.com",
  author: "博主",
  // 用于 OpenGraph
  ogImage: "/og-default.png",
};

// 构建完整 URL 的工具函数
export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
