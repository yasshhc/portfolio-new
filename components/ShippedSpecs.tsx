import CommandLabel from "@/components/CommandLabel";
import { site } from "@/content/site";
import { specs } from "@/content/specs";

const tiles = [
  { value: site.specTotals.written, label: "tickets written" },
  { value: site.specTotals.shipped, label: "closed or shipped (fixes and features)" },
  { value: site.specTotals.accounts, label: "client accounts I manage" },
];

export default function ShippedSpecs() {
  return (
    <section id="specs" aria-labelledby="specs-h" className="pt-20">
      <CommandLabel>tickets --reporter yash --status shipped</CommandLabel>
      <h2 id="specs-h" className="mb-2 font-heading text-[34px] font-bold tracking-tight">
        Shipped from my tickets
      </h2>
      <p className="mb-6 max-w-[62ch] text-[17px] leading-relaxed text-muted">
        I don&apos;t write the code at work. I turn what customers tell me into tickets, sometimes
        with how I think it should work. The product manager scopes them and the product team
        builds them. These are fixes and features that started as one of my tickets.
      </p>
      <div className="mb-4 flex flex-wrap gap-4">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="flex flex-[1_1_200px] flex-col gap-2 rounded-[18px] bg-tile p-6"
          >
            <span className="font-heading text-[40px] font-bold leading-none">{t.value}</span>
            <span className="text-sm text-muted">{t.label}</span>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-[18px] bg-tile">
        <table className="w-full min-w-[720px] border-collapse text-[15px]">
          <thead>
            <tr className="text-left font-mono text-xs text-muted">
              {["CUSTOMER PROBLEM", "WHAT MY TICKET ASKED FOR", "SHIPPED", "STATUS"].map((h) => (
                <th key={h} scope="col" className="px-5 py-4 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((s, i) => (
              <tr key={i} className="border-t border-tile-alt">
                <td className="px-5 py-4 leading-normal">{s.problem}</td>
                <td className="px-5 py-4 leading-normal text-muted">{s.spec}</td>
                <td className="whitespace-nowrap px-5 py-4 font-mono text-[13px]">{s.shipped}</td>
                <td className="px-5 py-4">
                  <span className="rounded-md bg-lime px-2 py-[3px] font-mono text-xs">
                    shipped
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
