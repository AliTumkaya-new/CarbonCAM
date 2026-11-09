"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import StoreBadges from "../store-badges";
import { getArticlesForLocale } from "./blog/articles-en";
import styles from "./home.module.css";

const copyByLocale = {
  tr: {
    heroBadge: "COP31 & Net-Zero 2030 / 2053 Vizyonu",
    title: "Enerji tüketimini",
    titleAccent: "görünür hale getir.",
    intro: "Elektrik faturası tarama, güneş enerjisi karbon ikamesi ve cihaz bazlı güç analiziyle COP31 hedefleri doğrultusunda tahmini tüketim ve CO₂e etkisini açık sonuçlarla incele.",
    details: "COP31 & Uygulama Özelliklerini İncele →",
    facts: [
      { title: "COP31 & Şeffaf Karbon Hesabı", body: "IPCC ve şebeke emisyon katsayılarıyla her kWh tüketimin iklim etkisini net, doğrulanabilir metriklerle gör." },
      { title: "Akıllı Fatura Okuma (OCR)", body: "Elektrik faturanı kamerayla tara; aktif kWh, tarife dilimleri ve hanenin aylık karbon salımını anında keşfet." },
      { title: "Güneş Enerjisi (GES) İkamesi", body: "Güneş panellerinin şebekeden önlediği CO₂e miktarını, ağaç ve tasarruf eşdeğerlerini canlı takip et." },
    ],
    articlesKicker: "CarbonCAM Bilgi Merkezi",
    articlesTitle: "Enerji ve karbon konusunda net, uygulanabilir rehberler.",
    allArticles: "Tüm içerikleri gör →",
    featured: "Öne çıkan rehber",
    readMore: "Rehberi oku →",
    readTime: "dk okuma",
    appTitle: "COP31 Uyumlu Akıllı Karbon & Enerji Asistanı.",
    appBody: "CarbonCAM mobil uygulamasında fatura tarama, güneş enerjisi emisyon ikamesi, cihaz Watt simülasyonları ve sürdürülebilirlik görevleriyle geleceği bugünden şekillendir.",
    appButton: "Uygulama özelliklerini incele",
  },
  en: {
    heroBadge: "COP31 & Net-Zero 2030 / 2053 Vision",
    title: "Make energy use",
    titleAccent: "easier to see.",
    intro: "From smart utility bill scanning to solar carbon offset tracking and appliance wattage simulations, review clear energy estimates aligned with COP31 climate goals.",
    details: "Explore COP31 & App Features →",
    facts: [
      { title: "COP31 & Transparent Carbon Math", body: "Measure the exact climate impact of every kWh with certified IPCC and national grid emission standards." },
      { title: "Smart Bill Scanning (OCR)", body: "Scan electricity bills with your phone camera to instantly extract active kWh, tariff rates, and monthly emissions." },
      { title: "Solar Carbon Offsets", body: "Track emissions prevented by rooftop solar power, accompanied by live tree-absorbency and fuel equivalents." },
    ],
    articlesKicker: "CarbonCAM Knowledge Centre",
    articlesTitle: "Clear, practical guides to energy and carbon.",
    allArticles: "View all articles →",
    featured: "Featured guide",
    readMore: "Read the guide →",
    readTime: "min read",
    appTitle: "COP31-Aligned Smart Carbon & Energy Assistant.",
    appBody: "Use CarbonCAM to scan electricity bills, track solar carbon offsets, simulate appliance wattage, and follow daily eco-challenges.",
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
            <span className={styles.heroBadge}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block" }} />
              {copy.heroBadge}
            </span>
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
