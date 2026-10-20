import { createFileRoute, Link } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SAFEGUARDING_PHONE } from "@/config";
import { seo } from "@/lib/seo";
import { PageHero, Section, T } from "@/components/site/ui";
import { Contactish } from "./safety";
import type { ReactNode } from "react";

export const Route = createFileRoute("/faq")({
  head: () => seo("/faq", "Frequently Asked Questions", "Who can join, cost, schedule, safety, nonprofit status, and how businesses can help BGWYP."),
  component: Faq,
});

const QA: [string, ReactNode][] = [
  ["Who can join?", "Baltimore City young people ages 11 to 24. Cohorts are matched by grade or age."],
  ["Does it cost anything for families?", <T>{"[State the Board's decision. The budget funds participant support, including meals and transportation.]"}</T>],
  ["When and where?", <T>{"The Summer Accelerator runs for six weeks. School-year sessions are monthly, September to May. Location: [site, once the agreement is signed]."}</T>],
  ["How do you keep young people safe?", <>See <Link to="/safety" className="font-semibold text-gold-deep underline">How We Protect Young People</Link>. Every adult is screened and trained; no adult is ever alone with a young person.</>],
  ["Are you a 501(c)(3)?", "We are a Maryland nonprofit corporation. Our application for federal 501(c)(3) status is pending."],
  ["Can I give a tax-deductible gift?", "Deductibility depends on IRS approval. Please consult your tax advisor."],
  ["How can my business help?", "Host a shadow, offer a guest session, sponsor a seat, or become a founding partner."],
  ["How do I report a concern?", <>Contact the Safeguarding Officer at <Contactish value={SAFEGUARDING_PHONE} kind="tel" />. If a young person is in danger, call 911.</>],
];

function Faq() {
  return (
    <>
      <PageHero title="FAQ" intro="Answers for families, volunteers, partners, and supporters." />
      <Section>
        <Accordion type="multiple" className="mx-auto max-w-3xl">
          {QA.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`}>
              <AccordionTrigger className="text-left font-display text-lg">{q}</AccordionTrigger>
              <AccordionContent className="text-base">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </>
  );
}
