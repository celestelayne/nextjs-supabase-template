import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-8 px-6 py-16">
      <header className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">Template</span>
        <ModeToggle />
      </header>

      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Next.js + Supabase starter
        </h1>
        <p className="text-muted-foreground text-base leading-7">
          A minimal, production-ready starting point. Sign in to see the
          protected area and the example notes feature.
        </p>
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/app">Open app</Link>
        </Button>
      </div>
    </main>
  );
}
