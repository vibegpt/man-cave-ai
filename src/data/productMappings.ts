// Product recommendations based on style and SEO keywords
// Amazon affiliate links will be added here

export interface Product {
  id: string
  name: string
  price: string
  image: string
  affiliateUrl: string
  category: string
}

export const STYLE_PRODUCTS: Record<string, Product[]> = {
  gaming: [
    {
      id: 'gaming-chair',
      name: 'Gaming Chair - Ergonomic with Lumbar Support',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80',
      affiliateUrl: 'https://amzn.to/3Lvpnue',
      category: 'Furniture',
    },
    {
      id: 'led-strips',
      name: 'RGB LED Strip Lights - 50ft',
      price: '$35',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: '#',
      category: 'Lighting',
    },
    {
      id: 'gaming-desk',
      name: 'L-Shaped Gaming Desk with Monitor Stand',
      price: '$249',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80',
      affiliateUrl: '#',
      category: 'Furniture',
    },
    {
      id: 'soundbar',
      name: 'Gaming Soundbar with Subwoofer',
      price: '$199',
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&q=80',
      affiliateUrl: '#',
      category: 'Audio',
    },
  ],
  sports_bar: [
    {
      id: 'bar-stools',
      name: 'Industrial Bar Stools - Set of 2',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
      affiliateUrl: '#',
      category: 'Furniture',
    },
    {
      id: 'neon-beer-sign',
      name: 'LED Neon Beer Sign',
      price: '$79',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: '#',
      category: 'Decor',
    },
    {
      id: 'mini-fridge',
      name: 'Beverage Refrigerator - 120 Can Capacity',
      price: '$399',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&q=80',
      affiliateUrl: 'https://amzn.to/4sB1r9K',
      category: 'Appliances',
    },
    {
      id: 'dartboard',
      name: 'Electronic Dartboard Cabinet',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&q=80',
      affiliateUrl: '#',
      category: 'Games',
    },
  ],
  theater: [
    {
      id: 'theater-seating',
      name: 'Home Theater Recliner Seats - Row of 4',
      price: '$1,499',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
      affiliateUrl: 'https://amzn.to/3LvpfLg',
      category: 'Furniture',
    },
    {
      id: 'projector',
      name: '4K Home Theater Projector',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1560725056-41c1d5e1ca00?w=400&q=80',
      affiliateUrl: '#',
      category: 'Electronics',
    },
    {
      id: 'soundbar-theater',
      name: '5.1 Channel Soundbar System',
      price: '$349',
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&q=80',
      affiliateUrl: '#',
      category: 'Audio',
    },
    {
      id: 'blackout-curtains',
      name: 'Blackout Curtains - Theater Grade',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1585128903994-8d3f9cf1e01d?w=400&q=80',
      affiliateUrl: '#',
      category: 'Window Treatment',
    },
  ],
  golf_simulator: [
    {
      id: 'golf-simulator-system',
      name: 'OptiShot2 Golf Simulator - Complete Package',
      price: '$4,999',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80',
      affiliateUrl: 'https://amzn.to/3NB8wa0',
      category: 'Golf Simulator',
    },
    {
      id: 'golf-launch-monitor',
      name: 'SkyTrak Launch Monitor & Golf Simulator',
      price: '$2,499',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80',
      affiliateUrl: '#', // Replace with Amazon affiliate link - HIGH VALUE
      category: 'Golf Simulator',
    },
    {
      id: 'golf-impact-screen',
      name: 'Golf Simulator Impact Screen - 10ft x 8ft',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80',
      affiliateUrl: '#',
      category: 'Golf Simulator',
    },
    {
      id: 'golf-mat',
      name: 'Premium Golf Practice Mat with Tee Holder',
      price: '$249',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80',
      affiliateUrl: '#',
      category: 'Equipment',
    },
    {
      id: 'golf-net',
      name: 'Golf Practice Net - 10ft x 7ft',
      price: '$179',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80',
      affiliateUrl: '#',
      category: 'Equipment',
    },
    {
      id: 'putting-green',
      name: 'Indoor Putting Green Mat - 10ft',
      price: '$129',
      image: 'https://images.unsplash.com/photo-1593111774240-d529f12a1ca1?w=400&q=80',
      affiliateUrl: '#',
      category: 'Equipment',
    },
  ],
}

// SEO keyword-based product suggestions
export const KEYWORD_PRODUCTS: Record<string, Product[]> = {
  basement: [
    {
      id: 'dehumidifier',
      name: 'Basement Dehumidifier - 70 Pint',
      price: '$259',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
      affiliateUrl: '#',
      category: 'Appliances',
    },
    {
      id: 'flooring',
      name: 'Interlocking Foam Floor Tiles',
      price: '$99',
      image: 'https://images.unsplash.com/photo-1615875221248-d0b2d1500f4d?w=400&q=80',
      affiliateUrl: '#',
      category: 'Flooring',
    },
  ],
  garage: [
    {
      id: 'garage-storage',
      name: 'Heavy Duty Garage Storage System',
      price: '$349',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80',
      affiliateUrl: '#',
      category: 'Storage',
    },
    {
      id: 'epoxy-floor',
      name: 'Garage Floor Epoxy Kit',
      price: '$179',
      image: 'https://images.unsplash.com/photo-1615875221248-d0b2d1500f4d?w=400&q=80',
      affiliateUrl: '#',
      category: 'Flooring',
    },
  ],
  budget: [
    {
      id: 'string-lights',
      name: 'Warm White String Lights - 50ft',
      price: '$24',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: '#',
      category: 'Lighting',
    },
    {
      id: 'posters',
      name: 'Vintage Sports Poster Set',
      price: '$29',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
      affiliateUrl: '#',
      category: 'Decor',
    },
  ],
  golf_simulator: [
    {
      id: 'golf-simulator-budget',
      name: 'Golf Simulator Launch Monitor (Entry Level)',
      price: '$499',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80',
      affiliateUrl: '#', // HIGH CPC keyword
      category: 'Golf Simulator',
    },
    {
      id: 'golf-enclosure',
      name: 'Golf Simulator Enclosure Kit',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80',
      affiliateUrl: '#',
      category: 'Golf Simulator',
    },
  ],
}

// Get products for a specific style with optional keyword enhancement
export function getProductsForStyle(
  styleId: string,
  customDescription?: string
): Product[] {
  const styleProducts = STYLE_PRODUCTS[styleId] || []

  // Add keyword-based products if description contains relevant terms
  if (customDescription) {
    const desc = customDescription.toLowerCase()
    const keywordProducts: Product[] = []

    // HIGH CPC KEYWORD: Golf simulator products
    if (desc.includes('golf simulator') || desc.includes('golf sim')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.golf_simulator || []))
    }
    if (desc.includes('basement')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.basement || []))
    }
    if (desc.includes('garage')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.garage || []))
    }
    if (desc.includes('budget') || desc.includes('cheap') || desc.includes('affordable')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.budget || []))
    }

    return [...styleProducts, ...keywordProducts].slice(0, 6)
  }

  return styleProducts.slice(0, 4)
}
