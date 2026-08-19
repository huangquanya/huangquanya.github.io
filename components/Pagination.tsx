import Link from "next/link";

// 分页导航组件
// 首页 / 是第1页，/page/2、/page/3 是后续页
// 第2页的"上一页"应链接到 / 而非 /page/1（避免重复内容）
export function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  // 生成页码链接
  const getPageHref = (page: number) => (page === 1 ? "/" : `/page/${page}`);

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className="flex items-center justify-between py-8" aria-label="分页">
      {/* 上一页 */}
      <div>
        {hasPrev ? (
          <Link
            href={getPageHref(currentPage - 1)}
            className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            ← 上一页
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-300 dark:border-gray-800 dark:text-gray-600">
            ← 上一页
          </span>
        )}
      </div>

      {/* 页码 */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={getPageHref(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={
              page === currentPage
                ? "inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-blue-600 px-3 text-sm font-medium text-white"
                : "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            }
          >
            {page}
          </Link>
        ))}
      </div>

      {/* 下一页 */}
      <div>
        {hasNext ? (
          <Link
            href={getPageHref(currentPage + 1)}
            className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            下一页 →
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-300 dark:border-gray-800 dark:text-gray-600">
            下一页 →
          </span>
        )}
      </div>
    </nav>
  );
}
