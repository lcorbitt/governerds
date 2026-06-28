"use client";

import { ThemeProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";
import type { ReactNode } from "react";

import { QueryProvider } from "@/hooks/query-provider";

/**
 * Client provider stack mounted once at the root. Order matters: Jotai for
 * ephemeral UI state, TanStack Query for server state, theme for appearance.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryProvider>
    </JotaiProvider>
  );
}
