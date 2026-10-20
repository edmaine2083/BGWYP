import { useState } from "react";
import { z } from "zod";
import { Area, CheckField, CheckGroup, Field, FormShell, SelectField, email, optional, phoneReq, req, useForm, zip } from "./forms";

const HELP = ["Mentor", "Guest speaker", "Shadow host", "Event volunteer", "Other"];
export function VolunteerForm() {
  const schema = z.object({
    full_name: req("Full name"), email, phone: phoneReq, zip, help_type: req("How you'd like to help"),
    availability: req("Availability"), motivation: req("Why you want to volunteer"),
    acknowledged: z.literal(true, { errorMap: () => ({ message: "Please confirm to continue." }) }),
  });
  const f = useForm(schema, { full_name: "", email: "", phone: "", zip: "", help_type: "", availability: "", motivation: "", acknowledged: false });
  return (
    <FormShell table="volunteer_applications" title="Volunteer Application" onValid={f.validate} submitLabel="Submit application"
      success="Thank you for applying. We'll be in touch about next steps.">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field form={f} name="full_name" label="Full name" required autoComplete="name" />
        <Field form={f} name="email" label="Email" type="email" required autoComplete="email" />
        <Field form={f} name="phone" label="Phone" type="tel" required autoComplete="tel" />
        <Field form={f} name="zip" label="ZIP" required autoComplete="postal-code" />
      </div>
      <SelectField form={f} name="help_type" label="How you'd like to help" required options={HELP} />
      <Field form={f} name="availability" label="Availability" required />
      <Area form={f} name="motivation" label="Why you want to volunteer" required />
      <CheckField form={f} name="acknowledged" required label="I understand I must complete a background check and safeguarding training and sign the Code of Conduct." />
    </FormShell>
  );
}

export function InterestForm() {
  const schema = z.object({
    guardian_name: req("Name"), email, phone: optional, zip, age_range: req("Age range"),
    self_signup: z.boolean(), heard_from: optional,
  });
  const f = useForm(schema, { guardian_name: "", email: "", phone: "", zip: "", age_range: "", self_signup: false, heard_from: "" });
  const self = !!f.values["self_signup"];
  return (
    <FormShell table="interest_list" title="Interest List" onValid={f.validate} submitLabel="Join the interest list"
      success="You're on the interest list. We'll share updates as enrollment opens.">
      <p className="text-sm text-muted-foreground">For parents and guardians. We do not collect your young person's name or personal details.</p>
      <CheckField form={f} name="self_signup" label="I am 18–24 and signing up for myself" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field form={f} name="guardian_name" label={self ? "Your name" : "Parent/guardian name"} required autoComplete="name" />
        <Field form={f} name="email" label="Email" type="email" required autoComplete="email" />
        <Field form={f} name="phone" label="Phone" type="tel" autoComplete="tel" />
        <Field form={f} name="zip" label="ZIP" required autoComplete="postal-code" />
      </div>
      <SelectField form={f} name="age_range" label={self ? "Your age range" : "Young person's age range"} required options={["11–13", "14–15", "16–17", "18–24"]} />
      <Field form={f} name="heard_from" label="How did you hear about us?" />
    </FormShell>
  );
}

const OFFERS = ["Sector shadow", "Meeting room or space", "Guest session", "Sponsor a seat", "Sponsor a facilitator", "In-kind goods or services", "Other"];
export function PartnerForm() {
  const schema = z.object({
    organization: req("Organization"), contact_name: req("Contact name"), title: optional, email, phone: optional,
    partner_type: req("Partner type"), offers: z.array(z.string()), message: optional, wants_template: z.boolean(),
  });
  const f = useForm(schema, { organization: "", contact_name: "", title: "", email: "", phone: "", partner_type: "", offers: [], message: "", wants_template: false });
  return (
    <FormShell table="partner_inquiries" title="Partner Inquiry" onValid={f.validate} submitLabel="Send inquiry"
      success="Thank you. We'll follow up about partnering together."
      extraAboveSubmit={
        <button type="button" className="btn btn-outline-deep mr-3"
          aria-pressed={!!f.values["wants_template"]}
          onClick={() => f.set("wants_template", !f.values["wants_template"])}>
          {f.values["wants_template"] ? "✓ Letter of commitment template requested" : "Request a letter of commitment template"}
        </button>
      }>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field form={f} name="organization" label="Organization" required autoComplete="organization" />
        <Field form={f} name="contact_name" label="Contact name" required autoComplete="name" />
        <Field form={f} name="title" label="Title" autoComplete="organization-title" />
        <Field form={f} name="email" label="Email" type="email" required autoComplete="email" />
        <Field form={f} name="phone" label="Phone" type="tel" autoComplete="tel" />
        <SelectField form={f} name="partner_type" label="Partner type" required options={["School", "Employer", "Bank", "College", "Community group", "Other"]} />
      </div>
      <CheckGroup form={f} name="offers" legend="What could you offer?" options={OFFERS} />
      <Area form={f} name="message" label="Message" />
    </FormShell>
  );
}

const TOPICS = ["General", "Family", "Volunteer", "Partner", "Donation", "Safety concern"];
export function ContactForm() {
  const schema = z.object({ name: req("Name"), email, phone: optional, topic: req("Topic"), message: req("Message") });
  const f = useForm(schema, { name: "", email: "", phone: "", topic: "", message: "" });
  return (
    <FormShell table="contact_messages" title="Send us a message" onValid={f.validate} submitLabel="Send message"
      success="Thank you for reaching out. We'll reply soon."
      extraAboveSubmit={f.values["topic"] === "Safety concern" ? (
        <p role="alert" className="rounded-lg border-2 border-destructive p-4 font-semibold text-destructive">If a young person is in danger, call 911.</p>
      ) : null}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field form={f} name="name" label="Name" required autoComplete="name" />
        <Field form={f} name="email" label="Email" type="email" required autoComplete="email" />
        <Field form={f} name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
        <SelectField form={f} name="topic" label="Topic" required options={TOPICS} />
      </div>
      <Area form={f} name="message" label="Message" required />
    </FormShell>
  );
}

export function NotifyForm() {
  const f = useForm(z.object({ email }), { email: "" });
  const [, force] = useState(0);
  return (
    <FormShell table="donation_notify_list" onValid={() => { force((n) => n + 1); return f.validate(); }} submitLabel="Notify me"
      success="Thank you. We'll email you when giving opens.">
      <Field form={f} name="email" label="Email" type="email" required autoComplete="email" />
    </FormShell>
  );
}
