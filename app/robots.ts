import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

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
