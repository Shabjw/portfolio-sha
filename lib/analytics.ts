export type AnalyticsEvent =
  | "cv_download_click"
  | "email_copy_click"
  | "linkedin_click"
  | "project_note_open"
  | "command_palette_open";

export function trackEvent(event: AnalyticsEvent, label?: string) {
  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics-ready] ${event}`, label ?? "");
  }
}
