import { createFileRoute } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { CalendarDays, Award, ChevronDown } from "lucide-react";
import { ENROLLMENT_OPEN } from "@/config";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Section } from "@/components/site/ui";
import { InterestForm } from "@/components/site/site-forms";
import { SummerAccelerator } from "@/components/programs/SummerAccelerator";

export const Route = createFileRoute("/programs")({
  head: () => seo("/programs", "Programs", "Four age-matched stages, a six-week Summer Accelerator, monthly school-year sessions, and Level-Up Mentors for Baltimore youth ages 11 to 24."),
  component: Programs,
});

const STAGES: {
  name: string;
  who: string;
  question: string;
  summary: string;
  learn: string[];
  build: string[];
  readyLabel: string;
  ready: string;
}[] = [
  {
    name: "Foundations",
    who: "Grades 6–8",
    question: "How does money work, and where do I fit?",
    summary: "Young people build healthy money habits early and discover the people and places in their own neighborhood that can help them grow.",
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
  },
  {
    name: "Exploration",
    who: "Grades 9–10",
    question: "What could my future look like, and what will it pay?",
    summary: "Teens explore careers, meet professionals, and learn how a paycheck really works before their first job.",
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
  },
  {
    name: "Mastery",
    who: "Grades 11–12",
    question: "What’s my plan after high school, and is it worth the cost?",
    summary: "Juniors and seniors turn exploration into a real plan and compare college, careers, and training by what each will truly cost and return.",
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
  },
  {
    name: "Transition-Age",
    who: "Ages 18–24",
    question: "How do I stand on my own and help others rise?",
    summary: "Young adults put their plans into action as they move toward independence, with support that doesn’t end at graduation.",
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
  },
];
function Programs() {
  return (
    <>
      <PageHero title="Programs" intro="What young people do and when." />
      <Section labelledBy="stages">
        <H2 id="stages">Four stages. One path to ownership.</H2>
        <p className="mt-4 max-w-3xl text-lg">Every young person enters at the stage that fits their grade or age and grows with us from there.</p>
        <Accordion.Root type="single" collapsible className="mt-10 space-y-8">
          {STAGES.map((stage, index) => (
            <Accordion.Item key={stage.name} value={stage.name} className="relative md:pl-20">
              {index < STAGES.length - 1 && (
                <span aria-hidden className="absolute top-14 left-7 hidden h-[calc(100%+2rem)] w-px -translate-x-1/2 bg-gold md:block" />
              )}
              <span aria-hidden className="absolute top-0 left-0 z-10 hidden h-14 w-14 place-items-center rounded-full border-2 border-gold bg-gold font-display text-xl text-ink md:grid">{index + 1}</span>
              <Card>
                <div className="flex flex-wrap items-center gap-3">
                  <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-gold bg-gold font-display text-lg text-ink md:hidden">{index + 1}</span>
                  <h3 className="text-xl text-gold-deep">
                    <span className="sr-only">Stage {index + 1}. </span>
                    {stage.name}
                  </h3>
                  <p className="rounded-full border border-gold bg-paper px-3 py-1 text-sm font-semibold">{stage.who}</p>
                </div>
                <p className="mt-4 font-[Georgia,serif] text-lg italic text-gold-deep">“{stage.question}”</p>
                <p className="mt-3">{stage.summary}</p>
                <Accordion.Header asChild>
                  <div className="mt-5">
                    <Accordion.Trigger className="btn btn-outline-deep group">
                      See what they learn and build
                      <ChevronDown aria-hidden className="transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </div>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="text-lg normal-case tracking-normal text-gold-deep">What they learn</h4>
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
                      <h4 className="text-lg normal-case tracking-normal text-gold-deep">What they build</h4>
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
                    <span className="font-semibold text-gold-deep">{stage.readyLabel}</span> {stage.ready}
                  </p>
                </Accordion.Content>
              </Card>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Section>
      <SummerAccelerator />
      <Section tone="paper">
        <div className="grid gap-6 md:grid-cols-2">
          <Card><span className="icon-ring"><CalendarDays aria-hidden /></span><h2 className="mt-4 text-xl text-gold-deep">School-Year Continuation</h2>
            <p className="mt-2">Three touchpoints a month, September through May: a First Saturday workshop, a Second Saturday lab or exposure visit, and a monthly virtual checkpoint.</p></Card>
          <Card><span className="icon-ring"><Award aria-hidden /></span><h2 className="mt-4 text-xl text-gold-deep">Level-Up Mentors</h2>
            <p className="mt-2">Older youth and alumni can earn Level-Up Mentor Certification and mentor younger participants, always with an adult present.</p></Card>
        </div>
      </Section>
      <Section labelledBy="enroll">
        <div className="grid gap-10 rounded-xl border-2 border-gold p-6 md:grid-cols-2 md:p-10">
          <div>
            <H2 id="enroll">{ENROLLMENT_OPEN ? "Enrollment is open" : "Join the interest list"}</H2>
            {ENROLLMENT_OPEN ? (
              <p className="mt-4 text-lg">Enrollment is open. Space is limited to 60 and based on funded capacity. Join the interest list.</p>
            ) : (
              <p className="mt-4 text-lg">Space is limited to 60 and based on funded capacity. Join the interest list.</p>
            )}
          </div>
          <InterestForm />
        </div>
      </Section>
    </>
  );
}
