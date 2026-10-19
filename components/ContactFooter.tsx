import CommandLabel from "@/components/CommandLabel";
import { site } from "@/content/site";

const outline =
  "rounded-full border-[1.5px] border-ink px-[22px] py-3.5 font-semibold text-ink no-underline";

export default function ContactFooter() {
  return (
    <footer
      id="contact"
      className="mt-20 flex flex-col gap-4 rounded-3xl bg-lime p-8 sm:p-14"
    >
      <CommandLabel tone="ink">roadmap --next</CommandLabel>
      <h2 className="max-w-[20ch] font-heading text-[clamp(32px,4.6vw,56px)] font-bold leading-tight tracking-[-0.03em]">
        Next milestone: Product Manager at your company.
      </h2>
      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href={site.email}
          className="min-w-0 max-w-full break-all rounded-full bg-ink px-[22px] py-3.5 font-semibold text-bg no-underline"
        >
          {site.email.replace("mailto:", "")}
        </a>
        <a href={site.resume} className={outline}>
          resume.pdf
        </a>
        <a href={site.github} className={outline}>
          github
        </a>
        <a href={site.linkedin} className={outline}>
          linkedin
        </a>
      </div>
    </footer>
  );
}
