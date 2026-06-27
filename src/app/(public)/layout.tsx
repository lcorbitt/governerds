import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Public layout: minimal chrome for marketing and auth pages. No product shell
 * and no auth gate — anyone can view these routes. Individual auth pages
 * redirect already-signed-in users to the dashboard.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b">
        <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
          <Link href="/" className="text-primary text-xl font-bold">
            GoverNerds
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hover:bg-accent rounded-md px-4 py-2 text-base font-medium"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-base font-medium"
            >
              Sign up
            </Link>
          </div>
        </nav>
      </header>
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <footer className="border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-6 text-sm">
          <span>&copy; {new Date().getFullYear()} GoverNerds</span>
          <Link href="/help" className="hover:underline">
            Help
          </Link>
        </div>
      </footer>
    </div>
  );
}
