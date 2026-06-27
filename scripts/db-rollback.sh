#!/usr/bin/env bash
# Apply rollback (down) migrations against the local Supabase database.
# Rollback files live in supabase/rollback/ and are NOT run by `supabase db reset`.
#
# Usage:
#   scripts/db-rollback.sh       # roll back the latest migration
#   scripts/db-rollback.sh 3     # roll back the three most recent migrations
#
# Requires a running local stack (`npm run supabase:start`).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ROLLBACK_DIR="${ROOT}/supabase/rollback"
STEPS="${1:-1}"

if ! [[ "$STEPS" =~ ^[0-9]+$ ]] || [[ "$STEPS" -lt 1 ]]; then
  echo "Usage: scripts/db-rollback.sh [steps]" >&2
  exit 1
fi

if [[ ! -d "$ROLLBACK_DIR" ]]; then
  echo "Rollback directory not found: ${ROLLBACK_DIR}" >&2
  exit 1
fi

DB_URL="$(supabase status --output json 2>/dev/null | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(data.get('DB_URL', ''))
" 2>/dev/null || true)"

if [[ -z "$DB_URL" ]]; then
  DB_URL="postgresql://postgres:postgres@127.0.0.1:54522/postgres"
  echo "Could not read DB_URL from supabase status; using default local URL." >&2
fi

ROLLBACK_FILES=()
while IFS= read -r file; do
  ROLLBACK_FILES+=("$file")
done < <(find "$ROLLBACK_DIR" -maxdepth 1 -name '*.sql' -type f | sort -r)

if [[ ${#ROLLBACK_FILES[@]} -eq 0 ]]; then
  echo "No rollback files found in ${ROLLBACK_DIR}" >&2
  exit 1
fi

if [[ "$STEPS" -gt ${#ROLLBACK_FILES[@]} ]]; then
  echo "Requested ${STEPS} rollbacks but only ${#ROLLBACK_FILES[@]} files exist." >&2
  exit 1
fi

echo "Applying ${STEPS} rollback(s) to local database…"

for (( i = 0; i < STEPS; i++ )); do
  FILE="${ROLLBACK_FILES[$i]}"
  BASENAME="$(basename "$FILE")"
  echo "→ ${BASENAME}"
  psql "$DB_URL" -v ON_ERROR_STOP=1 -f "$FILE"
done

echo "Done. ${STEPS} rollback(s) applied."
