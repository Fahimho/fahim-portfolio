import { supabase } from "./supabase";

/**
 * Extracts the storage path from a Supabase public URL.
 * Example:
 *   https://xxx.supabase.co/storage/v1/object/public/portfolio-images/about/old.png
 *   → "about/old.png"
 */
function extractPathFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  // Only handle URLs from our own bucket
  if (!url.includes("/portfolio-images/")) return null;
  const parts = url.split("/portfolio-images/");
  if (parts.length < 2) return null;
  return parts[1].split("?")[0]; // strip query params
}

/**
 * Uploads a new file to Supabase Storage.
 * If `oldUrl` is provided and it points to the same bucket,
 * the old file is deleted first.
 */
export async function uploadImage(file, folder = "general", oldUrl = null) {
  if (!file) throw new Error("No file provided");

  // 1. Delete old file if it belongs to our bucket
  const oldPath = extractPathFromUrl(oldUrl);
  if (oldPath) {
    try {
      await supabase.storage.from("portfolio-images").remove([oldPath]);
    } catch (err) {
      // Don't block the new upload if deletion fails
      console.warn("Could not delete old image:", err);
    }
  }

  // 2. Generate a unique filename
  const ext = file.name.split(".").pop();
  const filename = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  // 3. Upload new file
  const { error: uploadError } = await supabase.storage
    .from("portfolio-images")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  // 4. Get public URL
  const { data } = supabase.storage
    .from("portfolio-images")
    .getPublicUrl(filename);

  return data.publicUrl;
}

/**
 * Deletes a file from Supabase Storage by its public URL.
 */
export async function deleteImage(url) {
  const path = extractPathFromUrl(url);
  if (!path) return;
  try {
    await supabase.storage.from("portfolio-images").remove([path]);
  } catch (err) {
    console.warn("Could not delete image:", err);
  }
}