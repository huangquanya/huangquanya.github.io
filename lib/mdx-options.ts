import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

// MDX 编译选项：remark/rehype 插件配置
// - remark-gfm：启用表格、删除线、任务列表、自动链接等 GFM 语法
// - rehype-pretty-code：基于 Shiki 的代码高亮，配置双主题实现明暗切换
export const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          // 双主题：插件为每个 token 生成 --shiki-light 和 --shiki-dark 两套 CSS 变量
          // 切换靠 CSS（见 globals.css），无需重新渲染
          theme: {
            light: "github-light",
            dark: "github-dark-dimmed",
          },
          // 关键：让背景色由 CSS 控制，而非硬编码主题背景
          keepBackground: false,
        },
      ],
    ],
  },
};
