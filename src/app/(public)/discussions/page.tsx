import { PublicContentStub } from "@/components/shared/PublicContentStub";

import { TITLE } from "./constants";

/**
 * Public discussions placeholder. Full content arrives in a later phase.
 */
export default function DiscussionsPage() {
  return <PublicContentStub title={TITLE} />;
}
