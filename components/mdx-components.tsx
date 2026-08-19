import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// MDX 自定义组件映射
// 覆盖默认 HTML 元素，增强外链行为和样式
export const mdxComponents: MDXComponents = {
  // 外链自动加 target="_blank"，内链用 next/link
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href as string} {...props}>
        {children}
      </Link>
    );
  },
};
