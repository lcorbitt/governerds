import { redirectIfAuthenticated } from "@/server/loaders/session";
import { sanitizeNextPath } from "@/lib/auth/next-path";

import { SignupForm } from "./components/SignupForm";

interface SignupPageProps {
  searchParams: Promise<{ next?: string }>;
}

/**
 * Signup page. Thin delegate: gate already-signed-in users, then render the
 * colocated form component.
 */
export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { next } = await searchParams;
  const nextPath = sanitizeNextPath(next);
  await redirectIfAuthenticated(nextPath ?? "/dashboard");

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <SignupForm nextPath={nextPath} />
    </div>
  );
}
