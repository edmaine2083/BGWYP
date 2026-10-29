import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Hammer, Users } from "lucide-react";
import { SUPPORT_HREF } from "@/config";
import { seo } from "@/lib/seo";
import { AnimatedLogo } from "@/components/site/AnimatedLogo";
import { Card, H2, Reveal, Section } from "@/components/site/ui";
import { Skyline } from "@/components/site/Skyline";

export const Route = createFileRoute("/")({
  head: () => {
    const head = seo(
      "/",
      "BGWYP | Money Skills & Career Paths for Baltimore Youth",
      "Building Generational Wealth Youth Program teaches Baltimore young people ages 11 to 24 how money, work, and ownership really work.",
    );
    return {
      ...head,
      links: [
        ...(head.links ?? []),
        { rel: "preload", as: "image", href: "/bgwyp-logo-hero.webp" },
      ],
    };
  },
  component: Home,
});

const STATEMENTS = [
  { icon: BookOpen, t: "Learn.", d: "Age-matched financial education in four stages." },
  { icon: Hammer, t: "Build.", d: "Real work: a budget, a resume, a college or job packet, a plan." },
  { icon: Users, t: "Lead.", d: "Mentors, shadows, and a community that stays." },
];
const WAITING_STATS: [string, string, string, string?][] = [
  ["Fewer than half", "of Baltimore City graduates enroll in college the fall after high school.", "1"],
  [
    "16 out of about 4,300",
    "Baltimore City Schools graduates about 4,300 students a year, but only 16 started a youth apprenticeship in 2023–24.",
    "2",
  ],
  [
    "1 in 3 vs. 3 in 4",
    "Nearly 3 in 4 Baltimoreans are people of color, but only about 1 in 3 of the city’s businesses with employees is minority-owned. Ownership is a path to wealth that too few young people are ever shown.",
    "3",
    "Ownership gap",
  ],
  [
    "27 points",
    "the credit score gain young adults saw when Georgia required personal finance education in high school.",
    "4",
  ],
];
const PROOF = [
  ["60", "seats in our first cohort"],
  ["6-week", "Summer Accelerator"],
  ["Monthly", "sessions all school year"],
  ["Screened", "and trained adults only"],
] as [string, string, ...string[]][];

function Home() {
  return (
    <>
      <section className="band-dark relative overflow-hidden px-5 pt-16 pb-0 md:pt-24" aria-labelledby="hero-h">
        <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-display text-sm tracking-[0.25em] text-gold">EDUCATE. EMPOWER. ELEVATE. BUILD LEGACIES.</p>
            <h1 id="hero-h" className="mt-5 text-3xl text-ink-foreground md:text-5xl">
              Money skills. Career paths. Real ownership. <span className="text-gold">For Baltimore youth.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">
              Building Generational Wealth Youth Program teaches young people ages 11 to 24 how money, work, and ownership really work, and stays with them for years.
            </p>
            <p className="mt-4 max-w-xl text-gold">Now forming our first cohort — dates and location coming soon.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/programs" className="btn btn-gold">See our programs</Link>
              <a href={SUPPORT_HREF} className="btn btn-outline-gold">Get Notified</a>
            </div>
          </div>
          <div className="mx-auto w-72 md:w-full md:max-w-md">
            <AnimatedLogo />
          </div>
        </div>
        <Skyline className="relative mx-auto mt-12 block w-full max-w-6xl text-gold/50" />
      </section>

      <Section labelledBy="pillars">
        <h2 id="pillars" className="sr-only">What young people do</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {STATEMENTS.map(({ icon: Icon, t, d }) => (
            <Reveal key={t}>
              <Card className="h-full text-center">
                <span className="icon-ring"><Icon aria-hidden /></span>
                <h3 className="mt-4 text-2xl text-gold-deep">{t}</h3>
                <p className="mt-2">{d}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="band-dark border-y border-gold/40 px-5 py-12" aria-label="At a glance">
        <ul className="mx-auto grid max-w-6xl gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {PROOF.map(([a, b]) => (
            <li key={b}>
              <p className="font-display text-3xl text-gold">{a}</p>
              <p className="mt-1 text-ink-muted">{b}</p>
            </li>
          ))}
        </ul>
      </section>

      <Section tone="paper" labelledBy="why">
        <Reveal className="mx-auto max-w-5xl text-center">
          <H2 id="why">The cost of waiting is too high.</H2>
          <div className="gold-rule mx-auto my-6 w-32" />
          <ul className="grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
            {WAITING_STATS.map(([title, body, note, label]) => (
              <li key={note}>
                <Card className="h-full">
                  {label ? <p className="text-sm font-semibold tracking-wide text-gold-deep">{label}</p> : null}
                  <h3 className={`font-display text-2xl uppercase tracking-wide text-gold-deep md:text-3xl${label ? " mt-2" : ""}`}>{title}</h3>
                  <p className="mt-3 text-base">
                    {body}
                    <sup>{note}</sup>
                  </p>
                </Card>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-3xl">
            <p className="mt-10 text-lg">
              College, the skilled trades, and business ownership are all paths to building wealth,
              but most young people are never shown how to weigh them, pay for them, or start down
              any of them. Too many graduate with no plan and learn about money the hard way, one
              costly mistake at a time.
            </p>
            <p className="mt-4 text-lg">
              <span className="font-semibold text-gold-deep">It doesn’t have to be this way.</span>{" "}
              When young people are taught how money works, the results follow. BGWYP helps young
              people compare college, apprenticeships, and entrepreneurship by real cost and real
              return. Then we help them take the next step with a financial aid application, a trade
              pathway, or a business plan, alongside mentors who stay with them for years. Our
              participants don’t just get by. They build plans, build wealth, and build legacies on
              purpose.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Sources: <sup>1</sup> Baltimore Education Research Consortium, 2023. <sup>2</sup>{" "}
              Abell Foundation, 2024. <sup>3</sup> U.S. Census Bureau, Annual Business Survey (2023 data) and Population Estimates (Vintage 2025), via{" "}
              <a href="https://www.census.gov/quickfacts/fact/table/baltimorecitycountymaryland/HSG445223" className="underline">QuickFacts.</a>{" "}
              <sup>4</sup> Urban et
              al., Economics of Education Review (2018).
            </p>
          </div>
        </Reveal>
      </Section>

      <Section labelledBy="cta">
        <div className="rounded-xl border-2 border-gold p-8 text-center md:p-12">
          <H2 id="cta">Help us launch our first cohort.</H2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">Join the launch list, host a shadow, or introduce us to a partner.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/get-involved" className="btn btn-gold">Get involved</Link>
            <Link to="/partner" className="btn btn-outline-deep">Partner with us</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
