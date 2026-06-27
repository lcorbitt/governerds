import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Feature flag admin stub. Proves the admin route gate works. A full management
 * UI (create/edit flags, targeting) is a later phase — the evaluation engine and
 * schema already exist underneath.
 */
export default function AdminFlagsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feature flags</h1>
        <p className="text-muted-foreground text-lg">
          Admin-only area. You can see this because you hold an admin role.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Management coming soon</CardTitle>
          <CardDescription>
            The flag evaluation engine, schema, and Redis caching are in place.
            The editing UI lands in a later phase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-base">
            Flags are currently seeded and managed through the database and seed
            file.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
