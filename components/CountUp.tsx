"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1100;

// Counts "146" or "100+" up from zero the first time it scrolls into view. The real value
// is in the HTML, so it shows as-is without JS or with reduced motion.
export default function CountUp({ value }: { value: string }) {
  const [text, setText] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = parseInt(value, 10);
    const suffix = value.replace(/^\d+/, "");
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - (1 - t) ** 3;
        setText(`${Math.round(target * eased)}${suffix}`);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(ref.current!);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
