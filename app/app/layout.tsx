import Link from "next/link";
import { redirect } from "next/navigation";

import { UserMenu } from "@/app/app/user-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: LayoutProps<"/app">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belt-and-suspenders: the proxy already redirects, but never trust it alone.
  if (!user) redirect("/login?next=/app");

  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-3">
          <Link href="/app" className="text-sm font-medium">
            App
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <UserMenu email={user.email ?? "unknown"} />
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
        {children}
      </div>
    </div>
  );
}
