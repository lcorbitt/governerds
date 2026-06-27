"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/shared/error-state";
import { EdgeFunctionError } from "@/lib/edge-function-fetch";

import { useCommunityHome } from "./useCommunityHome";

export function CommunityHome() {
  const { communityQuery, slug } = useCommunityHome();

  const isNotFound =
    communityQuery.error instanceof EdgeFunctionError &&
    communityQuery.error.status === 404;

  return (
    <div className="flex flex-col gap-6">
      {communityQuery.isPending ? (
        <p className="text-muted-foreground">Loading community…</p>
      ) : communityQuery.isError ? (
        <ErrorState
          title={
            isNotFound
              ? "Community not available"
              : "We could not load this community"
          }
          description={
            isNotFound
              ? "You may not have access to this community, or it may not exist."
              : "Please check that your local stack is running, then try again."
          }
          onRetry={() => communityQuery.refetch()}
          homeHref="/communities"
          homeLabel="Back to communities"
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
              <CardTitle>Community home</CardTitle>
              <CardDescription>
                Forums, discussions, and member content will appear here in a
                later release.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-base">
                You are viewing the home for{" "}
                <strong>{communityQuery.data?.name}</strong>. This is the
                starting point for community-scoped features.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
