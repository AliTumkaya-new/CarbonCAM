import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { articles, categoryColors } from "../articles";
import { getArticleBySlugForLocale, getRelatedArticlesForLocale } from "../articles-en";
import ArticleContent from "./article-content";

// Generate static params for all articles
export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const turkish = locale === "tr";
  const article = getArticleBySlugForLocale(slug, locale);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      locale: turkish ? "tr_TR" : "en_US",
      siteName: "CarbonCam",
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate || article.publishDate,
      authors: ["CarbonCam"],
      tags: turkish
        ? [article.categoryLabel, "karbon ayak izi", "sürdürülebilirlik"]
        : [article.categoryLabel, "carbon footprint", "sustainability"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
    alternates: {
      canonical: `https://carboncam.com.tr/blog/${article.slug}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = getArticleBySlugForLocale(slug, locale);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticlesForLocale(article, locale);
  const wordCount = [article.title, article.excerpt, ...article.content.map((section) => `${section.title} ${section.content}`)]
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    inLanguage: locale === "tr" ? "tr-TR" : "en-US",
    isAccessibleForFree: true,
    wordCount,
    citation: article.sources?.map((source) => source.url),
    publishingPrinciples: "https://carboncam.com.tr/editorial-policy",
    author: {
      "@type": "Organization",
      name: locale === "tr" ? "CarbonCAM Editoryal Ekibi" : "CarbonCAM Editorial Team",
      url: "https://carboncam.com.tr",
    },
    publisher: {
      "@type": "Organization",
      name: "CarbonCam",
      logo: {
        "@type": "ImageObject",
        url: "https://carboncam.com.tr/carboncam-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://carboncam.com.tr/blog/${article.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleContent
        article={article}
        relatedArticles={relatedArticles}
        categoryColors={categoryColors}
      />
    </>
  );
}
