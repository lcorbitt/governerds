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

import {
  COMMUNITIES_BACK_TO_DASHBOARD_LABEL,
  COMMUNITIES_COMMUNITY_CARD_CLASS,
  COMMUNITIES_EMPTY_DESCRIPTION,
  COMMUNITIES_EMPTY_TITLE,
  COMMUNITIES_ERROR_DESCRIPTION,
  COMMUNITIES_ERROR_TITLE,
  COMMUNITIES_LIST_CLASS,
  COMMUNITIES_LOADING_BODY,
  COMMUNITIES_LOADING_TEXT_CLASS,
  COMMUNITIES_OPEN_HOME_LABEL,
  COMMUNITIES_OPEN_HOME_TEXT_CLASS,
  COMMUNITIES_PAGE_CLASS,
  COMMUNITIES_SUBTITLE,
  COMMUNITIES_SUBTITLE_CLASS,
  COMMUNITIES_TITLE,
  COMMUNITIES_TITLE_CLASS,
} from "./constants";
import { useCommunities } from "./useCommunities";

export function Communities() {
  const { communitiesQuery } = useCommunities();

  return (
    <div className={COMMUNITIES_PAGE_CLASS}>
      <div>
        <h1 className={COMMUNITIES_TITLE_CLASS}>{COMMUNITIES_TITLE}</h1>
        <p className={COMMUNITIES_SUBTITLE_CLASS}>{COMMUNITIES_SUBTITLE}</p>
      </div>

      {communitiesQuery.isPending ? (
        <p className={COMMUNITIES_LOADING_TEXT_CLASS}>
          {COMMUNITIES_LOADING_BODY}
        </p>
      ) : communitiesQuery.isError ? (
        <ErrorState
          title={COMMUNITIES_ERROR_TITLE}
          description={COMMUNITIES_ERROR_DESCRIPTION}
          onRetry={() => communitiesQuery.refetch()}
          homeHref="/dashboard"
          homeLabel={COMMUNITIES_BACK_TO_DASHBOARD_LABEL}
        />
      ) : communitiesQuery.data?.communities.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>{COMMUNITIES_EMPTY_TITLE}</CardTitle>
            <CardDescription>{COMMUNITIES_EMPTY_DESCRIPTION}</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ul className={COMMUNITIES_LIST_CLASS}>
          {communitiesQuery.data?.communities.map((community, index) => (
            <li key={community.id}>
              <Reveal delay={index * 50}>
                <Link href={`/communities/${community.slug}`}>
                  <Card className={COMMUNITIES_COMMUNITY_CARD_CLASS}>
                    <CardHeader>
                      <CardTitle>{community.name}</CardTitle>
                      <CardDescription>/{community.slug}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className={COMMUNITIES_OPEN_HOME_TEXT_CLASS}>
                        {COMMUNITIES_OPEN_HOME_LABEL}
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
