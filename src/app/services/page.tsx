import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ManCaveAI Services — Free AI Design, Style Guides & Product Picks',
  description: 'ManCaveAI offers free AI man cave design generation, style guides for every room type, and curated product recommendations from Amazon.',
  robots: { index: true, follow: true },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-red-900/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-white font-semibold hover:text-red-500 transition">ManCaveAI</Link>
            <Link href="/about" className="text-gray-400 hover:text-red-500 transition">About</Link>
            <Link href="/services" className="text-red-500">Services</Link>
            <Link href="/contact" className="text-gray-400 hover:text-red-500 transition">Contact</Link>
            <Link href="/man-cave-ideas" className="text-gray-400 hover:text-red-500 transition">Ideas</Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">What <span className="text-red-500">ManCaveAI</span> Offers</h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          Everything ManCaveAI provides is free. Here&apos;s what you get.
        </p>

        <div className="space-y-8 mb-12">
          <div className="bg-[#111] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-3">AI Room Design Generator</h2>
            <p className="text-gray-400 leading-relaxed">
              Upload a photo of any room — basement, garage, shed, spare bedroom — and see it
              transformed into a man cave in your chosen style. Styles include gaming setup,
              sports bar, home theater, golf simulator, and custom. Results in about 30 seconds.
              No signup required. 5 free generations.
            </p>
            <Link href="/" className="inline-block mt-4 text-red-500 hover:text-red-400 transition text-sm font-medium">
              Try it now →
            </Link>
          </div>

          <div className="bg-[#111] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-3">Man Cave Design Guides</h2>
            <p className="text-gray-400 leading-relaxed">
              In-depth guides for every type of man cave — organized by room type, style, and
              budget. Each guide includes design ideas, cost breakdowns, and specific product
              recommendations.
            </p>
            <nav className="flex flex-wrap gap-3 mt-4">
              {[
                { href: '/basement-man-cave-ideas', label: 'Basement' },
                { href: '/garage-man-cave', label: 'Garage' },
                { href: '/man-cave-shed', label: 'Shed' },
                { href: '/man-cave-bar', label: 'Bar' },
                { href: '/golf-simulator-man-cave', label: 'Golf Sim' },
                { href: '/outdoor-man-cave', label: 'Outdoor' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-sm text-gray-300 hover:text-red-500 border border-gray-800 transition">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="bg-[#111] rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-3">Product Recommendations</h2>
            <p className="text-gray-400 leading-relaxed">
              After generating your design, ManCaveAI surfaces curated product picks matched to
              your chosen style — furniture, lighting, decor, and gear sourced from Amazon.
              Every recommendation is hand-selected to match the style you chose.
            </p>
            <nav className="flex flex-wrap gap-3 mt-4">
              {[
                { href: '/man-cave-furniture', label: 'Furniture' },
                { href: '/man-cave-lighting', label: 'Lighting' },
                { href: '/man-cave-decor', label: 'Decor' },
                { href: '/man-cave-signs', label: 'Signs' },
                { href: '/man-cave-wall-decor', label: 'Wall Decor' },
                { href: '/man-cave-gifts', label: 'Gift Ideas' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-sm text-gray-300 hover:text-red-500 border border-gray-800 transition">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex gap-4">
          <Link href="/" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition">
            Start Designing Free
          </Link>
          <Link href="/man-cave-ideas" className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#222] text-white rounded-lg transition border border-gray-700">
            Browse Ideas
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
