import Link from "next/link";
import type { ReactNode } from "react";

import {
  SHARED_SHELL_BRAND_CLASS,
  SHARED_SHELL_HEADER_CLASS,
  SHARED_SHELL_HEADER_INNER_CLASS,
  SHARED_SHELL_MAIN_CLASS,
  SHARED_SHELL_ROOT_CLASS,
} from "./constants";

/**
 * Shared group layout (Phase 1 stub): minimal chrome for pages visible to both
 * guests and signed-in users, such as help and legal pages. No auth gate.
 */
export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <div className={SHARED_SHELL_ROOT_CLASS}>
      <header className={SHARED_SHELL_HEADER_CLASS}>
        <div className={SHARED_SHELL_HEADER_INNER_CLASS}>
          <Link href="/" className={SHARED_SHELL_BRAND_CLASS}>
            GoverNerds
          </Link>
        </div>
      </header>
      <main id="main-content" className={SHARED_SHELL_MAIN_CLASS}>
        {children}
      </main>
    </div>
  );
}
