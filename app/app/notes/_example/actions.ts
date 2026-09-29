"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

const SIGNED_URL_TTL_SECONDS = 60 * 60; // 1 hour

export async function createNoteAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;

  const image = formData.get("image");
  let image_path: string | null = null;

  if (image instanceof File && image.size > 0) {
    const ext = image.name.split(".").pop()?.toLowerCase() ?? "bin";
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("note-uploads")
      .upload(path, image, {
        contentType: image.type || "application/octet-stream",
        upsert: false,
      });
    if (uploadError) throw uploadError;
    image_path = path;
  }

  const { error } = await supabase
    .from("notes")
    .insert({ user_id: user.id, content, image_path });
  if (error) throw error;

  revalidatePath("/app/notes");
}

export async function deleteNoteAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in");

  // Fetch first so we can also clean up the storage object.
  const { data: note } = await supabase
    .from("notes")
    .select("image_path")
    .eq("id", id)
    .single();

  if (note?.image_path) {
    await supabase.storage.from("note-uploads").remove([note.image_path]);
  }

  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/app/notes");
}

export async function signedUrlForPath(path: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("note-uploads")
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
  if (error) return null;
  return data.signedUrl;
}
