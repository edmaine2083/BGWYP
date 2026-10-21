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
const PEOPLE: { name: string; role: string; bio: string; photo?: string; focus?: string }[] = [
  {
    name: "Edward J. Shepard, MBA",
    role: "Founder, President & Executive Director",
    photo: "/edward-shepard.jpg",
    focus: "object-[center_20%]",
    bio: "Edward J. Shepard, MBA, is the founder, President, and Executive Director of BGWYP and a strategist with more than 20 years of leadership across government, entertainment, and corporate business. As Founder and Principal Consultant of EJS Consulting Agency, he has advised more than 100 organizations on strategy, operations, finance, and workforce development, and he now brings that discipline to building generational wealth for Baltimore's young people.",
  },
  {
    name: "Dr. Stacy Shepard",
    role: "Secretary and Education Chair",
    photo: "/stacy-shepard.jpg",
    bio: "Dr. Stacy Shepard is an award-winning educational leader, Executive Director-Superintendent, speaker, author, pastor, and founder of AriseNOW, LLC. With nearly two decades of experience in education, she is passionate about developing leaders, empowering others, and creating learning environments where every child and adult can thrive. Outside of work, Stacy enjoys writing, traveling, trying new experiences, and spending quality time with family and friends. She believes that faith, service, and lifelong learning are the foundation of a meaningful life.",
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
            <p>Every young person in Baltimore has been told to do better. Save more. Plan ahead. Stay out of debt.</p>
            <p>Very few have been shown how.</p>
            <p>Building Generational Wealth Youth Program was founded in 2026 by Edward J. Shepard, MBA, on a simple belief: it’s irresponsible to pressure young people to be better without helping them become better.</p>
            <p>So we help. Young people ages 11 to 24 build real budgets, resumes, and plans for their future. They meet mentors, see real workplaces, and learn how money, work, and ownership truly work, with adults who stay with them for years, not weeks.</p>
            <p className="pt-2 text-lg text-gold-deep">Because talent is everywhere in Baltimore. Opportunity should be too.</p>
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
          {PEOPLE.map(({ name, role, bio, photo, focus }) => (
            <li key={name}>
              <Card className="h-full">
                <div className="flex items-center gap-4">
                  {photo ? (
                    <img src={photo} alt="" width={80} height={80} className={`h-20 w-20 shrink-0 rounded-full border-2 border-gold object-cover ${focus ?? "object-[center_18%]"}`} />
                  ) : (
                    <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-gold bg-ink font-display text-xl text-gold">{initials(name)}</span>
                  )}
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
