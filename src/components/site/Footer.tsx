import { Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, CONTACT_PHONE, LOGO_SRC, telHref } from "@/config";
import { NAV } from "./Header";
import { T } from "./ui";

export function Footer() {
  return (
    <footer className="band-dark border-t border-gold/30 px-5 pt-14 pb-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <img src={LOGO_SRC} alt="BGWYP logo" width={160} height={160} loading="lazy" className="h-40 w-40" />
          <p className="mt-4 font-display text-gold">Educate. Empower. Elevate. Build Legacies.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-base text-gold">Quick links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-ink-muted">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-gold-light">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="not-italic text-ink-muted">
          <h2 className="text-base text-gold">Contact</h2>
          <p className="mt-4"><a href={telHref(CONTACT_PHONE)} className="hover:text-gold-light">{CONTACT_PHONE}</a></p>
          <p><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold-light">{CONTACT_EMAIL}</a></p>
          <p>Baltimore, Maryland</p>
        </address>
      </div>
      <div className="gold-rule mx-auto my-8 max-w-6xl" />
      <div className="mx-auto max-w-6xl space-y-4 text-sm text-ink-muted">
        <p>
          <T>{"© 2026 Building Generational Wealth Youth Program, Inc. A Maryland nonprofit corporation. Our application for federal 501(c)(3) tax-exempt status is pending."}</T>{" "}
          <span className="font-display text-gold">EDUCATE. EMPOWER. ELEVATE. BUILD LEGACIES.</span>
        </p>
        <p className="flex flex-wrap gap-4">
          <Link to="/privacy" className="hover:text-gold-light">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gold-light">Terms</Link>
          <Link to="/safety" className="hover:text-gold-light">Safeguarding</Link>
        </p>
      </div>
    </footer>
  );
}
