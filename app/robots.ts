import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// 静态导出要求显式声明为静态路由
export const dynamic = "force-static";

// 生成 robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
