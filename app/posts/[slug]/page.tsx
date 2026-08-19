import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getPostSlugs, formatDate } from "@/lib/posts";
import { MDXContent } from "@/components/MDXContent";
import { TagBadge } from "@/components/TagBadge";
import { siteConfig, absoluteUrl } from "@/lib/site";

// 预生成所有文章的静态参数
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// 动态生成每篇文章的 SEO 元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/posts/${post.slug}`),
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      authors: [siteConfig.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // 获取上一篇/下一篇（按日期排序）
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <article>
      {/* 文章头部 */}
      <header className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-800">
        <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </header>

      {/* MDX 正文 */}
      <MDXContent source={post.content} />

      {/* 上一篇/下一篇导航 */}
      {(prevPost || nextPost) && (
        <nav className="mt-12 grid gap-4 border-t border-gray-200 pt-8 dark:border-gray-800 sm:grid-cols-2">
          {nextPost && (
            <Link
              href={`/posts/${nextPost.slug}`}
              className="group rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 dark:border-gray-800 dark:hover:border-blue-700"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ← 上一篇
              </span>
              <p className="mt-1 font-medium text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {nextPost.title}
              </p>
            </Link>
          )}
          {prevPost && (
            <Link
              href={`/posts/${prevPost.slug}`}
              className="group rounded-lg border border-gray-200 p-4 text-right transition-colors hover:border-blue-300 dark:border-gray-800 dark:hover:border-blue-700 sm:col-start-2"
            >
              <span className="text-xs text-gray-500 dark:text-gray-400">
                下一篇 →
              </span>
              <p className="mt-1 font-medium text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                {prevPost.title}
              </p>
            </Link>
          )}
        </nav>
      )}

      {/* 返回首页 */}
      <div className="mt-8">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← 返回首页
        </Link>
      </div>
    </article>
  );
}
