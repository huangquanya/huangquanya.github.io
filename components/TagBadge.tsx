import Link from "next/link";

// 标签徽章，点击跳转到标签筛选页
export function TagBadge({
  tag,
  count,
}: {
  tag: string;
  count?: number;
}) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900/40 dark:hover:text-blue-300"
    >
      <span>#{tag}</span>
      {count !== undefined && (
        <span className="text-gray-400 dark:text-gray-500">{count}</span>
      )}
    </Link>
  );
}
