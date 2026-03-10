import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact ManCaveAI',
  description: 'Get in touch with the ManCaveAI team. Questions about the free AI design tool, affiliate partnerships, or feedback.',
  robots: { index: true, follow: true },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-red-900/30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-white font-semibold hover:text-red-500 transition">ManCaveAI</Link>
            <Link href="/about" className="text-gray-400 hover:text-red-500 transition">About</Link>
            <Link href="/services" className="text-gray-400 hover:text-red-500 transition">Services</Link>
            <Link href="/contact" className="text-red-500">Contact</Link>
            <Link href="/man-cave-ideas" className="text-gray-400 hover:text-red-500 transition">Ideas</Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Contact <span className="text-red-500">ManCaveAI</span></h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          Have a question, suggestion, or want to partner with us? Reach out below.
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-[#111] rounded-xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold mb-2">General Enquiries</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              For questions about the AI design tool, feedback on your experience, or to report
              a bug — email us at{' '}
              <a href="mailto:hello@mancaveai.com" className="text-red-500 hover:text-red-400 transition">
                hello@mancaveai.com
              </a>
            </p>
          </div>

          <div className="bg-[#111] rounded-xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold mb-2">Affiliate & Partnership Enquiries</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Interested in featuring your products on ManCaveAI, or exploring an affiliate
              partnership? Email{' '}
              <a href="mailto:partners@mancaveai.com" className="text-red-500 hover:text-red-400 transition">
                partners@mancaveai.com
              </a>
            </p>
          </div>

          <div className="bg-[#111] rounded-xl border border-gray-800 p-6">
            <h2 className="text-lg font-semibold mb-2">Content & Press</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Media enquiries and content collaboration:{' '}
              <a href="mailto:press@mancaveai.com" className="text-red-500 hover:text-red-400 transition">
                press@mancaveai.com
              </a>
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4">Explore Man Cave Ideas</h2>
        <ul className="grid grid-cols-2 gap-3 text-sm mb-10">
          {[
            { href: '/', label: 'AI Design Generator' },
            { href: '/man-cave-ideas', label: 'Man Cave Ideas' },
            { href: '/basement-man-cave-ideas', label: 'Basement Ideas' },
            { href: '/garage-man-cave', label: 'Garage Man Cave' },
            { href: '/man-cave-bar', label: 'Man Cave Bar' },
            { href: '/man-cave-furniture', label: 'Furniture Ideas' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-gray-400 hover:text-red-500 transition">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition">
          Back to Home
        </Link>
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
