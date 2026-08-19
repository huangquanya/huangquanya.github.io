import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta, PostFrontmatter, Tag, PaginatedPosts } from "@/types";

// 文章源目录：content/posts/*.mdx 扁平结构
const POSTS_DIR = path.join(process.cwd(), "content", "posts");
// 每页显示文章数
const PER_PAGE = 5;

// 读取单个 MDX 文件，分离 frontmatter 和正文
function readPostFile(fileName: string): Post {
  const filePath = path.join(POSTS_DIR, fileName);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  const frontmatter = data as PostFrontmatter;
  return {
    slug: fileName.replace(/\.mdx$/, ""),
    content,
    ...frontmatter,
  };
}

// 是否在开发环境（开发环境显示草稿）
const isDev = process.env.NODE_ENV === "development";

// 获取所有文章（按日期降序），生产环境过滤草稿
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map(readPostFile)
    .filter((post) => isDev || !post.draft)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 获取单篇文章（含正文）
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const post = readPostFile(`${slug}.mdx`);
  // 生产环境不返回草稿
  if (!isDev && post.draft) return null;
  return post;
}

// 获取所有 slug（用于 generateStaticParams）
export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

// 获取所有标签（去重 + 计数，按计数降序）
export function getAllTags(): Tag[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

// 按标签筛选文章
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// 分页查询
export function getPaginatedPosts(page = 1, perPage = PER_PAGE): PaginatedPosts {
  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  return {
    posts: allPosts.slice(start, end),
    totalPages,
    currentPage,
  };
}

// 格式化日期为中文显示
export function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
