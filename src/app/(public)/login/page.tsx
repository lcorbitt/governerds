import { redirectIfAuthenticated } from "@/server/loaders/session";
import { sanitizeNextPath } from "@/lib/auth/next-path";

import { AUTH_PAGE_CENTER_WRAPPER_CLASS } from "../constants";
import { LoginForm } from "./components/LoginForm";

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

/**
 * Login page. Thin delegate: gate already-signed-in users, then render the
 * colocated form component.
 */
export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const nextPath = sanitizeNextPath(next);
  await redirectIfAuthenticated(nextPath ?? "/dashboard");

  return (
    <div className={AUTH_PAGE_CENTER_WRAPPER_CLASS}>
      <LoginForm nextPath={nextPath} />
    </div>
  );
}
