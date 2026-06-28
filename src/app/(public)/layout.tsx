import Link from "next/link";
import type { ReactNode } from "react";

import {
  PUBLIC_SHELL_FOOTER_CLASS,
  PUBLIC_SHELL_FOOTER_INNER_CLASS,
  PUBLIC_SHELL_FOOTER_LINK_CLASS,
  PUBLIC_SHELL_HEADER_CLASS,
  PUBLIC_SHELL_HELP_LINK_LABEL,
  PUBLIC_SHELL_LOGIN_LINK_CLASS,
  PUBLIC_SHELL_LOGIN_LINK_LABEL,
  PUBLIC_SHELL_MAIN_CLASS,
  PUBLIC_SHELL_NAV_ACTIONS_CLASS,
  PUBLIC_SHELL_NAV_CLASS,
  PUBLIC_SHELL_ROOT_CLASS,
  PUBLIC_SHELL_SIGNUP_LINK_CLASS,
  PUBLIC_SHELL_SIGNUP_LINK_LABEL,
  PUBLIC_SHELL_BRAND_CLASS,
} from "./constants";

/**
 * Public layout: minimal chrome for marketing and auth pages. No product shell
 * and no auth gate — anyone can view these routes. Individual auth pages
 * redirect already-signed-in users to the dashboard.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={PUBLIC_SHELL_ROOT_CLASS}>
      <header className={PUBLIC_SHELL_HEADER_CLASS}>
        <nav className={PUBLIC_SHELL_NAV_CLASS}>
          <Link href="/" className={PUBLIC_SHELL_BRAND_CLASS}>
            GoverNerds
          </Link>
          <div className={PUBLIC_SHELL_NAV_ACTIONS_CLASS}>
            <Link href="/login" className={PUBLIC_SHELL_LOGIN_LINK_CLASS}>
              {PUBLIC_SHELL_LOGIN_LINK_LABEL}
            </Link>
            <Link href="/signup" className={PUBLIC_SHELL_SIGNUP_LINK_CLASS}>
              {PUBLIC_SHELL_SIGNUP_LINK_LABEL}
            </Link>
          </div>
        </nav>
      </header>
      <main id="main-content" className={PUBLIC_SHELL_MAIN_CLASS}>
        {children}
      </main>
      <footer className={PUBLIC_SHELL_FOOTER_CLASS}>
        <div className={PUBLIC_SHELL_FOOTER_INNER_CLASS}>
          <span>&copy; {new Date().getFullYear()} GoverNerds</span>
          <Link href="/help" className={PUBLIC_SHELL_FOOTER_LINK_CLASS}>
            {PUBLIC_SHELL_HELP_LINK_LABEL}
          </Link>
        </div>
      </footer>
    </div>
  );
}
