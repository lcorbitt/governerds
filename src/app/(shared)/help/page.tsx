import { HELP_PAGE_COPY } from "@/app/(public)/constants";

/**
 * Help page in the shared group (guest + signed-in, minimal chrome). Phase 1
 * stub — proves the shared route group renders for everyone.
 */
export default function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        {HELP_PAGE_COPY.title}
      </h1>
      <p className="text-muted-foreground mt-3 text-lg">
        {HELP_PAGE_COPY.description}
      </p>
    </div>
  );
}
