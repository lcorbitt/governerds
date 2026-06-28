import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

import {
  LANDING_PAGE_ACTIONS_CLASS,
  LANDING_PAGE_CREATE_ACCOUNT_LABEL,
  LANDING_PAGE_DESCRIPTION,
  LANDING_PAGE_DESCRIPTION_CLASS,
  LANDING_PAGE_LOGIN_LABEL,
  LANDING_PAGE_SECTION_CLASS,
  LANDING_PAGE_TITLE,
  LANDING_PAGE_TITLE_CLASS,
} from "./constants";

/**
 * Marketing landing page. Thin by design — real marketing content arrives in a
 * later phase. This proves the public route group and shell render.
 */
export default function LandingPage() {
  return (
    <Reveal immediate as="section" className={LANDING_PAGE_SECTION_CLASS}>
      <h1 className={LANDING_PAGE_TITLE_CLASS}>{LANDING_PAGE_TITLE}</h1>
      <p className={LANDING_PAGE_DESCRIPTION_CLASS}>
        {LANDING_PAGE_DESCRIPTION}
      </p>
      <div className={LANDING_PAGE_ACTIONS_CLASS}>
        <Button asChild size="lg">
          <Link href="/signup">{LANDING_PAGE_CREATE_ACCOUNT_LABEL}</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/login">{LANDING_PAGE_LOGIN_LABEL}</Link>
        </Button>
      </div>
    </Reveal>
  );
}
