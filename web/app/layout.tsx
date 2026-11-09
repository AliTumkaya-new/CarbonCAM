import { enUS, trTR } from "@clerk/localizations";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import "driver.js/dist/driver.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter, Oxanium } from "next/font/google";
import CrispChat, { CrispChatWithClerk } from "./crisp-chat";
import "./globals.css";
import SentryUserContext from "./sentry-user-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const adsenseClientId = "ca-pub-4762071706286282";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const turkish = locale === "tr";
  const title = turkish
    ? "CarbonCam — Karbon Ayak İzi Bilgi Platformu"
    : "CarbonCam — Carbon Footprint Knowledge Platform";
  const description = turkish
    ? "Karbon emisyonlarını anlamak, enerji tüketimini hesaplamak ve daha sürdürülebilir seçimler yapmak için güvenilir rehberler."
    : "Reliable guides for understanding carbon emissions, estimating energy use, and making more sustainable choices.";

  return {
    metadataBase: new URL("https://carboncam.com.tr"),
    applicationName: "CarbonCAM",
    title: { default: title, template: "%s | CarbonCam" },
    description,
    keywords: turkish
      ? ["karbon ayak izi", "karbon emisyonu", "CO2 hesaplama", "sürdürülebilirlik", "CarbonCam"]
      : ["carbon footprint", "carbon emissions", "CO2 calculator", "sustainability", "CarbonCam"],
    authors: [{ name: "CarbonCam" }],
    creator: "CarbonCam",
    openGraph: {
      type: "website",
      locale: turkish ? "tr_TR" : "en_US",
      siteName: "CarbonCam",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    icons: {
      icon: "/carboncam-logo.png",
      shortcut: "/carboncam-logo.png",
      apple: "/carboncam-logo.png",
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkEnabled =
    typeof publishableKey === "string" &&
    publishableKey.startsWith("pk_") &&
    publishableKey.length >= 20 &&
    !publishableKey.includes("XXXX") &&
    !publishableKey.includes("xxxxxxxx");
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "CarbonCAM",
      url: "https://carboncam.com.tr",
      logo: "https://carboncam.com.tr/carboncam-logo.png",
      email: "carboncamplus@gmail.com",
      publishingPrinciples: "https://carboncam.com.tr/editorial-policy",
      knowsAbout: ["appliance energy use", "carbon calculations", "energy efficiency"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "CarbonCAM",
      url: "https://carboncam.com.tr",
      inLanguage: ["tr-TR", "en-US"],
      publisher: { "@type": "Organization", name: "CarbonCAM" },
    },
  ];

  return (
    <html lang={locale}>
      <head>
        <meta name="google-adsense-account" content={adsenseClientId} />
        {/* AdSense script is loaded only in (marketing) layout to avoid ads on auth/dashboard pages */}
      </head>
      <body className={`${inter.variable} ${oxanium.variable} font-sans antialiased overflow-x-hidden`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {clerkEnabled ? (
            <ClerkProvider
              publishableKey={publishableKey}
              localization={locale === "tr" ? trTR : enUS}
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
          ) : (
            <>
              {/* Development mode: No Clerk, no Sentry user context */}
              <CrispChat />
              {children}
            </>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
