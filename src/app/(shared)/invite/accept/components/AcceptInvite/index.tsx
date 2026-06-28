"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/shared/error-state";

import { ACCEPT_INVITE_COPY } from "./constants";
import { useAcceptInvite } from "./useAcceptInvite";

export function AcceptInvite() {
  const { state, errorMessage, loginHref, signupHref } = useAcceptInvite();

  if (state === "checking" || state === "accepting") {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-12">
        <p className="text-muted-foreground text-center text-lg">
          {state === "checking"
            ? ACCEPT_INVITE_COPY.checking
            : ACCEPT_INVITE_COPY.accepting}
        </p>
      </div>
    );
  }

  if (state === "needs_auth") {
    return (
      <div className="mx-auto flex w-full max-w-md px-4 py-12">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{ACCEPT_INVITE_COPY.authTitle}</CardTitle>
            <CardDescription>
              {ACCEPT_INVITE_COPY.authDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild size="lg">
              <Link href={loginHref}>{ACCEPT_INVITE_COPY.login}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={signupHref}>{ACCEPT_INVITE_COPY.signup}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <ErrorState
        title={ACCEPT_INVITE_COPY.errorTitle}
        description={errorMessage ?? ACCEPT_INVITE_COPY.errorFallback}
        homeHref="/"
        homeLabel={ACCEPT_INVITE_COPY.goHome}
      />
    </div>
  );
}
