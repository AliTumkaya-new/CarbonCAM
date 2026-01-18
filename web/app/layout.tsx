import { deDE, enUS, trTR } from "@clerk/localizations";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import "driver.js/dist/driver.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter, Maven_Pro } from "next/font/google";
import { CrispChatWithClerk } from "./crisp-chat";
import "./globals.css";
import SentryUserContext from "./sentry-user-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mavenPro = Maven_Pro({
  variable: "--font-maven",
  subsets: ["latin"],
  weight: ["900"],
});

export const metadata: Metadata = {
  title: {
    default: "CarbonCAM - Üretim Karbon Ayak İzi Hesaplayıcı",
    template: "%s | CarbonCAM",
  },
  description:
    "CNC ve imalat süreçlerinizin karbon ayak izini hesaplayın. ISO 14067 uyumlu raporlama, detaylı analitik ve sürdürülebilir üretim için profesyonel çözüm.",
  keywords: [
    "karbon ayak izi",
    "carbon footprint",
    "CNC",
    "imalat",
    "manufacturing",
    "sürdürülebilirlik",
    "ISO 14067",
    "emisyon hesaplama",
    "çevresel etki",
  ],
  authors: [{ name: "CarbonCAM" }],
  creator: "CarbonCAM",
  publisher: "CarbonCAM",
  metadataBase: new URL("https://carboncam.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://carboncam.com.tr",
    siteName: "CarbonCAM",
    title: "CarbonCAM - Üretim Karbon Ayak İzi Hesaplayıcı",
    description:
      "CNC ve imalat süreçlerinizin karbon ayak izini hesaplayın. ISO 14067 uyumlu raporlama ve sürdürülebilir üretim için profesyonel çözüm.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CarbonCAM - Üretim Karbon Ayak İzi Hesaplayıcı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CarbonCAM - Üretim Karbon Ayak İzi Hesaplayıcı",
    description:
      "CNC ve imalat süreçlerinizin karbon ayak izini hesaplayın. ISO 14067 uyumlu raporlama.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const clerkLocalization = locale === "de" ? deDE : locale === "en" ? enUS : trTR;

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${mavenPro.variable} font-sans antialiased overflow-x-hidden`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClerkProvider
            localization={clerkLocalization}
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            signInFallbackRedirectUrl="/dashboard"
            signUpFallbackRedirectUrl="/dashboard"
          >
            <SentryUserContext />
            <SignedIn>
              <CrispChatWithClerk websiteId={process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID} />
            </SignedIn>
            {children}
          </ClerkProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
