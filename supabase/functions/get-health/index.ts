import { servePublic } from "@shared/middleware/index.ts";
import { handle } from "./handler.ts";

servePublic(handle);
