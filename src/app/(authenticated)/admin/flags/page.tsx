import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ADMIN_FLAGS_COPY } from "./constants";

/**
 * Feature flag admin stub. Proves the admin route gate works. A full management
 * UI (create/edit flags, targeting) is a later phase — the evaluation engine and
 * schema already exist underneath.
 */
export default function AdminFlagsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {ADMIN_FLAGS_COPY.title}
        </h1>
        <p className="text-muted-foreground text-lg">
          {ADMIN_FLAGS_COPY.subtitle}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{ADMIN_FLAGS_COPY.cardTitle}</CardTitle>
          <CardDescription>{ADMIN_FLAGS_COPY.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-base">
            {ADMIN_FLAGS_COPY.body}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
