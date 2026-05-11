create table if not exists public.projects_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.projects_content enable row level security;

create policy "Public can read projects content"
on public.projects_content
for select
using (true);

create policy "Authenticated users can manage projects content"
on public.projects_content
for all
to authenticated
using (true)
with check (true);

insert into public.projects_content (id, content)
values ('projects', '[]'::jsonb)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

create policy "Public can view portfolio project images"
on storage.objects
for select
using (bucket_id = 'portfolio');

create policy "Authenticated users can upload portfolio project images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'portfolio');

create policy "Authenticated users can update portfolio project images"
on storage.objects
for update
to authenticated
using (bucket_id = 'portfolio')
with check (bucket_id = 'portfolio');
