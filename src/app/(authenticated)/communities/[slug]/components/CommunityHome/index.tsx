"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/shared/error-state";

import { COMMUNITY_HOME_COPY } from "./constants";
import { useCommunityHome } from "./useCommunityHome";

export function CommunityHome() {
  const { communityQuery, slug, isNotFound } = useCommunityHome();

  return (
    <div className="flex flex-col gap-6">
      {communityQuery.isPending ? (
        <p className="text-muted-foreground">{COMMUNITY_HOME_COPY.loading}</p>
      ) : communityQuery.isError ? (
        <ErrorState
          title={
            isNotFound
              ? COMMUNITY_HOME_COPY.notFoundTitle
              : COMMUNITY_HOME_COPY.errorTitle
          }
          description={
            isNotFound
              ? COMMUNITY_HOME_COPY.notFoundDescription
              : COMMUNITY_HOME_COPY.errorDescription
          }
          onRetry={() => communityQuery.refetch()}
          homeHref="/communities"
          homeLabel={COMMUNITY_HOME_COPY.backToCommunities}
        />
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {communityQuery.data?.name}
            </h1>
            <p className="text-muted-foreground text-lg">/{slug}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{COMMUNITY_HOME_COPY.cardTitle}</CardTitle>
              <CardDescription>
                {COMMUNITY_HOME_COPY.cardDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">
                {COMMUNITY_HOME_COPY.bodyPrefix}{" "}
                <strong>{communityQuery.data?.name}</strong>.{" "}
                {COMMUNITY_HOME_COPY.bodySuffix}
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
