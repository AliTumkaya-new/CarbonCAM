export const routing = {
  locales: ["en", "tr"] as const,
  defaultLocale: "tr" as const,
};

export type AppLocale = (typeof routing.locales)[number];
