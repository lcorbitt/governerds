import { Suspense } from "react";

import { AcceptInvite } from "./components/AcceptInvite";

/**
 * Community invitation acceptance page. Works for signed-in and guest users.
 */
export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-12">
          <p className="text-muted-foreground text-center text-lg">
            Checking your invitation…
          </p>
        </div>
      }
    >
      <AcceptInvite />
    </Suspense>
  );
}
