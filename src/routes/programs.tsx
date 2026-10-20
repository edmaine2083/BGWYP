import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Award } from "lucide-react";
import { ENROLLMENT_OPEN } from "@/config";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Reveal, Section, T } from "@/components/site/ui";
import { InterestForm } from "@/components/site/site-forms";

export const Route = createFileRoute("/programs")({
  head: () => seo("/programs", "Programs", "Four age-matched stages, a six-week Summer Accelerator, monthly school-year sessions, and Level-Up Mentors for Baltimore youth ages 11 to 24."),
  component: Programs,
});

const STAGES = [
  ["Foundations", "Grades 6 to 8", "A budget starter, a trusted-adult map, and a map of opportunity in their neighborhood"],
  ["Exploration", "Grades 9 to 10", "A resume, a mentor connection, career pathway comparisons, and an understanding of a paystub"],
  ["Mastery", "Grades 11 to 12", "A scholarship or job packet, benefits analysis, postsecondary return on investment, and a 5- or 10-year roadmap"],
  ["Transition-Age", "Ages 18 to 24", "An independent living budget, 30-60-90 day check-ins, and leadership as a near-peer mentor"],
];
const WEEKS = ["The Baltimore Legacy", "Wealth Fundamentals", "Creative Entrepreneurship", "Social Capital & Power", "Personal Generational Plan", "Showcase"];

function Programs() {
  return (
    <>
      <PageHero title="Programs" intro="What young people do and when." />
      <Section labelledBy="stages">
        <H2 id="stages">Four stages</H2>
        <ol className="relative mt-10 grid gap-6 lg:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-gold lg:block" />
          {STAGES.map(([name, who, what], i) => (
            <li key={name} className="relative">
              <Reveal>
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-gold bg-ink font-display text-xl text-gold lg:mx-0">{i + 1}</span>
                <Card className="mt-4">
                  <h3 className="text-xl text-gold-deep">{name}</h3>
                  <p className="mt-1 font-semibold">{who}</p>
                  <p className="mt-3 text-sm uppercase tracking-wide text-muted-foreground">What they build</p>
                  <p>{what}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="dark" labelledBy="summer">
        <H2 id="summer" onDark>Summer Accelerator</H2>
        <p className="mt-4 max-w-3xl text-ink-muted">Six weeks, 24 instructional days, 96 hours. Weeks cover the Baltimore legacy, wealth fundamentals, creative entrepreneurship, social capital and power, a personal generational plan, and a showcase.</p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WEEKS.map((w, i) => (
            <li key={w} className="rounded-xl border border-gold/50 p-5">
              <p className="font-display text-sm text-gold">Week {i + 1}</p>
              <p className="mt-1 text-lg">{w}</p>
            </li>
          ))}
        </ol>
      </Section>
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
              <p className="mt-4 text-lg"><T>{"Enrollment is open for the [SEASON YEAR] cohort. Space is limited to 60 and based on funded capacity. Join the interest list."}</T></p>
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
