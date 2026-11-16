import { Link } from "@tanstack/react-router";
import { GoldNotice, H2, Section } from "@/components/site/ui";
import { cn } from "@/lib/utils";

const LEVELS: { name: string; amount: string; benefits: string[] }[] = [
  {
    name: "Presenting Partner",
    amount: "$25,000",
    benefits: [
      'Exclusive "Presented By" branding across all flagship events and programs',
      "Live opening remarks at major organizational events",
      "Dedicated video highlight on our website and social channels",
      "Premium stage and banner signage; exclusive networking reception branding",
      "Official press release feature and recognition from the dais",
      "Prime logo placement on all signage, website, social, and e-communications",
      "Premium exhibitor and activation table",
    ],
  },
  {
    name: "Impact Partner",
    amount: "$15,000",
    benefits: [
      "Prominent stage and event signage",
      "Networking reception branding and recognition from the dais",
      "Inclusion in official press releases",
      "Logo on all signage, website, social, and e-communications",
      "Dedicated exhibitor table",
    ],
  },
  {
    name: "Mentoring & Education Partner",
    amount: "$10,000",
    benefits: [
      "Special branding during youth mentoring and workshop sessions",
      "Networking reception branding and recognition from the dais",
      "Inclusion in press releases and promotional materials",
      "Logo on signage, website, social, and e-communications",
      "Dedicated exhibitor table",
    ],
  },
  {
    name: "Networking & Community Partner",
    amount: "$7,500",
    benefits: [
      "Designation as Networking Presenter at community gatherings",
      "Recognition from the dais and logo on all event signage",
      "Feature placement on website, social, and e-communications",
      "Designated exhibitor table",
    ],
  },
  {
    name: "Supporter Partner",
    amount: "$5,000",
    benefits: [
      "Recognition from the dais during key program segments",
      "Logo on event signage, website, and social media",
      "Inclusion in e-communications and promotional materials",
      "Dedicated exhibitor table",
    ],
  },
  {
    name: "Corporate Exhibitor",
    amount: "$2,500",
    benefits: [
      "Inclusion in e-communications and promotional marketing",
      "Distribution of marketing materials or branded items at registration",
      "Dedicated exhibitor table to engage attendees",
    ],
  },
  {
    name: "Small Business / Community Vendor",
    amount: "$125",
    benefits: ["Dedicated vendor table for local small businesses and community enterprises"],
  },
];

export const SPONSORSHIP_LEVEL_OPTIONS = [
  ...LEVELS.map((level) => level.name),
  "Custom / multi-year",
  "Not sure yet",
];

export function PartnershipLevels() {
  return (
    <Section id="sponsorship" labelledBy="sponsorship-h">
      {/* TODO(BGWYP): update the notice and swap the notify buttons for a sponsorship form once the Board approves the levels and Maryland registration is confirmed */}
      <GoldNotice>
        <p>
          Sponsorships are not open yet. We'll begin accepting sponsorships once our Maryland
          charitable registration is complete. Get notified when they open.
        </p>
        <Link to="/donate" hash="notify" className="btn btn-gold mt-4">
          Get notified when sponsorships open →
        </Link>
      </GoldNotice>
      <p className="mt-10 text-sm font-semibold tracking-[0.2em] text-gold-deep">
        PARTNERSHIP LEVELS
      </p>
      <div className="mt-3">
        <H2 id="sponsorship-h">Invest in a legacy</H2>
      </div>
      <p className="mt-4 max-w-3xl text-lg">
        Partnerships will fund youth programming for our first cohort of 60, curriculum development
        across four stages, and mentoring, career exposure, and community events.
      </p>
      <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((level, index) => {
          const featured = index === 0;
          return (
            <article
              key={level.name}
              className={cn(
                "flex h-full flex-col rounded-xl border-2 p-6",
                featured
                  ? "border-gold bg-black text-ink-foreground md:col-span-2 lg:col-span-3"
                  : "border-border bg-card",
              )}
            >
              {featured ? (
                <p className="text-xs font-semibold tracking-[0.16em] text-gold">Featured</p>
              ) : null}
              <div className="mt-2 flex items-start justify-between gap-4">
                <h3 className={cn("text-xl", featured ? "text-gold" : "text-gold-deep")}>
                  {level.name}
                </h3>
                <p
                  className={cn(
                    "shrink-0 text-right font-display text-2xl tabular-nums",
                    featured ? "text-gold" : "text-gold-deep",
                  )}
                >
                  {level.amount}
                </p>
              </div>
              <p className={cn("mt-2 text-sm font-semibold", featured ? "text-gold" : "text-gold-deep")}>
                Opening soon
              </p>
              <ul className="mt-4 space-y-2">
                {level.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3">
                    <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <div className="mt-10 rounded-xl border-2 border-gold p-6">
        <p className="text-lg">Custom and multi-year partnerships are welcome. Sponsorships open soon.</p>
        <Link to="/donate" hash="notify" className="btn btn-gold mt-4">
          Get notified when sponsorships open →
        </Link>
        <p className="mt-4">
          Questions? Contact Edward J. Shepard at{" "}
          <a href="mailto:ejshepard@bgwyp.org" className="font-semibold text-gold-deep underline">
            ejshepard@bgwyp.org
          </a>{" "}
          or{" "}
          <a href="tel:+12028414666" className="font-semibold text-gold-deep underline">
            202-841-4666
          </a>
          .
        </p>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed">
        Building Generational Wealth Youth Program, Inc. is a Maryland nonprofit corporation. Its
        application for federal 501(c)(3) tax-exempt status is pending. Deductibility of gifts
        depends on IRS approval; please consult your tax advisor. Sponsorship benefits with a fair
        market value may reduce the deductible portion of a contribution.
      </p>
    </Section>
  );
}
