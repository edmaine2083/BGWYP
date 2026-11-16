import { Link } from "@tanstack/react-router";
import { CONTACT_EMAIL, CONTACT_PHONE, LOGO_SRC, MATERIALS, telHref } from "@/config";
import { MORE_LINKS, NAV } from "./Header";
export function Footer() {
  return (
    <footer className="band-dark border-t border-gold/30 px-5 pt-14 pb-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <img src={LOGO_SRC} alt="BGWYP logo" width={160} height={160} loading="lazy" className="h-40 w-40" />
          <p className="mt-4 font-display text-gold">Educate. Empower. Elevate. Build Legacies.</p>
          {/* TODO(BGWYP): social media links */}
        </div>
        <nav aria-label="Footer">
          <h2 className="text-base text-gold">Quick links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-ink-muted">
            {[...NAV, ...MORE_LINKS].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-gold-light">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Download our materials">
          <h2 className="text-base text-gold">Download our materials</h2>
          <ul className="mt-4 space-y-2 text-ink-muted">
            {MATERIALS.map((file) => (
              <li key={file.href}>
                <a
                  href={file.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-light"
                >
                  {file.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <address className="not-italic text-ink-muted">
          <h2 className="text-base text-gold">Contact</h2>
          <p className="mt-4"><a href={telHref(CONTACT_PHONE)} className="hover:text-gold-light">{CONTACT_PHONE}</a></p>
          <p><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-gold-light">{CONTACT_EMAIL}</a></p>
          <p>Baltimore, Maryland</p>
          {/* TODO(BGWYP): mailing address */}
        </address>
      </div>
      <div className="gold-rule mx-auto my-8 max-w-6xl" />
      <div className="mx-auto max-w-6xl space-y-4 text-sm text-ink-muted">
        <p>
          © 2026 Building Generational Wealth Youth Program, Inc. Building Generational Wealth Youth Program, Inc. is a Maryland nonprofit corporation. Its application for federal 501(c)(3) tax-exempt status is pending.{" "}
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
