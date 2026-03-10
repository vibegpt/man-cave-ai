import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap — Man Cave AI",
  description: "All pages on Man Cave AI — your AI-powered man cave design and inspiration tool.",
  robots: { index: true, follow: true },
};

const pages = [
  {
    category: "Main",
    links: [
      { href: "/", label: "Home — Man Cave AI Design Tool" },
    ],
  },
  {
    category: "Man Cave Ideas by Space",
    links: [
      { href: "/man-cave-ideas", label: "Man Cave Ideas" },
      { href: "/basement-man-cave-ideas", label: "Basement Man Cave Ideas" },
      { href: "/garage-man-cave", label: "Garage Man Cave" },
      { href: "/man-cave-shed", label: "Shed Man Cave" },
      { href: "/outdoor-man-cave", label: "Outdoor Man Cave" },
      { href: "/man-cave-office", label: "Man Cave Office" },
    ],
  },
  {
    category: "Man Cave Themes",
    links: [
      { href: "/man-cave-bar", label: "Man Cave Bar" },
      { href: "/golf-simulator-man-cave", label: "Golf Simulator Man Cave" },
    ],
  },
  {
    category: "Man Cave Decor & Furnishings",
    links: [
      { href: "/man-cave-decor", label: "Man Cave Decor" },
      { href: "/man-cave-furniture", label: "Man Cave Furniture" },
      { href: "/man-cave-lighting", label: "Man Cave Lighting" },
      { href: "/man-cave-signs", label: "Man Cave Signs" },
      { href: "/man-cave-wall-decor", label: "Man Cave Wall Decor" },
      { href: "/man-cave-storage", label: "Man Cave Storage" },
      { href: "/man-cave-gifts", label: "Man Cave Gifts" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Sitemap</h1>
      <p className="text-gray-400 mb-10 text-sm">
        All pages on <Link href="/" className="text-red-500 hover:underline">Man Cave AI</Link>.
      </p>

      <div className="space-y-10">
        {pages.map((section) => (
          <section key={section.category}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3 border-b border-gray-800 pb-2">
              {section.category}
            </h2>
            <ul className="space-y-2">
              {section.links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-200 hover:text-red-500 transition text-sm"
                  >
                    {label}
                  </Link>
                  <span className="text-gray-600 text-xs ml-2">{href}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer className="mt-16 pt-6 border-t border-gray-800 text-gray-600 text-xs">
        <p>
          XML Sitemap: <a href="/sitemap.xml" className="hover:text-gray-400">/sitemap.xml</a>
        </p>
      </footer>
    </main>
  );
}
