import { AUTH_PAGE_CENTER_WRAPPER_CLASS } from "../constants";

import { ResetPasswordForm } from "./components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className={AUTH_PAGE_CENTER_WRAPPER_CLASS}>
      <ResetPasswordForm />
    </div>
  );
}
