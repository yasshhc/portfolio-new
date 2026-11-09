"use client";

import { useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "#board", label: "roadmap" },
  { href: "#specs", label: "tickets" },
  { href: "#timeline", label: "timeline" },
  { href: "#log", label: "log" },
  { href: "#contact", label: "contact" },
];

type Box = { left: number; top: number; width: number; height: number };

export default function Nav() {
  const handle = site.name.toLowerCase().replace(/\s+/g, "-");
  const [box, setBox] = useState<Box | null>(null);
  const [hovering, setHovering] = useState(false);

  function glideTo(link: HTMLElement) {
    setBox({
      left: link.offsetLeft,
      top: link.offsetTop,
      width: link.offsetWidth,
      height: link.offsetHeight,
    });
    setHovering(true);
  }

  return (
    <nav
      aria-label="Main"
      className="flex flex-wrap items-center justify-between gap-4 py-6 font-mono text-sm"
    >
      <a href="#top" className="font-bold text-ink no-underline">
        ~/{handle}
      </a>
      <div className="relative flex flex-wrap gap-5" onMouseLeave={() => setHovering(false)}>
        {box && (
          <span
            aria-hidden="true"
            data-testid="nav-glide"
            style={box}
            className={`absolute rounded-md bg-tile-alt transition-all duration-200 pointer-coarse:hidden motion-reduce:transition-none ${
              hovering ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onMouseEnter={(e) => glideTo(e.currentTarget)}
            className="relative -mx-2 -my-1 px-2 py-1 text-muted no-underline hover:text-ink"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
