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
