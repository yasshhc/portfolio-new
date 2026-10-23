"use client";

import { useEffect, useRef } from "react";

// Opens scrolled all the way right, so the latest quarters show first; earlier ones are a
// scroll to the left. Without JS it simply starts at the earliest quarter.
export default function TimelineScroller({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Timeline, scroll left for earlier quarters"
      tabIndex={0}
      className="overflow-x-auto rounded-[18px] bg-tile [container-type:inline-size]"
    >
      {children}
    </div>
  );
}
