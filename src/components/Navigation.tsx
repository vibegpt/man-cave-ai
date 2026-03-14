import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-[#0a0a0a] border-b border-gray-900/50 py-2">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          <li><Link href="/man-cave-ideas" className="hover:text-gray-400 transition">Man Cave Ideas</Link></li>
          <li><Link href="/basement-man-cave-ideas" className="hover:text-gray-400 transition">Basement</Link></li>
          <li><Link href="/garage-man-cave" className="hover:text-gray-400 transition">Garage</Link></li>
          <li><Link href="/man-cave-bar" className="hover:text-gray-400 transition">Bar</Link></li>
          <li><Link href="/golf-simulator-man-cave" className="hover:text-gray-400 transition">Golf Simulator</Link></li>
          <li><Link href="/man-cave-shed" className="hover:text-gray-400 transition">Shed</Link></li>
          <li><Link href="/outdoor-man-cave" className="hover:text-gray-400 transition">Outdoor</Link></li>
          <li><Link href="/man-cave-office" className="hover:text-gray-400 transition">Office</Link></li>
          <li><Link href="/man-cave-decor" className="hover:text-gray-400 transition">Decor</Link></li>
          <li><Link href="/man-cave-furniture" className="hover:text-gray-400 transition">Furniture</Link></li>
          <li><Link href="/man-cave-lighting" className="hover:text-gray-400 transition">Lighting</Link></li>
          <li><Link href="/man-cave-signs" className="hover:text-gray-400 transition">Signs</Link></li>
          <li><Link href="/man-cave-wall-decor" className="hover:text-gray-400 transition">Wall Decor</Link></li>
          <li><Link href="/man-cave-storage" className="hover:text-gray-400 transition">Storage</Link></li>
          <li><Link href="/man-cave-gifts" className="hover:text-gray-400 transition">Gifts</Link></li>
          <li><Link href="/man-cave-renovation-cost" className="hover:text-gray-400 transition">Renovation Cost</Link></li>
        </ul>
      </div>
    </nav>
  );
}
