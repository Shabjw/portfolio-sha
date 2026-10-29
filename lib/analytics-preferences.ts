export const ANALYTICS_EXCLUDED_KEY = "portfolio.analytics.excluded";
export const ANALYTICS_PREFERENCES_PATH = "/analytics-preferences";

export function readAnalyticsExclusion(): boolean {
  try {
    return window.localStorage.getItem(ANALYTICS_EXCLUDED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAnalyticsExclusion(excluded: boolean): boolean {
  try {
    window.localStorage.setItem(ANALYTICS_EXCLUDED_KEY, excluded ? "1" : "0");
    return true;
  } catch {
    return false;
  }
}

export function prepareAnalyticsUrl(eventUrl: string): string | null {
  try {
    const url = new URL(eventUrl);
    const preference = new URL(window.location.href).searchParams.get("analytics");
    const excluded = preference === "off" || (preference !== "on" && readAnalyticsExclusion());
    if (preference === "off" || preference === "on") setAnalyticsExclusion(preference === "off");
    if (excluded || url.pathname === ANALYTICS_PREFERENCES_PATH) return null;
    // The portfolio needs page counts, not visitors' query strings or fragments.
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}
