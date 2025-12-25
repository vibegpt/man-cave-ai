import fs from "node:fs";
import path from "node:path";

const CSV_PATH = path.join(process.cwd(), "data", "keyword_mapping.csv");

// Detect Next.js router style
const hasAppRouter = fs.existsSync(path.join(process.cwd(), "app"));
const OUT_ROOT = hasAppRouter
  ? path.join(process.cwd(), "app", "(seo)")
  : path.join(process.cwd(), "pages");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFile(p, content) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, content, "utf8");
}

// Robust CSV parsing (handles quoted commas)
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (c === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && (c === "," || c === "\n" || c === "\r")) {
      if (c === ",") {
        row.push(cur);
        cur = "";
      } else {
        // end of line
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cur);
        cur = "";
        // ignore empty trailing row
        if (row.some(cell => cell.trim() !== "")) rows.push(row);
        row = [];
      }
      continue;
    }

    cur += c;
  }

  if (cur.length > 0 || row.length > 0) {
    row.push(cur);
    if (row.some(cell => cell.trim() !== "")) rows.push(row);
  }

  const header = rows.shift().map(h => h.trim());
  return rows.map(r => {
    const obj = {};
    header.forEach((h, idx) => (obj[h] = (r[idx] ?? "").trim()));
    return obj;
  });
}

function toTitle(s) {
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

// Exclusions you told me to remove (and a couple of obvious variants)
const EXCLUDE_PATTERNS = [
  /henry danger/i,
  /\bbatman\b/i,
  /marquette/i,
  /cartoon\s+cave\s+man/i,
  /barbers?\s+lounge/i,
  /barbershop/i,
];

// IMPORTANT: “sign” vs “design” false-positive guard
function hasWordSign(k) {
  return /\bsigns?\b/i.test(k) || /neon\s+sign/i.test(k);
}

function assignUrl(keywordRaw) {
  const k = keywordRaw.toLowerCase().trim();

  for (const rx of EXCLUDE_PATTERNS) {
    if (rx.test(k)) return null;
  }

  // High-value / specific first
  if (k.includes("golf simulator")) return "/golf-simulator-man-cave";

  if (k.includes("shed") || k.includes("pole barn") || k.includes("garden shed") || k.includes("storage shed")) {
    return "/man-cave-shed";
  }

  if (k.includes("garage")) return "/garage-man-cave";
  if (k.includes("basement")) return "/basement-man-cave-ideas";
  if (k.includes("office")) return "/man-cave-office";
  if (k.includes("outdoor") || k.includes("backyard") || k.includes("patio")) return "/outdoor-man-cave";

  // Shopping-intent clusters
  if (k.includes("gift")) return "/man-cave-gifts";

  if (k.includes("furniture") || k.includes("furnishings") || k.includes("chair") || k.includes("couch") || k.includes("sofa")) {
    return "/man-cave-furniture";
  }

  // Bar (avoid “barber” issues already excluded)
  if (/\bman cave\b.*\bbar\b/i.test(keywordRaw) || /\bbar\b.*\bman cave\b/i.test(keywordRaw)) {
    return "/man-cave-bar";
  }

  // Wall decor
  if (k.includes("wall decor") || k.includes("wall art") || k.includes("paintings") || (k.includes("wall") && k.includes("decor"))) {
    return "/man-cave-wall-decor";
  }

  // Signs (avoid matching “designs”)
  if (hasWordSign(keywordRaw)) return "/man-cave-signs";

  // Lighting (neon that is not explicitly “neon sign” goes here)
  if (k.includes("lighting") || k.includes("lights") || k.includes("led") || k.includes("rgb") || (k.includes("neon") && !k.includes("neon sign"))) {
    return "/man-cave-lighting";
  }

  // Storage (optional page; strong CPC)
  if (k.includes("storage")) return "/man-cave-storage";

  // Decor hub
  if (k.includes("decor") || k.includes("decorations") || k.includes("accessories") || k.includes("items") || k.includes("stuff") || k.includes("essentials")) {
    return "/man-cave-decor";
  }

  // Ideas hub / default
  if (k.includes("ideas") || k.includes("design")) return "/man-cave-ideas";

  return "/man-cave-ideas";
}

function buildPageAppRouter({ title, description, topKeyword, keywordsTop10, relatedUrls }) {
  return `import Link from "next/link";

export const metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
};

export default function Page() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px", lineHeight: 1.6 }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 36, margin: "0 0 12px" }}>${toTitle(topKeyword)}</h1>
        <p style={{ fontSize: 18, margin: "0 0 16px", opacity: 0.85 }}>
          Upload a room photo, generate multiple concepts, and get a “Shop this look” list.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/generator" style={{ padding: "10px 14px", border: "1px solid #000", borderRadius: 10, textDecoration: "none" }}>
            Try the Man Cave Generator
          </Link>
          <Link href="/gallery" style={{ padding: "10px 14px", border: "1px solid #000", borderRadius: 10, textDecoration: "none" }}>
            View Real Examples
          </Link>
        </div>
      </header>

      <section style={{ margin: "28px 0" }}>
        <h2 style={{ fontSize: 22 }}>Popular searches we cover</h2>
        <p style={{ opacity: 0.8 }}>
          ${keywordsTop10.map(k => `“${k}”`).join(", ")}.
        </p>
      </section>

      <section style={{ margin: "28px 0" }}>
        <h2 style={{ fontSize: 22 }}>FAQ</h2>
        <details><summary>How does the generator work?</summary><p>Upload a room photo, pick a style, and generate concepts plus a product list.</p></details>
        <details><summary>Can I do this on a budget?</summary><p>Yes—choose a budget preference and we’ll bias toward cost-effective upgrades.</p></details>
        <details><summary>Do you link to products I can buy?</summary><p>Yes—each design can include a “Shop this look” list (affiliate-ready).</p></details>
      </section>

      <section style={{ margin: "28px 0" }}>
        <h2 style={{ fontSize: 22 }}>Related pages</h2>
        <ul>
          ${relatedUrls.map(u => `<li><a href="${u}">${u.replace(/^\//, "").replace(/-/g, " ")}</a></li>`).join("\n          ")}
        </ul>
      </section>
    </main>
  );
}
`;
}

function buildPagePagesRouter({ title, description, topKeyword, keywordsTop10, relatedUrls }) {
  return `import Head from "next/head";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Head>
        <title>${title.replace(/&/g, "&amp;")}</title>
        <meta name="description" content="${description.replace(/"/g, "&quot;")}" />
      </Head>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px", lineHeight: 1.6 }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 36, margin: "0 0 12px" }}>${toTitle(topKeyword)}</h1>
          <p style={{ fontSize: 18, margin: "0 0 16px", opacity: 0.85 }}>
            Upload a room photo, generate multiple concepts, and get a “Shop this look” list.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/generator" style={{ padding: "10px 14px", border: "1px solid #000", borderRadius: 10, textDecoration: "none" }}>
              Try the Man Cave Generator
            </Link>
            <Link href="/gallery" style={{ padding: "10px 14px", border: "1px solid #000", borderRadius: 10, textDecoration: "none" }}>
              View Real Examples
            </Link>
          </div>
        </header>

        <section style={{ margin: "28px 0" }}>
          <h2 style={{ fontSize: 22 }}>Popular searches we cover</h2>
          <p style={{ opacity: 0.8 }}>
            ${keywordsTop10.map(k => `“${k}”`).join(", ")}.
          </p>
        </section>

        <section style={{ margin: "28px 0" }}>
          <h2 style={{ fontSize: 22 }}>Related pages</h2>
          <ul>
            ${relatedUrls.map(u => `<li><a href="${u}">${u.replace(/^\//, "").replace(/-/g, " ")}</a></li>`).join("\n            ")}
          </ul>
        </section>
      </main>
    </>
  );
}
`;
}

function safeSlug(url) {
  return url.replace(/^\//, "").replace(/\/$/, "");
}

if (!fs.existsSync(CSV_PATH)) {
  console.error(`Missing CSV at ${CSV_PATH}`);
  process.exit(1);
}

const raw = fs.readFileSync(CSV_PATH, "utf8");
const rows = parseCsv(raw);

// Build groups
const byUrl = new Map();

for (const r of rows) {
  const kw = r["Keyword"];
  if (!kw) continue;

  const target = assignUrl(kw);
  if (!target) continue;

  const vol = Number(r["Volume"] || 0);
  const kd = Number(r["Keyword Difficulty"] || 0);
  const cpc = Number(r["CPC (USD)"] || 0);

  if (!byUrl.has(target)) byUrl.set(target, []);
  byUrl.get(target).push({ kw, vol, kd, cpc, intent: r["Intent"] || "" });
}

const urls = Array.from(byUrl.keys()).sort();

// Generate pages
for (const url of urls) {
  const group = byUrl.get(url);

  const top = [...group].sort((a, b) => b.vol - a.vol)[0];
  const topKeyword = top?.kw || url.replace(/^\//, "").replace(/-/g, " ");

  const title = `${toTitle(topKeyword)} | ManCaveAI`;
  const description = `Generate ${topKeyword} concepts from a photo in seconds, then shop a recommended list.`;

  const keywordsTop10 = [...group]
    .sort((a, b) => b.vol - a.vol)
    .slice(0, 10)
    .map(x => x.kw);

  const relatedUrls = urls.filter(u => u !== url).slice(0, 8);

  if (hasAppRouter) {
    const dir = path.join(OUT_ROOT, safeSlug(url));
    writeFile(path.join(dir, "page.tsx"), buildPageAppRouter({ title, description, topKeyword, keywordsTop10, relatedUrls }));
    writeFile(path.join(dir, "keywords.json"), JSON.stringify({ url, topKeyword, keywords: group }, null, 2));
    console.log(`Created: app/(seo)/${safeSlug(url)}/page.tsx`);
  } else {
    const file = path.join(OUT_ROOT, `${safeSlug(url)}.tsx`);
    writeFile(file, buildPagePagesRouter({ title, description, topKeyword, keywordsTop10, relatedUrls }));
    console.log(`Created: pages/${safeSlug(url)}.tsx`);
  }
}

console.log(`Done. Pages generated: ${urls.length}`);
console.log(`Router: ${hasAppRouter ? "App Router (app/)" : "Pages Router (pages/)"} | Output: ${OUT_ROOT}`);
