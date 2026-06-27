import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Marketing landing page. Thin by design — real marketing content arrives in a
 * later phase. This proves the public route group and shell render.
 */
export default function LandingPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Welcome to GoverNerds
      </h1>
      <p className="text-muted-foreground max-w-xl text-lg">
        A calm, welcoming community platform. The foundation is in place — the
        community, articles, and more are on their way.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/signup">Create your account</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    </section>
  );
}
