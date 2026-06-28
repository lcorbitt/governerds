export const ROUTE_ERROR_COPY = {
  title: "Something Went Wrong",
  description:
    "We hit an unexpected problem on this page. Please try again. If it keeps happening, come back in a few minutes.",
  goToDashboard: "Go to Dashboard",
} as const;

export const AUTHENTICATED_ROUTE_ERROR_COPY = {
  title: "Something Went Wrong",
  description:
    "We could not load this page right now. Please try again in a moment.",
  backToDashboard: "Back to Dashboard",
} as const;

export const GLOBAL_ERROR_COPY = {
  title: "Something Went Wrong",
  description:
    "We hit an unexpected problem. Please try again. If it keeps happening, come back in a few minutes.",
} as const;

export const NOT_FOUND_COPY = {
  title: "We Couldn't Find That Page",
  description:
    "The link may be outdated, or the page may have moved. You can head back to a familiar place.",
  goToHome: "Go to Home",
  goToDashboard: "Go to Dashboard",
} as const;
