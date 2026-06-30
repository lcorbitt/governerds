import { PublicContentStub } from "@/components/shared/PublicContentStub";

import { TITLE } from "./constants";

/**
 * Public about placeholder. Full content arrives in a later phase.
 */
export default function AboutPage() {
  return <PublicContentStub title={TITLE} />;
}
