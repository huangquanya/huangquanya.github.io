import type { Metadata } from "next";
import { getAllTags } from "@/lib/posts";
import { TagBadge } from "@/components/TagBadge";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览所有文章主题。",
};

// 标签总览页：展示所有标签及文章计数
export default function TagsPage() {
  const tags = getAllTags();

  if (tags.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="mb-2 text-2xl font-bold">还没有标签</h1>
        <p className="text-gray-500 dark:text-gray-400">
          在文章 frontmatter 中添加 tags 字段即可。
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        标签
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        共 {tags.length} 个标签，点击标签查看相关文章。
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <TagBadge key={tag.name} tag={tag.name} count={tag.count} />
        ))}
      </div>
    </div>
  );
}
