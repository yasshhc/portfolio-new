import CommandLabel from "@/components/CommandLabel";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <header id="top" className="flex flex-col gap-5 pb-12 pt-12 sm:pt-[72px]">
      <CommandLabel>whoami</CommandLabel>
      <h1 className="max-w-[16ch] font-heading text-[clamp(44px,6vw,80px)] font-bold leading-[1.02] tracking-[-0.035em]">
        {site.headline}
      </h1>
      <p className="max-w-[58ch] text-[19px] leading-relaxed text-muted">{site.intro}</p>
      <span className="self-start rounded-full bg-lime px-3 py-1.5 font-mono text-[13px] text-ink">
        <span aria-hidden="true">● </span>status: {site.status}
      </span>
    </header>
  );
}
