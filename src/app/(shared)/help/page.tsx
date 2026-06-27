/**
 * Help page in the shared group (guest + signed-in, minimal chrome). Phase 1
 * stub — proves the shared route group renders for everyone.
 */
export default function HelpPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Help &amp; support</h1>
      <p className="text-muted-foreground mt-3 text-lg">
        We are here to help. Detailed help content arrives in a later phase.
      </p>
    </div>
  );
}
