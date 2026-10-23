import Link from "next/link";
import CommandLabel from "@/components/CommandLabel";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1120px] px-6 pb-16">
      <nav aria-label="Main" className="py-6 font-mono text-sm">
        <Link href="/" className="font-bold text-ink no-underline">
          ~/yash-channe
        </Link>
      </nav>
      <main className="flex flex-col gap-5 pt-12 sm:pt-[72px]">
        <CommandLabel>cd /404</CommandLabel>
        <h1 className="font-heading text-[clamp(40px,5.5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em]">
          Page not found
        </h1>
        <p className="max-w-[58ch] text-[19px] leading-relaxed text-muted">
          That page is not on the roadmap. It may have moved, or the link may be mistyped.
        </p>
        <Link
          href="/"
          className="self-start rounded-full border-[1.5px] border-ink px-[22px] py-3.5 font-semibold text-ink no-underline"
        >
          Back to the roadmap
        </Link>
      </main>
    </div>
  );
}
