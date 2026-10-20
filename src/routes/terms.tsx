import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { GoldNotice, PageHero, Section, T } from "@/components/site/ui";

export const Route = createFileRoute("/terms")({
  head: () => seo("/terms", "Terms of Use", "Terms of use for the Building Generational Wealth Youth Program website."),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero title="Terms of Use" intro="Building Generational Wealth Youth Program, Inc." />
      <Section>
        <div className="mx-auto max-w-3xl">
          <GoldNotice><T>{"[DRAFT — to be reviewed by counsel before launch.]"}</T></GoldNotice>
        </div>
      </Section>
    </>
  );
}
