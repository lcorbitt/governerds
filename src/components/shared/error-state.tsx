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

import {
  ERROR_STATE_ACTIONS_CLASS,
  ERROR_STATE_CARD_CLASS,
  ERROR_STATE_CONTENT_CLASS,
  ERROR_STATE_DESCRIPTION_CLASS,
  ERROR_STATE_GO_HOME,
  ERROR_STATE_ROOT_CLASS,
  ERROR_STATE_TITLE_CLASS,
  ERROR_STATE_TRY_AGAIN,
} from "./error-state/constants";

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
  homeLabel = ERROR_STATE_GO_HOME,
  children,
}: ErrorStateProps) {
  return (
    <div className={ERROR_STATE_ROOT_CLASS}>
      <Card className={ERROR_STATE_CARD_CLASS}>
        <CardHeader>
          <CardTitle className={ERROR_STATE_TITLE_CLASS}>{title}</CardTitle>
          <CardDescription className={ERROR_STATE_DESCRIPTION_CLASS}>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className={ERROR_STATE_CONTENT_CLASS}>
          {children}
          <div className={ERROR_STATE_ACTIONS_CLASS}>
            {onRetry ? (
              <Button type="button" onClick={onRetry}>
                {ERROR_STATE_TRY_AGAIN}
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
