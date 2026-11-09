"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const turkish = useLocale() === "tr";
  const copy = turkish
    ? {
        manage: "Çerez tercihlerini yönet",
        privacy: "Gizlilik tercihleriniz",
        privacyBody: "Tercihlerinizi aşağıdan yönetebilir ve daha sonra değiştirmek için bu paneli yeniden açabilirsiniz.",
        necessary: "Kesinlikle gerekli",
        necessaryBody: "Bu çerezler web sitesinin güvenli ve doğru çalışması için gereklidir.",
        optional: "İsteğe bağlı çerezler",
        optionalBody: "Bu çerezler site kullanımını anlamaya ve deneyimi geliştirmeye yardımcı olur.",
        acceptAll: "Tümünü kabul et",
        rejectAll: "Tümünü reddet",
        acceptCurrent: "Seçimi kaydet",
        bannerTitle: "Çerez kullanıyoruz",
        bannerBody: "Zorunlu çerezleri sitenin çalışması için kullanırız. Analiz ve reklam çerezleri yalnızca onayınızla etkinleşir.",
        preferences: "Tercihleri yönet",
      }
    : {
        manage: "Manage cookie preferences",
        privacy: "Your privacy choices",
        privacyBody: "Manage your preferences below. You can reopen this panel later to change your choices.",
        necessary: "Strictly necessary",
        necessaryBody: "These cookies are essential for the website to work securely and correctly.",
        optional: "Optional cookies",
        optionalBody: "These cookies help us understand site usage and improve your experience.",
        acceptAll: "Accept all",
        rejectAll: "Reject all",
        acceptCurrent: "Save selection",
        bannerTitle: "We use cookies",
        bannerBody: "We use necessary cookies to operate the site. Analytics and advertising cookies are enabled only with your consent.",
        preferences: "Manage preferences",
      };
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [optionalCookies, setOptionalCookies] = useState(false);

  const saveConsent = (value: "all" | "necessary") => {
    localStorage.setItem("cookie-consent", value);
    window.dispatchEvent(new CustomEvent("carboncam:consent", { detail: value }));
    setIsVisible(false);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) setIsVisible(true);
    }, 0);

    const openPreferences = () => {
      setOptionalCookies(localStorage.getItem("cookie-consent") === "all");
      setShowPreferences(true);
      setIsVisible(true);
    };
    window.addEventListener("carboncam:open-consent", openPreferences);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("carboncam:open-consent", openPreferences);
    };
  }, []);

  const acceptAll = () => {
    saveConsent("all");
  };

  const rejectAll = () => {
    saveConsent("necessary");
  };

  const acceptCurrent = () => {
    saveConsent(optionalCookies ? "all" : "necessary");
  };

  if (!isVisible) return null;

  if (showPreferences) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            maxWidth: "700px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
          }}
        >
          <div
            style={{
              padding: "32px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {copy.manage}
              </h2>
              <button
                onClick={() => setShowPreferences(false)}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "#f1f5f9",
                  color: "#64748b",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ padding: "32px" }}>
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#0f172a",
                  marginBottom: "8px",
                }}
              >
                {copy.privacy}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {copy.privacyBody}
              </p>
            </div>

            <div
              style={{
                marginBottom: "16px",
                padding: "20px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  {copy.necessary}
                </h4>
                <div
                  style={{
                    width: "48px",
                    height: "28px",
                    borderRadius: "14px",
                    backgroundColor: "#cbd5e1",
                    position: "relative",
                    cursor: "not-allowed",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "3px",
                      top: "3px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#64748b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {copy.necessaryBody}
              </p>
            </div>

            <div
              style={{
                padding: "20px",
                backgroundColor: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <h4
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#0f172a",
                    margin: 0,
                  }}
                >
                  {copy.optional}
                </h4>
                <button
                  onClick={() => setOptionalCookies(!optionalCookies)}
                  style={{
                    width: "48px",
                    height: "28px",
                    borderRadius: "14px",
                    backgroundColor: optionalCookies ? "#0f172a" : "#e2e8f0",
                    border: "none",
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: optionalCookies ? "23px" : "3px",
                      top: "3px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {!optionalCookies && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#64748b"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748b",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {copy.optionalBody}
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "24px 32px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={acceptAll}
              style={{
                flex: "1",
                minWidth: "140px",
                padding: "12px 24px",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {copy.acceptAll}
            </button>
            <button
              onClick={rejectAll}
              style={{
                flex: "1",
                minWidth: "140px",
                padding: "12px 24px",
                backgroundColor: "#0f172a",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {copy.rejectAll}
            </button>
            <button
              onClick={acceptCurrent}
              style={{
                flex: "1",
                minWidth: "140px",
                padding: "12px 24px",
                backgroundColor: "#f1f5f9",
                color: "#0f172a",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {copy.acceptCurrent}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        right: "24px",
        maxWidth: "900px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        border: "1px solid #e2e8f0",
        padding: "24px",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "8px",
            }}
          >
            {copy.bannerTitle}
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {copy.bannerBody}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={acceptAll}
            style={{
              flex: "1",
              minWidth: "120px",
              padding: "12px 24px",
              backgroundColor: "#0f172a",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {copy.acceptAll}
          </button>
          <button
            onClick={rejectAll}
            style={{
              flex: "1",
              minWidth: "120px",
              padding: "12px 24px",
              backgroundColor: "#0f172a",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {copy.rejectAll}
          </button>
          <button
            onClick={() => setShowPreferences(true)}
            style={{
              flex: "1",
              minWidth: "150px",
              padding: "12px 24px",
              backgroundColor: "#f1f5f9",
              color: "#0f172a",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {copy.preferences}
          </button>
        </div>
      </div>
    </div>
  );
}
