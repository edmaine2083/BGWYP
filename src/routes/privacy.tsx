import { createFileRoute } from "@tanstack/react-router";
import { CONTACT_EMAIL } from "@/config";
import { seo } from "@/lib/seo";
import { GoldNotice, PageHero, Section, T } from "@/components/site/ui";

export const Route = createFileRoute("/privacy")({
  head: () => seo("/privacy", "Privacy Policy", "How Building Generational Wealth Youth Program collects, uses, and protects information submitted through this site."),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero title="Privacy Policy" intro="Building Generational Wealth Youth Program, Inc." />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <GoldNotice><T>{"[DRAFT — to be reviewed by counsel before launch.]"}</T></GoldNotice>
          <h2 className="text-xl text-gold-deep">What we collect</h2>
          <p>Our forms collect contact information from adults and young adults only, such as name, email, phone, ZIP code, and the details you choose to share in a message.</p>
          <h2 className="text-xl text-gold-deep">How we use it</h2>
          <p>We use this information to respond to you and to send program updates.</p>
          <h2 className="text-xl text-gold-deep">Children</h2>
          <p>We do not knowingly collect personal information from children under 13 through this site.</p>
          <h2 className="text-xl text-gold-deep">We do not sell data</h2>
          <p>We do not sell your information.</p>
          <h2 className="text-xl text-gold-deep">Requesting deletion</h2>
          <p>To request deletion of your information, email <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-deep underline">{CONTACT_EMAIL}</a>.</p>
        </div>
      </Section>
    </>
  );
}
