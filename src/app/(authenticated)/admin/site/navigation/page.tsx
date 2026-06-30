import { NavigationBuilder } from "./components/NavigationBuilder";

/**
 * Super-admin navigation builder. Configures unauthenticated site navigation.
 * Full editing and publishing land in a later phase.
 */
export default function AdminSiteNavigationPage() {
  return <NavigationBuilder />;
}
