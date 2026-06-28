import {
  HELP_PAGE_CLASS,
  HELP_PAGE_DESCRIPTION,
  HELP_PAGE_DESCRIPTION_CLASS,
  HELP_PAGE_TITLE,
  HELP_PAGE_TITLE_CLASS,
} from "@/app/(public)/constants";

/**
 * Help page in the shared group (guest + signed-in, minimal chrome). Phase 1
 * stub — proves the shared route group renders for everyone.
 */
export default function HelpPage() {
  return (
    <div className={HELP_PAGE_CLASS}>
      <h1 className={HELP_PAGE_TITLE_CLASS}>{HELP_PAGE_TITLE}</h1>
      <p className={HELP_PAGE_DESCRIPTION_CLASS}>{HELP_PAGE_DESCRIPTION}</p>
    </div>
  );
}
