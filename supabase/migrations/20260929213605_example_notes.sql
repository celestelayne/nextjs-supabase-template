-- ============================================================================
-- EXAMPLE FEATURE: notes + private storage bucket
--
-- Delete this migration file (and drop the objects it creates) when you start
-- your real project. See README → "Removing the example feature".
-- ============================================================================

-- Table -----------------------------------------------------------------------
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 2000),
  image_path text,
  created_at timestamptz not null default now()
);

create index notes_user_id_created_at_idx
  on public.notes (user_id, created_at desc);

-- Row Level Security ----------------------------------------------------------
alter table public.notes enable row level security;

create policy "notes: users can read their own"
  on public.notes for select
  to authenticated
  using (auth.uid() = user_id);

create policy "notes: users can insert their own"
  on public.notes for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "notes: users can update their own"
  on public.notes for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "notes: users can delete their own"
  on public.notes for delete
  to authenticated
  using (auth.uid() = user_id);

-- Private storage bucket ------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('note-uploads', 'note-uploads', false)
on conflict (id) do nothing;

-- Storage policies: users may CRUD only inside a folder named after their uid.
-- Object path convention: '<user_id>/<filename>'
create policy "note-uploads: users can read their own"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'note-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "note-uploads: users can upload their own"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'note-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "note-uploads: users can update their own"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'note-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'note-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "note-uploads: users can delete their own"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'note-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
