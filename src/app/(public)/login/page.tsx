import { redirectIfAuthenticated } from "@/server/loaders/session";
import { sanitizeNextPath } from "@/lib/auth/next-path";

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
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <LoginForm nextPath={nextPath} />
    </div>
  );
}
