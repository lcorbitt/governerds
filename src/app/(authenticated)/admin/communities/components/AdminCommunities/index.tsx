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

import {
  ADMIN_COMMUNITIES_BACK_TO_DASHBOARD_LABEL,
  ADMIN_COMMUNITIES_COMMUNITY_NAME_CLASS,
  ADMIN_COMMUNITIES_COMMUNITY_SLUG_CLASS,
  ADMIN_COMMUNITIES_CREATE_CARD_DESCRIPTION,
  ADMIN_COMMUNITIES_CREATE_CARD_TITLE,
  ADMIN_COMMUNITIES_CREATE_SUBMIT_LABEL,
  ADMIN_COMMUNITIES_CREATING_LABEL,
  ADMIN_COMMUNITIES_EMPTY_TEXT_CLASS,
  ADMIN_COMMUNITIES_FIELD_CLASS,
  ADMIN_COMMUNITIES_FORM_CLASS,
  ADMIN_COMMUNITIES_INVITE_FIELD_CLASS,
  ADMIN_COMMUNITIES_INVITE_LABEL,
  ADMIN_COMMUNITIES_INVITE_PLACEHOLDER,
  ADMIN_COMMUNITIES_INVITE_ROW_CLASS,
  ADMIN_COMMUNITIES_LIST_CARD_DESCRIPTION,
  ADMIN_COMMUNITIES_LIST_CARD_TITLE,
  ADMIN_COMMUNITIES_LIST_CLASS,
  ADMIN_COMMUNITIES_LIST_EMPTY_BODY,
  ADMIN_COMMUNITIES_LIST_ERROR_DESCRIPTION,
  ADMIN_COMMUNITIES_LIST_ERROR_TITLE,
  ADMIN_COMMUNITIES_LIST_ITEM_CLASS,
  ADMIN_COMMUNITIES_LIST_ITEM_HEADER_CLASS,
  ADMIN_COMMUNITIES_LIST_LOADING_BODY,
  ADMIN_COMMUNITIES_LOADING_TEXT_CLASS,
  ADMIN_COMMUNITIES_NAME_LABEL,
  ADMIN_COMMUNITIES_PAGE_CLASS,
  ADMIN_COMMUNITIES_SENDING_INVITE_LABEL,
  ADMIN_COMMUNITIES_SEND_INVITE_LABEL,
  ADMIN_COMMUNITIES_SLUG_LABEL,
  ADMIN_COMMUNITIES_SUBTITLE,
  ADMIN_COMMUNITIES_SUBTITLE_CLASS,
  ADMIN_COMMUNITIES_TITLE,
  ADMIN_COMMUNITIES_TITLE_CLASS,
  ADMIN_COMMUNITIES_VIEW_HOME_LABEL,
} from "./constants";
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
    <div className={ADMIN_COMMUNITIES_PAGE_CLASS}>
      <div>
        <h1 className={ADMIN_COMMUNITIES_TITLE_CLASS}>
          {ADMIN_COMMUNITIES_TITLE}
        </h1>
        <p className={ADMIN_COMMUNITIES_SUBTITLE_CLASS}>
          {ADMIN_COMMUNITIES_SUBTITLE}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_COMMUNITIES_CREATE_CARD_TITLE}</CardTitle>
          <CardDescription>
            {ADMIN_COMMUNITIES_CREATE_CARD_DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmit}
            className={ADMIN_COMMUNITIES_FORM_CLASS}
            noValidate
          >
            <div className={ADMIN_COMMUNITIES_FIELD_CLASS}>
              <Label htmlFor="name">{ADMIN_COMMUNITIES_NAME_LABEL}</Label>
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

            <div className={ADMIN_COMMUNITIES_FIELD_CLASS}>
              <Label htmlFor="slug">{ADMIN_COMMUNITIES_SLUG_LABEL}</Label>
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
                ? ADMIN_COMMUNITIES_CREATING_LABEL
                : ADMIN_COMMUNITIES_CREATE_SUBMIT_LABEL}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_COMMUNITIES_LIST_CARD_TITLE}</CardTitle>
          <CardDescription>
            {ADMIN_COMMUNITIES_LIST_CARD_DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {adminQuery.isPending ? (
            <p className={ADMIN_COMMUNITIES_LOADING_TEXT_CLASS}>
              {ADMIN_COMMUNITIES_LIST_LOADING_BODY}
            </p>
          ) : adminQuery.isError ? (
            <ErrorState
              title={ADMIN_COMMUNITIES_LIST_ERROR_TITLE}
              description={ADMIN_COMMUNITIES_LIST_ERROR_DESCRIPTION}
              onRetry={() => adminQuery.refetch()}
              homeHref="/dashboard"
              homeLabel={ADMIN_COMMUNITIES_BACK_TO_DASHBOARD_LABEL}
            />
          ) : adminQuery.data?.communities.length === 0 ? (
            <p className={ADMIN_COMMUNITIES_EMPTY_TEXT_CLASS}>
              {ADMIN_COMMUNITIES_LIST_EMPTY_BODY}
            </p>
          ) : (
            <ul className={ADMIN_COMMUNITIES_LIST_CLASS}>
              {adminQuery.data?.communities.map((community) => (
                <li
                  key={community.id}
                  className={ADMIN_COMMUNITIES_LIST_ITEM_CLASS}
                >
                  <div className={ADMIN_COMMUNITIES_LIST_ITEM_HEADER_CLASS}>
                    <div>
                      <p className={ADMIN_COMMUNITIES_COMMUNITY_NAME_CLASS}>
                        {community.name}
                      </p>
                      <p className={ADMIN_COMMUNITIES_COMMUNITY_SLUG_CLASS}>
                        /{community.slug}
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/communities/${community.slug}`}>
                        {ADMIN_COMMUNITIES_VIEW_HOME_LABEL}
                      </Link>
                    </Button>
                  </div>

                  <div className={ADMIN_COMMUNITIES_INVITE_ROW_CLASS}>
                    <div className={ADMIN_COMMUNITIES_INVITE_FIELD_CLASS}>
                      <Label htmlFor={`invite-${community.id}`}>
                        {ADMIN_COMMUNITIES_INVITE_LABEL}
                      </Label>
                      <Input
                        id={`invite-${community.id}`}
                        type="email"
                        placeholder={ADMIN_COMMUNITIES_INVITE_PLACEHOLDER}
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
                        ? ADMIN_COMMUNITIES_SENDING_INVITE_LABEL
                        : ADMIN_COMMUNITIES_SEND_INVITE_LABEL}
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
