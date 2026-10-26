import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { H2, PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/surveys")({
  head: () =>
    seo(
      "/surveys",
      "Surveys",
      "Help shape BGWYP: student, parent and guardian, business partner, and community surveys for Building Generational Wealth Youth Program.",
    ),
  component: Surveys,
});

const SURVEYS = [
  {
    id: "student-survey",
    title: "Student Survey",
    body: "Tell us what you want to learn about money, careers, and business, and what would make you want to show up every week.",
    href: "https://form.jotform.com/262925013835053?skipPreview=1",
    cta: "Take Student Survey",
    tone: "light",
  },
  {
    id: "parent-survey",
    title: "Parent & Guardian Survey",
    body: "Tell us what you hope your child gains, when they could attend, and what support would help your family take part.",
    href: "https://form.jotform.com/262924395518063?skipPreview=1",
    cta: "Take Parent & Guardian Survey",
    tone: "paper",
  },
  {
    id: "business-partner-survey",
    title: "Business Partner Survey",
    body: "Tell us what skills you look for in young workers and how your business might partner with us.",
    href: "https://form.jotform.com/262924402405047?skipPreview=1",
    cta: "Take Business Partner Survey",
    tone: "light",
  },
  {
    id: "community-survey",
    title: "Community Survey",
    body: "Tell us what young people in your neighborhood need most and how you or your organization might get involved.",
    href: "https://form.jotform.com/262925070037050?skipPreview=1",
    cta: "Take Community Survey",
    tone: "paper",
  },
] as const;

function Surveys() {
  return (
    <>
      <PageHero
        title="Surveys"
        intro="Help us build a program that fits Baltimore’s young people. Your answers shape what we teach, when we meet, and how we support families."
      />
      {SURVEYS.map((survey) => (
        <Section key={survey.id} id={survey.id} labelledBy={`${survey.id}-h`} tone={survey.tone}>
          <div className="mx-auto max-w-3xl text-center">
            <H2 id={`${survey.id}-h`}>{survey.title}</H2>
            <p className="mt-4 text-lg">{survey.body}</p>
            <a href={survey.href} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-6">
              {survey.cta}
            </a>
            <p className="mt-3 text-sm text-muted-foreground">(opens an external form)</p>
          </div>
        </Section>
      ))}
    </>
  );
}
