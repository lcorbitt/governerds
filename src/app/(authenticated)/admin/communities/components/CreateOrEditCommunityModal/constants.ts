export const CREATE_TITLE = "Create a Community";
export const CREATE_DESCRIPTION =
  "You will be added as a member automatically.";
export const EDIT_TITLE = "Edit Community";
export const EDIT_DESCRIPTION = "Update the community name or slug.";
export const NAME_LABEL = "Name";
export const SLUG_LABEL = "Slug";
export const CREATE_SUBMIT_LABEL = "Create Community";
export const EDIT_SUBMIT_LABEL = "Save Changes";
export const CREATING_LABEL = "Creating…";
export const SAVING_LABEL = "Saving…";
export const CANCEL_LABEL = "Cancel";

export const TOAST_CREATE_LOADING = "Creating community…";
export const TOAST_CREATE_SUCCESS = "Community created.";
export const TOAST_CREATE_ERROR =
  "We could not create that community. Please try again.";
export const TOAST_UPDATE_LOADING = "Saving community…";
export const TOAST_UPDATE_SUCCESS = "Community updated.";
export const TOAST_UPDATE_ERROR =
  "We could not update that community. Please try again.";

export const COMMUNITY_FORM_VALIDATION = {
  nameMin: "Please enter a name with at least 2 characters.",
  nameMax: "Please keep the name under 80 characters.",
  slugMin: "Please enter a slug with at least 3 characters.",
  slugMax: "Please keep the slug under 50 characters.",
  slugPattern: "Use lowercase letters, numbers, and hyphens only.",
} as const;

export const FORM_CLASS = "flex flex-col gap-4";
export const FIELD_CLASS = "flex flex-col gap-2";
export const FOOTER_CLASS =
  "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end";
