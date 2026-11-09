"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrandLogo from "../brand-logo";
import LanguageSwitcher from "../language-switcher";
import CookieConsent from "./cookie-consent";
import AdSenseScript from "../../components/adsense-script";
import styles from "./layout.module.css";

const copyByLocale = {
  tr: {
    tagline: "Carbon Impact Guide",
    appCta: "Uygulamayı keşfet",
    menu: "Menüyü aç veya kapat",
    nav: [
      { label: "Ana Sayfa", href: "/" },
      { label: "İçerikler", href: "/blog" },
      { label: "Mobil Uygulama", href: "/app" },
      { label: "Hakkımızda", href: "/about" },
    ],
    description: "CarbonCAM, elektrikli cihazların enerji tüketimini ve tahmini CO₂e etkisini anlaşılır hale getiren mobil uygulama ve bilgi platformudur.",
    columns: [
      { title: "Keşfet", links: [{ label: "Tüm içerikler", href: "/blog" }, { label: "Hesaplama metodolojisi", href: "/calculation-methodology" }, { label: "Mobil uygulama", href: "/app" }, { label: "Yardım merkezi", href: "/help" }] },
      { title: "CarbonCAM", links: [{ label: "Hakkımızda", href: "/about" }, { label: "Editoryal ilkeler", href: "/editorial-policy" }, { label: "İletişim", href: "/contact" }, { label: "Hesap silme", href: "/account-deletion" }] },
      { title: "Yasal", links: [{ label: "Gizlilik", href: "/privacy" }, { label: "Kullanım şartları", href: "/terms" }, { label: "Çerez politikası", href: "/cookies" }] },
    ],
    copyright: "© 2026 CarbonCAM. Tüm hakları saklıdır.",
    support: "Destek: carboncamplus@gmail.com",
    consent: "Çerez tercihleri",
  },
  en: {
    tagline: "Carbon Impact Guide",
    appCta: "Explore the app",
    menu: "Open or close menu",
    nav: [
      { label: "Home", href: "/" },
      { label: "Articles", href: "/blog" },
      { label: "Mobile App", href: "/app" },
      { label: "About", href: "/about" },
    ],
    description: "CarbonCAM is a mobile app and knowledge platform that makes appliance energy use and estimated CO₂e impact easier to understand.",
    columns: [
      { title: "Explore", links: [{ label: "All articles", href: "/blog" }, { label: "Calculation methodology", href: "/calculation-methodology" }, { label: "Mobile app", href: "/app" }, { label: "Help centre", href: "/help" }] },
      { title: "CarbonCAM", links: [{ label: "About", href: "/about" }, { label: "Editorial standards", href: "/editorial-policy" }, { label: "Contact", href: "/contact" }, { label: "Account deletion", href: "/account-deletion" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }, { label: "Cookie policy", href: "/cookies" }] },
    ],
    copyright: "© 2026 CarbonCAM. All rights reserved.",
    support: "Support: carboncamplus@gmail.com",
    consent: "Cookie preferences",
  },
} as const;

export default function MarketingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const copy = copyByLocale[locale === "tr" ? "tr" : "en"];
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className={styles.shell}>
      <AdSenseScript />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link aria-label="CarbonCAM" className={styles.brand} href="/">
            <BrandLogo className={styles.brandMark} priority size={52} />
            <span>
              <span className={styles.brandName}>Carbon<span>CAM</span><sup>PLUS</sup></span>
              <span className={styles.brandTagline}>{copy.tagline}</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className={styles.nav}>
            {copy.nav.map((item) => (
              <Link className={`${styles.navLink} ${active(item.href) ? styles.navLinkActive : ""}`} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher />
            <Link className={styles.appButton} href="/app">{copy.appCta}</Link>
            <button aria-expanded={mobileMenuOpen} aria-label={copy.menu} className={styles.menuButton} onClick={() => setMobileMenuOpen((open) => !open)} type="button">
              <span className={styles.menuIcon} />
            </button>
          </div>
        </div>

        <nav aria-label="Mobile navigation" className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
          {copy.nav.map((item) => (
            <Link className={`${styles.navLink} ${active(item.href) ? styles.navLinkActive : ""}`} href={item.href} key={item.href} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.footerBrand}>
                <BrandLogo size={52} />
                <span className={styles.footerBrandName}>Carbon<span>CAM</span><sup>PLUS</sup></span>
              </div>
              <p className={styles.footerDescription}>{copy.description}</p>
            </div>
            {copy.columns.map((column) => (
              <div key={column.title}>
                <h2 className={styles.footerHeading}>{column.title}</h2>
                <ul className={styles.footerLinks}>
                  {column.links.map((link) => <li key={link.href}><Link className={styles.footerLink} href={link.href}>{link.label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.footerBottom}>
            <span>{copy.copyright}</span>
            <button className={styles.consentButton} onClick={() => window.dispatchEvent(new Event("carboncam:open-consent"))} type="button">{copy.consent}</button>
            <span>{copy.support}</span>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
