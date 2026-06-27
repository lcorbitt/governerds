import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared group layout (Phase 1 stub): minimal chrome for pages visible to both
 * guests and signed-in users, such as help and legal pages. No auth gate.
 */
export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center px-4">
          <Link href="/" className="text-primary font-serif text-xl font-bold">
            GoverNerds
          </Link>
        </div>
      </header>
      <main id="main-content" className="flex-1">
        {children}
      </main>
    </div>
  );
}
