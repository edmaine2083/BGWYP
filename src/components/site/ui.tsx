import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isPlaceholder } from "@/config";

/** Renders text; any [bracketed] fragment becomes a visible gold-outlined placeholder. */
export function T({ children }: { children: string }) {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        isPlaceholder(p) ? (
          <mark key={i} className="placeholder-tag bg-transparent">
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-visible={visible} className={cn("reveal", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  tone = "light",
  className,
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: "light" | "paper" | "dark";
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "px-5 py-16 md:py-24",
        tone === "dark" && "band-dark",
        tone === "paper" && "band-paper",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function PageHero({ title, intro, lead }: { title: string; intro: string; lead?: string }) {
  return (
    <header className="band-dark relative overflow-hidden px-5 py-20 md:py-28">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-3xl text-gold md:text-5xl">{title}</h1>
        <div className="gold-rule mx-auto my-6 w-40" />
        <p className="text-lg text-ink-muted md:text-xl">{intro}</p>
        {lead && <p className="mt-6 font-display text-2xl text-ink-foreground md:text-3xl">{lead}</p>}
      </div>
    </header>
  );
}

export function H2({ children, id, onDark }: { children: ReactNode; id?: string; onDark?: boolean }) {
  return (
    <h2 id={id} className={cn("text-2xl md:text-3xl", onDark ? "text-gold" : "text-gold-deep")}>
      {children}
    </h2>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-card p-6 text-card-foreground shadow-card", className)}>
      {children}
    </div>
  );
}

export function GoldNotice({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div role="note" className={cn("rounded-xl border-2 border-gold bg-paper p-5 text-foreground", className)}>
      {children}
    </div>
  );
}
