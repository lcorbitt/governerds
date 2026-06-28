import { serveWithPermission } from "@shared/middleware/index.ts";
import { handle } from "./handler.ts";

serveWithPermission(
  handle,
  {
    name: "create-community",
    limit: 20,
    windowSeconds: 60,
  },
  "communities:manage",
);
