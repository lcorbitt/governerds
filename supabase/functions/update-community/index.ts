import { serveWithPermission } from "@http/middleware/index.ts";
import { handle } from "./handler.ts";

serveWithPermission(
  handle,
  {
    name: "update-community",
    limit: 20,
    windowSeconds: 60,
  },
  "communities:manage",
);
