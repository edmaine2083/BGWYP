import { createFileRoute, Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, CONTACT_PHONE, telHref } from "@/config";
import { seo } from "@/lib/seo";
import { PageHero, Section } from "@/components/site/ui";

const heading = "text-xl text-gold-deep normal-case tracking-normal";
const link = "font-semibold text-gold-deep underline";
const list = "list-disc space-y-2 pl-6";

export const Route = createFileRoute("/privacy")({
  head: () =>
    seo(
      "/privacy",
      "Privacy Policy",
      "How Building Generational Wealth Youth Program collects, uses, and protects information submitted through this site.",
    ),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" intro="Building Generational Wealth Youth Program, Inc." />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm text-muted-foreground">Effective date: October 21, 2026</p>
          <p>
            Building Generational Wealth Youth Program, Inc. (“BGWYP,” “we,” “us”) is a Maryland
            nonprofit corporation that provides financial education, career readiness, and mentoring
            for Baltimore young people. This Privacy Policy explains what information we collect
            through bgwyp.org (the “Site”), how we use it, and the choices you have.
          </p>

          <h2 className={heading}>Information we collect</h2>
          <p>
            <span className="font-semibold">Information you give us.</span> When you use a form on
            the Site, we collect what you enter:
          </p>
          <ul className={list}>
            <li>
              <span className="font-semibold">Contact form:</span> name, email, optional phone,
              topic, and message.
            </li>
            <li>
              <span className="font-semibold">Interest list:</span> parent or guardian name, email,
              optional phone, ZIP code, the young person’s age range, and how you heard about us. We
              do not ask for the young person’s name or other personal details. Young adults ages 18
              to 24 may sign up for themselves.
            </li>
            <li>
              <span className="font-semibold">Volunteer application:</span> name, email, phone, ZIP
              code, how you would like to help, availability, and why you want to volunteer.
            </li>
            <li>
              <span className="font-semibold">Partner inquiry:</span> organization, contact name,
              title, email, phone, partner type, what you could offer, and your message.
            </li>
          </ul>
          <p>
            <span className="font-semibold">Surveys.</span> Our Student, Parent and Guardian,
            Business Partner, and Community surveys are hosted by Jotform, a third-party service.
            The Student Survey is designed so students do not enter their name or contact
            information. Jotform’s own privacy policy applies to information you submit through its
            forms.
          </p>
          <p>
            <span className="font-semibold">Information collected automatically.</span> Like most
            websites, our hosting and technology providers may automatically receive basic technical
            information, such as your IP address, browser type, and the pages you visit, to deliver
            and secure the Site. The Site loads fonts from Google Fonts, which receives your IP
            address when fonts load. We do not use advertising or tracking cookies.
          </p>

          <h2 className={heading}>How we use information</h2>
          <p>We use the information we collect to:</p>
          <ul className={list}>
            <li>Respond to your messages and requests</li>
            <li>Contact families about enrollment and program updates</li>
            <li>Review volunteer applications and partnership inquiries</li>
            <li>Understand community needs and improve our programs</li>
            <li>Keep the Site secure and working properly</li>
            <li>Meet legal and reporting obligations</li>
          </ul>

          <h2 className={heading}>How we share information</h2>
          <p>
            <span className="font-semibold">
              We do not sell, rent, or trade your personal information.
            </span>{" "}
            We share information only:
          </p>
          <ul className={list}>
            <li>
              <span className="font-semibold">With service providers</span> that help us run the
              Site and our programs, including Web3Forms (delivers form submissions to our email),
              Supabase (stores form submissions securely), Jotform (hosts our surveys), and our
              website hosting provider. They may use your information only to provide services to
              us.
            </li>
            <li>
              <span className="font-semibold">When required by law,</span> or to protect the safety
              of young people, our participants, or others.
            </li>
            <li>
              <span className="font-semibold">With your permission.</span>
            </li>
          </ul>
          <p>
            Survey results may be shared publicly or with funders only in summary form, without
            identifying anyone.
          </p>

          <h2 className={heading}>Children and young people</h2>
          <p>BGWYP serves young people ages 11 to 24, and protecting them is our first priority.</p>
          <ul className={list}>
            <li>
              We do not knowingly collect personal information online from children under 13. Our
              Interest List collects information from parents and guardians, not from children.
            </li>
            <li>
              The Student Survey does not ask for names or contact information. We ask that students
              under 13 complete it with a parent’s or guardian’s permission.
            </li>
            <li>
              If you believe a child under 13 has given us personal information, contact us and we
              will delete it.
            </li>
            <li>
              Information collected during program participation, such as enrollment forms and media
              consent, is handled under our separate enrollment and safeguarding policies. See{" "}
              <Link to="/safety" className={link}>
                How We Protect Young People.
              </Link>
            </li>
          </ul>

          <h2 className={heading}>How we protect information</h2>
          <p>
            We use reasonable administrative and technical safeguards, and we limit access to people
            who need it to do their work for BGWYP. No method of transmitting or storing information
            online is completely secure, so we cannot guarantee absolute security.
          </p>

          <h2 className={heading}>How long we keep information</h2>
          <p>
            We keep information only as long as needed for the purposes described here, or as
            required by law. You can ask us to delete your information at any time.
          </p>

          <h2 className={heading}>Your choices</h2>
          <p>You may:</p>
          <ul className={list}>
            <li>Ask to see, correct, or delete the information we hold about you</li>
            <li>Unsubscribe from our emails using the link in any message, or by contacting us</li>
            <li>Choose not to submit a form or survey</li>
          </ul>
          <p>
            To make a request, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
              {CONTACT_EMAIL}
            </a>{" "}
            or call{" "}
            <a href={telHref(CONTACT_PHONE)} className={link}>
              {CONTACT_PHONE}.
            </a>{" "}
            We will respond within 30 days.
          </p>

          <h2 className={heading}>Links to other websites</h2>
          <p>
            The Site may link to other websites, such as Jotform surveys or partner organizations.
            Their privacy practices are governed by their own policies.
          </p>

          <h2 className={heading}>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the
            effective date above.
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
