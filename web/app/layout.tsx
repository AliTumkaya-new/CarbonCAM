import { trTR } from "@clerk/localizations";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import "driver.js/dist/driver.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import CrispChat, { CrispChatWithClerk } from "./crisp-chat";
import "./globals.css";
import SentryUserContext from "./sentry-user-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const adsenseClientId = "ca-pub-4762071706286282";

export const metadata: Metadata = {
  title: {
    default: "CarbonCam — Karbon Ayak İzi Takip Platformu",
    template: "%s | CarbonCam",
  },
  description: "Karbon ayak izinizi takip edin, çevresel etkinizi ölçün. CarbonCam ile enerji tüketimi, ulaşım ve beslenme kaynaklı emisyonlarınızı analiz edin.",
  keywords: ["karbon ayak izi", "karbon emisyonu", "CO2 hesaplama", "karbon ayak izi hesaplama", "sürdürülebilirlik", "iklim değişikliği", "CarbonCam"],
  authors: [{ name: "CarbonCam" }],
  creator: "CarbonCam",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "CarbonCam",
    title: "CarbonCam — Karbon Ayak İzi Takip Platformu",
    description: "Karbon ayak izinizi takip edin, çevresel etkinizi ölçün. CarbonCam ile emisyonlarınızı analiz edin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarbonCam — Karbon Ayak İzi Takip Platformu",
    description: "Karbon ayak izinizi takip edin, çevresel etkinizi ölçün.",
  },
  icons: {
    icon: "/logo-mark.svg",
    shortcut: "/logo-mark.svg",
    apple: "/logo-mark.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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

  return (
    <html lang={locale}>
      <head>
        <meta name="google-adsense-account" content={adsenseClientId} />
        {/* AdSense script is loaded only in (marketing) layout to avoid ads on auth/dashboard pages */}
      </head>
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {clerkEnabled ? (
            <ClerkProvider
              publishableKey={publishableKey}
              localization={trTR}
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
