import CommandLabel from "@/components/CommandLabel";
import { releases } from "@/content/releases";

export default function ReleaseNotes() {
  return (
    <section id="log" aria-labelledby="log-h" className="pt-20">
      <CommandLabel>git log --oneline career</CommandLabel>
      <h2 id="log-h" className="mb-6 font-heading text-[34px] font-bold tracking-tight">
        Release notes
      </h2>
      <ol className="m-0 flex list-none flex-col gap-3.5 relative rounded-2xl bg-ink p-6 font-mono text-sm leading-normal">
        {releases.map((r) => (
          <li key={r.version} className="flex flex-wrap gap-x-3.5 gap-y-1">
            <span className="text-lime">{r.version}</span>
            {r.href ? (
              <a
                href={r.href}
                className="group text-bg underline decoration-[#3B4A45] underline-offset-4 hover:decoration-lime focus-visible:outline-lime"
              >
                {r.message}
                {r.preview && (
                  // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimiser
                  <img
                    src={r.preview}
                    alt=""
                    className="pointer-events-none absolute right-6 top-5 hidden h-[200px] w-[150px] translate-y-1 rounded-xl border-2 border-[#3B4A45] object-cover object-top opacity-0 transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none wide:block"
                  />
                )}
              </a>
            ) : (
              <span className="text-bg">{r.message}</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
