# Portfolio visit alerts

## Behaviour

`.github/workflows/portfolio-visits.yml` checks the production Vercel lifetime
pageview counter for `/` around every 15 minutes. It does not require the owner's
computer to stay on. GitHub's schedule is best effort, not instant delivery.

The first successful run records counts silently. Later runs send one Telegram
message only when the pageview counter increases. Refreshes can count as views:
these are not identified people or necessarily new recruiters. No IP addresses,
names or individual browsing histories are collected by this notifier.

Owner opt-out remains per browser/device via
`https://portfolio-shana.vercel.app/analytics-preferences`.
No website layout, carousel timing or Vercel paid service is changed. No new
public API route is needed.

## Activation

In `Shabjw/portfolio-sha` on GitHub, open:

Settings > Secrets and variables > Actions > New repository secret

Add three repository secrets, using the values already held locally in ignored
`.env.telegram.local`:

- `ANALYTICS_READ_TOKEN`: the dedicated Vercel access token.
- `TELEGRAM_BOT_TOKEN`: the BotFather token for `@Sha_portfolio_bot`.
- `TELEGRAM_CHAT_ID`: the private recipient chat ID.

Never put values in a commit, issue, chat or workflow file. The private file is
ignored by Git and is not uploaded automatically.

After publishing the workflow to the default branch, open Actions > Portfolio
visit alerts > Run workflow. The initial run should succeed without an alert.
Later increases send real notifications. Missing secrets cause a failed run,
not a fake success. Disable this workflow in Actions to stop notifications.

## State and limitations

Runs are serialized. A GitHub Actions cache holds the last confirmed baseline:
anonymous counters, project ID and timestamp only, never credentials. Repository
readers may be able to access these aggregate counts; the cache is not storage
for private visitor data.

- Cache expiry/eviction silently initializes a new baseline. Some views during
  a reset may not generate alerts; old views are not replayed.
- A reduced counter silently becomes the new baseline.
- Failed delivery does not advance the baseline, allowing retry.
- Delivery is not exactly-once. If Telegram accepts a message but its response
  or the subsequent cache save fails, a later run can repeat that alert.
- Analytics ingestion and API delays can postpone notifications.
- GitHub can delay scheduled runs. Public repositories disable schedules after
  60 days without repository activity; re-enable in Actions.
- Standard GitHub-hosted runners are free for public repositories. Private
  repositories have account-specific allowances; do not enable paid usage.
- No paid custom events, raw data drain or daily Vercel cron is used.

The earlier daily-report route and helper remain unpublished local drafts and
are not used by this workflow.

## Verification

`npm run test:analytics` mocks external services and sends no messages. Tests
cover initial baseline, unchanged/new counts, counter corrections, invalid
payloads, failed delivery, safe errors and owner opt-out.

`node --env-file=.env.telegram.local scripts/notify-portfolio-visits.mjs` is a
real check and can send a message when a local baseline exists and counts rise.
Do not use it as an unnoticed test.

References:

- https://vercel.com/docs/analytics/web-analytics-api
- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows
- https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching
