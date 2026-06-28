export const ADMIN_COMMUNITIES_COPY = {
  title: "Communities",
  subtitle: "Create communities and invite members by email.",
  createCardTitle: "Create a Community",
  createCardDescription: "You will be added as a member automatically.",
  nameLabel: "Name",
  slugLabel: "Slug",
  createSubmit: "Create Community",
  creating: "Creating…",
  listCardTitle: "All Communities",
  listCardDescription:
    "Send email invitations to add members to each community.",
  listLoading: "Loading communities…",
  listErrorTitle: "We Could Not Load Communities",
  listErrorDescription:
    "Please check that your local stack is running, then try again.",
  backToDashboard: "Back to Dashboard",
  listEmpty: "No communities yet. Create one above to get started.",
  viewHome: "View Home",
  inviteLabel: "Invite by Email",
  invitePlaceholder: "member@example.com",
  sendInvite: "Send Invite",
  sendingInvite: "Sending…",
  toastCreateLoading: "Creating community…",
  toastCreateSuccess: "Community created.",
  toastCreateError: "We could not create that community. Please try again.",
  toastInviteLoading: "Sending invitation…",
  toastInviteSuccess: "Invitation sent for {name}.",
  toastInviteError: "We could not send that invitation. Please try again.",
} as const;

export const CREATE_COMMUNITY_VALIDATION = {
  nameMin: "Please enter a name with at least 2 characters.",
  nameMax: "Please keep the name under 80 characters.",
  slugMin: "Please enter a slug with at least 3 characters.",
  slugMax: "Please keep the slug under 50 characters.",
  slugPattern: "Use lowercase letters, numbers, and hyphens only.",
} as const;
