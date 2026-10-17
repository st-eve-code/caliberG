import type { MetadataRoute } from "next";
import { config } from "@/lib/config";
import { categories } from "@/lib/data/categories";
import { getAllProducts } from "@/lib/data/products";

const base = config.siteUrl.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/browse`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/sell`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/ffl-locator`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/veterans`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/gift-cards`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cancellation`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/warranty`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/acceptable-use`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/accessibility`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/safety`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/state-restrictions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/schematics`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
