import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Hammer, Users } from "lucide-react";
import { LOGO_SRC, SUPPORT_HREF } from "@/config";
import { seo } from "@/lib/seo";
import { Card, H2, Reveal, Section } from "@/components/site/ui";
import { Skyline } from "@/components/site/Skyline";

export const Route = createFileRoute("/")({
  head: () =>
    seo("/", "BGWYP | Money Skills & Career Paths for Baltimore Youth",
      "Building Generational Wealth Youth Program teaches Baltimore young people ages 11 to 24 how money, work, and ownership really work."),
  component: Home,
});

const STATEMENTS = [
  { icon: BookOpen, t: "Learn.", d: "Age-matched financial education in four stages." },
  { icon: Hammer, t: "Build.", d: "Real work: a budget, a resume, a college or job packet, a plan." },
  { icon: Users, t: "Lead.", d: "Mentors, shadows, and a community that stays." },
];
const PROOF = [
  ["60", "young people in our first cohort"],
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
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/programs" className="btn btn-gold">See our programs</Link>
              <a href={SUPPORT_HREF} className="btn btn-outline-gold">Support the first cohort</a>
            </div>
          </div>
          <img src={LOGO_SRC} alt="BGWYP emblem: a gold tree growing from an open book above youth silhouettes, with the program name and motto"
            width={400} height={400} fetchPriority="high" className="mx-auto w-72 md:w-full md:max-w-md" />
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
        <Reveal className="mx-auto max-w-3xl text-center">
          <H2 id="why">Why it matters</H2>
          <div className="gold-rule mx-auto my-6 w-32" />
          <p className="text-xl">
            Nearly 3 in 10 Baltimore children ages 6 to 17 live in poverty. Wealth starts with early decisions and trusted guides. We help young people make those decisions on purpose.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Source: Annie E. Casey Foundation, 2023 data.</p>
        </Reveal>
      </Section>

      <Section labelledBy="cta">
        <div className="rounded-xl border-2 border-gold p-8 text-center md:p-12">
          <H2 id="cta">Help us launch our first cohort.</H2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">Give, sponsor a seat, host a shadow, or introduce us to a partner.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/get-involved" className="btn btn-gold">Get involved</Link>
            <Link to="/partner" className="btn btn-outline-deep">Partner with us</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
