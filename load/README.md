# Load testing

We use [k6](https://k6.io/) for HTTP load tests. Install locally:

```bash
brew install k6
```

## Local smoke test

Validates scripts against your dev stack (50–100 VUs). Requires:

- `npm run dev:local` (or equivalent)
- `npm run db:fresh`
- `SUPABASE_ANON_KEY` in your environment (from `supabase status`)

```bash
export SUPABASE_ANON_KEY="your-local-anon-key"
npm run load:smoke
```

## Staging stress test (25k–50k users)

Do **not** run full stress targets against localhost. Point k6 at staging:

```bash
export BASE_URL="https://your-staging-app.vercel.app"
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_ANON_KEY="your-staging-anon-key"
export STRESS_TARGET_VUS=50000
npm run load:stress
```

## What to watch

- Edge Function rate limits (Upstash) will shape throughput at scale.
- p95/p99 latency and error rate are the primary ship/no-ship signals.
- SSR pages and authenticated Edge Functions are the hot paths under test.
