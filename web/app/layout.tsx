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

export const metadata: Metadata = {
  title: "CarbonCAM",
  description: "Industrial Footprint Calculator",
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
      <body className={`${inter.variable} font-sans antialiased overflow-x-hidden`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {clerkEnabled ? (
            <ClerkProvider publishableKey={publishableKey}>
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

