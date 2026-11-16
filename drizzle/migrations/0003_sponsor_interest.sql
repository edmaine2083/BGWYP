-- Optional planning fields. Existing insert-only policies stay unchanged.
alter table public.donation_notify_list add column if not exists sponsor_interest boolean not null default false;
alter table public.partner_inquiries add column if not exists sponsorship_level text;
