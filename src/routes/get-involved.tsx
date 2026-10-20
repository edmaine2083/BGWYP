import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Armchair, Briefcase, HeartHandshake, Share2, Handshake } from "lucide-react";
import { SUPPORT_HREF } from "@/config";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Section } from "@/components/site/ui";
import { InterestForm, VolunteerForm } from "@/components/site/site-forms";

export const Route = createFileRoute("/get-involved")({
  head: () => seo("/get-involved", "Get Involved", "Give, sponsor a seat, host a sector shadow, mentor, refer a family, or partner with BGWYP in Baltimore."),
  component: GetInvolved,
});

function GetInvolved() {
  const cards = [
    { i: Gift, t: "Give", d: "Support the first cohort. See the Donate page.", href: SUPPORT_HREF === "/donate" ? "/donate" : "/donate", label: "Donate page" },
    { i: Armchair, t: "Sponsor a seat or a facilitator", d: "$6,630 funds a young person's full year; $3,600 funds a summer facilitator." },
    { i: Briefcase, t: "Host a sector shadow", d: "Welcome small groups to see your work. We train and accompany our young people, and you will never be alone with one." },
    { i: HeartHandshake, t: "Mentor or volunteer", d: "Open after screening and training. Apply with the form below.", href: "#volunteer", label: "Apply below" },
    { i: Share2, t: "Refer a family", d: "Share the interest list with families of young people ages 11 to 24.", href: "#interest", label: "Interest list" },
    { i: Handshake, t: "Join as a partner", d: "Schools, employers, banks, colleges, and community groups. See the Partner page.", href: "/partner", label: "Partner page" },
  ];
  return (
    <>
      <PageHero title="Get Involved" intro="Ways to help, with safe options clearly marked." />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ i: I, t, d, href, label }) => (
            <li key={t}>
              <Card className="h-full">
                <span className="icon-ring"><I aria-hidden /></span>
                <h2 className="mt-4 text-xl normal-case tracking-normal text-gold-deep">{t}</h2>
                <p className="mt-2">{d}</p>
                {href && (href.startsWith("#") ? <a href={href} className="mt-4 inline-block font-semibold text-gold-deep underline">{label} →</a>
                  : <Link to={href} className="mt-4 inline-block font-semibold text-gold-deep underline">{label} →</Link>)}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="paper" id="volunteer" labelledBy="vol-h">
        <div className="mx-auto max-w-3xl">
          <H2 id="vol-h">Mentor or volunteer</H2>
          <Card className="mt-6"><VolunteerForm /></Card>
          <p className="mt-4 text-muted-foreground">Everyone who works with young people completes a background check, safeguarding training, and signs our Code of Conduct. Applying does not guarantee a role.</p>
        </div>
      </Section>
      <Section id="interest" labelledBy="int-h">
        <div className="mx-auto max-w-3xl">
          <H2 id="int-h">For families</H2>
          <Card className="mt-6"><InterestForm /></Card>
        </div>
      </Section>
    </>
  );
}
