import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { H2, PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/surveys")({
  head: () =>
    seo(
      "/surveys",
      "Surveys",
      "Student, parent and guardian, business partner, and community surveys for Building Generational Wealth Youth Program.",
    ),
  component: Surveys,
});

const SURVEYS = [
  {
    id: "student-survey",
    title: "Student Survey",
    body: "Tell us about your experience and goals with the program.",
    href: "https://form.jotform.com/262925013835053",
    cta: "Take Student Survey",
    tone: "light",
  },
  {
    id: "parent-survey",
    title: "Parent & Guardian Survey",
    body: "We value your feedback and insights to help support our young participants.",
    href: "https://form.jotform.com/262924395518063",
    cta: "Take Parent & Guardian Survey",
    tone: "paper",
  },
  {
    id: "business-partner-survey",
    title: "Business Partner Survey",
    body: "Collaborate and share your perspective on career paths and opportunities.",
    href: "https://form.jotform.com/262924402405047",
    cta: "Take Business Partner Survey",
    tone: "light",
  },
  {
    id: "community-survey",
    title: "Community Survey",
    body: "Help us grow and strengthen our impact across Baltimore neighborhoods.",
    href: "https://form.jotform.com/262925070037050",
    cta: "Take Community Survey",
    tone: "paper",
  },
] as const;

function Surveys() {
  return (
    <>
      <PageHero title="Surveys" intro="Share your experience so we can serve Baltimore youth well." />
      {SURVEYS.map((survey) => (
        <Section key={survey.id} id={survey.id} labelledBy={`${survey.id}-h`} tone={survey.tone}>
          <div className="mx-auto max-w-3xl text-center">
            <H2 id={`${survey.id}-h`}>{survey.title}</H2>
            <p className="mt-4 text-lg">{survey.body}</p>
            <a href={survey.href} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-6">
              {survey.cta}
            </a>
          </div>
        </Section>
      ))}
    </>
  );
}
