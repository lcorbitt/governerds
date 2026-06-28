import { Suspense } from "react";

import {
  ACCEPT_INVITE_PAGE_CHECKING_FALLBACK,
  ACCEPT_INVITE_PAGE_FALLBACK_MESSAGE_CLASS,
  ACCEPT_INVITE_PAGE_FALLBACK_WRAPPER_CLASS,
} from "./constants";
import { AcceptInvite } from "./components/AcceptInvite";

/**
 * Community invitation acceptance page. Works for signed-in and guest users.
 */
export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className={ACCEPT_INVITE_PAGE_FALLBACK_WRAPPER_CLASS}>
          <p className={ACCEPT_INVITE_PAGE_FALLBACK_MESSAGE_CLASS}>
            {ACCEPT_INVITE_PAGE_CHECKING_FALLBACK}
          </p>
        </div>
      }
    >
      <AcceptInvite />
    </Suspense>
  );
}
