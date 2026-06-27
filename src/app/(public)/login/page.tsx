import { redirectIfAuthenticated } from "@/server/loaders/session";

import { LoginForm } from "./components/LoginForm";

/**
 * Login page. Thin delegate: gate already-signed-in users, then render the
 * colocated form component.
 */
export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <LoginForm />
    </div>
  );
}
