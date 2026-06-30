import { HomepageBuilder } from "./components/HomepageBuilder";

/**
 * Super-admin homepage builder. Configures the unauthenticated landing page at
 * `/`. Full block editing lands in a later phase.
 */
export default function AdminSiteHomepagePage() {
  return <HomepageBuilder />;
}
