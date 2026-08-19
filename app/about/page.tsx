import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: `关于${siteConfig.name}。`,
};

// 关于页（静态）
export default function AboutPage() {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      <h1>关于本站</h1>
      <p>
        欢迎来到{siteConfig.name}。这里是我记录技术学习与实践的地方，
        主要聚焦前端开发、Next.js、TypeScript 等主题。
      </p>

      <h2>技术栈</h2>
      <p>本博客基于以下技术构建：</p>
      <ul>
        <li>
          <strong>Next.js 14</strong> — App Router、服务端组件、静态生成
        </li>
        <li>
          <strong>TypeScript</strong> — 类型安全
        </li>
        <li>
          <strong>Tailwind CSS v4</strong> — 原子化 CSS，CSS-first 配置
        </li>
        <li>
          <strong>MDX</strong> — 用 next-mdx-remote 渲染本地文章
        </li>
        <li>
          <strong>rehype-pretty-code</strong> — 基于 Shiki 的代码高亮
        </li>
        <li>
          <strong>next-themes</strong> — 深色模式
        </li>
      </ul>

      <h2>特性</h2>
      <ul>
        <li>响应式布局，适配移动端和桌面端</li>
        <li>深色/浅色模式切换，跟随系统设置</li>
        <li>Markdown 文章渲染，支持代码高亮</li>
        <li>标签分类与筛选</li>
        <li>文章分页</li>
        <li>SEO 优化：metadata、OpenGraph、sitemap</li>
      </ul>

      <h2>联系我</h2>
      <p>
        如果你有任何问题或建议，欢迎通过以下方式联系：
      </p>
      <ul>
        <li>邮箱：hello@example.com</li>
        <li>GitHub：@your-username</li>
      </ul>
    </div>
  );
}
