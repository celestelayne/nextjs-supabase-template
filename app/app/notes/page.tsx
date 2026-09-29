// ============================================================================
// EXAMPLE FEATURE: notes
// Delete `app/app/notes/` and the accompanying migration when starting a real
// project. See README → "Removing the example feature".
// ============================================================================
import { createClient } from "@/lib/supabase/server";

import { NoteForm } from "./_example/note-form";
import { NoteItem } from "./_example/note-item";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const supabase = await createClient();
  const { data: notes, error } = await supabase
    .from("notes")
    .select("id, content, image_path, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notes</h1>
        <p className="text-muted-foreground text-sm">
          Example feature. Each user only sees their own rows and files.
        </p>
      </div>

      <NoteForm />

      {error ? (
        <p className="text-destructive text-sm">
          Couldn&apos;t load notes: {error.message}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {notes?.map((note) => <NoteItem key={note.id} note={note} />)}
      </div>

      {notes && notes.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No notes yet. Add your first one above.
        </p>
      ) : null}
    </div>
  );
}
