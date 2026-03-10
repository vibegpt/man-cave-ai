import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About ManCaveAI — Free AI Man Cave Design Tool',
  description: 'ManCaveAI is a free AI-powered tool that transforms photos of basements, garages, and spare rooms into man cave designs in 30 seconds.',
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-red-900/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-white font-semibold hover:text-red-500 transition">ManCaveAI</Link>
            <Link href="/about" className="text-red-500">About</Link>
            <Link href="/services" className="text-gray-400 hover:text-red-500 transition">Services</Link>
            <Link href="/contact" className="text-gray-400 hover:text-red-500 transition">Contact</Link>
            <Link href="/man-cave-ideas" className="text-gray-400 hover:text-red-500 transition">Ideas</Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">About <span className="text-red-500">ManCaveAI</span></h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          ManCaveAI is a free AI-powered interior design tool built specifically for man caves.
          Upload a photo of your basement, garage, shed, or spare room and get a transformed design
          in about 30 seconds — no signup, no credit card required.
        </p>

        <h2 className="text-2xl font-bold mb-4">What We Do</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Our AI analyzes your room&apos;s layout, lighting, and dimensions, then renders it in
          your chosen man cave style. Whether you want a gaming setup, sports bar, home theater,
          or golf simulator bay, ManCaveAI shows you what your actual space could look like
          before you spend a dollar on renovation.
        </p>

        <h2 className="text-2xl font-bold mb-4">Why We Built It</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Traditional interior design consultations cost $150–$500 per hour. Most guys building a
          man cave don&apos;t need a professional designer — they need a way to visualize ideas quickly.
          ManCaveAI makes that free and instant.
        </p>

        <h2 className="text-2xl font-bold mb-4">Explore Man Cave Ideas</h2>
        <ul className="grid grid-cols-2 gap-3 text-sm mb-10">
          {[
            { href: '/basement-man-cave-ideas', label: 'Basement Man Cave Ideas' },
            { href: '/garage-man-cave', label: 'Garage Man Cave' },
            { href: '/man-cave-bar', label: 'Man Cave Bar' },
            { href: '/golf-simulator-man-cave', label: 'Golf Simulator' },
            { href: '/man-cave-shed', label: 'Shed Man Cave' },
            { href: '/man-cave-decor', label: 'Man Cave Decor' },
            { href: '/man-cave-furniture', label: 'Furniture Ideas' },
            { href: '/man-cave-lighting', label: 'Lighting Ideas' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-gray-400 hover:text-red-500 transition">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          <Link href="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition">
            Try the AI Tool
          </Link>
          <Link href="/contact" className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#222] text-white rounded-lg transition border border-gray-700">
            Contact Us
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-900/50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <nav className="flex justify-center gap-6 mb-3">
            <Link href="/" className="hover:text-red-500 transition">Home</Link>
            <Link href="/about" className="hover:text-red-500 transition">About</Link>
            <Link href="/services" className="hover:text-red-500 transition">Services</Link>
            <Link href="/contact" className="hover:text-red-500 transition">Contact</Link>
            <Link href="/sitemap-html" className="hover:text-red-500 transition">Sitemap</Link>
          </nav>
          <p>&copy; {new Date().getFullYear()} ManCaveAI</p>
        </div>
      </footer>
    </main>
  )
}
