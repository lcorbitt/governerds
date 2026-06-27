import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Storage provider abstraction. Supabase Storage is the free-tier default;
 * swapping to S3 or Cloudflare R2 later means adding an implementation and a
 * branch in `getStorageProvider`. Phase 1 ships the interface plus a thin
 * Supabase Storage implementation so future image/video work has a seam.
 */
export interface StorageProvider {
  createSignedUploadUrl(
    bucket: string,
    path: string,
  ): Promise<{ url: string; token: string }>;
  getPublicUrl(bucket: string, path: string): string;
}

class SupabaseStorageProvider implements StorageProvider {
  async createSignedUploadUrl(bucket: string, path: string) {
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path);
    if (error) throw new Error(`Failed to sign upload URL: ${error.message}`);
    return { url: data.signedUrl, token: data.token };
  }

  getPublicUrl(bucket: string, path: string): string {
    const supabase = createAdminClient();
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
  }
}

let provider: StorageProvider | undefined;

export function getStorageProvider(): StorageProvider {
  if (!provider) provider = new SupabaseStorageProvider();
  return provider;
}
