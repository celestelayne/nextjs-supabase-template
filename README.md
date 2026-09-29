# nextjs-supabase-template

A minimal, production-ready starting point for web projects. Clone it, rip out
the example, ship your idea.

## What's included

- **Next.js 16** (App Router, TypeScript strict mode, Turbopack)
- **Tailwind CSS v4** (CSS-defined tokens, no `tailwind.config.js`)
- **shadcn/ui** with the neutral base color, light/dark/system via
  `next-themes`, and the base components: `button`, `input`, `label`, `card`,
  `sonner`, `dropdown-menu`, `avatar`
- **Supabase** for auth, database, and storage — using `@supabase/ssr` with
  separate helpers for browser, Server Components / server actions, and the
  Next.js proxy layer
- **Supabase CLI** as a dev dependency — migrations live in
  `supabase/migrations` and are applied to a hosted project with
  `supabase link` + `supabase db push`. No Docker required.
- **Vercel** deployable with zero config
- **ESLint 9** + **Prettier** with the Tailwind class-sort plugin
- **GitHub Actions** running `lint` + `typecheck` + `build` on every PR
- **MIT LICENSE**

## Prerequisites

- Node.js 22 (see `.nvmrc`; `nvm use` picks it up)
- pnpm 9+ (`corepack enable`)
- A [Supabase](https://supabase.com) account and project

## Use this template

1. **Create a repo from this template**, then clone and install:
   ```bash
   pnpm install
   ```
2. **Create a Supabase project** at
   [supabase.com/dashboard](https://supabase.com/dashboard).
3. **Copy env vars**:
   ```bash
   cp .env.example .env.local
   ```
   Fill in `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
   `SUPABASE_SERVICE_ROLE_KEY` from Project Settings → API.
4. **Log in to the Supabase CLI** (once per machine):
   ```bash
   pnpm exec supabase login
   ```
5. **Link this repo to your Supabase project** and push migrations:
   ```bash
   pnpm db:link         # prompts for your project ref
   pnpm db:push         # applies supabase/migrations/*.sql
   pnpm db:types        # regenerates lib/supabase/types.ts from the schema
   ```
6. **Set the auth redirect URLs** in the Supabase dashboard
   (Authentication → URL Configuration):
   - Site URL: `http://localhost:3000`
   - Additional redirect URLs: `http://localhost:3000/auth/callback`

   Add production URLs later (see below).

7. **Run it**:
   ```bash
   pnpm dev
   ```
   Open <http://localhost:3000>, click "Sign in", enter your email, and
   follow the magic-link.

## Deploying to Vercel

1. Push this repo to GitHub and import it into Vercel — no config needed.
2. In the Vercel project's **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only — do not expose)
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-app.vercel.app`)
3. Back in the Supabase dashboard, add your production URLs under
   Authentication → URL Configuration:
   - Site URL: `https://your-app.vercel.app`
   - Additional redirect URLs: `https://your-app.vercel.app/auth/callback`
     (and preview URLs like `https://*-your-team.vercel.app/auth/callback`
     if you want previews to sign in too)
4. Redeploy.

## Removing the example feature

The "notes" feature (table, storage bucket, `/app/notes` page) demonstrates
the patterns — remove it before shipping. Every example piece is either in a
folder named `_example` or in files with `example` in the name:

```bash
# Delete the UI
rm -rf app/app/notes

# Delete the migration
rm supabase/migrations/*_example_notes.sql
```

Then either write a new migration that drops the objects:

```sql
drop table if exists public.notes cascade;
delete from storage.buckets where id = 'note-uploads';
```

...and `pnpm db:push`, or reset the DB from scratch. Regenerate types:

```bash
pnpm db:types
```

You can also delete the placeholder `notes` shape in `lib/supabase/types.ts`
if you haven't run `db:types` yet.

## Optional: local Supabase (Docker)

The default workflow above talks to your hosted Supabase project. If you have
Docker or OrbStack, you can run the whole stack locally instead:

```bash
pnpm db:start   # starts Postgres, Auth, Storage, Studio at localhost:54323
pnpm db:reset   # rebuilds the DB and re-runs every migration
pnpm db:stop    # tears the stack down
```

Update `.env.local` to point at the local URLs printed by `db:start`.

## Scripts

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `pnpm dev`          | Next.js dev server (Turbopack)                     |
| `pnpm build`        | Production build                                   |
| `pnpm start`        | Serve the production build                         |
| `pnpm lint`         | ESLint                                             |
| `pnpm lint:fix`     | ESLint --fix                                       |
| `pnpm typecheck`    | `tsc --noEmit`                                     |
| `pnpm format`       | Prettier write                                     |
| `pnpm format:check` | Prettier check                                     |
| `pnpm db:link`      | `supabase link` — connect to hosted project        |
| `pnpm db:push`      | Apply migrations to the linked hosted project      |
| `pnpm db:types`     | Regenerate `lib/supabase/types.ts` from the schema |
| `pnpm db:start`     | Start the local Supabase stack (needs Docker)      |
| `pnpm db:stop`      | Stop the local Supabase stack                      |
| `pnpm db:reset`     | Reset the local DB (needs Docker)                  |

## A note on Next.js 16

Next.js 16 renamed `middleware.ts` → `proxy.ts` (and the exported function
from `middleware` → `proxy`). The Supabase session-refresh helper still lives
at `lib/supabase/middleware.ts`, but the root file Next.js loads is
`proxy.ts`.

## License

MIT — see [LICENSE](./LICENSE).
