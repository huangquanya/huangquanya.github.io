// 文章 frontmatter 结构（MDX 文件头部 YAML）
export interface PostFrontmatter {
  /** 文章标题 */
  title: string;
  /** 发布日期，ISO 8601 格式，如 "2025-08-01" */
  date: string;
  /** 摘要，用于列表页展示和 SEO description */
  excerpt: string;
  /** 标签数组 */
  tags: string[];
  /** 是否草稿，true 则不在生产环境发布 */
  draft?: boolean;
}

// 文章元数据（列表页使用，不含正文）
export interface PostMeta extends PostFrontmatter {
  /** URL slug，由文件名派生 */
  slug: string;
}

// 完整文章（详情页使用，含 MDX 正文）
export interface Post extends PostMeta {
  /** gray-matter 解析后的 MDX 正文（已剥离 frontmatter） */
  content: string;
}

// 标签（含文章计数）
export interface Tag {
  name: string;
  count: number;
}

// 分页结果
export interface PaginatedPosts {
  /** 当前页的文章列表 */
  posts: PostMeta[];
  /** 总页数 */
  totalPages: number;
  /** 当前页码（从 1 开始） */
  currentPage: number;
}
