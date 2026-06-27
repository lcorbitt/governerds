import Link from "next/link";

import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center px-4">
      <ErrorState
        title="We couldn't find that page"
        description="The link may be outdated, or the page may have moved. You can head back to a familiar place."
        homeHref="/"
        homeLabel="Go to home"
      >
        <Button asChild variant="secondary">
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </ErrorState>
    </div>
  );
}
