import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
  homeHref?: string;
  homeLabel?: string;
  children?: ReactNode;
}

/**
 * Branded error UI for boundaries and query failures. Never shows raw errors
 * or stack traces — plain language only.
 */
export function ErrorState({
  title,
  description,
  onRetry,
  homeHref = "/",
  homeLabel = "Go home",
  children,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center py-12">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          {children}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {onRetry ? (
              <Button type="button" onClick={onRetry}>
                Try again
              </Button>
            ) : null}
            <Button asChild variant="outline">
              <Link href={homeHref}>{homeLabel}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
