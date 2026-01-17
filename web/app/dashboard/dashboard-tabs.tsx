"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import BatchUploader from "./batch-uploader";
import DashboardTour from "./dashboard-tour";
import DeveloperTab from "./developer-tab";
import QuickCalculator from "./quick-calculator";

type TabKey = "calc" | "developer";

export default function DashboardTabs() {
  const t = useTranslations();
  const [tab, setTab] = useState<TabKey>("calc");
  const [creditsLeft, setCreditsLeft] = useState<number | null>(null);

  useEffect(() => {
    function readCredits() {
      try {
        const raw = localStorage.getItem("carboncam_credits_left");
        if (!raw) return setCreditsLeft(null);
        const n = Number(raw);
        setCreditsLeft(Number.isFinite(n) ? n : null);
      } catch {
        setCreditsLeft(null);
      }
    }

    readCredits();
    window.addEventListener("storage", readCredits);
    return () => window.removeEventListener("storage", readCredits);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <DashboardTour enabled={tab === "calc"} />

      {/* Header with Gradient */}
      <div
        className="glass-card"
        style={{
          padding: "48px 40px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.05) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.1)",
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <h1
          className="gradient-text"
          style={{
            fontSize: "48px",
            fontWeight: 900,
            marginBottom: "12px",
            letterSpacing: "-0.03em",
          }}
        >
          Dashboard
        </h1>
        <p style={{ fontSize: "16px", color: "#64748b", fontWeight: 500 }}>
          Karbon ayak izi hesaplama ve yönetim merkezi
        </p>
      </div>

      {/* Tabs & Balance - Modern Glassmorphism */}
      <div
        className="glass-card card-hover"
        style={{
          animation: "fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          padding: "24px",
          borderRadius: "20px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setTab("calc")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              backgroundColor: tab === "calc" ? "#10b981" : "transparent",
              color: tab === "calc" ? "#fff" : "#64748b",
              boxShadow: tab === "calc" ? "0 4px 6px -1px rgba(16, 185, 129, 0.3)" : "none",
            }}
            onMouseEnter={(e) => {
              if (tab !== "calc") {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.color = "#0f172a";
              } else {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(16, 185, 129, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (tab !== "calc") {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#64748b";
              } else {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(16, 185, 129, 0.3)";
              }
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            {t("dashboard.tabs.dashboard")}
          </button>
          <button
            type="button"
            onClick={() => setTab("developer")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              backgroundColor: tab === "developer" ? "#10b981" : "transparent",
              color: tab === "developer" ? "#fff" : "#64748b",
              boxShadow: tab === "developer" ? "0 4px 6px -1px rgba(16, 185, 129, 0.3)" : "none",
            }}
            onMouseEnter={(e) => {
              if (tab !== "developer") {
                e.currentTarget.style.backgroundColor = "#f8fafc";
                e.currentTarget.style.color = "#0f172a";
              } else {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(16, 185, 129, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (tab !== "developer") {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#64748b";
              } else {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(16, 185, 129, 0.3)";
              }
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            {t("dashboard.tabs.developer")}
          </button>
        </div>

        <div
          data-tour="balance"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            background: "linear-gradient(135deg, #f8fafc 0%, #fff 100%)",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
              color: "#059669",
              boxShadow: "0 2px 4px 0 rgba(16, 185, 129, 0.1)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#64748b" }}>
              {t("dashboard.balance.label")}
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
              {creditsLeft === null
                ? t("dashboard.balance.empty")
                : `${creditsLeft} ${t("dashboard.balance.unit")}`}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          animation: "fadeIn 0.6s ease-out",
          animationDelay: "0.3s",
          animationFillMode: "backwards",
        }}
      >
        {tab === "developer" ? (
          <DeveloperTab />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <QuickCalculator />
            <BatchUploader />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
