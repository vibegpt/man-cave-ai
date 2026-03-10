import Link from 'next/link';

interface Product {
  category: string;
}

interface ProductCrossLinksProps {
  currentPageSlug: string;
  products: Product[];
}

const CATEGORY_PAGE_MAP: Record<string, { slug: string; title: string }[]> = {
  Lighting: [
    { slug: 'man-cave-lighting', title: 'Lighting Ideas' },
    { slug: 'basement-man-cave-ideas', title: 'Basement Man Cave' },
  ],
  Furniture: [
    { slug: 'man-cave-furniture', title: 'Furniture Ideas' },
    { slug: 'man-cave-bar', title: 'Man Cave Bar' },
  ],
  Decor: [
    { slug: 'man-cave-decor', title: 'Man Cave Decor' },
    { slug: 'man-cave-wall-decor', title: 'Wall Decor' },
  ],
  'Neon Signs': [
    { slug: 'man-cave-signs', title: 'Man Cave Signs' },
    { slug: 'man-cave-bar', title: 'Man Cave Bar' },
  ],
  Bar: [
    { slug: 'man-cave-bar', title: 'Man Cave Bar' },
    { slug: 'basement-man-cave-ideas', title: 'Basement Man Cave' },
  ],
  Appliances: [
    { slug: 'man-cave-bar', title: 'Man Cave Bar' },
    { slug: 'garage-man-cave', title: 'Garage Man Cave' },
  ],
  Storage: [
    { slug: 'man-cave-storage', title: 'Storage Ideas' },
    { slug: 'garage-man-cave', title: 'Garage Man Cave' },
  ],
  Games: [
    { slug: 'basement-man-cave-ideas', title: 'Basement Man Cave' },
    { slug: 'man-cave-bar', title: 'Man Cave Bar' },
  ],
  'Golf Simulator': [
    { slug: 'golf-simulator-man-cave', title: 'Golf Simulator' },
    { slug: 'garage-man-cave', title: 'Garage Man Cave' },
  ],
  Audio: [
    { slug: 'basement-man-cave-ideas', title: 'Basement Man Cave' },
    { slug: 'man-cave-decor', title: 'Man Cave Decor' },
  ],
  Electronics: [
    { slug: 'basement-man-cave-ideas', title: 'Basement Man Cave' },
    { slug: 'golf-simulator-man-cave', title: 'Golf Simulator' },
  ],
  Flooring: [
    { slug: 'garage-man-cave', title: 'Garage Man Cave' },
    { slug: 'basement-man-cave-ideas', title: 'Basement Man Cave' },
  ],
  Climate: [
    { slug: 'garage-man-cave', title: 'Garage Man Cave' },
    { slug: 'outdoor-man-cave', title: 'Outdoor Man Cave' },
  ],
};

export default function ProductCrossLinks({ currentPageSlug, products }: ProductCrossLinksProps) {
  const categories = [...new Set(products.map((p) => p.category))];

  const seen = new Set<string>();
  const relatedPages: { slug: string; title: string }[] = [];

  for (const category of categories) {
    for (const page of CATEGORY_PAGE_MAP[category] || []) {
      if (!seen.has(page.slug) && page.slug !== currentPageSlug) {
        seen.add(page.slug);
        relatedPages.push(page);
      }
    }
    if (relatedPages.length >= 4) break;
  }

  if (relatedPages.length === 0) return null;

  return (
    <section className="max-w-2xl mx-auto mt-10 mb-8">
      <h3 className="text-base font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Shop Related Ideas
      </h3>
      <div className="flex flex-wrap gap-2">
        {relatedPages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            className="px-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-sm text-gray-300 hover:border-orange-500/50 hover:text-white transition-all"
          >
            {page.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
