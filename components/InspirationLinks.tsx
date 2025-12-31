import Link from 'next/link'

export default function InspirationLinks() {
  const links = [
    {
      title: 'Man Cave Ideas',
      href: '/man-cave-ideas',
      description: '100+ design ideas',
      emoji: '💡'
    },
    {
      title: 'Basement Ideas',
      href: '/basement-man-cave-ideas',
      description: 'Transform your basement',
      emoji: '🏠'
    },
    {
      title: 'Garage Conversions',
      href: '/garage-man-cave',
      description: 'Garage to man cave',
      emoji: '🚗'
    },
    {
      title: 'Budget Ideas',
      href: '/budget-man-cave-ideas',
      description: 'Under $5,000',
      emoji: '💰'
    },
    {
      title: 'Small Space Ideas',
      href: '/small-man-cave-ideas',
      description: 'Maximize small rooms',
      emoji: '📐'
    },
    {
      title: 'Decor Guide',
      href: '/man-cave-decor',
      description: 'Finishing touches',
      emoji: '🎨'
    }
  ]

  return (
    <div className="mt-16 border-t border-gray-800 pt-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-3">
          Want More Inspiration?
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our comprehensive design guides for ideas, budgets, and expert tips
        </p>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative bg-gray-900 hover:bg-gray-800 rounded-xl p-6 transition-all duration-200 border border-gray-800 hover:border-orange-500/30"
          >
            {/* Emoji Icon */}
            <div className="text-3xl mb-3">{link.emoji}</div>
            
            {/* Title */}
            <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-500 transition-colors">
              {link.title}
            </h4>
            
            {/* Description */}
            <p className="text-sm text-gray-400">
              {link.description}
            </p>

            {/* Hover Arrow */}
            <div className="absolute top-6 right-6 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-8">
        <Link 
          href="/man-cave-ideas"
          className="inline-flex items-center text-orange-500 hover:text-orange-400 font-medium transition-colors"
        >
          View All Design Guides
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
