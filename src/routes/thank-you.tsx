import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/thank-you")({
  head: () => seo("/thank-you", "Thank You", "We received your BGWYP form submission."),
  component: ThankYou,
});

function ThankYou() {
  return (
    <>
      <PageHero title="Thank you" intro="We received your message." />
      <Section>
        <div className="mx-auto flex max-w-xl items-start gap-4 rounded-xl border-2 border-gold bg-paper p-8">
          <CheckCircle2 className="mt-1 shrink-0 text-gold-deep" aria-hidden />
          <div>
            <p className="text-lg">Your submission is on its way to Building Generational Wealth Youth Program. We'll be in touch.</p>
            <Link to="/" className="btn btn-gold mt-6">Back to home</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
