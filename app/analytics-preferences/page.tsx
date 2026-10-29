import type { Metadata } from "next";
import { AnalyticsPreferences } from "@/components/AnalyticsPreferences";

export const metadata: Metadata = {
  title: "Statistiques : mes visites | Shana Bhojwani",
  robots: { index: false, follow: false }
};

export default function AnalyticsPreferencesPage() {
  return <AnalyticsPreferences />;
}
