import { createFileRoute, Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ArrowDown,
  ArrowRight,
  Award,
  CalendarDays,
  ChevronDown,
  Compass,
  Video,
} from "lucide-react";
import { ENROLLMENT_OPEN } from "@/config";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Photo, Section } from "@/components/site/ui";
import { InterestForm } from "@/components/site/site-forms";
import { SummerAccelerator } from "@/components/programs/SummerAccelerator";
import { PHOTOS } from "@/content/photos";

const STAGES: {
  name: string;
  who: string;
  question: string;
  summary: string;
  learn: string[];
  build: string[];
  readyLabel: string;
  ready: string;
  photo: (typeof PHOTOS)[keyof typeof PHOTOS];
  ageRange: "11–13" | "14–15" | "16–17" | "18–24";
}[] = [
  {
    name: "Foundations",
    who: "Grades 6–8",
    question: "How does money work, and where do I fit?",
    summary:
      "Young people build healthy money habits early and discover the people and places in their own neighborhood that can help them grow.",
    learn: [
      "Needs vs. wants, and how to make a simple spending plan",
      "Saving for a goal and why starting early matters",
      "How banks work and how to keep money safe",
      "How everyday businesses in their community make money",
    ],
    build: [
      "A budget starter",
      "A trusted-adult map: the people they can turn to for guidance",
      "A map of opportunity in their neighborhood",
    ],
    readyLabel: "Ready for next:",
    ready: "Confident with the basics, and connected to adults who have their back.",
    photo: PHOTOS.foundations,
    ageRange: "11–13",
  },
  {
    name: "Exploration",
    who: "Grades 9–10",
    question: "What could my future look like, and what will it pay?",
    summary:
      "Teens explore careers, meet professionals, and learn how a paycheck really works before their first job.",
    learn: [
      "Career pathways, and the education and income each one leads to",
      "Reading a paystub: taxes, deductions, and take-home pay",
      "How credit works and how to protect it",
      "Professional skills: introductions, interviews, and networking",
    ],
    build: [
      "A first resume",
      "A mentor connection",
      "A side-by-side comparison of career pathways",
      "A clear understanding of their paystub",
    ],
    readyLabel: "Ready for next:",
    ready: "A resume in hand, a mentor in their corner, and a direction to explore.",
    photo: PHOTOS.exploration,
    ageRange: "14–15",
  },
  {
    name: "Mastery",
    who: "Grades 11–12",
    question: "What’s my plan after high school, and is it worth the cost?",
    summary:
      "Juniors and seniors turn exploration into a real plan and compare college, careers, and training by what each will truly cost and return.",
    learn: [
      "Comparing college, trade, and career options by cost and long-term return",
      "Scholarships, financial aid, and avoiding unnecessary debt",
      "Understanding job offers, benefits, and negotiating pay",
      "Investing basics and the power of compound growth",
    ],
    build: [
      "A scholarship or job application packet",
      "A benefits analysis of a real job offer",
      "A return-on-investment comparison of their postsecondary options",
      "A 5- or 10-year personal roadmap",
    ],
    readyLabel: "Ready for next:",
    ready: "Graduating with a plan, not just a diploma.",
    photo: PHOTOS.mastery,
    ageRange: "16–17",
  },
  {
    name: "Transition-Age",
    who: "Ages 18–24",
    question: "How do I stand on my own and help others rise?",
    summary:
      "Young adults put their plans into action as they move toward independence, with support that doesn’t end at graduation.",
    learn: [
      "Living independently: rent, bills, and emergency savings",
      "Building and repairing credit",
      "Growing income through raises, promotions, or a business",
      "Owning assets: homeownership, business ownership, and building wealth",
    ],
    build: [
      "An independent living budget",
      "30-, 60-, and 90-day check-ins with their mentor on goals and progress",
      "Leadership experience as a near-peer mentor to younger participants",
    ],
    readyLabel: "The goal:",
    ready: "Financial independence, and a legacy to pass on.",
    photo: PHOTOS.transition,
    ageRange: "18–24",
  },
];

const AGE_RANGES = ["11–13", "14–15", "16–17", "18–24"] as const;
const PROGRAM_KEYS = ["pathway", "summer", "school-year", "both"] as const;
const PROGRAM_LABELS = {
  pathway: "Full pathway (Summer Accelerator + School-Year Program)",
  both: "Full pathway (Summer Accelerator + School-Year Program)",
  summer: "Summer Accelerator only",
  "school-year": "School-Year Program only",
} as const;

const COMPARE = [
  [
    "Role in the pathway",
    "Launch: the immersive start of the journey",
    "Continue: the year-long momentum that follows",
  ],
  ["When", "Phase 1 · 6 weeks in the summer", "Phase 2 · September through May"],
  ["Pace", "Intensive and immersive", "Steady and ongoing"],
  ["Time", "24 days · 96 hours", "3 touchpoints a month"],
  [
    "What happens",
    "Each participant's stage curriculum, week by week, ending in a Showcase",
    "Saturday workshops, hands-on labs and exposure visits, and monthly virtual check-ins with mentors",
  ],
  [
    "What it builds",
    "Skills, confidence, and a personal plan",
    "Practice, deeper skills, and lasting relationships with mentors and peers",
  ],
] as const;

const SCHOOL_YEAR = [
  {
    icon: CalendarDays,
    title: "First Saturday Workshop",
    text: "A monthly hands-on session that builds on the curriculum.",
  },
  {
    icon: Compass,
    title: "Second Saturday Lab or Exposure Visit",
    text: "Practice skills in a lab, or visit a workplace, bank, or college to see opportunity up close.",
  },
  {
    icon: Video,
    title: "Monthly Virtual Check-In",
    text: "A short online checkpoint with mentors to track goals and keep momentum.",
  },
];

export const Route = createFileRoute("/programs")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    age?: (typeof AGE_RANGES)[number];
    program?: (typeof PROGRAM_KEYS)[number];
  } => {
    const age = typeof search["age"] === "string" ? search["age"] : "";
    const program = typeof search["program"] === "string" ? search["program"] : "";
    return {
      ...(AGE_RANGES.includes(age as (typeof AGE_RANGES)[number])
        ? { age: age as (typeof AGE_RANGES)[number] }
        : {}),
      ...(PROGRAM_KEYS.includes(program as (typeof PROGRAM_KEYS)[number])
        ? { program: program as (typeof PROGRAM_KEYS)[number] }
        : {}),
    };
  },
  head: () =>
    seo(
      "/programs",
      "Programs",
      "One connected pathway for Baltimore youth ages 11 to 24: a six-week Summer Accelerator launch, followed by year-long School-Year Program sessions, across four age-matched stages.",
    ),
  component: Programs,
});

function Programs() {
  const { age, program } = Route.useSearch();
  const presetProgram = program ? PROGRAM_LABELS[program] : PROGRAM_LABELS.pathway;
  return (
    <>
      <PageHero title="Programs" intro="What young people do and when." />
      <Section labelledBy="glance">
        <H2 id="glance">At a glance</H2>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <dt className="font-display text-gold-deep">Who</dt>
            <dd className="mt-2">Baltimore youth ages 11–24</dd>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <dt className="font-display text-gold-deep">Cohort size</dt>
            <dd className="mt-2">60 seats (first cohort)</dd>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <dt className="font-display text-gold-deep">Phase 1: Summer Accelerator</dt>
            <dd className="mt-2">6 weeks — dates to be announced</dd>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <dt className="font-display text-gold-deep">Phase 2: School-Year Program</dt>
            <dd className="mt-2">
              3 touchpoints a month, September–May. Start year to be announced.
            </dd>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <dt className="font-display text-gold-deep">Location</dt>
            <dd className="mt-2">To be announced</dd>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <dt className="font-display text-gold-deep">Cost to families</dt>
            <dd className="mt-2">Free</dd>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <dt className="font-display text-gold-deep">How spots are filled</dt>
            <dd className="mt-2">
              To be announced
              {/* TODO(BGWYP): selection process */}
            </dd>
          </div>
        </dl>
        <p className="mt-6 max-w-3xl text-lg">
          Join the{" "}
          <a href="#enroll" className="font-semibold text-gold-deep underline">
            interest list
          </a>{" "}
          and we'll contact you when dates and location are set.
        </p>
      </Section>
      <Section labelledBy="stages">
        <H2 id="stages">Four stages. One path to ownership.</H2>
        <p className="mt-4 max-w-3xl text-lg">
          Every young person enters at the stage that fits their grade or age and grows with us from
          there.
        </p>
        <Accordion.Root type="single" collapsible className="mt-10 space-y-8">
          {STAGES.map((stage, index) => (
            <Accordion.Item key={stage.name} value={stage.name} className="relative md:pl-20">
              {index < STAGES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-14 left-7 hidden h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-gold md:block"
                />
              )}
              <span
                aria-hidden
                className="absolute top-0 left-0 z-10 hidden h-14 w-14 place-items-center rounded-full border-2 border-gold bg-gold font-display text-xl text-ink md:grid"
              >
                {index + 1}
              </span>
              <Card>
                <Photo
                  src={stage.photo.src}
                  alt={stage.photo.alt}
                  width={stage.photo.width}
                  height={stage.photo.height}
                  className="mb-5"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-gold bg-gold font-display text-lg text-ink md:hidden"
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-xl text-gold-deep">
                    <span className="sr-only">Stage {index + 1}. </span>
                    {stage.name}
                  </h3>
                  <p className="rounded-full border border-gold bg-paper px-3 py-1 text-sm font-semibold">
                    {stage.who}
                  </p>
                </div>
                <p className="mt-4 font-[Georgia,serif] text-lg italic text-gold-deep">
                  “{stage.question}”
                </p>
                <p className="mt-3">{stage.summary}</p>
                <Link
                  to="/programs"
                  search={{ age: stage.ageRange }}
                  hash="enroll"
                  className="btn btn-outline-deep mt-5"
                >
                  Join the interest list for ages {stage.ageRange}
                </Link>
                <Accordion.Header asChild>
                  <div className="mt-5">
                    <Accordion.Trigger className="btn btn-outline-deep group">
                      See what they learn and build
                      <ChevronDown
                        aria-hidden
                        className="transition-transform group-data-[state=open]:rotate-180"
                      />
                    </Accordion.Trigger>
                  </div>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="text-lg normal-case tracking-normal text-gold-deep">
                        What they learn
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {stage.learn.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg normal-case tracking-normal text-gold-deep">
                        What they build
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {stage.build.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="mt-6 rounded-lg bg-gold/15 px-4 py-3">
                    <span className="font-semibold text-gold-deep">{stage.readyLabel}</span>{" "}
                    {stage.ready}
                  </p>
                </Accordion.Content>
              </Card>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Section>
      <Section tone="paper" labelledBy="two-ways">
        <H2 id="two-ways">One connected path. Two phases.</H2>
        <p className="mt-4 max-w-3xl text-lg">
          Every young person’s journey includes both phases. It begins with the six-week Summer
          Accelerator, an immersive launchpad where they build skills fast and set a plan. It
          continues through the School-Year Program, with three touchpoints a month from September
          through May, so their growth doesn’t stop when summer ends.
        </p>
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center" role="list">
          <div role="listitem" className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold bg-gold font-display text-lg text-ink"
            >
              1
            </span>
            <p>
              <span className="font-semibold">Launch</span> · Summer Accelerator · 6 weeks
            </p>
          </div>
          <span className="sr-only">then</span>
          <ArrowDown aria-hidden className="mx-auto text-gold-deep md:hidden" />
          <ArrowRight aria-hidden className="hidden shrink-0 text-gold-deep md:block" />
          <div role="listitem" className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-gold bg-gold font-display text-lg text-ink"
            >
              2
            </span>
            <p>
              <span className="font-semibold">Continue</span> · School-Year Program · September–May
            </p>
          </div>
        </div>
        <div className="mt-10 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              The two phases of the BGWYP pathway: the Summer Accelerator and the School-Year
              Program.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="p-4">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="bg-black p-4 text-gold">
                  <span className="block text-xs font-semibold tracking-[0.14em]">
                    Phase 1 · The Launchpad
                  </span>
                  <span className="mt-1 block font-semibold">Summer Accelerator</span>
                </th>
                <th scope="col" className="bg-gold/15 p-4 text-[oklch(0.50_0.12_82)]">
                  <span className="block text-xs font-semibold tracking-[0.14em]">
                    Phase 2 · Year-Long Momentum
                  </span>
                  <span className="mt-1 block font-semibold">School-Year Program</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([feature, summer, school]) => (
                <tr key={feature} className="border-t border-border">
                  <th scope="row" className="p-4 align-top font-semibold">
                    {feature}
                  </th>
                  <td className="bg-black p-4 align-top text-ink-foreground">{summer}</td>
                  <td className="bg-gold/15 p-4 align-top">{school}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 grid gap-6 md:hidden">
          <article className="rounded-xl border-2 border-gold bg-black p-6 text-ink-foreground">
            <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">
              Phase 1 · The Launchpad
            </p>
            <h3 className="mt-1 text-xl text-gold">Summer Accelerator</h3>
            <dl className="mt-4 space-y-4">
              {COMPARE.map(([feature, summer]) => (
                <div key={feature}>
                  <dt className="font-semibold text-gold">{feature}</dt>
                  <dd className="text-ink-muted">{summer}</dd>
                </div>
              ))}
            </dl>
          </article>
          <article className="rounded-xl border border-gold/40 bg-gold/15 p-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-[oklch(0.50_0.12_82)] uppercase">
              Phase 2 · Year-Long Momentum
            </p>
            <h3 className="mt-1 text-xl text-[oklch(0.50_0.12_82)]">School-Year Program</h3>
            <dl className="mt-4 space-y-4">
              {COMPARE.map(([feature, , school]) => (
                <div key={feature}>
                  <dt className="font-semibold text-[oklch(0.50_0.12_82)]">{feature}</dt>
                  <dd>{school}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/programs"
            search={{ program: "pathway" }}
            hash="enroll"
            className="btn btn-gold"
          >
            Join the interest list for the full pathway
          </Link>
          <a href="#summer" className="btn btn-outline-deep" style={{ backgroundColor: "#fff" }}>
            See how each phase works
          </a>
        </div>
      </Section>
      <SummerAccelerator />
      <Section labelledBy="school-year">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Photo
            src={PHOTOS.schoolYear.src}
            alt={PHOTOS.schoolYear.alt}
            width={PHOTOS.schoolYear.width}
            height={PHOTOS.schoolYear.height}
          />
          <div>
            <p className="inline-flex rounded-full border border-gold-deep px-3 py-1 text-xs font-semibold tracking-[0.2em] text-gold-deep uppercase">
              Phase 2 · Year-Long Momentum
            </p>
            <div className="mt-5">
              <H2 id="school-year">School-Year Program</H2>
            </div>
            <p className="mt-4 font-[Georgia,serif] text-xl italic text-gold-deep">
              The journey continues, all year long.
            </p>
            <p className="mt-4 text-lg">
              After the Summer Accelerator, the journey continues. From September through May, young
              people put their plans into practice, deepen their skills, and stay connected to
              mentors and peers with three touchpoints every month.
            </p>
          </div>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {SCHOOL_YEAR.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Card className="h-full">
                <span className="icon-ring">
                  <Icon aria-hidden />
                </span>
                <h3 className="mt-4 text-xl text-gold-deep">{title}</h3>
                <p className="mt-2">{text}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-8 rounded-lg bg-gold/15 px-4 py-3">
          <span className="font-semibold">Start year:</span> to be announced.{" "}
          <Link
            to="/programs"
            search={{ program: "pathway" }}
            hash="enroll"
            className="font-semibold text-[oklch(0.50_0.12_82)] underline"
          >
            Join the interest list for the full pathway
          </Link>{" "}
          and we’ll share dates as soon as they’re set.
        </p>
        <Link
          to="/programs"
          search={{ program: "pathway" }}
          hash="enroll"
          className="btn btn-outline-deep mt-6"
        >
          Join the interest list for the full pathway
        </Link>
      </Section>
      <Section tone="paper" labelledBy="mentors">
        <Card className="mx-auto max-w-3xl overflow-hidden p-0">
          <Photo
            src={PHOTOS.mentors.src}
            alt={PHOTOS.mentors.alt}
            width={PHOTOS.mentors.width}
            height={PHOTOS.mentors.height}
          />
          <div className="p-6">
            <span className="icon-ring">
              <Award aria-hidden />
            </span>
            <h2 id="mentors" className="mt-4 text-xl text-gold-deep">
              Level-Up Mentors
            </h2>
            <p className="mt-2">
              Older youth and alumni can earn Level-Up Mentor Certification and mentor younger
              participants, always with an adult present.
            </p>
          </div>
        </Card>
      </Section>
      <Section id="interest" labelledBy="enroll">
        <div className="grid gap-10 rounded-xl border-2 border-gold p-6 md:grid-cols-2 md:p-10">
          <div>
            <H2 id="enroll">{ENROLLMENT_OPEN ? "Enrollment is open" : "Join the interest list"}</H2>
            <p className="mt-4 text-lg">
              Space is limited to 60 and based on funded capacity. BGWYP is one connected journey:
              the Summer Accelerator launches it, and the School-Year Program carries it forward.
              Join the interest list and we’ll share dates, times, and attendance expectations for
              both phases before enrollment opens.
            </p>
          </div>
          <div>
            <InterestForm presetAge={age ?? ""} presetProgram={presetProgram} />
            <p className="mt-4 text-muted-foreground">
              We'll email you when enrollment details are announced.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
