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

import {
  ACCEPT_INVITE_ACCEPTING_BODY,
  ACCEPT_INVITE_AUTH_ACTIONS_CLASS,
  ACCEPT_INVITE_AUTH_CARD_CLASS,
  ACCEPT_INVITE_AUTH_DESCRIPTION,
  ACCEPT_INVITE_AUTH_PAGE_CLASS,
  ACCEPT_INVITE_AUTH_TITLE,
  ACCEPT_INVITE_CHECKING_BODY,
  ACCEPT_INVITE_ERROR_FALLBACK_BODY,
  ACCEPT_INVITE_ERROR_PAGE_CLASS,
  ACCEPT_INVITE_ERROR_TITLE,
  ACCEPT_INVITE_GO_HOME_LABEL,
  ACCEPT_INVITE_LOADING_PAGE_CLASS,
  ACCEPT_INVITE_LOADING_TEXT_CLASS,
  ACCEPT_INVITE_LOGIN_LABEL,
  ACCEPT_INVITE_SIGNUP_LABEL,
} from "./constants";
import { useAcceptInvite } from "./useAcceptInvite";

export function AcceptInvite() {
  const { state, errorMessage, loginHref, signupHref } = useAcceptInvite();

  if (state === "checking" || state === "accepting") {
    return (
      <div className={ACCEPT_INVITE_LOADING_PAGE_CLASS}>
        <p className={ACCEPT_INVITE_LOADING_TEXT_CLASS}>
          {state === "checking"
            ? ACCEPT_INVITE_CHECKING_BODY
            : ACCEPT_INVITE_ACCEPTING_BODY}
        </p>
      </div>
    );
  }

  if (state === "needs_auth") {
    return (
      <div className={ACCEPT_INVITE_AUTH_PAGE_CLASS}>
        <Card className={ACCEPT_INVITE_AUTH_CARD_CLASS}>
          <CardHeader>
            <CardTitle>{ACCEPT_INVITE_AUTH_TITLE}</CardTitle>
            <CardDescription>{ACCEPT_INVITE_AUTH_DESCRIPTION}</CardDescription>
          </CardHeader>
          <CardContent className={ACCEPT_INVITE_AUTH_ACTIONS_CLASS}>
            <Button asChild size="lg">
              <Link href={loginHref}>{ACCEPT_INVITE_LOGIN_LABEL}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={signupHref}>{ACCEPT_INVITE_SIGNUP_LABEL}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={ACCEPT_INVITE_ERROR_PAGE_CLASS}>
      <ErrorState
        title={ACCEPT_INVITE_ERROR_TITLE}
        description={errorMessage ?? ACCEPT_INVITE_ERROR_FALLBACK_BODY}
        homeHref="/"
        homeLabel={ACCEPT_INVITE_GO_HOME_LABEL}
      />
    </div>
  );
}
