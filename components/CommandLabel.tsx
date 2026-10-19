export default function CommandLabel({
  children,
  tone = "green",
}: {
  children: string;
  tone?: "green" | "ink";
}) {
  return (
    <p className={`font-mono text-sm ${tone === "ink" ? "text-ink" : "text-green"}`}>
      $ {children}
    </p>
  );
}
