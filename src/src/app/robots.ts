import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

const base = config.siteUrl.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/wishlist", "/order-lookup"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
