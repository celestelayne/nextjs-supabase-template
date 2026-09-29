import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

// Next.js 16 renamed `middleware.ts` → `proxy.ts` and the export from
// `middleware` → `proxy`. Runs on the Node.js runtime by default.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Match all request paths except static assets and image optimization.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
