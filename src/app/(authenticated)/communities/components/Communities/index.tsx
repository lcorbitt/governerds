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

import { useCommunities } from "./useCommunities";

export function Communities() {
  const { communitiesQuery } = useCommunities();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Communities</h1>
        <p className="text-muted-foreground text-lg">
          Spaces you belong to across GoverNerds.
        </p>
      </div>

      {communitiesQuery.isPending ? (
        <p className="text-muted-foreground">Loading your communities…</p>
      ) : communitiesQuery.isError ? (
        <ErrorState
          title="We could not load your communities"
          description="Please check that your local stack is running, then try again."
          onRetry={() => communitiesQuery.refetch()}
          homeHref="/dashboard"
          homeLabel="Back to dashboard"
        />
      ) : communitiesQuery.data?.communities.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No communities yet</CardTitle>
            <CardDescription>
              When you join a community, it will show up here.
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
                        Open community home
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
