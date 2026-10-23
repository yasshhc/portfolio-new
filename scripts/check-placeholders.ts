import path from "node:path";
import { scanPlaceholders } from "../lib/placeholders";

const root = path.join(process.cwd(), "content");
const hits = scanPlaceholders(root);

if (hits.length === 0) {
  console.log("No placeholders left.");
} else {
  for (const hit of hits) console.log(`${path.relative(process.cwd(), hit.file)}: ${hit.placeholder}`);
  console.log(`\n${hits.length} placeholder(s) left. Fill them in before pointing yashchanne.com at this site.`);
  process.exit(1);
}
