import { site } from "@/content/site";

const links = [
  { href: "#board", label: "roadmap" },
  { href: "#specs", label: "tickets" },
  { href: "#timeline", label: "timeline" },
  { href: "#log", label: "log" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const handle = site.name.toLowerCase().replace(/\s+/g, "-");
  return (
    <nav
      aria-label="Main"
      className="flex flex-wrap items-center justify-between gap-4 py-6 font-mono text-sm"
    >
      <a href="#top" className="font-bold text-ink no-underline">
        ~/{handle}
      </a>
      <div className="flex flex-wrap gap-5">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-muted no-underline hover:text-ink">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
