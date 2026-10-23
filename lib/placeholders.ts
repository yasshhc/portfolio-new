import fs from "node:fs";
import path from "node:path";

export interface PlaceholderHit {
  file: string;
  placeholder: string;
}

const BRACKETED = /\[[^[\]\n]+\](?!\()/g;
const CHECKBOX = /^\[[ xX]\]$/;

export function findPlaceholders(text: string): string[] {
  return (text.match(BRACKETED) ?? []).filter((m) => !CHECKBOX.test(m));
}

function contentFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return contentFiles(full);
    return /\.(ts|md)$/.test(entry.name) ? [full] : [];
  });
}

export function scanPlaceholders(dir: string): PlaceholderHit[] {
  return contentFiles(dir).flatMap((file) =>
    findPlaceholders(fs.readFileSync(file, "utf8")).map((placeholder) => ({ file, placeholder })),
  );
}
