import { createFileRoute } from "@tanstack/react-router";
import { Scale, TrendingUp, ShieldCheck, Home, Sprout, Landmark } from "lucide-react";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Reveal, Section, T } from "@/components/site/ui";

export const Route = createFileRoute("/about")({
  head: () => seo("/about", "About Us", "Our mission, story, values, and leadership at Building Generational Wealth Youth Program in Baltimore."),
  component: About,
});

const VALUES = [
  { i: Scale, t: "Integrity" },
  { i: TrendingUp, t: "Economic empowerment" },
  { i: ShieldCheck, t: "Youth safety" },
  { i: Home, t: "Community reinvestment" },
  { i: Sprout, t: "Generational vision" },
];
const PEOPLE = [
  ["Edward J. Shepard, MBA", "Founder, President & Executive Director"],
  ["Dr. Stacy Shepard", "Secretary and Education Chair"],
  ["Tamara Robinson", "Treasurer and Finance Chair"],
  ["Gerald Green", "Procurement & Grants Chair"],
  ["Ja-Mel Johnson", "Board Member; Chair, Governance Committee"],
  ["Daniel M. Wilkins", "Board Member; Chair, Risk & Safeguarding Committee"],
];
const initials = (n: string) => n.replace(/^Dr\.\s/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w) && !w.endsWith(".") && w !== "MBA").map((w) => w.charAt(0)).slice(0, 2).join("");

function About() {
  return (
    <>
      <PageHero title="About" intro="Who we are and what we believe." />
      <Section labelledBy="mission">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <H2 id="mission">Our mission</H2>
            <p className="mt-4">To equip Baltimore youth and young adults ages 11 through 24 with financial knowledge, career strategy, mentorship, professional exposure, negotiation skills, and asset-building discipline to increase economic mobility in historically underserved communities.</p>
          </Reveal>
          <Reveal>
            <H2>Our story</H2>
            <p className="mt-4"><T>{"Building Generational Wealth Youth Program was founded in 2026 by Edward J. Shepard, MBA, to give Baltimore young people the money and career knowledge that builds lasting wealth, and a community that helps them use it. [ONE TO TWO SENTENCES IN EDWARD'S OWN WORDS: why he started this.]"}</T></p>
          </Reveal>
        </div>
      </Section>
      <Section tone="paper" labelledBy="values">
        <H2 id="values">Our values</H2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map(({ i: I, t }) => (
            <li key={t}><Card className="h-full text-center"><span className="icon-ring"><I aria-hidden /></span><p className="mt-3 font-display font-semibold">{t}</p></Card></li>
          ))}
        </ul>
      </Section>
      <Section labelledBy="leaders">
        <H2 id="leaders">Our leadership</H2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PEOPLE.map(([n, r]) => (
            <li key={n}>
              <Card className="flex h-full items-center gap-4">
                <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-gold bg-ink font-display text-xl text-gold">{initials(n)}</span>
                <div><p className="font-display text-lg font-semibold">{n}</p><p className="text-muted-foreground">{r}</p></div>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6"><T>{"[Add bios and photos with each person's permission.]"}</T></p>
      </Section>
      <Section tone="dark" labelledBy="run">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <span className="icon-ring text-gold"><Landmark aria-hidden /></span>
          <div>
            <H2 id="run" onDark>How we are run</H2>
            <p className="mt-4 max-w-3xl text-ink-muted">An independent Board with committees for finance, education, grants, governance, and risk and safeguarding. Written policies on conflicts of interest and related parties. Executive Director pay set by disinterested directors.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
