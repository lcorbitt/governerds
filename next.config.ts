import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next does not pick up an unrelated parent lockfile.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
