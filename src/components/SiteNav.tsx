import Link from 'next/link';

const NAV_GROUPS = [
  {
    label: 'Room Types',
    links: [
      { href: '/basement-man-cave-ideas', label: 'Basement' },
      { href: '/garage-man-cave', label: 'Garage' },
      { href: '/man-cave-shed', label: 'Shed' },
      { href: '/outdoor-man-cave', label: 'Outdoor' },
      { href: '/man-cave-office', label: 'Office' },
    ],
  },
  {
    label: 'Features',
    links: [
      { href: '/man-cave-bar', label: 'Bar' },
      { href: '/golf-simulator-man-cave', label: 'Golf Sim' },
      { href: '/man-cave-lighting', label: 'Lighting' },
      { href: '/man-cave-storage', label: 'Storage' },
      { href: '/man-cave-renovation-cost', label: 'Cost Guide' },
    ],
  },
  {
    label: 'Style',
    links: [
      { href: '/man-cave-decor', label: 'Decor' },
      { href: '/man-cave-furniture', label: 'Furniture' },
      { href: '/man-cave-signs', label: 'Signs' },
      { href: '/man-cave-wall-decor', label: 'Wall Decor' },
      { href: '/man-cave-gifts', label: 'Gifts' },
    ],
  },
];

export default function SiteNav() {
  return (
    <nav
      aria-label="Site navigation"
      className="bg-[#0d0d0d] border-b border-white/5 w-full"
    >
      <div className="max-w-6xl mx-auto px-4 py-2.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          {/* Home + Hub */}
          <Link
            href="/"
            className="font-semibold text-orange-500 hover:text-orange-400 transition whitespace-nowrap"
          >
            ManCaveAI
          </Link>
          <Link
            href="/man-cave-ideas"
            className="text-gray-400 hover:text-white transition whitespace-nowrap"
          >
            All Ideas
          </Link>

          {/* Grouped links */}
          {NAV_GROUPS.map((group) => (
            <span key={group.label} className="flex items-center gap-x-3 gap-y-1 flex-wrap">
              <span className="text-gray-600 hidden sm:inline">·</span>
              <span className="text-gray-600 font-medium uppercase tracking-wider text-[10px]">
                {group.label}:
              </span>
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
