import { notFound } from "next/navigation";
import { getPaginatedPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Pagination } from "@/components/Pagination";

// 预生成所有分页页码（从第2页开始，首页 / 是第1页）
export function generateStaticParams() {
  const { totalPages } = getPaginatedPosts();
  // 只生成 2 ~ totalPages，避免 /page/1 与首页重复内容
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }));
}

// 分页第2+页
export default async function PaginatedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageStr } = await params;
  const page = Number(pageStr);
  if (!Number.isInteger(page) || page < 2) notFound();

  const { posts, totalPages, currentPage } = getPaginatedPosts(page);
  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        第 {currentPage} 页，共 {totalPages} 页
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
