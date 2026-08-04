"use client";

import { createContext, useContext } from "react";
import type { ContactInfo } from "@/lib/cms";

/** Fetched once in the root layout (a Server Component) and handed down via
 *  context, since the office/hotline/email/socials info is read from
 *  several client components across every page (Header, Footer, Hero,
 *  PreFooter, /lien-he) — fetching it per-page would mean threading it
 *  through five separate page trees for no benefit. */
const SiteSettingsContext = createContext<ContactInfo | null>(null);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: ContactInfo;
  children: React.ReactNode;
}) {
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): ContactInfo {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return ctx;
}
