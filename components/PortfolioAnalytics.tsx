"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { useEffect } from "react";
import { prepareAnalyticsUrl } from "@/lib/analytics-preferences";

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  const url = prepareAnalyticsUrl(event.url);
  return url ? { ...event, url } : null;
}

export function PortfolioAnalytics({ enabled }: { enabled: boolean }) {
  useEffect(() => { prepareAnalyticsUrl(window.location.href); }, []);
  return enabled ? <Analytics mode="production" debug={false} beforeSend={beforeSend} /> : null;
}
