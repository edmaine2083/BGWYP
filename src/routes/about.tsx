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
const PEOPLE: { name: string; role: string; bio: string | string[]; photo?: string; focus?: string }[] = [
  {
    name: "Edward J. Shepard, MBA",
    role: "Founder & Executive Director",
    photo: "/edward-shepard.jpg",
    focus: "object-[center_8%]",
    bio: [
      "Edward J. Shepard, MBA, is a strategist and community leader with over two decades of experience spanning municipal government, corporate enterprise, and the entertainment industry. Throughout his career—which includes directing local government strategy and advising national brands—he has specialized in building sustainable infrastructure, driving operational compliance, and expanding economic opportunity.",
      "As the owner of EJS Consultation Agency LLC, he guides organizations across executive operations, human resources, sales, and marketing. He also serves on the Board of Directors for the Community Law Center. Through BGWYP, Edward channels his expertise into equipping Baltimore’s youth with the financial knowledge, career strategy, and mentorship needed to build lasting economic legacies.",
    ],
  },
  {
    name: "Tamara Robinson",
    role: "Interim Chair of the Board",
    photo: "/tamara-robinson.jpg",
    bio: "Tamara Robinson serves as Interim Chair of the Board of Building Generational Wealth Youth Program, Inc. A nonprofit finance leader, she brings experience in financial oversight, governance, compliance, and administration. She is committed to helping BGWYP build a strong foundation while giving young people the tools to make informed financial decisions and build generational wealth.",
  },
  {
    name: "Dr. Stacy Shepard",
    role: "Secretary and Education Chair",
    photo: "/stacy-shepard.jpg",
    bio: "Dr. Stacy Shepard is an award-winning educational leader, Executive Director-Superintendent, speaker, author, pastor, and founder of AriseNOW, LLC. With nearly two decades of experience in education, she is passionate about developing leaders, empowering others, and creating learning environments where every child and adult can thrive. Outside of work, Stacy enjoys writing, traveling, trying new experiences, and spending quality time with family and friends. She believes that faith, service, and lifelong learning are the foundation of a meaningful life.",
  },
  {
    name: "Gerald Green",
    role: "Procurement & Grants Chair",
    bio: "Gerald Green is Deputy Director at Events DC, where he has led contracts and procurement work since 2022. He rose from Senior Contracts and Procurement Analyst to Manager of Contracts and Procurement before stepping into his current role. Earlier in his career he worked at Doctors Community Hospital and Prince George's Community College, building expertise in purchasing, supply chain and materials management, budgets, and contract negotiation. He holds a Bachelor of Business Administration from Strayer University and an associate degree from Prince George's Community College. As Procurement & Grants Chair, he guides BGWYP's grant strategy and makes sure every dollar is spent responsibly.",
  },
  {
    name: "Ja-Mel Johnson",
    role: "Chair, Governance Committee",
    photo: "/ja-mel-johnson.jpg",
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
          <blockquote className="mt-6 border-l-2 border-gold pl-5">
            <p className="text-lg text-gold-deep md:text-xl">“We believe it is irresponsible to pressure young people to be better without providing the tools and infrastructure to become better.”</p>
            <footer className="mt-3 text-base not-italic text-foreground">— <cite className="not-italic">Edward J. Shepard</cite></footer>
          </blockquote>
          <div className="mt-6 space-y-4">
            <p>Edward J. Shepard, MBA, founded Building Generational Wealth Youth Program in 2026 on that belief.</p>
            <p>In Baltimore, nearly 3 in 10 children grow up in poverty, almost three times the rate across Maryland. One in six young adults is out of school, out of work, and without education beyond high school. And nationwide, Gen Z answers only 38% of basic personal finance questions correctly, lower than any other generation.</p>
            <p>We tell young people to save, to stay out of debt, and to plan for the future. But Maryland does not require a standalone personal finance course to graduate high school, and a 2026 effort to change that stalled in committee. Too few young people are ever shown how; we are setting them up for failure.</p>
            <p>Over 20 years in government, entertainment, and corporate business, Edward learned that success is built on three things: knowledge, discipline, and the right people around you. He founded BGWYP to give Baltimore’s young people all three.</p>
            <p>BGWYP teaches young people ages 11 to 24 how money, work, and ownership really function. They build real budgets, resumes, and plans for their future, guided by mentors who stay with them every step of the way.</p>
            <p>We don’t just expect more from our young people. We invest in them.</p>
            <p className="pt-2 font-display text-gold-deep">
              <span className="block sm:inline">Educate. Empower. Elevate.</span>{" "}
              <span className="block sm:inline">Build Legacies.</span>
            </p>
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
                <div className="mt-4 space-y-4">
                  {(Array.isArray(bio) ? bio : [bio]).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
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
