# Portfolio page-view analytics

- Vercel Web Analytics is enabled in the application only when `VERCEL_ENV=production`.
- Local development and preview deployments do not collect page views.
- Only anonymous page-view statistics are enabled. The existing custom-event placeholders remain inactive.
- Query strings and fragments are removed from page URLs before sending them.
- `/analytics-preferences` is excluded from tracking and from search indexing.

## Excluding the owner's visits

Open `/analytics-preferences` on the public portfolio and choose **Exclure mes visites**.
Repeat for each browser/device and public hostname. This preference does not transfer from localhost to the public site. Clearing site data or using a new private session resets it.

Alternatively, `/?analytics=off` sets the same preference; `/?analytics=on` restores counting. This is a browser preference, not authentication or IP filtering. If storage is blocked, `?analytics=off` still excludes the current visit but cannot persist it.

## Viewing statistics

Open the portfolio project in Vercel, choose Analytics and the Production environment. Collection starts after deployment; past visits cannot be reconstructed. Content blockers and collection delays can affect what appears in the dashboard.

## Tests

Use Node.js 22.18+ (Node.js 24 recommended):

```sh
npm run test:analytics
npm run lint
npx tsc --noEmit
npm run build
```

Browser tests should mock analytics delivery to avoid adding QA visits to the real data. Production smoke tests should set the exclusion preference before visiting the public page.

Telegram notifications are separate and are not activated by this integration.
