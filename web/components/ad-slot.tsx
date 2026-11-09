"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

interface AdSlotProps {
  className?: string;
  style?: React.CSSProperties;
  format?: "horizontal" | "rectangle" | "vertical";
}

const adsenseClientId = "ca-pub-4762071706286282";

export default function AdSlot({ className, style, format = "horizontal" }: AdSlotProps) {
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
  const turkish = useLocale() === "tr";

  useEffect(() => {
    if (!slotId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and delayed scripts must not break page rendering.
    }
  }, [slotId]);

  if (!slotId) return null;

  const minHeight = format === "vertical" ? "600px" : format === "rectangle" ? "250px" : "120px";

  return (
    <aside aria-label={turkish ? "Reklam" : "Advertisement"} className={className} style={{ width: "100%", ...style }}>
      <p style={{ color: "#94a3b8", fontSize: "10px", letterSpacing: ".1em", marginBottom: "8px", textAlign: "center", textTransform: "uppercase" }}>
        {turkish ? "Reklam" : "Advertisement"}
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight, width: "100%" }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
