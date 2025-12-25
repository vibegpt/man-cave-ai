import Head from "next/head";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Head>
        <title>Man Cave Decor | ManCaveAI</title>
        <meta name="description" content="Generate man cave decor concepts from a photo in seconds, then shop a recommended list." />
      </Head>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 16px", lineHeight: 1.6 }}>
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 36, margin: "0 0 12px" }}>Man Cave Decor</h1>
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
            “man cave decor”, “decorations man cave”, “man cave decorations”, “man cave decor ideas”, “man cave accessories”, “mens man cave decor”, “man cave stuff”, “man cave essentials”, “man cave items”, “man cave decorating ideas”.
          </p>
        </section>

        <section style={{ margin: "28px 0" }}>
          <h2 style={{ fontSize: 22 }}>Related pages</h2>
          <ul>
            <li><a href="/basement-man-cave-ideas">basement man cave ideas</a></li>
            <li><a href="/garage-man-cave">garage man cave</a></li>
            <li><a href="/golf-simulator-man-cave">golf simulator man cave</a></li>
            <li><a href="/man-cave-bar">man cave bar</a></li>
            <li><a href="/man-cave-furniture">man cave furniture</a></li>
            <li><a href="/man-cave-gifts">man cave gifts</a></li>
            <li><a href="/man-cave-ideas">man cave ideas</a></li>
            <li><a href="/man-cave-lighting">man cave lighting</a></li>
          </ul>
        </section>
      </main>
    </>
  );
}
