import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Space Types</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/basement-man-cave-ideas" className="text-gray-500 hover:text-orange-500 transition">Basement</Link></li>
              <li><Link href="/garage-man-cave" className="text-gray-500 hover:text-orange-500 transition">Garage</Link></li>
              <li><Link href="/man-cave-shed" className="text-gray-500 hover:text-orange-500 transition">Shed</Link></li>
              <li><Link href="/outdoor-man-cave" className="text-gray-500 hover:text-orange-500 transition">Outdoor</Link></li>
              <li><Link href="/man-cave-office" className="text-gray-500 hover:text-orange-500 transition">Office</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/man-cave-bar" className="text-gray-500 hover:text-orange-500 transition">Bar Ideas</Link></li>
              <li><Link href="/golf-simulator-man-cave" className="text-gray-500 hover:text-orange-500 transition">Golf Simulator</Link></li>
              <li><Link href="/man-cave-lighting" className="text-gray-500 hover:text-orange-500 transition">Lighting</Link></li>
              <li><Link href="/man-cave-storage" className="text-gray-500 hover:text-orange-500 transition">Storage</Link></li>
              <li><Link href="/man-cave-renovation-cost" className="text-gray-500 hover:text-orange-500 transition">Renovation Cost</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Style & Decor</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/man-cave-decor" className="text-gray-500 hover:text-orange-500 transition">Decor Ideas</Link></li>
              <li><Link href="/man-cave-furniture" className="text-gray-500 hover:text-orange-500 transition">Furniture</Link></li>
              <li><Link href="/man-cave-signs" className="text-gray-500 hover:text-orange-500 transition">Signs</Link></li>
              <li><Link href="/man-cave-wall-decor" className="text-gray-500 hover:text-orange-500 transition">Wall Decor</Link></li>
              <li><Link href="/man-cave-gifts" className="text-gray-500 hover:text-orange-500 transition">Gift Ideas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Tool</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-orange-500 transition">AI Design Generator</Link></li>
              <li><Link href="/man-cave-ideas" className="text-gray-500 hover:text-orange-500 transition">All Man Cave Ideas</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center">
          <Link href="/" className="flex items-center justify-center gap-2 mb-3 hover:opacity-80 transition">
            <span className="text-lg">🏠</span>
            <span className="font-semibold text-white">ManCaveAI</span>
          </Link>
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} ManCaveAI. Free AI-powered man cave design tool.</p>
        </div>
      </div>
    </footer>
  );
}
