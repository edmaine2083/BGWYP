import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LOGO_SRC, SUPPORT_HREF } from "@/config";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/safety", label: "Safety" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/surveys", label: "Surveys" },
  { to: "/partner", label: "Partner" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="band-dark sticky top-0 z-50 border-b border-gold/30">
      <a
        href="#main"
        className="btn btn-gold absolute left-3 top-3 -translate-y-24 focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={LOGO_SRC}
            alt="BGWYP logo: gold tree and open book above youth silhouettes, Building Generational Wealth Youth Program"
            width={80}
            height={80}
            className="h-20 w-20 shrink-0"
          />
          <span className="truncate font-display text-sm font-semibold leading-tight text-gold sm:text-base">
            BGWYP
            <span className="hidden text-xs font-normal text-ink-muted sm:block">
              Building Generational Wealth Youth Program
            </span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="whitespace-nowrap rounded-md px-2.5 py-2 text-sm text-ink-foreground hover:text-gold-light"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
          <a href={SUPPORT_HREF} className="btn btn-gold ml-2 whitespace-nowrap text-sm">
            Support the First Cohort
          </a>
        </nav>
        <button
          type="button"
          className="inline-grid h-11 w-11 place-items-center rounded-md text-gold xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-gold/30 px-5 pb-6 xl:hidden">
          <ul className="flex flex-col py-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg text-ink-foreground hover:text-gold-light"
                  activeProps={{ className: "text-gold" }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={SUPPORT_HREF} className="btn btn-gold w-full" onClick={() => setOpen(false)}>
            Support the First Cohort
          </a>
        </nav>
      )}
    </header>
  );
}
