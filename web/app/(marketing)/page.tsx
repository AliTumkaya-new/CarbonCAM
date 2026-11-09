"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import StoreBadges from "../store-badges";
import { getArticlesForLocale } from "./blog/articles-en";
import styles from "./home.module.css";

const copyByLocale = {
  tr: {
    title: "Enerji tüketimini",
    titleAccent: "görünür hale getir.",
    intro: "Elektrikli cihazların Watt değerini ve günlük kullanım süresini gir; tahmini enerji tüketimini ve CO₂e etkisini açık, anlaşılır sonuçlarla incele.",
    details: "Uygulama özelliklerini incele →",
    facts: [
      { title: "Girdiden anlaşılır sonuca", body: "Cihaz gücü ve kullanım süresinden günlük, aylık ve yıllık enerji tahmini oluştur." },
      { title: "Kayıtların cihazında", body: "Analiz geçmişini ve günlük ilerlemeni telefonunda tut; istediğinde temizle." },
      { title: "Karşılaştırılabilir tasarruf", body: "Aynı koşullardaki sayaç değerlerini karşılaştırarak tüketim değişimini takip et." },
    ],
    articlesKicker: "CarbonCAM Bilgi Merkezi",
    articlesTitle: "Enerji ve karbon konusunda net, uygulanabilir rehberler.",
    allArticles: "Tüm içerikleri gör →",
    featured: "Öne çıkan rehber",
    readMore: "Rehberi oku →",
    readTime: "dk okuma",
    appTitle: "Tahmini gör. Kaydet. Daha bilinçli karar ver.",
    appBody: "CarbonCAM uygulamasında cihaz bazlı enerji tahminleri oluşturabilir, günlük çevre görevlerini takip edebilir ve karşılaştırılabilir sayaç kayıtlarını inceleyebilirsin.",
    appButton: "Uygulama özelliklerini incele",
  },
  en: {
    title: "Make energy use",
    titleAccent: "easier to see.",
    intro: "Enter an appliance wattage and daily usage time to review estimated energy use and CO₂e impact through clear, understandable results.",
    details: "Explore app features →",
    facts: [
      { title: "From input to a clear result", body: "Estimate daily, monthly, and yearly energy use from appliance power and usage time." },
      { title: "Records stay on your device", body: "Keep analysis history and daily progress on your phone and clear it whenever you choose." },
      { title: "Comparable savings", body: "Track consumption changes using meter readings recorded under comparable conditions." },
    ],
    articlesKicker: "CarbonCAM Knowledge Centre",
    articlesTitle: "Clear, practical guides to energy and carbon.",
    allArticles: "View all articles →",
    featured: "Featured guide",
    readMore: "Read the guide →",
    readTime: "min read",
    appTitle: "Estimate it. Save it. Make a more informed decision.",
    appBody: "Use CarbonCAM to create appliance energy estimates, follow daily environmental tasks, and review comparable meter records.",
    appButton: "Explore app features",
  },
} as const;

export default function HomePage() {
  const locale = useLocale();
  const turkish = locale === "tr";
  const copy = copyByLocale[turkish ? "tr" : "en"];
  const articles = getArticlesForLocale(locale);
  const featured = articles[0];
  const latest = articles.slice(1, 5);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1 className={styles.title}>{copy.title}<span className={styles.titleAccent}>{copy.titleAccent}</span></h1>
            <p className={styles.intro}>{copy.intro}</p>
            <div className={styles.heroActions}>
              <StoreBadges turkish={turkish} />
              <Link className={styles.detailsLink} href="/app">{copy.details}</Link>
            </div>
          </div>

          <div className={styles.visual} aria-label={turkish ? "CarbonCAM mobil uygulama önizlemesi" : "CarbonCAM mobile app preview"}>
            <div className={styles.deviceStage}>
              <Image className={styles.phoneImage} alt={turkish ? "CarbonCAM uygulamasının tam telefon görünümü" : "Full phone view of the CarbonCAM app"} height={2160} priority sizes="(max-width: 980px) 78vw, 320px" src="/app-screenshots/impact-new.png" width={1080} />
            </div>
          </div>
        </div>
      </section>

      <section aria-label={turkish ? "CarbonCAM özellikleri" : "CarbonCAM features"} className={styles.facts}>
        {copy.facts.map((fact, index) => (
          <article className={styles.fact} key={fact.title}>
            <span className={styles.factNumber}>0{index + 1}</span>
            <h2>{fact.title}</h2>
            <p>{fact.body}</p>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p className={styles.sectionKicker}>{copy.articlesKicker}</p><h2 className={styles.sectionTitle}>{copy.articlesTitle}</h2></div>
          <Link className={styles.sectionLink} href="/blog">{copy.allArticles}</Link>
        </div>

        <div className={styles.articleLayout}>
          <Link className={styles.featured} href={`/blog/${featured.slug}`}>
            <div className={styles.featuredMeta}><span>{featured.categoryLabel}</span><span>·</span><span>{copy.featured}</span></div>
            <div className={styles.featuredContent}>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <span className={styles.readMore}>{copy.readMore}</span>
            </div>
          </Link>

          <div className={styles.articleGrid}>
            {latest.map((article) => (
              <Link className={styles.articleCard} href={`/blog/${article.slug}`} key={article.slug}>
                <span className={styles.articleCategory}>{article.categoryLabel}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt.slice(0, 105)}…</p>
                <span className={styles.articleDate}>{article.readingTime} {copy.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.appSection}>
        <div className={styles.appBanner}>
          <div className={styles.appBannerContent}><h2>{copy.appTitle}</h2><p>{copy.appBody}</p></div>
          <Link className={styles.bannerButton} href="/app">{copy.appButton}</Link>
        </div>
      </section>
    </div>
  );
}
