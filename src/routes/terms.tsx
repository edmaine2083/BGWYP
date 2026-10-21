import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, CONTACT_PHONE, telHref } from "@/config";
import { seo } from "@/lib/seo";
import { PageHero, Section } from "@/components/site/ui";

const heading = "text-xl text-gold-deep normal-case tracking-normal";
const link = "font-semibold text-gold-deep underline";
const list = "list-disc space-y-2 pl-6";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo(
      "/terms",
      "Terms of Use",
      "Terms of use for the Building Generational Wealth Youth Program website.",
    ),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero title="Terms of Use" intro="Building Generational Wealth Youth Program, Inc." />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm text-muted-foreground">Effective date: October 21, 2026</p>
          <p>
            Welcome to bgwyp.org (the “Site”), operated by Building Generational Wealth Youth
            Program, Inc. (“BGWYP,” “we,” “us”), a Maryland nonprofit corporation. By using the
            Site, you agree to these Terms of Use. If you do not agree, please do not use the Site.
          </p>

          <h2 className={heading}>About BGWYP</h2>
          <p>
            BGWYP provides financial education, career readiness, and mentoring for Baltimore young
            people ages 11 to 24. BGWYP is a Maryland nonprofit corporation. Its application for
            federal 501(c)(3) tax-exempt status is pending.
          </p>

          <h2 className={heading}>Educational information only</h2>
          <p>
            Content on the Site is for general educational purposes. It is not financial,
            investment, tax, or legal advice, and it is not tailored to any person’s situation.
            Please consult a qualified professional before making financial or legal decisions.
          </p>

          <h2 className={heading}>Using the Site</h2>
          <p>You agree to use the Site lawfully and respectfully. You agree not to:</p>
          <ul className={list}>
            <li>Submit false, misleading, or harmful information</li>
            <li>Use the Site to harass, threaten, or harm anyone, including young people</li>
            <li>Attempt to gain unauthorized access to the Site, its systems, or its data</li>
            <li>Send spam or automated submissions</li>
            <li>Copy, scrape, or reuse Site content for commercial purposes without permission</li>
          </ul>

          <h2 className={heading}>Information you submit</h2>
          <p>
            When you submit a form or survey, you confirm the information is accurate and that you
            are allowed to share it. If you are submitting information about a young person, you
            confirm that you are their parent or legal guardian, or that you have their guardian’s
            permission. How we handle your information is described in our{" "}
            <Link to="/privacy" className={link}>
              Privacy Policy.
            </Link>
          </p>

          <h2 className={heading}>Program participation</h2>
          <p>
            Submitting the interest list, a volunteer application, or a partner inquiry does not
            guarantee enrollment, a volunteer role, or a partnership. Program participation is
            subject to available space, eligibility, and separate enrollment agreements. Volunteers
            and partners must meet BGWYP’s safeguarding requirements before working with young
            people. See{" "}
            <Link to="/safety" className={link}>
              How We Protect Young People.
            </Link>
          </p>

          <h2 className={heading}>Donations</h2>
          <p>
            When online giving is available, donations will be processed by a third-party payment
            provider and subject to its terms. Donors receive a written acknowledgment. BGWYP’s
            application for federal 501(c)(3) tax-exempt status is pending; deductibility of gifts
            depends on IRS approval. Please consult your tax advisor.
          </p>

          <h2 className={heading}>Our content</h2>
          <p>
            The BGWYP name, logo, motto (“Educate. Empower. Elevate. Build Legacies.”), and Site
            content are owned by BGWYP or used with permission. You may share links to the Site and
            print pages for personal or educational use. You may not use our name or logo to suggest
            endorsement, or copy our content for commercial use, without our written permission.
          </p>

          <h2 className={heading}>Links to other websites</h2>
          <p>
            The Site links to third-party websites and services, such as Jotform. We are not
            responsible for their content, policies, or practices.
          </p>

          <h2 className={heading}>Disclaimer</h2>
          <p>
            The Site is provided “as is” and “as available.” We work to keep information accurate
            and current, but we make no warranties about the Site’s completeness, accuracy, or
            availability, and we may change or remove content at any time.
          </p>

          <h2 className={heading}>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, BGWYP and its directors, staff, and volunteers
            are not liable for any indirect, incidental, or consequential damages arising from your
            use of the Site or reliance on its content.
          </p>

          <h2 className={heading}>Governing law</h2>
          <p>These Terms are governed by the laws of the State of Maryland.</p>

          <h2 className={heading}>Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. When we do, we will update the effective
            date above. Continued use of the Site means you accept the updated Terms.
          </p>

          <h2 className={heading}>Contact us</h2>
          <p>
            Building Generational Wealth Youth Program, Inc.
            <br />
            Baltimore, Maryland
            <br />
            Email:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
              {CONTACT_EMAIL}
            </a>{" "}
            · Phone:{" "}
            <a href={telHref(CONTACT_PHONE)} className={link}>
              {CONTACT_PHONE}
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
