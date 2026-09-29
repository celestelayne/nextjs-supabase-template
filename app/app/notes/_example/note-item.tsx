import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { deleteNoteAction, signedUrlForPath } from "./actions";

type Note = {
  id: string;
  content: string;
  image_path: string | null;
  created_at: string;
};

export async function NoteItem({ note }: { note: Note }) {
  const imageUrl = note.image_path
    ? await signedUrlForPath(note.image_path)
    : null;

  return (
    <Card>
      <CardContent className="space-y-3">
        <p className="text-sm leading-6 whitespace-pre-wrap">{note.content}</p>
        {imageUrl ? (
          <div className="relative h-48 w-full overflow-hidden rounded-md border">
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : null}
        <p className="text-muted-foreground text-xs">
          {new Date(note.created_at).toLocaleString()}
        </p>
      </CardContent>
      <CardFooter>
        <form action={deleteNoteAction}>
          <input type="hidden" name="id" value={note.id} />
          <Button type="submit" variant="ghost" size="sm">
            Delete
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
