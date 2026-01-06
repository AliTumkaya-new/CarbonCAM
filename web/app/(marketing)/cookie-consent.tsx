"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [optionalCookies, setOptionalCookies] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setIsVisible(false);
  };

  const acceptCurrent = () => {
    localStorage.setItem("cookie-consent", optionalCookies ? "all" : "necessary");
    setIsVisible(false);
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
                Manage cookie preferences
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
                Your Privacy Choices
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                You can manage your preferences below. You may revisit this panel at any time to
                update your choices.
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
                  Strictly Necessary
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
                These cookies are essential for the website to function properly.
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
                  Optional Cookies
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
                These cookies help us improve your experience and analyze site usage.
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
              Accept all
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
              Reject all
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
              Accept current selection
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
            We use cookies
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#64748b",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We use cookies to improve your experience, personalize content, target advertising, and
            analyze traffic.
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
            Accept all
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
            Reject all
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
            Manage preferences
          </button>
        </div>
      </div>
    </div>
  );
}
