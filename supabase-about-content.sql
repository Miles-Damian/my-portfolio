create table if not exists public.about_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.about_content enable row level security;

create policy "Public can read about content"
on public.about_content
for select
using (true);

create policy "Authenticated users can manage about content"
on public.about_content
for all
to authenticated
using (true)
with check (true);

insert into public.about_content (id, content)
values ('about', '{}'::jsonb)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

create policy "Public can view portfolio images"
on storage.objects
for select
using (bucket_id = 'portfolio');

create policy "Authenticated users can upload portfolio images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'portfolio');

create policy "Authenticated users can update portfolio images"
on storage.objects
for update
to authenticated
using (bucket_id = 'portfolio')
with check (bucket_id = 'portfolio');
