import test from "node:test";
import assert from "node:assert/strict";
import { ANALYTICS_EXCLUDED_KEY, prepareAnalyticsUrl } from "../lib/analytics-preferences.ts";

test("owner opt-out applies to the first event, persists and can be reversed", () => {
  const values = new Map();
  globalThis.window = {
    location: { href: "https://portfolio.test/?analytics=off" },
    localStorage: { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  };
  try {
    assert.equal(prepareAnalyticsUrl(window.location.href), null);
    assert.equal(values.get(ANALYTICS_EXCLUDED_KEY), "1");
    window.location.href = "https://portfolio.test/";
    assert.equal(prepareAnalyticsUrl(window.location.href), null);
    window.location.href = "https://portfolio.test/?analytics=on";
    assert.equal(prepareAnalyticsUrl(window.location.href), "https://portfolio.test/");
    assert.equal(values.get(ANALYTICS_EXCLUDED_KEY), "0");
    assert.equal(prepareAnalyticsUrl("https://portfolio.test/analytics-preferences"), null);
    assert.equal(prepareAnalyticsUrl("https://portfolio.test/?email=private@example.test#contact"), "https://portfolio.test/");
    assert.equal(prepareAnalyticsUrl("invalid"), null);
  } finally {
    delete globalThis.window;
  }
});

test("blocked browser storage does not crash analytics or defeat the current-page opt-out", () => {
  globalThis.window = {
    location: { href: "https://portfolio.test/?analytics=off" },
    get localStorage() { throw Error("blocked"); }
  };
  try {
    assert.equal(prepareAnalyticsUrl(window.location.href), null);
    window.location.href = "https://portfolio.test/";
    assert.equal(prepareAnalyticsUrl(window.location.href), "https://portfolio.test/");
  } finally {
    delete globalThis.window;
  }
});
