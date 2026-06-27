import http from "k6/http";
import { check, sleep } from "k6";

import {
  BASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  functionsUrl,
} from "./lib/config.js";

export const options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 100 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<2000"],
  },
};

export default function smoke() {
  const health = http.get(functionsUrl("get-health"));
  check(health, {
    "health status is 200": (res) => res.status === 200,
  });

  const landing = http.get(`${BASE_URL}/`);
  check(landing, {
    "landing status is 200": (res) => res.status === 200,
  });

  if (SUPABASE_ANON_KEY) {
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

    check(login, {
      "login succeeds": (res) => res.status === 200,
    });

    if (login.status === 200) {
      const body = login.json();
      const token = body.access_token;
      const profile = http.get(functionsUrl("get-profile"), {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      check(profile, {
        "get-profile status is 200": (res) => res.status === 200,
      });
    }
  }

  sleep(1);
}
