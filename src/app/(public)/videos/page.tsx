import { PublicContentStub } from "@/components/shared/PublicContentStub";

import { TITLE } from "./constants";

/**
 * Public videos placeholder. Full content arrives in a later phase.
 */
export default function VideosPage() {
  return <PublicContentStub title={TITLE} />;
}
