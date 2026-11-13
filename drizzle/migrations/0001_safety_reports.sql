-- Safety concern reports. Public visitors may insert only.
-- Authorized admins (app_metadata.role = admin) may read. Nobody else can.
CREATE TABLE public.safety_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL
);

REVOKE ALL ON public.safety_reports FROM anon, authenticated;
GRANT INSERT ON public.safety_reports TO anon, authenticated;
GRANT ALL ON public.safety_reports TO service_role;

ALTER TABLE public.safety_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit safety reports"
  ON public.safety_reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read safety reports"
  ON public.safety_reports
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Confirm the older form tables stay insert-only for the public key.
DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['volunteer_applications','interest_list','partner_inquiries','contact_messages','donation_notify_list'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('REVOKE SELECT, UPDATE, DELETE ON public.%I FROM anon, authenticated', t);
  END LOOP;
END $$;
