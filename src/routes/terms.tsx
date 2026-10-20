import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/ui";

export const Route = createFileRoute("/terms")({
  head: () => seo("/terms", "Terms of Use", "Terms of use for the Building Generational Wealth Youth Program website."),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero title="Terms of Use" intro="Building Generational Wealth Youth Program, Inc." />
    </>
  );
}
