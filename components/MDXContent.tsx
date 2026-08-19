import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdx-options";
import { mdxComponents } from "@/components/mdx-components";

// MDX 渲染器（服务端组件）
// source 是 gray-matter 解析后的纯正文（已剥离 frontmatter）
export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert">
      <MDXRemote
        source={source}
        options={mdxOptions}
        components={mdxComponents}
      />
    </div>
  );
}
