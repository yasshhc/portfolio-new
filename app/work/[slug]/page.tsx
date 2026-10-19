import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import CommandLabel from "@/components/CommandLabel";
import { getAdjacent, getCaseStudy, listCaseStudySlugs } from "@/lib/caseStudies";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return listCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Not found | Yash Channe" };
  return { title: `${study.title} | Yash Channe`, description: study.tldr };
}

// react-markdown hands every override a hast `node` prop; spread onto a DOM element it
// would be written out as node="[object Object]".
function withoutNode<P extends ExtraProps>(props: P): Omit<P, "node"> {
  const rest: Partial<P> = { ...props };
  delete rest.node;
  return rest as Omit<P, "node">;
}

const markdownComponents = {
  h2: (props: React.ComponentProps<"h2"> & ExtraProps) => (
    <h2 className="mb-3 mt-12 font-heading text-[28px] font-bold tracking-tight" {...withoutNode(props)} />
  ),
  p: (props: React.ComponentProps<"p"> & ExtraProps) => (
    <p className="mb-4 max-w-[68ch] text-[17px] leading-relaxed" {...withoutNode(props)} />
  ),
  ul: (props: React.ComponentProps<"ul"> & ExtraProps) => (
    <ul className="mb-4 max-w-[68ch] list-disc space-y-2 pl-6 text-[17px] leading-relaxed" {...withoutNode(props)} />
  ),
  a: (props: React.ComponentProps<"a"> & ExtraProps) => <a className="text-green underline" {...withoutNode(props)} />,
  code: (props: React.ComponentProps<"code"> & ExtraProps) => (
    <code className="rounded bg-tile-alt px-1 font-mono text-[15px]" {...withoutNode(props)} />
  ),
  table: (props: React.ComponentProps<"table"> & ExtraProps) => (
    <div className="overflow-x-auto rounded-[18px] bg-tile">
      <table className="w-full min-w-[560px] border-collapse text-[15px]" {...withoutNode(props)} />
    </div>
  ),
  th: (props: React.ComponentProps<"th"> & ExtraProps) => (
    <th className="px-5 py-4 text-left font-mono text-xs font-medium text-muted" {...withoutNode(props)} />
  ),
  td: (props: React.ComponentProps<"td"> & ExtraProps) => (
    <td className="border-t border-tile-alt px-5 py-4 align-top leading-normal" {...withoutNode(props)} />
  ),
};

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const { prev, next } = getAdjacent(slug);
  const prevStudy = prev ? getCaseStudy(prev) : null;
  const nextStudy = next ? getCaseStudy(next) : null;
  const linkClass = "text-green underline";

  return (
    <div className="mx-auto max-w-[1120px] px-6 pb-16">
      <nav aria-label="Main" className="py-6 font-mono text-sm">
        <Link href="/" className="font-bold text-ink no-underline">
          ~/yash-channe
        </Link>
      </nav>
      <main className="pt-8">
        <header className="flex flex-col gap-5">
          <CommandLabel>{`open work/${slug}`}</CommandLabel>
          <h1 className="font-heading text-[clamp(40px,5.5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em]">
            {study.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-muted">
            <span className="rounded-md bg-lime px-2 py-[3px] font-mono text-xs text-ink">
              {study.status}
            </span>
            <span>Role: {study.role}</span>
            <span>Stack: {study.stack}</span>
            {study.links.live && (
              <a href={study.links.live} className={linkClass}>
                Live site
              </a>
            )}
            {study.links.github && (
              <a href={study.links.github} className={linkClass}>
                GitHub
              </a>
            )}
          </div>
        </header>
        <aside className="mt-10 max-w-[68ch] rounded-[18px] bg-lime p-6">
          <p className="mb-2 font-mono text-sm font-bold">TL;DR</p>
          <p className="text-[19px] leading-relaxed">{study.tldr}</p>
        </aside>
        <article className="mt-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {study.body}
          </ReactMarkdown>
        </article>
      </main>
      <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-tile-alt pt-6 text-[15px]">
        <div className="flex flex-wrap gap-6">
          {prevStudy && (
            <Link href={`/work/${prev}`} className={linkClass}>
              Previous: {prevStudy.title}
            </Link>
          )}
          {nextStudy && (
            <Link href={`/work/${next}`} className={linkClass}>
              Next: {nextStudy.title}
            </Link>
          )}
        </div>
        <Link href="/#board" className={linkClass}>
          Back to the roadmap
        </Link>
      </footer>
    </div>
  );
}
