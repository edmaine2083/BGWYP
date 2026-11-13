import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  DONATIONS_ENABLED,
  ENROLLMENT_OPEN,
  telHref,
} from "@/config";
import { seo } from "@/lib/seo";
import { PageHero, Section } from "@/components/site/ui";
import { Contactish } from "@/components/site/Contactish";

type Item = { q: string; text: string; answer: ReactNode };
type Group = { id: string; title: string; intro: string; items: Item[] };

const linkCls =
  "font-semibold text-gold-deep underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold";

const GROUPS: Group[] = [
  {
    id: "families",
    title: "For families and young people",
    intro: "Who the program is for, what it covers, and how we keep young people safe.",
    items: [
      {
        q: "Who can join?",
        text: "Young people ages 11 to 24 in Baltimore. Our first cohort will have 60 seats. Join the interest list on our Programs page to hear first.",
        answer: (
          <>
            Young people ages 11 to 24 in Baltimore. Our first cohort will have 60 seats. Join the
            interest list on our{" "}
            <Link to="/programs" hash="enroll" className={linkCls}>
              Programs
            </Link>{" "}
            page to hear first.
          </>
        ),
      },
      {
        q: "When and where?",
        text: "Dates and location for our first cohort are not set yet. People on the interest list will hear first.",
        answer: (
          <>
            Dates and location for our first cohort are not set yet. People on the{" "}
            <Link to="/programs" hash="enroll" className={linkCls}>
              interest list
            </Link>{" "}
            will hear first.
          </>
        ),
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
        q: "How many seats are in the first cohort?",
        text: "The first cohort has 60 seats. Space is based on funded capacity. How spots are filled has not been announced.",
        answer:
          "The first cohort has 60 seats. Space is based on funded capacity. How spots are filled has not been announced.",
      },
      {
        q: "How do you keep young people safe?",
        text: "Every adult is screened (fingerprint, FBI, and sex-offender registry checks) and trained before any contact, and no adult is ever alone with a young person, in person or online. See our Safety page for the full policy.",
        answer: (
          <>
            Every adult is screened (fingerprint, FBI, and sex-offender registry checks) and trained
            before any contact, and no adult is ever alone with a young person, in person or online.
            See our{" "}
            <Link to="/safety" className={linkCls}>
              Safety
            </Link>{" "}
            page for the full policy.
          </>
        ),
      },
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
        q: "Will sessions be virtual or in person?",
        text: "The location has not been announced, so the meeting format is not set. We will share it when dates and location are set.",
        answer:
          "The location has not been announced, so the meeting format is not set. We will share it when dates and location are set.",
      },
      {
        q: "How do I report a concern?",
        text: 'If a young person is in immediate danger, call 911. To report suspected child abuse or neglect in Maryland, call 1-800-91-PREVENT (1-800-917-7383). To raise any concern with BGWYP, call (443) 592-0494 or use the Contact form and choose "Safety concern."',
        answer: (
          <>
            If a young person is in immediate danger, call{" "}
            <a href="tel:911" className={linkCls}>
              911
            </a>
            . To report suspected child abuse or neglect in Maryland, call{" "}
            <a href="tel:+18009177383" className={linkCls}>
              1-800-91-PREVENT (1-800-917-7383)
            </a>
            . To raise any concern with BGWYP, call{" "}
            <a href={telHref(CONTACT_PHONE)} className={linkCls}>
              {CONTACT_PHONE}
            </a>{" "}
            or use the{" "}
            <Link to="/contact" className={linkCls}>
              Contact form
            </Link>{" "}
            and choose &quot;Safety concern.&quot;
          </>
        ),
      },
    ],
  },
  {
    id: "volunteers",
    title: "For volunteers and mentors",
    intro: "How adults can help, and the screening that comes first.",
    items: [
      {
        q: "How can I volunteer or mentor?",
        text: "Start on our Get Involved page. Every volunteer who works with youth is screened and trained first.",
        answer: (
          <>
            Start on our{" "}
            <Link to="/get-involved" className={linkCls}>
              Get Involved
            </Link>{" "}
            page. Every volunteer who works with youth is screened and trained first.
          </>
        ),
      },
    ],
  },
  {
    id: "partners",
    title: "For partners and supporters",
    intro: "Schools, businesses, community groups, and people who want to give or collaborate.",
    items: [
      {
        q: "Are you a 501(c)(3)?",
        text: "BGWYP is a Maryland nonprofit corporation. Our federal 501(c)(3) application is pending.",
        answer:
          "BGWYP is a Maryland nonprofit corporation. Our federal 501(c)(3) application is pending.",
      },
      {
        q: "Can I give a tax-deductible gift?",
        text: "Not yet. We are not accepting donations while our 501(c)(3) application is pending. Leave your email to be notified when giving opens.",
        answer: (
          <>
            Not yet. We are not accepting donations while our 501(c)(3) application is pending.
            Leave your email to be notified when giving opens on the{" "}
            <Link to="/donate" hash="notify" className={linkCls}>
              notify list
            </Link>
            .
          </>
        ),
      },
      {
        q: "How can my business or organization help?",
        text: "Visit our Partner page to talk with us about job shadowing, guest speaking, space, and more.",
        answer: (
          <>
            Visit our{" "}
            <Link to="/partner" className={linkCls}>
              Partner
            </Link>{" "}
            page to talk with us about job shadowing, guest speaking, space, and more.
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
        q: "How is BGWYP governed?",
        text: "An independent Board with committees for finance, education, grants, governance, and risk and safeguarding. Written policies on conflicts of interest and related parties. Executive Director pay set by disinterested directors.",
        answer:
          "An independent Board with committees for finance, education, grants, governance, and risk and safeguarding. Written policies on conflicts of interest and related parties. Executive Director pay set by disinterested directors.",
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
    ],
  },
];

// TODO(BGWYP): confirm cost to families
// "Does it cost anything to participate?" stays off this page until that answer is confirmed.

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GROUPS.flatMap((group) => group.items).map(({ q, text }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => {
    const head = seo(
      "/faq",
      "Frequently Asked Questions",
      "Answers for families, volunteers, and partners about joining BGWYP, safety, and getting started.",
    );
    return {
      ...head,
      scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd) }],
    };
  },
  component: Faq,
});

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
      <PageHero title="FAQ" intro="Answers for families, volunteers, partners, and supporters." />
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
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground placeholder:text-muted-foreground focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
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
                  <details key={q} className="group border-b border-border">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-lg focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold [&::-webkit-details-marker]:hidden">
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
