import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticleBySlug, getRelatedArticles, categoryColors } from "../articles";
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
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      locale: "tr_TR",
      siteName: "CarbonCam",
      publishedTime: article.publishDate,
      modifiedTime: article.updatedDate || article.publishDate,
      authors: ["CarbonCam"],
      tags: [article.categoryLabel, "karbon ayak izi", "sürdürülebilirlik"],
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
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);

  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    author: {
      "@type": "Organization",
      name: "CarbonCam",
      url: "https://carboncam.com.tr",
    },
    publisher: {
      "@type": "Organization",
      name: "CarbonCam",
      logo: {
        "@type": "ImageObject",
        url: "https://carboncam.com.tr/logo-mark.svg",
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
