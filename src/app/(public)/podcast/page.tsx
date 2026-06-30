import { PublicContentStub } from "@/components/shared/PublicContentStub";

import { TITLE } from "./constants";

/**
 * Public podcast placeholder. Full content arrives in a later phase.
 */
export default function PodcastPage() {
  return <PublicContentStub title={TITLE} />;
}
