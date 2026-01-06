export const routing = {
  locales: ["tr", "en", "de"] as const,
  defaultLocale: "tr" as const,
};

export type AppLocale = (typeof routing.locales)[number];
