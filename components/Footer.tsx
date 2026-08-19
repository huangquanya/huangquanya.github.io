// 站点页脚
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-3xl px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          © {year} 我的博客 · 使用{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Next.js 14
          </a>{" "}
          构建
        </p>
      </div>
    </footer>
  );
}
