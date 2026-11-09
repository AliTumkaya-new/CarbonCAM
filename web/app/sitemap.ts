import type { MetadataRoute } from "next";
import { getArticlesForLocale } from "./(marketing)/blog/articles-en";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://carboncam.com.tr";
  const siteUpdated = new Date("2026-09-02");
  const articles = getArticlesForLocale("tr");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/app`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/account-deletion`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/calculation-methodology`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.updatedDate || article.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...articlePages];
}
