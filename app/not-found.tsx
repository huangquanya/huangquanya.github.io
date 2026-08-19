import Link from "next/link";

// 404 页面
export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700">
        404
      </h1>
      <p className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
        页面不存在
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        你访问的页面可能已被移动或删除。
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        ← 返回首页
      </Link>
    </div>
  );
}
