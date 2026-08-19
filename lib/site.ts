// 站点配置：集中管理元数据，供 layout 和 sitemap 复用
// 部署时修改此处即可更新全站 SEO 信息
export const siteConfig = {
  name: "quanya的技术博客",
  description: "分享前端开发、Next.js、TypeScript 的技术心得与实践笔记。",
  url: "https://huangquanya.github.io",
  author: "quanya",
  // 用于 OpenGraph
  ogImage: "/og-default.png",
};

// 构建完整 URL 的工具函数
export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
