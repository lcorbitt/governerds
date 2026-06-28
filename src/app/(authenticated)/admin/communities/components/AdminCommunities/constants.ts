export const ADMIN_COMMUNITIES_TITLE = "Communities";
export const ADMIN_COMMUNITIES_SUBTITLE =
  "Create communities and invite members by email.";
export const ADMIN_COMMUNITIES_CREATE_CARD_TITLE = "Create a Community";
export const ADMIN_COMMUNITIES_CREATE_CARD_DESCRIPTION =
  "You will be added as a member automatically.";
export const ADMIN_COMMUNITIES_NAME_LABEL = "Name";
export const ADMIN_COMMUNITIES_SLUG_LABEL = "Slug";
export const ADMIN_COMMUNITIES_CREATE_SUBMIT_LABEL = "Create Community";
export const ADMIN_COMMUNITIES_CREATING_LABEL = "Creating…";
export const ADMIN_COMMUNITIES_LIST_CARD_TITLE = "All Communities";
export const ADMIN_COMMUNITIES_LIST_CARD_DESCRIPTION =
  "Send email invitations to add members to each community.";
export const ADMIN_COMMUNITIES_LIST_LOADING_BODY = "Loading communities…";
export const ADMIN_COMMUNITIES_LIST_ERROR_TITLE =
  "We Could Not Load Communities";
export const ADMIN_COMMUNITIES_LIST_ERROR_DESCRIPTION =
  "Please check that your local stack is running, then try again.";
export const ADMIN_COMMUNITIES_BACK_TO_DASHBOARD_LABEL = "Back to Dashboard";
export const ADMIN_COMMUNITIES_LIST_EMPTY_BODY =
  "No communities yet. Create one above to get started.";
export const ADMIN_COMMUNITIES_VIEW_HOME_LABEL = "View Home";
export const ADMIN_COMMUNITIES_INVITE_LABEL = "Invite by Email";
export const ADMIN_COMMUNITIES_INVITE_PLACEHOLDER = "member@example.com";
export const ADMIN_COMMUNITIES_SEND_INVITE_LABEL = "Send Invite";
export const ADMIN_COMMUNITIES_SENDING_INVITE_LABEL = "Sending…";
export const ADMIN_COMMUNITIES_TOAST_CREATE_LOADING = "Creating community…";
export const ADMIN_COMMUNITIES_TOAST_CREATE_SUCCESS = "Community created.";
export const ADMIN_COMMUNITIES_TOAST_CREATE_ERROR =
  "We could not create that community. Please try again.";
export const ADMIN_COMMUNITIES_TOAST_INVITE_LOADING = "Sending invitation…";
export const ADMIN_COMMUNITIES_TOAST_INVITE_SUCCESS =
  "Invitation sent for {name}.";
export const ADMIN_COMMUNITIES_TOAST_INVITE_ERROR =
  "We could not send that invitation. Please try again.";

export const CREATE_COMMUNITY_VALIDATION = {
  nameMin: "Please enter a name with at least 2 characters.",
  nameMax: "Please keep the name under 80 characters.",
  slugMin: "Please enter a slug with at least 3 characters.",
  slugMax: "Please keep the slug under 50 characters.",
  slugPattern: "Use lowercase letters, numbers, and hyphens only.",
} as const;

export const ADMIN_COMMUNITIES_PAGE_CLASS = "flex flex-col gap-6";
export const ADMIN_COMMUNITIES_TITLE_CLASS =
  "text-3xl font-bold tracking-tight";
export const ADMIN_COMMUNITIES_SUBTITLE_CLASS = "text-muted-foreground text-lg";
export const ADMIN_COMMUNITIES_FORM_CLASS = "flex max-w-md flex-col gap-4";
export const ADMIN_COMMUNITIES_FIELD_CLASS = "flex flex-col gap-2";
export const ADMIN_COMMUNITIES_LOADING_TEXT_CLASS = "text-muted-foreground";
export const ADMIN_COMMUNITIES_EMPTY_TEXT_CLASS = "text-muted-foreground";
export const ADMIN_COMMUNITIES_LIST_CLASS = "flex flex-col gap-6";
export const ADMIN_COMMUNITIES_LIST_ITEM_CLASS =
  "border-b pb-6 last:border-b-0 last:pb-0";
export const ADMIN_COMMUNITIES_LIST_ITEM_HEADER_CLASS =
  "mb-4 flex flex-wrap items-center justify-between gap-2";
export const ADMIN_COMMUNITIES_COMMUNITY_NAME_CLASS = "text-lg font-semibold";
export const ADMIN_COMMUNITIES_COMMUNITY_SLUG_CLASS =
  "text-muted-foreground text-sm";
export const ADMIN_COMMUNITIES_INVITE_ROW_CLASS =
  "flex flex-col gap-2 sm:flex-row sm:items-end";
export const ADMIN_COMMUNITIES_INVITE_FIELD_CLASS =
  "flex flex-1 flex-col gap-2";
