"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/shared/field-error";
import { ErrorState } from "@/components/shared/error-state";

import { ADMIN_COMMUNITIES_COPY } from "./constants";
import { useAdminCommunities } from "./useAdminCommunities";

export function AdminCommunities() {
  const {
    form,
    adminQuery,
    setSlugTouched,
    inviteEmails,
    setInviteEmails,
    sendingInviteFor,
    nameField,
    handleNameChange,
    onSubmit,
    onSendInvite,
  } = useAdminCommunities();

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {ADMIN_COMMUNITIES_COPY.title}
        </h1>
        <p className="text-muted-foreground text-lg">
          {ADMIN_COMMUNITIES_COPY.subtitle}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_COMMUNITIES_COPY.createCardTitle}</CardTitle>
          <CardDescription>
            {ADMIN_COMMUNITIES_COPY.createCardDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmit}
            className="flex max-w-md flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{ADMIN_COMMUNITIES_COPY.nameLabel}</Label>
              <Input
                id="name"
                {...nameField}
                onChange={(event) => {
                  nameField.onChange(event);
                  handleNameChange(event);
                }}
              />
              <FieldError message={errors.name?.message} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">{ADMIN_COMMUNITIES_COPY.slugLabel}</Label>
              <Input
                id="slug"
                {...register("slug", {
                  onChange: () => setSlugTouched(true),
                })}
              />
              <FieldError message={errors.slug?.message} />
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting
                ? ADMIN_COMMUNITIES_COPY.creating
                : ADMIN_COMMUNITIES_COPY.createSubmit}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_COMMUNITIES_COPY.listCardTitle}</CardTitle>
          <CardDescription>
            {ADMIN_COMMUNITIES_COPY.listCardDescription}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {adminQuery.isPending ? (
            <p className="text-muted-foreground">
              {ADMIN_COMMUNITIES_COPY.listLoading}
            </p>
          ) : adminQuery.isError ? (
            <ErrorState
              title={ADMIN_COMMUNITIES_COPY.listErrorTitle}
              description={ADMIN_COMMUNITIES_COPY.listErrorDescription}
              onRetry={() => adminQuery.refetch()}
              homeHref="/dashboard"
              homeLabel={ADMIN_COMMUNITIES_COPY.backToDashboard}
            />
          ) : adminQuery.data?.communities.length === 0 ? (
            <p className="text-muted-foreground">
              {ADMIN_COMMUNITIES_COPY.listEmpty}
            </p>
          ) : (
            <ul className="flex flex-col gap-6">
              {adminQuery.data?.communities.map((community) => (
                <li
                  key={community.id}
                  className="border-b pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-lg font-semibold">{community.name}</p>
                      <p className="text-muted-foreground text-sm">
                        /{community.slug}
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/communities/${community.slug}`}>
                        {ADMIN_COMMUNITIES_COPY.viewHome}
                      </Link>
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <div className="flex flex-1 flex-col gap-2">
                      <Label htmlFor={`invite-${community.id}`}>
                        {ADMIN_COMMUNITIES_COPY.inviteLabel}
                      </Label>
                      <Input
                        id={`invite-${community.id}`}
                        type="email"
                        placeholder={ADMIN_COMMUNITIES_COPY.invitePlaceholder}
                        value={inviteEmails[community.id] ?? ""}
                        onChange={(event) =>
                          setInviteEmails((current) => ({
                            ...current,
                            [community.id]: event.target.value,
                          }))
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      disabled={sendingInviteFor === community.id}
                      onClick={() => onSendInvite(community.id, community.name)}
                    >
                      {sendingInviteFor === community.id
                        ? ADMIN_COMMUNITIES_COPY.sendingInvite
                        : ADMIN_COMMUNITIES_COPY.sendInvite}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
