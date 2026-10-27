import { useEffect, useRef, type CSSProperties } from "react";
import "./AnimatedLogo.css";

const LEAVES: [number, number][] = [
  [35.8, 19.5],
  [37.6, 28.9],
  [64.4, 27.4],
  [61.2, 15],
  [68.5, 23.7],
  [27.3, 29.4],
  [50.1, 26.2],
  [65.2, 30.1],
  [71.3, 28.5],
  [41.5, 12.1],
  [46.3, 34.8],
  [56.1, 26.1],
  [66.7, 9.6],
];

const GLINTS = LEAVES.map(([x, y], i) => ({
  x,
  y,
  d: 3.2 + (i % 5) * 0.7,
  delay: 1.8 + i * 0.37,
}));

const SPARKS = Array.from({ length: 22 }, (_, i) => ({
  x: 26 + ((i * 37) % 48),
  y: 30 + ((i * 13) % 12),
  dx: (((i * 29) % 40) - 20) * 10,
  d: 4.5 + (i % 6) * 0.8,
  delay: 1.4 + i * 0.33,
}));

const LABEL =
  "BGWYP emblem: a gold tree growing from an open book above youth silhouettes, with the program name and motto";

export function AnimatedLogo() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let inView = true;
    const sync = () => {
      const paused = document.visibilityState === "hidden" || !inView;
      el.classList.toggle("bgl-paused", paused);
    };
    const observer = new IntersectionObserver((entries) => {
      const latest = entries[entries.length - 1];
      inView = latest?.isIntersecting ?? false;
      sync();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={stageRef} className="bgl-stage" role="img" aria-label={LABEL}>
      <div className="bgl-layer bgl-logo" />
      <div className="bgl-rays-clip" aria-hidden="true">
        <div className="bgl-rays" />
      </div>
      <div className="bgl-breath" aria-hidden="true" />
      <div className="bgl-fx" aria-hidden="true">
        {GLINTS.map((glint) => (
          <span
            key={`g-${glint.x}-${glint.y}`}
            className="bgl-glint"
            style={
              {
                left: `${glint.x}%`,
                top: `${glint.y}%`,
                "--d": `${glint.d}s`,
                "--delay": `${glint.delay}s`,
              } as CSSProperties
            }
          />
        ))}
        {SPARKS.map((spark, i) => (
          <span
            key={`s-${i}`}
            className="bgl-spark"
            style={
              {
                left: `${spark.x}%`,
                top: `${spark.y}%`,
                "--dx": `${spark.dx}%`,
                "--d": `${spark.d}s`,
                "--delay": `${spark.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="bgl-shine" aria-hidden="true" />
      <div className="bgl-halo" aria-hidden="true" />
    </div>
  );
}
