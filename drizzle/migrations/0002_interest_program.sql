-- Adds the program a family asks about on the interest list.
-- Existing insert-only policies are unchanged. The column is nullable so current rows stay valid.
alter table public.interest_list add column if not exists program_interest text;
