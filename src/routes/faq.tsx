import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/config";
import { seo } from "@/lib/seo";
import { PageHero, Section } from "@/components/site/ui";
import { Contactish } from "@/components/site/Contactish";
import type { ReactNode } from "react";

export const Route = createFileRoute("/faq")({
  head: () => seo("/faq", "Frequently Asked Questions", "Who can join, schedule, safety, nonprofit status, and how businesses can help BGWYP."),
  component: Faq,
});

const QA: { q: string; text: string; answer: ReactNode }[] = [
  {
    q: "Who can join?",
    text: "Baltimore City young people ages 11 to 24. Cohorts are matched by grade or age.",
    answer: "Baltimore City young people ages 11 to 24. Cohorts are matched by grade or age.",
  },
  {
    q: "When and where?",
    text: "The Summer Accelerator is planned as 6 weeks, and school-year sessions are planned monthly from September to May. Dates and location are not yet set.",
    answer:
      "The Summer Accelerator is planned as 6 weeks, and school-year sessions are planned monthly from September to May. Dates and location are not yet set.",
  },
  {
    q: "How do you keep young people safe?",
    text: "See How We Protect Young People. Every adult is screened and trained; no adult is ever alone with a young person.",
    answer: (
      <>
        See <Link to="/safety" className="font-semibold text-gold-deep underline">How We Protect Young People</Link>. Every adult is screened and trained; no adult is ever alone with a young person.
      </>
    ),
  },
  {
    q: "Are you a 501(c)(3)?",
    text: "We are a Maryland nonprofit corporation. Our application for federal 501(c)(3) status is pending.",
    answer: "We are a Maryland nonprofit corporation. Our application for federal 501(c)(3) status is pending.",
  },
  {
    q: "Can I give a tax-deductible gift?",
    text: "Giving is not open yet. We are a Maryland nonprofit corporation, and our application for federal 501(c)(3) status is pending. Deductibility depends on IRS approval. Please consult your tax advisor.",
    answer:
      "Giving is not open yet. We are a Maryland nonprofit corporation, and our application for federal 501(c)(3) status is pending. Deductibility depends on IRS approval. Please consult your tax advisor.",
  },
  {
    q: "How can my business help?",
    text: "Host a shadow, offer a guest session, sponsor a seat, or become a founding partner.",
    answer: "Host a shadow, offer a guest session, sponsor a seat, or become a founding partner.",
  },
  {
    q: "How do I report a concern?",
    text: `Contact us at ${CONTACT_PHONE} or ${CONTACT_EMAIL}. If a young person is in danger, call 911.`,
    answer: (
      <>
        Contact us at <Contactish value={CONTACT_PHONE} kind="tel" /> or <Contactish value={CONTACT_EMAIL} kind="mail" />. If a young person is in danger, call 911.
      </>
    ),
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QA.map(({ q, text }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

function Faq() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero title="FAQ" intro="Answers for families, volunteers, partners, and supporters." />
      <Section>
        <div className="mx-auto max-w-3xl">
          {QA.map(({ q, answer }) => (
            <details
              key={q}
              className="group border-b border-border"
              onToggle={(event) => {
                const details = event.currentTarget;
                details.querySelector("summary")?.setAttribute("aria-expanded", String(details.open));
              }}
            >
              <summary
                aria-expanded="false"
                className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-lg focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold [&::-webkit-details-marker]:hidden"
              >
                {q}
                <ChevronDown aria-hidden className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="pb-4 text-base">{answer}</div>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
