import { PublicContentStub } from "@/components/shared/PublicContentStub";

import { TITLE } from "./constants";

/**
 * Public articles placeholder. Full content arrives in a later phase.
 */
export default function ArticlesPage() {
  return <PublicContentStub title={TITLE} />;
}
