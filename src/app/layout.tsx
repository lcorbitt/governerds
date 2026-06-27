import type { Metadata } from "next";
import { DM_Sans, Libre_Caslon_Text } from "next/font/google";

import { Providers } from "@/components/providers";
import { Hosts } from "@/hosts";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const libreCaslon = Libre_Caslon_Text({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GoverNerds",
  description: "A community platform for thoughtful people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${libreCaslon.variable} min-h-dvh font-sans antialiased`}
      >
        {/* Skip link for keyboard and screen-reader users. */}
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <Providers>
          {children}
          <Hosts />
        </Providers>
      </body>
    </html>
  );
}
