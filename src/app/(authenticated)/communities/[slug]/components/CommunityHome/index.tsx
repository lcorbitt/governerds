"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/shared/error-state";

import {
  COMMUNITY_HOME_BACK_TO_COMMUNITIES_LABEL,
  COMMUNITY_HOME_BODY_PREFIX,
  COMMUNITY_HOME_BODY_SUFFIX,
  COMMUNITY_HOME_BODY_TEXT_CLASS,
  COMMUNITY_HOME_CARD_DESCRIPTION,
  COMMUNITY_HOME_CARD_TITLE,
  COMMUNITY_HOME_ERROR_DESCRIPTION,
  COMMUNITY_HOME_ERROR_TITLE,
  COMMUNITY_HOME_LOADING_BODY,
  COMMUNITY_HOME_LOADING_TEXT_CLASS,
  COMMUNITY_HOME_NOT_FOUND_DESCRIPTION,
  COMMUNITY_HOME_NOT_FOUND_TITLE,
  COMMUNITY_HOME_PAGE_CLASS,
  COMMUNITY_HOME_SLUG_CLASS,
  COMMUNITY_HOME_TITLE_CLASS,
} from "./constants";
import { useCommunityHome } from "./useCommunityHome";

export function CommunityHome() {
  const { communityQuery, slug, isNotFound } = useCommunityHome();

  return (
    <div className={COMMUNITY_HOME_PAGE_CLASS}>
      {communityQuery.isPending ? (
        <p className={COMMUNITY_HOME_LOADING_TEXT_CLASS}>
          {COMMUNITY_HOME_LOADING_BODY}
        </p>
      ) : communityQuery.isError ? (
        <ErrorState
          title={
            isNotFound
              ? COMMUNITY_HOME_NOT_FOUND_TITLE
              : COMMUNITY_HOME_ERROR_TITLE
          }
          description={
            isNotFound
              ? COMMUNITY_HOME_NOT_FOUND_DESCRIPTION
              : COMMUNITY_HOME_ERROR_DESCRIPTION
          }
          onRetry={() => communityQuery.refetch()}
          homeHref="/communities"
          homeLabel={COMMUNITY_HOME_BACK_TO_COMMUNITIES_LABEL}
        />
      ) : (
        <>
          <div>
            <h1 className={COMMUNITY_HOME_TITLE_CLASS}>
              {communityQuery.data?.name}
            </h1>
            <p className={COMMUNITY_HOME_SLUG_CLASS}>/{slug}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{COMMUNITY_HOME_CARD_TITLE}</CardTitle>
              <CardDescription>
                {COMMUNITY_HOME_CARD_DESCRIPTION}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={COMMUNITY_HOME_BODY_TEXT_CLASS}>
                {COMMUNITY_HOME_BODY_PREFIX}{" "}
                <strong>{communityQuery.data?.name}</strong>.{" "}
                {COMMUNITY_HOME_BODY_SUFFIX}
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
