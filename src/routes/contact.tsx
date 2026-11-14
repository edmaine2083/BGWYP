import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Facebook } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, FACEBOOK_URL, telHref } from "@/config";
import { seo } from "@/lib/seo";
import { Card, PageHero, Photo, Section } from "@/components/site/ui";
import { ContactForm } from "@/components/site/site-forms";
import { PHOTOS } from "@/content/photos";

export const Route = createFileRoute("/contact")({
  head: () => seo("/contact", "Contact", `Contact Building Generational Wealth Youth Program, Inc. in Baltimore, Maryland: (443) 592-0494, ${CONTACT_EMAIL}.`),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero title="Contact" intro="Building Generational Wealth Youth Program, Inc." />
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <Photo src={PHOTOS.contact.src} alt={PHOTOS.contact.alt} width={PHOTOS.contact.width} height={PHOTOS.contact.height} className="mb-6 rounded-xl" />
            <address className="space-y-5 not-italic">
            <p className="flex items-center gap-4"><span className="icon-ring"><MapPin aria-hidden /></span>Baltimore, Maryland</p>
            <p className="flex items-center gap-4"><span className="icon-ring"><Phone aria-hidden /></span><a href={telHref(CONTACT_PHONE)} className="font-semibold text-gold-deep underline">{CONTACT_PHONE}</a></p>
            <p className="flex items-center gap-4"><span className="icon-ring"><Mail aria-hidden /></span><a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-deep underline">{CONTACT_EMAIL}</a></p>
            <p className="flex items-center gap-4"><span className="icon-ring"><Facebook aria-hidden /></span><a href={FACEBOOK_URL} className="font-semibold text-gold-deep underline" target="_blank" rel="noopener noreferrer">Facebook</a></p>
            </address>
          </div>
          <Card><ContactForm /></Card>
        </div>
      </Section>
    </>
  );
}
