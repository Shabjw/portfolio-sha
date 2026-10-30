import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

function validCounts(value) {
  return value && [value.pageviews, value.visitors].every(count => Number.isSafeInteger(count) && count >= 0);
}

export function compareTraffic(previous, current, projectId) {
  if (!validCounts(current)) throw new Error("Invalid analytics response.");
  if (previous !== null && (previous.version !== 1 || previous.projectId !== projectId || !validCounts(previous))) {
    throw new Error("Invalid saved baseline. No message sent.");
  }
  // A missing baseline or a corrected counter must not generate historical alerts.
  if (!previous || current.pageviews < previous.pageviews) return 0;
  return current.pageviews - previous.pageviews;
}

export async function readTraffic(config, fetcher = fetch) {
  const url = new URL("https://api.vercel.com/v1/query/web-analytics/visits/count");
  url.searchParams.set("projectId", config.projectId);
  url.searchParams.set("teamId", config.teamId);
  url.searchParams.set("filter", "requestPath eq '/'");
  let response;
  try {
    response = await fetcher(url, {
      headers: { Authorization: `Bearer ${config.readToken}` },
      signal: AbortSignal.timeout(15000)
    });
  } catch { throw new Error("Analytics service unreachable."); }
  if (!response.ok) throw new Error(`Analytics service returned ${response.status}.`);
  let body;
  try { body = await response.json(); } catch { throw new Error("Invalid analytics response."); }
  if (!validCounts(body?.data)) throw new Error("Invalid analytics response.");
  return { pageviews: body.data.pageviews, visitors: body.data.visitors };
}

export async function sendVisitAlert(config, count, fetcher = fetch) {
  if (!Number.isSafeInteger(count) || count < 1) throw new Error("Invalid alert count.");
  if (!/^\d+:[A-Za-z0-9_-]+$/.test(config.botToken) || !/^-?\d+$/.test(config.chatId)) {
    throw new Error("Invalid Telegram configuration.");
  }
  let response;
  try {
    response = await fetcher(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.chatId,
        text: [
          "Du nouveau sur ton portfolio !",
          "",
          `Nouvelles vues depuis la derniere verification : ${count}`,
          "",
          "Ces vues ne correspondent pas forcement a des personnes differentes.",
          "Statistiques anonymes, sans identite ni adresse IP.",
          "https://vercel.com/sha-b/portfolio-sha/analytics"
        ].join("\n"),
        link_preview_options: { is_disabled: true }
      }),
      signal: AbortSignal.timeout(15000)
    });
  } catch {
    // Fetch errors can contain a URL with the private bot token.
    throw new Error("Telegram service unreachable.");
  }
  if (!response.ok) throw new Error(`Telegram service returned ${response.status}.`);
  let body;
  try { body = await response.json(); } catch { throw new Error("Invalid Telegram response."); }
  if (body?.ok !== true) throw new Error("Telegram did not confirm delivery.");
}

export async function checkVisits(config, previous, { fetcher = fetch, save, now = new Date() }) {
  const current = await readTraffic(config, fetcher);
  const increase = compareTraffic(previous, current, config.projectId);
  if (increase > 0) await sendVisitAlert(config, increase, fetcher);
  // Only advance the baseline once Telegram has confirmed any required delivery.
  await save({ version: 1, projectId: config.projectId, ...current, checkedAt: now.toISOString() });
  return { initialized: previous === null, notified: increase > 0, newPageviews: increase };
}

async function main() {
  const config = {
    readToken: process.env.ANALYTICS_READ_TOKEN?.trim(),
    botToken: process.env.TELEGRAM_BOT_TOKEN?.trim(),
    chatId: process.env.TELEGRAM_CHAT_ID?.trim(),
    projectId: "prj_mpF3KKsupFgoDT4ZGRsWhmfg2juS",
    teamId: "team_ZMjLRRppsNWSfQ1M95IWk420"
  };
  if (!config.readToken || !config.botToken || !config.chatId) {
    throw new Error("Add ANALYTICS_READ_TOKEN, TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as GitHub Actions secrets.");
  }
  const path = resolve(".traffic-state/baseline.json");
  let previous = null;
  try { previous = JSON.parse(await readFile(path, "utf8")); }
  catch (error) { if (error.code !== "ENOENT") throw new Error("Cannot read saved baseline. No message sent."); }
  const result = await checkVisits(config, previous, {
    save: async state => {
      await mkdir(dirname(path), { recursive: true });
      await writeFile(`${path}.tmp`, JSON.stringify(state), { mode: 0o600 });
      await rename(`${path}.tmp`, path);
    }
  });
  console.log(JSON.stringify(result));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
