import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Armchair, Briefcase, HeartHandshake, Share2, Handshake, type LucideIcon } from "lucide-react";
import { CONTACT_EMAIL, DONATIONS_ENABLED } from "@/config";
import { sponsorshipFunds, sponsorshipIntro, sponsorshipLevels } from "@/content/sponsorshipLevels";
import { seo } from "@/lib/seo";
import { Card, GoldNotice, H2, PageHero, Section } from "@/components/site/ui";
import { InterestForm, InvolvementForm, VolunteerForm } from "@/components/site/site-forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const actionBtn =
  "btn btn-gold mt-4 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold-deep";

export const Route = createFileRoute("/get-involved")({
  head: () => seo("/get-involved", "Get Involved", "Give, sponsor a seat, host a sector shadow, mentor, refer a family, or partner with BGWYP in Baltimore."),
  component: GetInvolved,
});

function GetInvolved() {
  const cards: { i: LucideIcon; t: string; d: string; label: string; interest?: string; href?: "/donate" }[] = [
    DONATIONS_ENABLED
      ? {
          i: Gift,
          t: "Give",
          d: "Help launch the first full year for 60 Baltimore young people.",
          href: "/donate",
          label: "Give now",
        }
      : {
          i: Gift,
          t: "Give",
          d: "Giving isn't open yet. Join the list and we'll let you know when it opens.",
          interest: "Give",
          label: "Notify me when giving opens",
        },
    {
      i: Armchair,
      t: "Sponsor a seat or a facilitator",
      d: "$6,630 funds a young person's full year; $3,600 funds a summer facilitator.",
      interest: "Sponsor a seat or a facilitator",
      label: "Get started",
    },
    {
      i: Briefcase,
      t: "Host a sector shadow",
      d: "Welcome small groups to see your work. We train and accompany our young people, and you will never be alone with one.",
      interest: "Host a sector shadow",
      label: "Offer a shadow",
    },
    {
      i: HeartHandshake,
      t: "Mentor or volunteer",
      d: "Open after screening and training.",
      interest: "Mentor or volunteer",
      label: "Apply to mentor or volunteer",
    },
    {
      i: Share2,
      t: "Refer a family",
      d: "Share the interest list with families of young people ages 11 to 24.",
      interest: "Refer a family",
      label: "Refer a family",
    },
    {
      i: Handshake,
      t: "Join as a partner",
      d: DONATIONS_ENABLED
        ? "See the partnership levels below, or start with schools, employers, banks, colleges, and community groups."
        : "Schools, employers, banks, colleges, and community groups. See the Partner page.",
      interest: "Join as a partner",
      label: "Partner with us",
    },
  ];
  return (
    <>
      <PageHero title="Get Involved" intro="Ways to help, with safe options clearly marked." />
      <Section>
        <p className="mb-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/partner" className="font-semibold text-gold-deep underline">Partner</Link>
          <Link to="/surveys" className="font-semibold text-gold-deep underline">Surveys</Link>
        </p>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ i: I, t, d, href, interest, label }) => (
            <li key={t}>
              <Card className="flex h-full flex-col">
                <span className="icon-ring"><I aria-hidden /></span>
                <h2 className="mt-4 text-xl normal-case tracking-normal text-gold-deep">{t}</h2>
                <p className="mt-2">{d}</p>
                <div className="mt-auto">
                  {href === "/donate" ? (
                    <Link to="/donate" className={actionBtn} aria-label={`${label}: ${t}`}>
                      {label}
                    </Link>
                  ) : (
                    <InquireButton interest={interest ?? t} label={label} />
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
      {DONATIONS_ENABLED && <SponsorshipLevels />}
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
          <p className="mt-4 text-muted-foreground">We'll email you when enrollment details are announced.</p>
        </div>
      </Section>
    </>
  );
}

function InquireButton({ interest, label }: { interest: string; label: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={actionBtn} aria-label={`${label}: ${interest}`}>
          {label}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-paper">
        <DialogHeader>
          <DialogTitle className="pr-8 text-left text-xl normal-case tracking-normal text-gold-deep">
            {interest}
          </DialogTitle>
          <DialogDescription className="text-left">
            Share your name, email, phone, and organization. The type of interest is filled in from the option you chose.
          </DialogDescription>
        </DialogHeader>
        <InvolvementForm interest={interest} />
      </DialogContent>
    </Dialog>
  );
}

function SponsorshipLevels() {
  return (
    <Section id="sponsorship" labelledBy="sponsor-h" tone="paper">
      <H2 id="sponsor-h">Partnership levels</H2>
      <p className="mt-4 max-w-3xl text-lg">{sponsorshipIntro}</p>
      <p className="mt-4 max-w-3xl">Your partnership funds:</p>
      <ul className="mt-3 max-w-3xl space-y-2">
        {sponsorshipFunds.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-10 grid gap-6 lg:grid-cols-2">
        {sponsorshipLevels.map((level) => (
          <li key={level.name} className={level.name === "Small Business / Community Vendor" ? "lg:col-span-2" : undefined}>
            <Card className="h-full">
              <p className="font-display text-3xl text-gold-deep">{level.amount}</p>
              <h3 className="mt-2 text-xl normal-case tracking-normal text-gold-deep">{level.name}</h3>
              <ul className="mt-4 space-y-2">
                {level.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <InquireButton interest={`Partnership level: ${level.name}`} label="Inquire about this level" />
            </Card>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-3xl">
        Custom and multi-year partnerships are welcome. Write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-deep underline">
          {CONTACT_EMAIL}
        </a>{" "}
        or start on the <Link to="/partner" className="font-semibold text-gold-deep underline">Partner page.</Link>
      </p>
      <GoldNotice className="mt-6 max-w-3xl text-sm">
        Building Generational Wealth Youth Program, Inc. is a Maryland nonprofit corporation. Its
        application for federal 501(c)(3) tax-exempt status is pending. Deductibility of gifts depends
        on IRS approval; please consult your tax advisor. Sponsorship benefits with a fair market value
        may reduce the deductible portion of a contribution.
      </GoldNotice>
    </Section>
  );
}
