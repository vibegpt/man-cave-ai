import Link from 'next/link';

interface HubLink {
  slug: string;
  title: string;
  description: string;
}

const HUB_CONNECTIONS: Record<string, HubLink[]> = {
  'man-cave-ideas': [
    {
      slug: 'basement-man-cave-ideas',
      title: 'Basement Man Cave',
      description: 'The gold standard — naturally quiet, spacious, and completely separate from family traffic.',
    },
    {
      slug: 'garage-man-cave',
      title: 'Garage Man Cave',
      description: 'Industrial aesthetic with the option to open the whole space up on game days.',
    },
    {
      slug: 'man-cave-bar',
      title: 'Man Cave Bar Ideas',
      description: 'A bar turns any man cave from a room with a TV into a destination worth coming back to.',
    },
    {
      slug: 'man-cave-decor',
      title: 'Man Cave Decor',
      description: 'The finishing details that make a space feel like a man cave instead of just a furnished room.',
    },
  ],
  'basement-man-cave-ideas': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: '50+ man cave ideas across every room type, budget, and style — the full reference guide.',
    },
    {
      slug: 'garage-man-cave',
      title: 'Garage Man Cave',
      description: 'No basement? The garage is the best alternative — with its own distinct advantages.',
    },
    {
      slug: 'man-cave-bar',
      title: 'Man Cave Bar',
      description: 'A wet bar is the most popular basement upgrade — see how to design one for your space.',
    },
    {
      slug: 'man-cave-furniture',
      title: 'Man Cave Furniture',
      description: 'Basement layouts have specific furniture constraints — size, seating depth, and arrangement tips.',
    },
  ],
  'garage-man-cave': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: '50+ man cave ideas across every room type, budget, and style — the full reference guide.',
    },
    {
      slug: 'basement-man-cave-ideas',
      title: 'Basement Man Cave',
      description: 'See how a basement build compares — different starting point, different strengths.',
    },
    {
      slug: 'man-cave-storage',
      title: 'Man Cave Storage',
      description: 'Smart storage doubles your usable floor space — keep the tools without killing the vibe.',
    },
    {
      slug: 'outdoor-man-cave',
      title: 'Outdoor Man Cave',
      description: 'Extend the cave outside — the roll-up door is your natural transition point to the yard.',
    },
  ],
  'man-cave-shed': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: '50+ man cave ideas across every room type, budget, and style — the full reference guide.',
    },
    {
      slug: 'outdoor-man-cave',
      title: 'Outdoor Man Cave',
      description: 'Use the shed as a base and extend your outdoor man cave into the yard around it.',
    },
    {
      slug: 'garage-man-cave',
      title: 'Garage Man Cave',
      description: 'Considering more space? A garage man cave gives you a bigger footprint to work with.',
    },
    {
      slug: 'man-cave-decor',
      title: 'Man Cave Decor',
      description: 'Small spaces demand smart decor choices — how to make every square foot count.',
    },
  ],
  'outdoor-man-cave': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: '50+ man cave ideas across every room type, budget, and style — the full reference guide.',
    },
    {
      slug: 'garage-man-cave',
      title: 'Garage Man Cave',
      description: 'A detached garage is the best foundation for an indoor-outdoor man cave build.',
    },
    {
      slug: 'man-cave-shed',
      title: 'Man Cave Shed',
      description: 'A shed man cave is the most popular starting point for a backyard retreat.',
    },
    {
      slug: 'man-cave-lighting',
      title: 'Man Cave Lighting',
      description: 'Outdoor lighting requires weatherproof solutions — what works, what lasts, and what creates atmosphere.',
    },
  ],
  'man-cave-office': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: '50+ man cave ideas including dedicated home office hybrid builds and compact room designs.',
    },
    {
      slug: 'basement-man-cave-ideas',
      title: 'Basement Man Cave',
      description: 'A finished basement gives you the most separation for a focused work-and-play setup.',
    },
    {
      slug: 'man-cave-furniture',
      title: 'Man Cave Furniture',
      description: 'The right desk, chair, and shelving makes a home office man cave both productive and comfortable.',
    },
    {
      slug: 'man-cave-storage',
      title: 'Man Cave Storage',
      description: 'Storage is critical in a dual-purpose space — how to stay functional without losing the vibe.',
    },
  ],
  'man-cave-bar': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: 'Explore 50+ man cave ideas — the bar is just the start of what your space could be.',
    },
    {
      slug: 'basement-man-cave-ideas',
      title: 'Basement Man Cave',
      description: 'Basements are the most popular location for a man cave bar — layout and plumbing tips.',
    },
    {
      slug: 'garage-man-cave',
      title: 'Garage Man Cave',
      description: 'Garage bars have a raw industrial appeal — how to design one that looks intentional.',
    },
    {
      slug: 'man-cave-furniture',
      title: 'Man Cave Furniture',
      description: 'The right bar stools, seating, and counter height complete the bar experience.',
    },
  ],
  'golf-simulator-man-cave': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: 'Browse all man cave ideas — the golf simulator is one of the highest-ROI upgrades available.',
    },
    {
      slug: 'basement-man-cave-ideas',
      title: 'Basement Man Cave',
      description: 'Basements are ideal for golf simulators — ceiling height requirements and layout tips.',
    },
    {
      slug: 'garage-man-cave',
      title: 'Garage Man Cave',
      description: 'A two-car garage footprint is perfect for a full simulator setup with hitting bay and seating.',
    },
    {
      slug: 'man-cave-lighting',
      title: 'Man Cave Lighting',
      description: 'Simulator lighting needs to be even and glare-free — specific setup requirements and solutions.',
    },
  ],
  'man-cave-lighting': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: 'Explore 50+ man cave ideas — lighting transforms every build from gaming rooms to sports bars.',
    },
    {
      slug: 'man-cave-decor',
      title: 'Man Cave Decor',
      description: 'Lighting and decor work together — how to coordinate ambience with your overall design.',
    },
    {
      slug: 'basement-man-cave-ideas',
      title: 'Basement Man Cave',
      description: 'Basements need strategic lighting more than any other room — tips for low-ceiling underground builds.',
    },
    {
      slug: 'outdoor-man-cave',
      title: 'Outdoor Man Cave',
      description: 'Outdoor lighting is a different challenge — weatherproof options and atmosphere-first design.',
    },
  ],
  'man-cave-storage': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: '50+ man cave ideas — storage is the unsung hero that makes every build actually function.',
    },
    {
      slug: 'garage-man-cave',
      title: 'Garage Man Cave',
      description: 'Garage man caves demand smart storage — how to keep the tools without losing the lounge.',
    },
    {
      slug: 'man-cave-furniture',
      title: 'Man Cave Furniture',
      description: 'Storage furniture pulls double duty — functional pieces that also look intentional.',
    },
    {
      slug: 'man-cave-decor',
      title: 'Man Cave Decor',
      description: 'Storage that looks good is decor — how to make shelving part of the overall design.',
    },
  ],
  'man-cave-decor': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: '50+ man cave ideas — decor is what pulls the whole design together into a real space.',
    },
    {
      slug: 'man-cave-wall-decor',
      title: 'Man Cave Wall Decor',
      description: 'Wall decor is the biggest visual impact per dollar in any man cave build.',
    },
    {
      slug: 'man-cave-signs',
      title: 'Man Cave Signs',
      description: 'Signs are the fastest way to establish personality and theme without committing to a full redesign.',
    },
    {
      slug: 'man-cave-lighting',
      title: 'Man Cave Lighting',
      description: 'Lighting is decor — the most impactful non-furniture element in any man cave room.',
    },
  ],
  'man-cave-furniture': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: '50+ man cave ideas — furniture choices define how a space actually feels to use.',
    },
    {
      slug: 'man-cave-decor',
      title: 'Man Cave Decor',
      description: 'Furniture and decor work together — how to coordinate style without overthinking the details.',
    },
    {
      slug: 'man-cave-storage',
      title: 'Man Cave Storage',
      description: 'Storage furniture is often the most practical buy in any man cave build.',
    },
    {
      slug: 'basement-man-cave-ideas',
      title: 'Basement Man Cave',
      description: 'Basement man caves have specific furniture sizing constraints — layout and selection tips.',
    },
  ],
  'man-cave-signs': [
    {
      slug: 'man-cave-decor',
      title: 'Man Cave Decor',
      description: 'Signs are one piece of the full decor picture — see how they fit the overall design strategy.',
    },
    {
      slug: 'man-cave-wall-decor',
      title: 'Man Cave Wall Decor',
      description: 'Wall decor goes beyond signs — the complete picture of what goes on your walls.',
    },
    {
      slug: 'man-cave-bar',
      title: 'Man Cave Bar',
      description: 'Bar signs are the most popular category — neon, vintage metal, and custom options.',
    },
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: 'Browse all man cave ideas for context on how signs fit each room type and style.',
    },
  ],
  'man-cave-wall-decor': [
    {
      slug: 'man-cave-decor',
      title: 'Man Cave Decor',
      description: 'Wall decor is one part of the full decor strategy — see the complete approach.',
    },
    {
      slug: 'man-cave-signs',
      title: 'Man Cave Signs',
      description: 'Signs are the most popular wall decor category — neon, vintage, metal, and custom.',
    },
    {
      slug: 'man-cave-lighting',
      title: 'Man Cave Lighting',
      description: 'Backlit signs and wall sconces serve as both lighting and decor — dual-purpose picks.',
    },
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: 'Browse all man cave ideas for inspiration on how wall decor fits each room and style.',
    },
  ],
  'man-cave-renovation-cost': [
    {
      slug: 'garage-man-cave',
      title: 'Garage Man Cave',
      description: 'The most popular and budget-friendly starting point — full cost breakdowns and layout ideas.',
    },
    {
      slug: 'basement-man-cave-ideas',
      title: 'Basement Man Cave',
      description: 'Basement builds cost more upfront but offer the best year-round climate and sound isolation.',
    },
    {
      slug: 'man-cave-shed',
      title: 'Man Cave Shed',
      description: 'Shed conversions are the sweet spot for backyard builds — low cost, high impact.',
    },
    {
      slug: 'golf-simulator-man-cave',
      title: 'Golf Simulator',
      description: 'The highest single-item cost in most man caves — what to budget for a full simulator setup.',
    },
  ],
  'man-cave-gifts': [
    {
      slug: 'man-cave-ideas',
      title: 'All Man Cave Ideas',
      description: 'Browse all man cave ideas for context — every item on this list fits somewhere.',
    },
    {
      slug: 'man-cave-decor',
      title: 'Man Cave Decor',
      description: 'Most man cave gifts double as decor — signs, art, display pieces, and conversation starters.',
    },
    {
      slug: 'man-cave-signs',
      title: 'Man Cave Signs',
      description: 'Signs are the most popular man cave gift category — neon, vintage, and personalized options.',
    },
    {
      slug: 'man-cave-bar',
      title: 'Man Cave Bar',
      description: 'Bar accessories are the most-bought man cave gifts — glasses, openers, dispensers, and more.',
    },
  ],
};

interface HubNavigationProps {
  currentSlug: string;
}

export default function HubNavigation({ currentSlug }: HubNavigationProps) {
  const links = HUB_CONNECTIONS[currentSlug];
  if (!links || links.length === 0) return null;

  return (
    <section className="max-w-2xl mx-auto mb-16">
      <h2 className="text-xl font-bold text-white mb-2">Related Man Cave Guides</h2>
      <p className="text-sm text-gray-500 mb-6">
        Everything you need to plan, design, and build your ideal man cave.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={`/${link.slug}`}
            className="group bg-[#141414] rounded-xl border border-white/10 p-5 hover:border-orange-500/40 hover:bg-white/[0.03] transition-all"
          >
            <p className="text-sm font-semibold text-white group-hover:text-orange-500 transition-colors mb-1">
              {link.title}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
