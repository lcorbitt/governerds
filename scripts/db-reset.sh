#!/usr/bin/env bash
# Reset the local database: drop, re-run all migrations, then apply seed.sql.
# Requires the Supabase CLI and a running local stack (`npm run supabase:start`).
set -euo pipefail

echo "Resetting local database (migrations + seed)…"
supabase db reset
echo ""
echo "Done. Local test users (password for all: password123):"
echo "  member@local.test   — member"
echo "  admin@local.test    — member, admin"
echo "  lukas@local.test    — member, super_admin"
echo "  sharon@local.test   — member, super_admin"
