import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, telHref } from "@/config";
import { Contactish } from "@/components/site/Contactish";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Reveal, Section } from "@/components/site/ui";

export const Route = createFileRoute("/safety")({
  head: () =>
    seo(
      "/safety",
      "How We Protect Young People",
      "Screening, training, ratios, reporting, safe pickup, online safety, and independent oversight at BGWYP.",
    ),
  component: Safety,
});

const ITEMS = [
  "Every adult is screened with fingerprint, FBI, and sex-offender registry checks before they have any contact with a young person.",
  "Every adult is trained on boundaries, warning signs, and reporting before they start, and every year after.",
  "No adult is ever alone with a young person. In person or online.",
  "Ratios keep programs safe. One adult for every ten young people in Grades 6 to 8, and one for every fifteen in older groups.",
  "Clear reporting. Any concern is reported within 24 hours to the right authorities.",
  "Safe pickup. Young people go home only with adults listed by their family, with photo ID.",
  "Online safety. Adults use only BGWYP channels, with a parent copied. No private messages.",
  "Insurance and a signed site agreement before we open. No young person is on site until both are in place.",
  "Independent oversight. A Board committee reviews safety, screening, incidents, and insurance.",
];

function Safety() {
  return (
    <>
      <PageHero
        title="How We Protect Young People"
        intro="Plain language for parents, funders, and partners."
        lead="Young people's safety comes before everything else. Here is what we do."
      />
      <Section labelledBy="report">
        <div className="rounded-xl border-2 border-gold bg-card p-8">
          <H2 id="report">Report a concern</H2>
          <ul className="mt-4 space-y-3 text-lg">
            <li>
              Immediate danger: call{" "}
              <a href="tel:911" className="font-semibold text-gold-deep underline">
                911
              </a>
              .
            </li>
            <li>
              Suspected child abuse or neglect in Maryland:{" "}
              <a href="tel:+18009177383" className="font-semibold text-gold-deep underline">
                1-800-91-PREVENT (1-800-917-7383)
              </a>
              , Maryland Department of Human Services.{" "}
              <a
                href="https://dhs.maryland.gov/child-protective-services/"
                className="font-semibold text-gold-deep underline"
              >
                Child Protective Services
              </a>
              .
            </li>
            <li>
              Mental health crisis: call or text{" "}
              <a href="tel:988" className="font-semibold text-gold-deep underline">
                988
              </a>{" "}
              (Suicide &amp; Crisis Lifeline).
            </li>
            <li>
              Concerns about BGWYP staff or volunteers:{" "}
              <a href={telHref(CONTACT_PHONE)} className="font-semibold text-gold-deep underline">
                {CONTACT_PHONE}
              </a>
              ,{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-gold-deep underline"
              >
                {CONTACT_EMAIL}
              </a>
              , or the{" "}
              <Link to="/contact" className="font-semibold text-gold-deep underline">
                Contact form
              </Link>{" "}
              (&quot;Safety concern&quot;).
            </li>
          </ul>
        </div>
      </Section>
      <Section>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((t) => (
            <li key={t}>
              <Reveal className="h-full">
                <Card className="flex h-full gap-4">
                  <span className="icon-ring">
                    <ShieldCheck aria-hidden />
                  </span>
                  <p>{t}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="paper" labelledBy="concerns">
        <div className="rounded-xl border-2 border-gold bg-card p-8">
          <H2 id="concerns">Questions or concerns?</H2>
          <p className="mt-4 text-lg">
            Contact us at <Contactish value={CONTACT_PHONE} kind="tel" /> or{" "}
            <Contactish value={CONTACT_EMAIL} kind="mail" />.
          </p>
          <p className="mt-2 text-lg font-semibold">If a young person is in danger, call 911.</p>
        </div>
      </Section>
    </>
  );
}
