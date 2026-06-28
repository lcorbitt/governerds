import { AUTH_PAGE_CENTER_WRAPPER_CLASS } from "../constants";

import { ForgotPasswordForm } from "./components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className={AUTH_PAGE_CENTER_WRAPPER_CLASS}>
      <ForgotPasswordForm />
    </div>
  );
}
