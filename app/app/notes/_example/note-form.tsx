"use client";

import { useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createNoteAction } from "./actions";

export function NoteForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        try {
          await createNoteAction(formData);
          formRef.current?.reset();
          toast.success("Note added");
        } catch (err) {
          toast.error(
            err instanceof Error ? err.message : "Failed to add note",
          );
        }
      }}
      className="space-y-3"
    >
      <div className="space-y-2">
        <Label htmlFor="content">New note</Label>
        <Input
          id="content"
          name="content"
          required
          placeholder="Type a note…"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image (optional)</Label>
        <Input id="image" name="image" type="file" accept="image/*" />
      </div>
      <Button type="submit">Add note</Button>
    </form>
  );
}
