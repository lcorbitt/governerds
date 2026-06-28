"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/shared/error-state";
import { Reveal } from "@/components/shared/reveal";

import { COMMUNITIES_COPY } from "./constants";
import { useCommunities } from "./useCommunities";

export function Communities() {
  const { communitiesQuery } = useCommunities();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {COMMUNITIES_COPY.title}
        </h1>
        <p className="text-muted-foreground text-lg">
          {COMMUNITIES_COPY.subtitle}
        </p>
      </div>

      {communitiesQuery.isPending ? (
        <p className="text-muted-foreground">{COMMUNITIES_COPY.loading}</p>
      ) : communitiesQuery.isError ? (
        <ErrorState
          title={COMMUNITIES_COPY.errorTitle}
          description={COMMUNITIES_COPY.errorDescription}
          onRetry={() => communitiesQuery.refetch()}
          homeHref="/dashboard"
          homeLabel={COMMUNITIES_COPY.backToDashboard}
        />
      ) : communitiesQuery.data?.communities.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{COMMUNITIES_COPY.emptyTitle}</CardTitle>
            <CardDescription>
              {COMMUNITIES_COPY.emptyDescription}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {communitiesQuery.data?.communities.map((community, index) => (
            <li key={community.id}>
              <Reveal delay={index * 50}>
                <Link href={`/communities/${community.slug}`}>
                  <Card className="hover:bg-accent/50 transition-colors">
                    <CardHeader>
                      <CardTitle>{community.name}</CardTitle>
                      <CardDescription>/{community.slug}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {COMMUNITIES_COPY.openHome}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
