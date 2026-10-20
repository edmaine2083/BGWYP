import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DONATIONS_ENABLED, DONATION_URL, isPlaceholder } from "@/config";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Card, GoldNotice, PageHero, Section } from "@/components/site/ui";
import { NotifyForm } from "@/components/site/site-forms";

export const Route = createFileRoute("/donate")({
  head: () => seo("/donate", "Donate", "Help launch BGWYP's first full year for 60 Baltimore young people."),
  component: Donate,
});

const GIFTS = [
  ["$165", "A participant's workbook and materials"],
  ["$242", "A participant's meals and transportation"],
  ["$3,600", "A seasonal facilitator for a cohort"],
  ["$6,630", "A young person's full year"],
  ["Other", "Any amount helps"],
] as [string, string, ...string[]][];

function Donate() {
  const [pick, setPick] = useState("$6,630");
  return (
    <>
      <PageHero title="Help us launch."
        intro="We are raising $437,608 to run our first full year for 60 Baltimore young people. That is $6,630 per young person, plus a 10% reserve." />
      <Section>
        {!DONATIONS_ENABLED ? (
          <div className="mx-auto max-w-xl">
            <GoldNotice>
              <p className="font-display text-xl text-gold-deep">Giving opens soon. Join our list to be notified.</p>
              <div className="mt-5"><NotifyForm /></div>
            </GoldNotice>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <fieldset>
              <legend className="font-display text-xl text-gold-deep">Choose a gift</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {GIFTS.map(([amt, what]) => (
                  <label key={amt} className={cn("cursor-pointer rounded-xl border-2 bg-card p-5 shadow-card",
                    pick === amt ? "border-gold" : "border-border", amt === "$6,630" && "band-paper")}>
                    <input type="radio" name="gift" className="sr-only" checked={pick === amt} onChange={() => setPick(amt)} />
                    <span className="block font-display text-2xl text-gold-deep">{amt}</span>
                    <span className="mt-1 block text-sm">{what}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <Card className="mt-10">
              <h2 className="text-xl text-gold-deep">How to give</h2>
              {!isPlaceholder(DONATION_URL) && DONATION_URL && (
                <div className="mt-4">
                  <a href={DONATION_URL} className="btn btn-gold" rel="noopener">Give {pick !== "Other" ? pick : "now"}</a>
                </div>
              )}
              <p className="mt-4">Gifts are received by Building Generational Wealth Youth Program, Inc.</p>
              <GoldNotice className="mt-6 text-sm">
                Building Generational Wealth Youth Program, Inc. is a Maryland nonprofit corporation. Its application for federal 501(c)(3) tax-exempt status is pending. Deductibility of gifts depends on IRS approval; please consult your tax advisor. You will receive a written acknowledgment of your gift.
              </GoldNotice>
            </Card>
          </div>
        )}
      </Section>
    </>
  );
}
