import CommandLabel from "@/components/CommandLabel";
import { releases } from "@/content/releases";

export default function ReleaseNotes() {
  return (
    <section id="log" aria-labelledby="log-h" className="pt-20">
      <CommandLabel>git log --oneline career</CommandLabel>
      <h2 id="log-h" className="mb-6 font-heading text-[34px] font-bold tracking-tight">
        Release notes
      </h2>
      <ol className="m-0 flex list-none flex-col gap-3.5 rounded-2xl bg-ink p-6 font-mono text-sm leading-normal">
        {releases.map((r) => (
          <li key={r.version} className="flex flex-wrap gap-x-3.5 gap-y-1">
            <span className="text-lime">{r.version}</span>
            <span className="text-bg">{r.message}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
