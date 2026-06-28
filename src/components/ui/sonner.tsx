"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Global toast host. Mounted once from `hosts/`. Confirmations and errors are
 * surfaced here in plain language for our audience.
 */
export function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      duration={5000}
      expand
      visibleToasts={4}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:text-base group-[.toaster]:min-h-14 group-[.toaster]:px-4",
          title: "group-[.toast]:font-semibold group-[.toast]:text-base",
          description: "group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:border-green-500/40 group-[.toaster]:bg-green-50 dark:group-[.toaster]:bg-green-950/30",
          error:
            "group-[.toaster]:border-destructive/40 group-[.toaster]:bg-destructive/5",
        },
      }}
      {...props}
    />
  );
}
