import { createFileRoute } from "@tanstack/react-router";
import { Scale, TrendingUp, ShieldCheck, Home, Sprout, Landmark } from "lucide-react";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Photo, Section } from "@/components/site/ui";
import { PHOTOS } from "@/content/photos";

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
const PEOPLE: { name: string; role: string; bio: string | string[]; photo?: string; focus?: string; frame?: { transform: string; transformOrigin: string } }[] = [
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
    bio: [
      "Tamara Robinson serves as Interim Chair of the Board of Building Generational Wealth Youth Program, Inc., where she leads the Board through the organization’s founding stage. A nonprofit finance leader, she brings hands-on experience in financial oversight, governance, compliance, and administration, the disciplines that keep a young organization accountable to the families, partners, and funders who trust it.",
      "As Interim Chair, Tamara guides the Board’s work to put strong systems in place before BGWYP welcomes its first cohort. That work includes sound financial controls, clear policies, and careful stewardship of every dollar. She believes that the habits BGWYP teaches young people, such as budgeting with intention, planning ahead, and making informed financial decisions, should also guide how the organization itself is run.",
      "Tamara is committed to helping BGWYP build a lasting foundation and to giving Baltimore’s young people the knowledge and confidence to manage money wisely, create opportunity, and build generational wealth for their families and communities.",
    ],
  },
  {
    name: "Dr. Stacy Shepard",
    role: "Secretary and Education Chair",
    photo: "/stacy-shepard.jpg",
    bio: "Dr. Stacy Shepard is an award-winning educational leader, Executive Director-Superintendent, speaker, author, pastor, and founder of AriseNOW, LLC. With nearly two decades of experience in education, she is passionate about developing leaders, empowering others, and creating learning environments where every child and adult can thrive. Outside of work, Stacy enjoys writing, traveling, trying new experiences, and spending quality time with family and friends. She believes that faith, service, and lifelong learning are the foundation of a meaningful life.",
  },
  {
    name: "Dr. Frederick V. Engram Jr.",
    role: "Director, Education Committee",
    photo: "/frederick-engram.jpg",
    focus: "object-[center_18%]",
    frame: { transform: "scale(1.28)", transformOrigin: "center 34%" },
    bio: [
      "Dr. Frederick V. Engram Jr. is an Assistant Professor of Higher Education at Fairleigh Dickinson University, a critical scholar, an author, and an advocate for legal education. His research and teaching examine how race and racism shape higher education systems and the law. His work focuses on how structural racism operates within institutions, and on how African Americans navigate and make sense of anti-Black racism in academic settings and in society at large.",
      "Dr. Engram is the author of Black Liberation Through Action and Resistance: MOVE (Rowman & Littlefield). His commentary has appeared in Forbes, Blavity, and Diverse Issues in Higher Education (now EDU Ledger). A sought-after speaker on equity and the future of higher education, he delivered the opening keynote at the 57th annual conference of the Northeastern Educational Research Association.",
      "He earned his Doctor of Education from Northeastern University’s College of Professional Studies, where he received the Innovative Academic Excellence Award. He also holds a B.A. from Johnson C. Smith University and a master’s degree from the University of Phoenix. He is currently seeking his sports law degree in compliance at Seton Hall University School of Law. He was inducted into the Martin Luther King Jr. International Chapel Collegium of Scholars at Morehouse College by Founding Dean Rev. Dr. Lawrence Edward Carter Sr.",
      "On BGWYP’s Education Committee, Dr. Engram helps ensure that the program prepares Baltimore’s young people to navigate the institutions that shape their futures, from the classroom to college to their careers.",
    ],
  },
  {
    name: "Gerald Green",
    role: "Procurement & Grants Chair",
    photo: "/gerald-green.jpg",
    focus: "object-[center_22%]",
    bio: "Gerald Green is Deputy Director at Events DC, where he has led contracts and procurement work since 2022. He rose from Senior Contracts and Procurement Analyst to Manager of Contracts and Procurement before stepping into his current role. Earlier in his career he worked at Doctors Community Hospital and Prince George's Community College, building expertise in purchasing, supply chain and materials management, budgets, and contract negotiation. He holds a Bachelor of Business Administration from Strayer University and an associate degree from Prince George's Community College. As Procurement & Grants Chair, he guides BGWYP's grant strategy and makes sure every dollar is spent responsibly.",
  },
  {
    name: "Ja-Mel Johnson",
    role: "Chair, Governance Committee",
    photo: "/ja-mel-johnson.jpg",
    bio: [
      "Ja-Mel Johnson is an operations and human resources leader who has built his career on strong systems and strong teams. He is Chief Operating Officer of Create Baltimore (formerly the Baltimore Office of Promotion & The Arts), the city’s arts council and events agency, where he has also served as Human Resources Director since 2021. In that work he helps one of Baltimore’s best-known cultural institutions run smoothly behind the scenes, from staffing and workforce strategy to day-to-day operations.",
      "Before coming to Baltimore, Ja-Mel spent nearly a decade with human services organizations in New York. He rose from senior recruiter to recruiting supervisor, senior talent acquisition specialist and human resources manager, and built deep expertise in hiring, retention and creating workplaces where people can do their best work. He also holds a certification in Diversity, Equity, and Inclusion.",
      "As Chair of BGWYP’s Governance Committee, Ja-Mel makes sure the organization’s policies, Board practices and operations meet the standards that families, partners and funders expect. He brings both structure and care to the Board’s work, so BGWYP grows on a foundation built to last.",
    ],
  },
  {
    name: "Daniel M. Wilkins",
    role: "Chair, Risk & Safeguarding Committee",
    photo: "/daniel-wilkins.jpg",
    bio: [
      "Daniel M. Wilkins brings more than 15 years of experience in federal service, security planning and large-scale operations. Since 2013 he has served with the Federal Aviation Administration as an Implementation Lead for the deployment and logistics of the Standard Terminal Automation Replacement System (STARS), the technology air traffic controllers use to keep the nation’s airspace safe.",
      "Daniel has led security for some of the country’s most visible events. As Deputy Director of Access Control for the 2013 Presidential Inaugural Committee, he built the credentialing and clearance process for more than 3,000 officials and VIPs and directed a team of 13 coordinators. As Security Manager for the 2012 Democratic National Convention, he oversaw safety and security planning at Bank of America Stadium and Charlotte Douglas International Airport and recruited and supervised 1,500 volunteers. On Capitol Hill, he served as Special Assistant and Legislative Correspondent for Congressman G.K. Butterfield and as Subcommittee Clerk for the House Committee on Homeland Security.",
      "Daniel holds a B.A. in Political Science from the University of North Carolina at Chapel Hill. As Chair of BGWYP’s Risk & Safeguarding Committee, he leads the Board’s oversight of youth safety and risk management. He brings a planner’s discipline and a protector’s instinct to making sure every young person in the program is safe, supported and set up to succeed.",
    ],
  },
];
const initials = (n: string) => n.replace(/^Dr\.\s/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w) && !w.endsWith(".") && w !== "MBA").map((w) => w.charAt(0)).slice(0, 2).join("");

function About() {
  return (
    <>
      <PageHero title="About" intro="Who we are and what we believe." />
      <Section labelledBy="mission">
        <div className="max-w-3xl">
          <H2 id="mission">Our mission</H2>
          <p className="mt-4">To equip Baltimore youth and young adults ages 11 through 24 with financial knowledge, career strategy, mentorship, professional exposure, negotiation skills, and asset-building discipline to increase economic mobility in historically underserved communities.</p>
        </div>
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
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
          </div>
          <Photo src={PHOTOS.conversation.src} alt={PHOTOS.conversation.alt} width={PHOTOS.conversation.width} height={PHOTOS.conversation.height} className="rounded-xl" />
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
        <ul className="mt-8 grid gap-6 lg:grid-cols-2">
          {PEOPLE.map(({ name, role, bio, photo, focus, frame }) => (
            <li key={name}>
              <Card className="h-full">
                <div className="flex items-center gap-4">
                  {photo ? (
                    <span className="grid h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-gold">
                      <img src={photo} alt="" width={80} height={80} style={frame} className={`h-full w-full object-cover ${focus ?? "object-[center_18%]"}`} />
                    </span>
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
      <Section labelledBy="where">
        <H2 id="where">Where we are</H2>
        {/* TODO(BGWYP): confirm date July 9, 2026 */}
        <ol className="mx-auto mt-8 max-w-2xl border-l-2 border-gold">
          {[
            ["Incorporated as a Maryland nonprofit", "Done", "Date to be announced."],
            ["Board of Directors seated", "Done", ""],
            ["Website and bgwyp.org email live", "Done", ""],
            ["Community surveys open", "Done", ""],
            ["Federal 501(c)(3) application", "Pending", ""],
            ["Maryland charitable solicitation registration", "In progress", ""],
            ["Partners and program sites", "In progress", ""],
            ["First cohort of 60 announced", "Coming", ""],
          ].map(([label, state, note]) => (
            <li key={label} className="relative py-4 pl-8">
              <span aria-hidden className="absolute top-6 -left-[7px] h-3 w-3 rounded-full border-2 border-gold bg-background" />
              <p className="font-semibold">{label}</p>
              <p className="text-sm font-semibold text-gold-deep">
                {state}
                {note ? <span className="font-normal text-foreground">. {note}</span> : null}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
