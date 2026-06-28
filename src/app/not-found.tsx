import Link from "next/link";

import { NOT_FOUND_COPY } from "@/app/constants";
import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center px-4">
      <ErrorState
        title={NOT_FOUND_COPY.title}
        description={NOT_FOUND_COPY.description}
        homeHref="/"
        homeLabel={NOT_FOUND_COPY.goToHome}
      >
        <Button asChild variant="secondary">
          <Link href="/dashboard">{NOT_FOUND_COPY.goToDashboard}</Link>
        </Button>
      </ErrorState>
    </div>
  );
}
