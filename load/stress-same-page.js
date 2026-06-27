import http from "k6/http";
import { check, sleep } from "k6";

import {
  BASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  functionsUrl,
} from "./lib/config.js";

/**
 * Stress test for many concurrent visitors on the same page + profile API.
 *
 * Run against staging — not localhost — for 25k–50k VUs:
 *   BASE_URL=https://staging.example.com \
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_ANON_KEY=... \
 *   k6 run load/stress-same-page.js
 */
const targetVus = Number(__ENV.STRESS_TARGET_VUS || 25000);

export const options = {
  stages: [
    { duration: "5m", target: Math.floor(targetVus * 0.5) },
    { duration: "10m", target: targetVus },
    { duration: "5m", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.1"],
    http_req_duration: ["p(95)<5000"],
  },
};

let cachedToken = null;

function getAccessToken() {
  if (cachedToken) return cachedToken;
  if (!SUPABASE_ANON_KEY) return null;

  const login = http.post(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    JSON.stringify({
      email: __ENV.LOAD_TEST_EMAIL || "member@local.test",
      password: __ENV.LOAD_TEST_PASSWORD || "password123",
    }),
    {
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
      },
    },
  );

  if (login.status !== 200) return null;
  cachedToken = login.json("access_token");
  return cachedToken;
}

export default function stressSamePage() {
  const dashboard = http.get(`${BASE_URL}/dashboard`);
  check(dashboard, {
    "dashboard responds": (res) => res.status === 200 || res.status === 307,
  });

  const token = getAccessToken();
  if (token && SUPABASE_ANON_KEY) {
    const profile = http.get(functionsUrl("get-profile"), {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token}`,
      },
    });
    check(profile, {
      "get-profile responds": (res) => res.status === 200,
    });
  }

  sleep(0.5);
}
