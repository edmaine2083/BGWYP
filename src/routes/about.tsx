import { createFileRoute } from "@tanstack/react-router";
import { Scale, TrendingUp, ShieldCheck, Home, Sprout, Landmark } from "lucide-react";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Reveal, Section } from "@/components/site/ui";

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
  {
    name: "Edward J. Shepard, MBA",
    role: "Founder, President & Executive Director",
    bio: "Edward J. Shepard, MBA, is the founder, President, and Executive Director of BGWYP and a strategist with more than 20 years of leadership across government, entertainment, and corporate business. As Founder and Principal Consultant of EJS Consulting Agency, he has advised more than 100 organizations on strategy, operations, finance, and workforce development, and he now brings that discipline to building generational wealth for Baltimore's young people.",
  },
  {
    name: "Dr. Stacy Shepard",
    role: "Secretary and Education Chair",
    bio: "Dr. Stacy Shepard is an award-winning educational leader with nearly two decades of experience in schools and community leadership. She serves as Executive Director-Superintendent of Evergreen Community Charter School and is the founder and CEO of AriseNOW. She holds a Ph.D. in Educational Leadership and Administration from Capella University. As Education Chair, she guides BGWYP's curriculum and education strategy.",
  },
  {
    name: "Tamara Robinson",
    role: "Treasurer and Finance Chair",
    bio: "Tamara Robinson serves as BGWYP's Treasurer and Finance Chair, leading the Board's financial stewardship and fiscal oversight.",
  },
  {
    name: "Gerald Green",
    role: "Procurement & Grants Chair",
    bio: "Gerald Green serves as BGWYP's Procurement & Grants Chair, guiding the organization's grant strategy and responsible procurement.",
  },
  {
    name: "Ja-Mel Johnson",
    role: "Chair, Governance Committee",
    bio: "Ja-Mel Johnson is Chief Operating Officer of the Baltimore Office of Promotion & The Arts, where he has also led human resources since 2021. He brings more than a decade of experience building strong systems and strong teams across Baltimore and New York. As Chair of the Governance Committee, he helps keep BGWYP's policies and Board practices strong.",
  },
  {
    name: "Daniel M. Wilkins",
    role: "Chair, Risk & Safeguarding Committee",
    bio: "Daniel M. Wilkins has served with the Federal Aviation Administration since 2013 as an Implementation Lead for deployment and logistics. His career includes leading security and access control for major national events and serving on Capitol Hill with the House Committee on Homeland Security. He holds a B.A. in Political Science from UNC Chapel Hill. As Chair of the Risk & Safeguarding Committee, he leads the Board's oversight of youth safety.",
  },
];
const initials = (n: string) => n.replace(/^Dr\.\s/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w) && !w.endsWith(".") && w !== "MBA").map((w) => w.charAt(0)).slice(0, 2).join("");

function About() {
  return (
    <>
      <PageHero title="About" intro="Who we are and what we believe." />
      <Section labelledBy="mission">
        <Reveal className="max-w-3xl">
          <H2 id="mission">Our mission</H2>
          <p className="mt-4">To equip Baltimore youth and young adults ages 11 through 24 with financial knowledge, career strategy, mentorship, professional exposure, negotiation skills, and asset-building discipline to increase economic mobility in historically underserved communities.</p>
        </Reveal>
        <Reveal className="mt-14 max-w-3xl">
          <H2>Our story</H2>
          <div className="mt-4 space-y-4">
            <p>Edward J. Shepard, MBA, founded Building Generational Wealth Youth Program in 2026 on that belief.</p>
            <p>In Baltimore, nearly 3 in 10 children grow up in poverty. We tell young people to save, to stay out of debt, to plan for the future. But few are ever shown how. Over 20 years in government, entertainment, and corporate business, Edward learned that success is built on knowledge, discipline, and the right people around you. So he set out to give Baltimore youth all three.</p>
            <p>BGWYP teaches young people ages 11 to 24 how money, work, and ownership really function. They build real budgets, resumes, and plans for their future, with mentors who stay with them along the way.</p>
            <p>We don't just expect more from our young people. We invest in them.</p>
            <p className="font-display text-gold-deep">Educate. Empower. Elevate. Build Legacies.</p>
          </div>
        </Reveal>
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
        <ul className="mt-8 grid gap-6 lg:grid-cols-2">
          {PEOPLE.map(({ name, role, bio }) => (
            <li key={name}>
              <Card className="h-full">
                <div className="flex items-center gap-4">
                  <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-gold bg-ink font-display text-xl text-gold">{initials(name)}</span>
                  <div>
                    <p className="font-display text-lg font-semibold">{name}</p>
                    <p className="text-muted-foreground">{role}</p>
                  </div>
                </div>
                <p className="mt-4">{bio}</p>
              </Card>
            </li>
          ))}
        </ul>
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
