"use client";

import { useEffect, useState } from "react";
import BatchUploader from "./batch-uploader";
import DashboardTour from "./dashboard-tour";
import DeveloperTab from "./developer-tab";
import PhotoCalculator from "./photo-calculator";
import QuickCalculator from "./quick-calculator";

type TabKey = "photo" | "advanced" | "developer";

function TabIcon({ tab }: { tab: TabKey }) {
  if (tab === "photo") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M8.5 5.5 10 3.5h4l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2h3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="12" cy="12.5" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (tab === "advanced") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2M8 18h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="m8 9-3 3 3 3m8-6 3 3-3 3m-2.5-9-3 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TABS: Array<{ key: TabKey; label: string; description: string }> = [
  { key: "photo", label: "Fotoğrafla Hesapla", description: "Hızlı ve kolay" },
  { key: "advanced", label: "Gelişmiş Hesaplama", description: "CNC parametreleri" },
  { key: "developer", label: "Geliştirici", description: "API erişimi" },
];

export default function DashboardTabs() {
  const [tab, setTab] = useState<TabKey>("photo");
  const [creditsLeft, setCreditsLeft] = useState<number | null>(null);

  useEffect(() => {
    function readCredits() {
      try {
        const raw = localStorage.getItem("carboncam_credits_left");
        if (!raw) return setCreditsLeft(null);
        const value = Number(raw);
        setCreditsLeft(Number.isFinite(value) ? value : null);
      } catch {
        setCreditsLeft(null);
      }
    }

    readCredits();
    window.addEventListener("storage", readCredits);
    window.addEventListener("carboncam:credits-updated", readCredits);
    return () => {
      window.removeEventListener("storage", readCredits);
      window.removeEventListener("carboncam:credits-updated", readCredits);
    };
  }, []);

  return (
    <div className="space-y-7">
      <DashboardTour enabled={tab === "advanced"} />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            CARBONCAM
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Karbon hesabını başlat</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Bir fotoğraf yükleyin ve çalışma saatlerini seçin. Nesne tanıma ve tüketim tahminini CarbonCAM tamamlasın.
          </p>
        </div>

        <div data-tour="balance" className="flex min-w-40 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8c1.1 0 2.1.4 2.6 1M12 8V7m0 1v8m0 0v1m0-1c-1.1 0-2.1-.4-2.6-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Kalan analiz hakkı</p>
            <p className="mt-0.5 text-base font-black text-slate-950">{creditsLeft === null ? "—" : `${creditsLeft} hak`}</p>
          </div>
        </div>
      </header>

      <nav aria-label="Hesaplama türleri" className="grid gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:grid-cols-3">
        {TABS.map((item) => {
          const active = tab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              aria-pressed={active}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left transition ${active ? "bg-slate-950 text-white shadow-md" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${active ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                <TabIcon tab={item.key} />
              </span>
              <span>
                <span className="block text-sm font-bold">{item.label}</span>
                <span className={`mt-0.5 block text-xs ${active ? "text-slate-400" : "text-slate-400"}`}>{item.description}</span>
              </span>
            </button>
          );
        })}
      </nav>

      <div className="animate-fade">
        {tab === "photo" ? <PhotoCalculator /> : null}
        {tab === "advanced" ? (
          <div className="space-y-10">
            <QuickCalculator />
            <BatchUploader />
          </div>
        ) : null}
        {tab === "developer" ? <DeveloperTab /> : null}
      </div>
    </div>
  );
}
