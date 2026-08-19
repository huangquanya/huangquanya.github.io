/** @type {import('next').NextConfig} */
const nextConfig = {
  // MDX 由 next-mdx-remote 在运行时处理，无需在此配置 pageExtensions
  reactStrictMode: true,
  // 静态导出：所有页面预渲染为静态 HTML，适配 GitHub Pages 托管
  output: "export",
};

export default nextConfig;
