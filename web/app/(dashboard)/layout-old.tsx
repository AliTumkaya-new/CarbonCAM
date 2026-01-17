"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AnimatedLogo from "../components/animated-logo";
import LanguageSwitcher from "../language-switcher";

function NavLink({
  href,
  active,
  icon,
  children,
  dataTour,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  dataTour?: string;
}) {
  return (
    <Link
      href={href}
      data-tour={dataTour}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 600,
        transition: "all 0.2s",
        textDecoration: "none",
        backgroundColor: active ? "#f8fafc" : "transparent",
        color: active ? "#0f172a" : "#64748b",
        border: active ? "1px solid #e2e8f0" : "1px solid transparent",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "#f8fafc";
          e.currentTarget.style.color = "#0f172a";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#64748b";
        }
      }}
    >
      <span style={{ color: active ? "#10b981" : "#94a3b8", transition: "color 0.2s" }}>
        {icon}
      </span>
      {children}
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkEnabled =
    typeof publishableKey === "string" &&
    publishableKey.startsWith("pk_") &&
    publishableKey.length >= 20 &&
    !publishableKey.includes("XXXX") &&
    !publishableKey.includes("xxxxxxxx");

  const navContent = (
    <>
      <NavLink
        href="/dashboard"
        active={pathname === "/dashboard"}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        href="/library"
        active={pathname.startsWith("/library")}
        dataTour="machines-tab"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        }
      >
        Library
      </NavLink>
      <NavLink
        href="/results"
        active={pathname.startsWith("/results")}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        }
      >
        Results
      </NavLink>
      <NavLink
        href="/settings/team"
        active={pathname.startsWith("/settings")}
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        }
      >
        Settings
      </NavLink>
    </>
  );

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      }}
    >
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar - Shadcn/UI Style */}
        <aside
          style={{
            display: sidebarCollapsed ? "none" : "block",
            width: "280px",
            flexShrink: 0,
            backgroundColor: "#fff",
            borderRight: "1px solid #e2e8f0",
            boxShadow: "4px 0 6px -1px rgba(0, 0, 0, 0.02)",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            {/* Logo */}
            <Link
              href="/dashboard"
              style={{
                height: "72px",
                padding: "0 24px",
                borderBottom: "1px solid #e2e8f0",
                textDecoration: "none",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f8fafc";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <AnimatedLogo size="md" variant="gradient" showSubtitle />
            </Link>

            {/* Navigation */}
            <nav
              style={{
                flex: 1,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {clerkEnabled ? <SignedIn>{navContent}</SignedIn> : navContent}
            </nav>

            {/* Footer */}
            <div style={{ borderTop: "1px solid #e2e8f0", padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#f8fafc",
                  fontSize: "12px",
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {/* Header - Shadcn/UI Style */}
          <header
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid #e2e8f0",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                maxWidth: "1400px",
                margin: "0 auto",
                display: "flex",
                height: "72px",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 32px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a" }}>
                    Industrial Footprint Calculator
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>
                    Energy & CO₂ estimation
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <LanguageSwitcher />

                {clerkEnabled ? (
                  <>
                    <SignedOut>
                      <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
                        <button
                          type="button"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            height: "40px",
                            padding: "0 20px",
                            borderRadius: "10px",
                            backgroundColor: "#0f172a",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#1e293b";
                            e.currentTarget.style.transform = "translateY(-1px)";
                            e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#0f172a";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                          }}
                        >
                          Sign In
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </button>
                      </SignInButton>
                    </SignedOut>

                    <SignedIn>
                      <div
                        style={{
                          padding: "4px",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          backgroundColor: "#fff",
                          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <UserButton />
                      </div>
                    </SignedIn>
                  </>
                ) : (
                  <Link
                    href="/sign-in"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      height: "40px",
                      padding: "0 20px",
                      borderRadius: "10px",
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.3s",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#1e293b";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#0f172a";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    Sign In
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main
            style={{
              maxWidth: "1400px",
              width: "100%",
              margin: "0 auto",
              flex: 1,
              padding: "32px",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
