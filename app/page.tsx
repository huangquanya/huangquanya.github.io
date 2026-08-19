import { getPaginatedPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

// 首页（第1页）：文章列表 + 分页
export default function HomePage() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(1);

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-2 text-2xl font-bold">还没有文章</h1>
        <p className="text-gray-500 dark:text-gray-400">
          在 content/posts 目录下添加 .mdx 文件即可开始。
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        最新文章
      </h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
