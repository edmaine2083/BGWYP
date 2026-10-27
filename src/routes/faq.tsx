import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, DONATIONS_ENABLED, ENROLLMENT_OPEN } from "@/config";
import { seo } from "@/lib/seo";
import { PageHero, Section } from "@/components/site/ui";
import { Contactish } from "@/components/site/Contactish";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo(
      "/faq",
      "Frequently Asked Questions",
      "Answers for families, business partners, and community groups about joining BGWYP, safety, sponsorship, and getting started.",
    ),
  component: Faq,
});

type Item = { q: string; text: string; answer: ReactNode };
type Group = { id: string; title: string; intro: string; items: Item[] };

const linkCls = "font-semibold text-gold-deep underline";

const GROUPS: Group[] = [
  {
    id: "families",
    title: "Families and young people",
    intro: "Who the program is for, what it covers, and how we keep young people safe.",
    items: [
      {
        q: "Who can join?",
        text: "Baltimore City young people ages 11 to 24. Cohorts are matched by grade or age.",
        answer: "Baltimore City young people ages 11 to 24. Cohorts are matched by grade or age.",
      },
      {
        q: "When and where?",
        text: "The Summer Accelerator is planned as 6 weeks, and school-year sessions are planned monthly from September to May. Dates and location are not yet set.",
        answer:
          "The Summer Accelerator is planned as 6 weeks, and school-year sessions are planned monthly from September to May. Dates and location are not yet set.",
      },
      {
        q: "What do young people learn?",
        text: "Young people enter one of four stages by grade or age: Foundations (grades 6–8), Exploration (grades 9–10), Mastery (grades 11–12), and Transition-Age (ages 18–24). Each stage covers how money, work, and ownership work, and young people leave with a real budget, resume, plan, or other piece of work. See the Programs page for the full list.",
        answer: (
          <>
            Young people enter one of four stages by grade or age: Foundations (grades 6–8),
            Exploration (grades 9–10), Mastery (grades 11–12), and Transition-Age (ages 18–24). Each
            stage covers how money, work, and ownership work, and young people leave with a real
            budget, resume, plan, or other piece of work. See the{" "}
            <Link to="/programs" className={linkCls}>
              Programs
            </Link>{" "}
            page for the full list.
          </>
        ),
      },
      {
        q: "What does it cost a family?",
        text: "Family pricing has not been announced. Join the interest list and we will email you when enrollment details are set.",
        answer: (
          <>
            Family pricing has not been announced. Join the{" "}
            <Link to="/programs" hash="enroll" className={linkCls}>
              interest list
            </Link>{" "}
            and we will email you when enrollment details are set.
          </>
        ),
      },
      {
        q: "How many seats are in the first cohort?",
        text: "The first cohort has 60 seats. Space is based on funded capacity. How spots are filled has not been announced.",
        answer:
          "The first cohort has 60 seats. Space is based on funded capacity. How spots are filled has not been announced.",
      },
      {
        q: "How do you keep young people safe?",
        text: "See How We Protect Young People. Every adult is screened and trained; no adult is ever alone with a young person.",
        answer: (
          <>
            See{" "}
            <Link to="/safety" className={linkCls}>
              How We Protect Young People.
            </Link>{" "}
            Every adult is screened and trained; no adult is ever alone with a young person.
          </>
        ),
      },
      {
        q: "How do I report a concern?",
        text: `Contact us at ${CONTACT_PHONE} or ${CONTACT_EMAIL}. If a young person is in danger, call 911.`,
        answer: (
          <>
            Contact us at <Contactish value={CONTACT_PHONE} kind="tel" /> or{" "}
            <Contactish value={CONTACT_EMAIL} kind="mail" />. If a young person is in danger, call
            911.
          </>
        ),
      },
    ],
  },
  {
    id: "business",
    title: "Business partners",
    intro: "How employers, banks, and other businesses can host, teach, or fund a seat.",
    items: [
      {
        q: "How can my business help?",
        text: "Host a shadow, offer a guest session, sponsor a seat, or become a founding partner. Start on Get Involved.",
        answer: (
          <>
            Host a shadow, offer a guest session, sponsor a seat, or become a founding partner.
            Start on{" "}
            <Link to="/get-involved" className={linkCls}>
              Get Involved
            </Link>
            .
          </>
        ),
      },
      {
        q: "What kinds of organizations work with BGWYP?",
        text: "Schools, employers, banks, colleges, and community groups. A useful start is a specific commitment, such as sector shadows, a meeting room, or a guest session.",
        answer:
          "Schools, employers, banks, colleges, and community groups. A useful start is a specific commitment, such as sector shadows, a meeting room, or a guest session.",
      },
      {
        q: "How long does a partnership last?",
        text: "A seat sponsorship covers one young person's full year: a six-week Summer Accelerator and monthly sessions from September through May. Dates for the first cohort are not set.",
        answer:
          "A seat sponsorship covers one young person's full year: a six-week Summer Accelerator and monthly sessions from September through May. Dates for the first cohort are not set.",
      },
      {
        q: "What does a sponsorship fund?",
        text: DONATIONS_ENABLED
          ? "$6,630 funds a young person's full year. $3,600 funds a summer facilitator. Partnership levels are listed on Get Involved."
          : "$6,630 funds a young person's full year. $3,600 funds a summer facilitator. Giving is not open yet.",
        answer: DONATIONS_ENABLED
          ? "$6,630 funds a young person's full year. $3,600 funds a summer facilitator. Partnership levels are listed on Get Involved."
          : "$6,630 funds a young person's full year. $3,600 funds a summer facilitator. Giving is not open yet.",
      },
      {
        q: "Is there a written commitment?",
        text: `Partners confirm their role in a letter of commitment. Email ${CONTACT_EMAIL} and we can send the template.`,
        answer: (
          <>
            Partners confirm their role in a letter of commitment. Email{" "}
            <Contactish value={CONTACT_EMAIL} kind="mail" /> and we can send the template.
          </>
        ),
      },
    ],
  },
  {
    id: "community",
    title: "Nonprofit and community partners",
    intro: "Schools, community groups, and supporters who want to collaborate or give.",
    items: [
      {
        q: "Can a school or community group partner?",
        text: "Yes. Schools and community groups can host, share space, or lead a guest session. You can also take the community survey so we hear what young people in your neighborhood need.",
        answer: (
          <>
            Yes. Schools and community groups can host, share space, or lead a guest session. You
            can also take the{" "}
            <Link to="/surveys" className={linkCls}>
              community survey
            </Link>{" "}
            so we hear what young people in your neighborhood need.
          </>
        ),
      },
      {
        q: "Can we talk about a funding partnership?",
        text: DONATIONS_ENABLED
          ? `If your organization wants to explore a funding partnership, email ${CONTACT_EMAIL}. Partnership levels are listed on Get Involved.`
          : `If your organization wants to explore a funding partnership, email ${CONTACT_EMAIL}. Giving to the public is not open yet, and partnership levels will be posted when it is.`,
        answer: (
          <>
            If your organization wants to explore a funding partnership, email{" "}
            <Contactish value={CONTACT_EMAIL} kind="mail" />.{" "}
            {DONATIONS_ENABLED
              ? "Partnership levels are listed on Get Involved."
              : "Giving to the public is not open yet, and partnership levels will be posted when it is."}
          </>
        ),
      },
      {
        q: "Are you a 501(c)(3)?",
        text: "We are a Maryland nonprofit corporation. Our application for federal 501(c)(3) status is pending.",
        answer:
          "We are a Maryland nonprofit corporation. Our application for federal 501(c)(3) status is pending.",
      },
      {
        q: "Can I give a tax-deductible gift?",
        text: DONATIONS_ENABLED
          ? "We are a Maryland nonprofit corporation, and our application for federal 501(c)(3) status is pending. Deductibility depends on IRS approval. Please consult your tax advisor."
          : "Giving is not open yet. We are a Maryland nonprofit corporation, and our application for federal 501(c)(3) status is pending. Deductibility depends on IRS approval. Please consult your tax advisor.",
        answer: DONATIONS_ENABLED
          ? "We are a Maryland nonprofit corporation, and our application for federal 501(c)(3) status is pending. Deductibility depends on IRS approval. Please consult your tax advisor."
          : "Giving is not open yet. We are a Maryland nonprofit corporation, and our application for federal 501(c)(3) status is pending. Deductibility depends on IRS approval. Please consult your tax advisor.",
      },
      {
        q: "How is BGWYP governed?",
        text: "An independent Board with committees for finance, education, grants, governance, and risk and safeguarding. Written policies on conflicts of interest and related parties. Executive Director pay set by disinterested directors.",
        answer:
          "An independent Board with committees for finance, education, grants, governance, and risk and safeguarding. Written policies on conflicts of interest and related parties. Executive Director pay set by disinterested directors.",
      },
    ],
  },
  {
    id: "start",
    title: "Getting started",
    intro: "How to reach us, what to have ready, and what is still being scheduled.",
    items: [
      {
        q: "How do families join the interest list?",
        text: ENROLLMENT_OPEN
          ? "Enrollment is open. Space is limited to 60 and based on funded capacity. Add your name on the Programs page. We email you when enrollment details are announced."
          : "Enrollment is not open. Add your name on the Programs page. We email you when dates, location, and enrollment details are announced.",
        answer: ENROLLMENT_OPEN ? (
          <>
            Enrollment is open. Space is limited to 60 and based on funded capacity. Add your name
            on the{" "}
            <Link to="/programs" hash="enroll" className={linkCls}>
              Programs
            </Link>{" "}
            page. We email you when enrollment details are announced.
          </>
        ) : (
          <>
            Enrollment is not open. Add your name on the{" "}
            <Link to="/programs" hash="enroll" className={linkCls}>
              Programs
            </Link>{" "}
            page. We email you when dates, location, and enrollment details are announced.
          </>
        ),
      },
      {
        q: "How do we start a partnership?",
        text: `Use the partner inquiry on the Partner page, or email ${CONTACT_EMAIL}. Tell us the commitment you can offer.`,
        answer: (
          <>
            Use the partner inquiry on the{" "}
            <Link to="/partner" className={linkCls}>
              Partner
            </Link>{" "}
            page, or email <Contactish value={CONTACT_EMAIL} kind="mail" />. Tell us the commitment
            you can offer.
          </>
        ),
      },
      {
        q: "What should we have ready before we reach out?",
        text: "Families: the young person's age or grade, and that they are in Baltimore. Partners: the commitment you can make, such as sector shadows, a meeting room, a guest session, or a seat sponsorship, and the name of the person we should contact.",
        answer: (
          <>
            <p>Families: the young person&apos;s age or grade, and that they are in Baltimore.</p>
            <p className="mt-2">
              Partners: the commitment you can make, such as sector shadows, a meeting room, a guest
              session, or a seat sponsorship, and the name of the person we should contact.
            </p>
          </>
        ),
      },
      {
        q: "Will sessions be virtual or in person?",
        text: "The location has not been announced, so the meeting format is not set. We will share it when dates and location are set.",
        answer:
          "The location has not been announced, so the meeting format is not set. We will share it when dates and location are set.",
      },
    ],
  },
];

const ALL_ITEMS = GROUPS.flatMap((group) => group.items);

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_ITEMS.map(({ q, text }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

function matches(group: Group, item: Item, query: string) {
  const haystack = `${group.title} ${group.intro} ${item.q} ${item.text}`.toLowerCase();
  return haystack.includes(query);
}

function Faq() {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      GROUPS.map((group) => ({
        ...group,
        items: needle ? group.items.filter((item) => matches(group, item, needle)) : group.items,
      })).filter((group) => group.items.length > 0),
    [needle],
  );
  const count = visible.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        title="FAQ"
        intro="Answers for families, business partners, community groups, and supporters."
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <label htmlFor="faq-search" className="font-semibold text-gold-deep">
            Search questions
          </label>
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try safety, sponsorship, or interest list"
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline-gold"
          />
          {needle ? (
            <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
              {count === 0
                ? "No questions match that search."
                : `${count} matching ${count === 1 ? "question" : "questions"}.`}
            </p>
          ) : null}
          {visible.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-h`} className="mt-10">
              <h2
                id={`${group.id}-h`}
                className="text-xl normal-case tracking-normal text-gold-deep"
              >
                {group.title}
              </h2>
              <p className="mt-2 text-base">{group.intro}</p>
              <div className="mt-4">
                {group.items.map(({ q, answer }) => (
                  <details
                    key={q}
                    className="group border-b border-border"
                    onToggle={(event) => {
                      const details = event.currentTarget;
                      details
                        .querySelector("summary")
                        ?.setAttribute("aria-expanded", String(details.open));
                    }}
                  >
                    <summary
                      aria-expanded="false"
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-lg focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold [&::-webkit-details-marker]:hidden"
                    >
                      {q}
                      <ChevronDown
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="pb-4 text-base">{answer}</div>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <div className="mt-12 text-center">
            <p className="text-lg">Have a question not listed here?</p>
            <Link to="/contact" className="btn btn-gold mt-4">
              Contact our team directly
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
