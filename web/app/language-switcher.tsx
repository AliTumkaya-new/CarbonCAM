"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./language-switcher.module.css";

type Locale = "tr" | "en";

function setLocaleCookie(locale: Locale) {
  document.cookie = `NEXT_LOCALE=${locale}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export default function LanguageSwitcher() {
  const locale = useLocale() === "tr" ? "tr" : "en";
  const router = useRouter();
  const [selected, setSelected] = useState<Locale>(locale);

  const selectLocale = (nextLocale: Locale) => {
    if (nextLocale === selected) return;
    setSelected(nextLocale);
    setLocaleCookie(nextLocale);
    router.refresh();
  };

  return (
    <div aria-label={selected === "tr" ? "Dil seçimi" : "Language selection"} className={styles.switcher} role="group">
      {(["tr", "en"] as const).map((item) => (
        <button aria-pressed={selected === item} className={`${styles.option} ${selected === item ? styles.active : ""}`} key={item} onClick={() => selectLocale(item)} type="button">
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
