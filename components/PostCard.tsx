import Link from "next/link";
import type { PostMeta } from "@/types";
import { formatDate } from "@/lib/posts";
import { TagBadge } from "@/components/TagBadge";

// 文章列表卡片：标题链接 + 摘要 + 标签 + 日期
export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="border-b border-gray-200 py-6 dark:border-gray-800">
      <h2 className="mb-1 text-xl font-semibold">
        <Link
          href={`/posts/${post.slug}`}
          className="text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <div className="mb-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </div>
      <p className="mb-3 leading-relaxed text-gray-600 dark:text-gray-300">
        {post.excerpt}
      </p>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
