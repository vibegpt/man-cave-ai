import Link from "next/link";
import { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="font-semibold tracking-tight">
            ManCaveAI
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/generator" className="hover:underline">Generator</Link>
            <Link href="/gallery" className="hover:underline">Gallery</Link>
            <Link href="/styles" className="hover:underline">Styles</Link>
            <Link href="/shop" className="hover:underline">Shop</Link>
            <Link
              href="/pricing"
              className="rounded-md border border-neutral-900 px-3 py-1.5 hover:bg-neutral-900 hover:text-white"
            >
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {children}
      </main>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-600 flex flex-col gap-3">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </div>
          <p className="m-0">
            © {new Date().getFullYear()} ManCaveAI. Generate concepts from a photo and shop the look.
          </p>
        </div>
      </footer>
    </div>
  );
}
