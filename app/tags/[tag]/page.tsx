import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

// 预生成所有标签的静态参数
// 标签名作为 URL 段，Next.js 自动处理中文编码
export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.name }));
}

// 动态生成标签页的 SEO 元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) return {};

  return {
    title: `#${tag}`,
    description: `标签「${tag}」下的 ${posts.length} 篇文章。`,
  };
}

// 单标签筛选页
export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/tags"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← 全部标签
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          #{tag}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          共 {posts.length} 篇文章
        </p>
      </div>
      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
