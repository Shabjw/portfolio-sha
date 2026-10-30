import test from "node:test";
import assert from "node:assert/strict";
import { compareTraffic, checkVisits, sendVisitAlert } from "../scripts/notify-portfolio-visits.mjs";

const config = { projectId: "project", teamId: "team", readToken: "private-read", botToken: "123:private_bot", chatId: "456" };
const previous = { version: 1, projectId: "project", pageviews: 10, visitors: 8 };

test("first run and counter corrections are silent; only new pageviews trigger", () => {
  assert.equal(compareTraffic(null, { pageviews: 50, visitors: 20 }, "project"), 0);
  assert.equal(compareTraffic(previous, { pageviews: 10, visitors: 8 }, "project"), 0);
  assert.equal(compareTraffic(previous, { pageviews: 13, visitors: 8 }, "project"), 3);
  assert.equal(compareTraffic(previous, { pageviews: 8, visitors: 5 }, "project"), 0);
  assert.throws(() => compareTraffic(previous, { pageviews: -1, visitors: 1 }, "project"));
  assert.throws(() => compareTraffic(previous, { pageviews: 12, visitors: 9 }, "other-project"));
});

test("counts request uses production lifetime count and only the main page", async () => {
  let saved;
  const result = await checkVisits(config, null, {
    fetcher: async (url, options) => {
      assert.equal(url.origin, "https://api.vercel.com");
      assert.equal(url.searchParams.get("filter"), "requestPath eq '/'");
      assert.equal(url.searchParams.get("projectId"), "project");
      assert.equal(url.searchParams.get("teamId"), "team");
      assert.equal(options.headers.Authorization, "Bearer private-read");
      return Response.json({ data: { pageviews: 10, visitors: 8 } });
    },
    save: async state => { saved = state; }
  });
  assert.equal(result.initialized, true);
  assert.equal(result.notified, false);
  assert.equal(saved.pageviews, 10);
});

test("new views send a single anonymous alert before saving; repeat check is silent", async () => {
  const order = [];
  let saved;
  const fetcher = async (url, options) => {
    if (String(url).startsWith("https://api.vercel.com/")) return Response.json({ data: { pageviews: 12, visitors: 9 } });
    const body = JSON.parse(options.body);
    assert.equal(body.chat_id, "456");
    assert.match(body.text, /verification : 2/);
    assert.ok(!body.text.includes(config.readToken));
    order.push("sent");
    return Response.json({ ok: true });
  };
  const save = async state => { order.push("saved"); saved = state; };
  assert.equal((await checkVisits(config, previous, { fetcher, save })).notified, true);
  assert.deepEqual(order, ["sent", "saved"]);
  assert.equal((await checkVisits(config, saved, { fetcher, save })).notified, false);
  assert.deepEqual(order, ["sent", "saved", "saved"]);
});

test("failed analytics or Telegram requests never advance the baseline or leak URLs", async () => {
  const save = async () => assert.fail("Must not save after failed delivery");
  await assert.rejects(checkVisits(config, previous, { save, fetcher: async () => new Response(null, { status: 403 }) }), /403/);
  await assert.rejects(checkVisits(config, previous, { save, fetcher: async () => Response.json({ data: { pageviews: "12", visitors: 9 } }) }), /Invalid analytics/);
  await assert.rejects(checkVisits(config, previous, {
    save,
    fetcher: async url => String(url).startsWith("https://api.vercel.com/")
      ? Response.json({ data: { pageviews: 12, visitors: 9 } })
      : Response.json({ ok: false })
  }), /did not confirm/);
  await assert.rejects(sendVisitAlert(config, 1, async () => { throw new Error("URL with private token"); }), { message: "Telegram service unreachable." });
});
