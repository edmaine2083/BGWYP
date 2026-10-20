CREATE TABLE public.volunteer_applications (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), full_name text NOT NULL, email text NOT NULL, phone text NOT NULL, zip text NOT NULL, help_type text NOT NULL, availability text NOT NULL, motivation text NOT NULL, acknowledged boolean NOT NULL);
CREATE TABLE public.interest_list (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), guardian_name text NOT NULL, email text NOT NULL, phone text, zip text NOT NULL, age_range text NOT NULL, self_signup boolean NOT NULL DEFAULT false, heard_from text);
CREATE TABLE public.partner_inquiries (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), organization text NOT NULL, contact_name text NOT NULL, title text, email text NOT NULL, phone text, partner_type text NOT NULL, offers text[] NOT NULL DEFAULT '{}', message text, wants_template boolean NOT NULL DEFAULT false);
CREATE TABLE public.contact_messages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), name text NOT NULL, email text NOT NULL, phone text, topic text NOT NULL, message text NOT NULL);
CREATE TABLE public.donation_notify_list (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), created_at timestamptz NOT NULL DEFAULT now(), email text NOT NULL);
DO $$ DECLARE t text; BEGIN FOREACH t IN ARRAY ARRAY['volunteer_applications','interest_list','partner_inquiries','contact_messages','donation_notify_list'] LOOP
EXECUTE format('GRANT INSERT ON public.%I TO anon, authenticated', t);
EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
EXECUTE format('CREATE POLICY "Public can submit" ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (true)', t);
END LOOP; END $$;