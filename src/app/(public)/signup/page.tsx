import { redirectIfAuthenticated } from "@/server/loaders/session";

import { SignupForm } from "./components/SignupForm";

/**
 * Signup page. Thin delegate: gate already-signed-in users, then render the
 * colocated form component.
 */
export default async function SignupPage() {
  await redirectIfAuthenticated();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <SignupForm />
    </div>
  );
}
