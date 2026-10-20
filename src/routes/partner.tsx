import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, ShieldCheck, Mail, BarChart3, School, Building2, Landmark, GraduationCap, Users } from "lucide-react";
import { CONTACT_EMAIL } from "@/config";
import { seo } from "@/lib/seo";
import { Card, H2, PageHero, Section } from "@/components/site/ui";
import { PartnerForm } from "@/components/site/site-forms";

export const Route = createFileRoute("/partner")({
  head: () => seo("/partner", "Partner With Us", "Schools, employers, banks, colleges, and community groups: host a sector shadow, share space, or lead a guest session with BGWYP."),
  component: Partner,
});

const OFFER = [
  { i: ClipboardList, t: "A clear program" },
  { i: ShieldCheck, t: "Safeguards you can rely on" },
  { i: Mail, t: "Regular updates" },
  { i: BarChart3, t: "Results you can share" },
];
const TYPES = [
  { i: School, t: "Schools" }, { i: Building2, t: "Employers" }, { i: Landmark, t: "Banks" },
  { i: GraduationCap, t: "Colleges" }, { i: Users, t: "Community Groups" },
];

function Partner() {
  return (
    <>
      <PageHero title="Partner With Us" intro="We build with schools, employers, banks, colleges, and community groups." />
      <Section>
        <p className="mx-auto max-w-3xl text-center text-lg">
          A specific commitment, like six sector shadows, a meeting room, or a guest session, helps most. If you can offer one, write to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-deep underline">{CONTACT_EMAIL}</a>. We can send a template letter of commitment.
        </p>
        <h2 className="mt-14 text-center text-2xl text-gold-deep">What we offer partners</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFER.map(({ i: I, t }) => <li key={t}><Card className="h-full text-center"><span className="icon-ring"><I aria-hidden /></span><p className="mt-3 font-semibold">{t}</p></Card></li>)}
        </ul>
      </Section>
      <section className="band-dark px-5 py-12" aria-label="Partner types">
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-8">
          {TYPES.map(({ i: I, t }) => <li key={t} className="flex flex-col items-center gap-2"><span className="icon-ring text-gold"><I aria-hidden /></span><span>{t}</span></li>)}
        </ul>
      </section>
      <Section tone="paper" labelledBy="pi">
        <div className="mx-auto max-w-3xl">
          <H2 id="pi">Partner inquiry</H2>
          <Card className="mt-6"><PartnerForm /></Card>
        </div>
      </Section>
    </>
  );
}
