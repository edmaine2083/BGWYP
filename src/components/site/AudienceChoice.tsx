import { Link } from "@tanstack/react-router";

const CHOICES = [
  {
    to: "/get-involved",
    title: "Get Involved",
    body: "For individuals: volunteers, mentors, guest speakers, and people who want updates.",
  },
  {
    to: "/partner",
    title: "Partner",
    body: "For organizations: schools, churches, rec centers, libraries, businesses, and funders.",
  },
] as const;

export function AudienceChoice() {
  return (
    <section aria-labelledby="which-h" className="mx-auto max-w-6xl px-5 pt-10">
      <h2 id="which-h" className="text-xl normal-case tracking-normal text-gold-deep">
        Which is right for you?
      </h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {CHOICES.map((choice) => (
          <Link
            key={choice.to}
            to={choice.to}
            className="rounded-xl border-2 border-gold bg-card p-6 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <p className="font-display text-lg text-gold-deep">{choice.title}</p>
            <p className="mt-2">{choice.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
