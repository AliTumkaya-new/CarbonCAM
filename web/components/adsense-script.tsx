"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const adsenseClientId = "ca-pub-4762071706286282";

export default function AdSenseScript() {
  const pathname = usePathname();
  const [advertisingAllowed, setAdvertisingAllowed] = useState(false);

  useEffect(() => {
    const syncConsent = () => {
      setAdvertisingAllowed(localStorage.getItem("cookie-consent") === "all");
    };

    syncConsent();
    window.addEventListener("carboncam:consent", syncConsent);
    return () => window.removeEventListener("carboncam:consent", syncConsent);
  }, []);

  const isEditorialArticle = /^\/blog\/[^/]+$/.test(pathname);
  if (!advertisingAllowed || !isEditorialArticle) return null;

  return (
    <Script
      async
      crossOrigin="anonymous"
      id="carboncam-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
      strategy="afterInteractive"
    />
  );
}
