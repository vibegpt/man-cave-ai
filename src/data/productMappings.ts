// Product recommendations based on style and SEO keywords
// Amazon Associates tag: mancaveidea0d-20

const TAG = 'mancaveidea0d-20'
const amz = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${TAG}`

export interface Product {
  id: string
  name: string
  price: string
  image: string
  affiliateUrl: string
  category: string
}

// ─── STYLE PRODUCTS (shown after AI generation) ───────────────────────────────

export const STYLE_PRODUCTS: Record<string, Product[]> = {
  gaming: [
    {
      id: 'secretlab-titan',
      name: 'Secretlab Titan Evo Gaming Chair',
      price: '$399',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80',
      affiliateUrl: amz('B09JGVHPFY'),
      category: 'Furniture',
    },
    {
      id: 'govee-led-strips',
      name: 'Govee RGBIC LED Strip Lights 16.4ft',
      price: '$32',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B09B5MDKZB'),
      category: 'Lighting',
    },
    {
      id: 'flexispot-l-desk',
      name: 'Flexispot L-Shaped Gaming Desk with Monitor Stand',
      price: '$219',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80',
      affiliateUrl: amz('B08KGSDTZ5'),
      category: 'Furniture',
    },
    {
      id: 'creative-soundbar',
      name: 'Creative Stage V2 2.1 Soundbar with Subwoofer',
      price: '$109',
      image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&q=80',
      affiliateUrl: amz('B09DXGF4VL'),
      category: 'Audio',
    },
  ],

  sports_bar: [
    {
      id: 'industrial-bar-stools',
      name: 'Williston Forge Industrial Bar Stools Set of 2',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
      affiliateUrl: amz('B07PKFHZNP'),
      category: 'Furniture',
    },
    {
      id: 'vevor-neon-beer',
      name: 'VEVOR LED Neon Beer Sign 20"x16"',
      price: '$69',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B09WY7XXNZ'),
      category: 'Decor',
    },
    {
      id: 'frigidaire-beverage-fridge',
      name: 'Frigidaire 126-Can Beverage Refrigerator',
      price: '$329',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&q=80',
      affiliateUrl: amz('B08JNZRQ7K'),
      category: 'Appliances',
    },
    {
      id: 'viper-dartboard',
      name: 'Viper Electronic Dartboard Cabinet Set',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&q=80',
      affiliateUrl: amz('B0001E2YXQ'),
      category: 'Games',
    },
  ],

  theater: [
    {
      id: 'flash-theater-seating',
      name: 'Flash Furniture Home Theater Recliners Row of 2',
      price: '$799',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
      affiliateUrl: amz('B07DHJBL3Z'),
      category: 'Furniture',
    },
    {
      id: 'benq-projector',
      name: 'BenQ TK700STi 4K HDR Short-Throw Projector',
      price: '$999',
      image: 'https://images.unsplash.com/photo-1560725056-41c1d5e1ca00?w=400&q=80',
      affiliateUrl: amz('B08VDTYVNB'),
      category: 'Electronics',
    },
    {
      id: 'sonos-arc',
      name: 'Sonos Arc Premium Soundbar',
      price: '$699',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      affiliateUrl: amz('B086WKPNLN'),
      category: 'Audio',
    },
    {
      id: 'nicetown-blackout-curtains',
      name: 'NICETOWN Blackout Curtains 2 Panels',
      price: '$39',
      image: 'https://images.unsplash.com/photo-1585128903994-8d3f9cf1e01d?w=400&q=80',
      affiliateUrl: amz('B01BHXAN4E'),
      category: 'Window Treatment',
    },
  ],

  golf_simulator: [
    {
      id: 'garmin-r10',
      name: 'Garmin Approach R10 Golf Launch Monitor',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80',
      affiliateUrl: amz('B09BCQHRWX'),
      category: 'Golf Simulator',
    },
    {
      id: 'carls-place-screen',
      name: "Carl's Place Golf Impact Screen 10ft x 8ft",
      price: '$549',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80',
      affiliateUrl: amz('B07MMZDYD9'),
      category: 'Golf Simulator',
    },
    {
      id: 'country-club-elite-mat',
      name: 'Real Feel Golf Mats Country Club Elite 5x5',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1593111774240-d529f12a1ca1?w=400&q=80',
      affiliateUrl: amz('B003JKRCUM'),
      category: 'Equipment',
    },
    {
      id: 'optoma-projector',
      name: 'Optoma GT1080HDR Short-Throw Projector',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1560725056-41c1d5e1ca00?w=400&q=80',
      affiliateUrl: amz('B07N8C5ZT6'),
      category: 'Electronics',
    },
    {
      id: 'putting-green',
      name: 'Putt-A-Bout Grassroots Indoor Putting Green 10ft',
      price: '$99',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80',
      affiliateUrl: amz('B000J20M9W'),
      category: 'Equipment',
    },
    {
      id: 'golf-practice-net',
      name: 'Rukket 10x7ft Haack Golf Net',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1560725056-41c1d5e1ca00?w=400&q=80',
      affiliateUrl: amz('B01LW0IIXL'),
      category: 'Equipment',
    },
  ],

  rustic: [
    {
      id: 'rustic-bar-stools',
      name: 'Reclaimed Wood Look Bar Stools Set of 2',
      price: '$219',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
      affiliateUrl: amz('B07X6CMS77'),
      category: 'Furniture',
    },
    {
      id: 'rustic-wall-clock',
      name: 'Barnwood Industrial 24" Metal Wall Clock',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1517467139951-f5a925c9f9de?w=400&q=80',
      affiliateUrl: amz('B01B4LBV7I'),
      category: 'Decor',
    },
    {
      id: 'electric-fireplace',
      name: 'Duraflame 3D Infrared Electric Fireplace Insert',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1549675584-91f19a69a7cc?w=400&q=80',
      affiliateUrl: amz('B07WMRBXKF'),
      category: 'Appliances',
    },
    {
      id: 'edison-pendant',
      name: 'Rustic Edison Bulb Pendant Light 3-Pack',
      price: '$69',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
      affiliateUrl: amz('B07G67GCHM'),
      category: 'Lighting',
    },
  ],

  modern: [
    {
      id: 'modern-sectional',
      name: 'Mid-Century Modern Sectional Sofa in Dark Gray',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
      affiliateUrl: amz('B09NKHPVMJ'),
      category: 'Furniture',
    },
    {
      id: 'floating-media-console',
      name: 'WAMPAT Floating TV Stand Wall Mounted 70"',
      price: '$229',
      image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&q=80',
      affiliateUrl: amz('B07VCMZGNJ'),
      category: 'Furniture',
    },
    {
      id: 'philips-hue-starter',
      name: 'Philips Hue White & Color Ambiance Starter Kit',
      price: '$179',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B08XHHLNKQ'),
      category: 'Lighting',
    },
    {
      id: 'whiskey-decanter',
      name: 'Waterford Lismore Crystal Whiskey Decanter Set',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1602451930853-f69a1a0fa4f4?w=400&q=80',
      affiliateUrl: amz('B003CMFGFI'),
      category: 'Bar',
    },
  ],

  whiskey_lounge: [
    {
      id: 'whiskey-decanter-set',
      name: 'Godinger Whiskey Decanter Globe Set with 4 Glasses',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1602451930853-f69a1a0fa4f4?w=400&q=80',
      affiliateUrl: amz('B01LH0MKBS'),
      category: 'Bar',
    },
    {
      id: 'leather-club-chair',
      name: 'Christopher Knight Bonded Leather Club Chair',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
      affiliateUrl: amz('B000NRQKQ8'),
      category: 'Furniture',
    },
    {
      id: 'whiskey-stones',
      name: 'RSVP International Whiskey Stones Set of 9',
      price: '$19',
      image: 'https://images.unsplash.com/photo-1599709777825-a050d7475895?w=400&q=80',
      affiliateUrl: amz('B002SPAVAU'),
      category: 'Bar',
    },
    {
      id: 'cigar-humidor',
      name: 'Mantello Walnut Cigar Humidor 50-Cigar Capacity',
      price: '$59',
      image: 'https://images.unsplash.com/photo-1567345758860-f3c4a71a8873?w=400&q=80',
      affiliateUrl: amz('B07X9DLQZ7'),
      category: 'Accessories',
    },
  ],

  workshop: [
    {
      id: 'pegboard-kit',
      name: 'FLEXIMOUNTS 4x8ft Pegboard Wall Panel Kit',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
      affiliateUrl: amz('B07PGLBL8K'),
      category: 'Storage',
    },
    {
      id: 'workbench',
      name: 'Gladiator 6ft Hardwood Top Workbench',
      price: '$399',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80',
      affiliateUrl: amz('B00CPLJYBC'),
      category: 'Furniture',
    },
    {
      id: 'garage-fridge',
      name: 'BLACK+DECKER Garage Ready Refrigerator 10.1 cu ft',
      price: '$379',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&q=80',
      affiliateUrl: amz('B08L9DZ7TD'),
      category: 'Appliances',
    },
    {
      id: 'shop-fan',
      name: 'Hurricane Box Fan 20" High Velocity',
      price: '$59',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
      affiliateUrl: amz('B00BGUF9IS'),
      category: 'Climate',
    },
  ],

  custom: [
    {
      id: 'neon-sign-custom',
      name: 'VEVOR Custom LED Neon Sign 20"x16"',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B09CYTRBK2'),
      category: 'Decor',
    },
    {
      id: 'led-strips-govee',
      name: 'Govee RGBIC LED Strip Lights 32.8ft',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B09B5MDKZB'),
      category: 'Lighting',
    },
    {
      id: 'mini-fridge-custom',
      name: 'Midea 3.1 Cu Ft Compact Refrigerator',
      price: '$139',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&q=80',
      affiliateUrl: amz('B08GKQ9RLG'),
      category: 'Appliances',
    },
    {
      id: 'bluetooth-speaker',
      name: 'JBL Charge 5 Portable Bluetooth Speaker',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
      affiliateUrl: amz('B08WM3BBCK'),
      category: 'Audio',
    },
  ],
}

// ─── KEYWORD PRODUCTS (shown based on room type / description keywords) ────────

export const KEYWORD_PRODUCTS: Record<string, Product[]> = {
  basement: [
    {
      id: 'frigidaire-dehumidifier',
      name: 'Frigidaire 70-Pint Basement Dehumidifier',
      price: '$279',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
      affiliateUrl: amz('B078H37DGT'),
      category: 'Appliances',
    },
    {
      id: 'foam-floor-tiles',
      name: 'Rubber Cal Foam Interlocking Floor Tiles 25 Pack',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1615875221248-d0b2d1500f4d?w=400&q=80',
      affiliateUrl: amz('B000NJPR1K'),
      category: 'Flooring',
    },
  ],

  garage: [
    {
      id: 'gladiator-wall-storage',
      name: 'Gladiator GearWall Panels 2-Pack Garage Storage',
      price: '$179',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80',
      affiliateUrl: amz('B001BWPIZG'),
      category: 'Storage',
    },
    {
      id: 'rust-oleum-epoxy',
      name: "Rust-Oleum RockSolid Garage Floor Epoxy Kit",
      price: '$99',
      image: 'https://images.unsplash.com/photo-1615875221248-d0b2d1500f4d?w=400&q=80',
      affiliateUrl: amz('B00AXZGRQO'),
      category: 'Flooring',
    },
  ],

  budget: [
    {
      id: 'string-lights-50ft',
      name: 'Brightech Ambience Pro 48ft Outdoor String Lights',
      price: '$32',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B016N1M98Q'),
      category: 'Lighting',
    },
    {
      id: 'vintage-sports-poster',
      name: 'Vintage Sports Poster Pack - Set of 4',
      price: '$25',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
      affiliateUrl: amz('B07QF5S4QN'),
      category: 'Decor',
    },
  ],

  golf_simulator: [
    {
      id: 'garmin-r10-kw',
      name: 'Garmin Approach R10 Launch Monitor',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80',
      affiliateUrl: amz('B09BCQHRWX'),
      category: 'Golf Simulator',
    },
    {
      id: 'golf-enclosure-kit',
      name: "Carl's Place DIY Golf Simulator Enclosure Kit",
      price: '$799',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80',
      affiliateUrl: amz('B07MMZDYD9'),
      category: 'Golf Simulator',
    },
  ],

  shed: [
    {
      id: 'mini-split-shed',
      name: 'PIONEER 12,000 BTU Mini Split AC + Heat Pump',
      price: '$699',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
      affiliateUrl: amz('B07QVPFHND'),
      category: 'Climate',
    },
    {
      id: 'lvp-flooring',
      name: 'LifeProof Sterling Oak 7.5mm LVP Flooring 20sqft',
      price: '$79',
      image: 'https://images.unsplash.com/photo-1615875221248-d0b2d1500f4d?w=400&q=80',
      affiliateUrl: amz('B089GLQNBQ'),
      category: 'Flooring',
    },
  ],
}

// ─── CONTENT PAGE PRODUCTS (shown on SEO pillar pages) ────────────────────────

export const CONTENT_PAGE_PRODUCTS: Record<string, Product[]> = {
  'man-cave-lighting': [
    {
      id: 'govee-rgbic',
      name: 'Govee RGBIC LED Strip Lights 16.4ft',
      price: '$32',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B09B5MDKZB'),
      category: 'Lighting',
    },
    {
      id: 'vevor-neon-bar',
      name: 'VEVOR LED Neon Bar Sign 20"x16"',
      price: '$69',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B09WY7XXNZ'),
      category: 'Neon Signs',
    },
    {
      id: 'billiard-light',
      name: 'Hathaway 54" 3-Light Billiard / Pool Table Light',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
      affiliateUrl: amz('B003BLSFAO'),
      category: 'Lighting',
    },
    {
      id: 'lutron-dimmer',
      name: 'Lutron Caseta Wireless Smart Dimmer Switch',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      affiliateUrl: amz('B00KLAXFQA'),
      category: 'Lighting',
    },
  ],

  'man-cave-furniture': [
    {
      id: 'homelegance-sectional',
      name: 'Homelegance Dark Brown Leather Sectional Sofa',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
      affiliateUrl: amz('B09NKHPVMJ'),
      category: 'Furniture',
    },
    {
      id: 'flash-power-recliner',
      name: 'Flash Furniture Contemporary Brown Power Recliner',
      price: '$399',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80',
      affiliateUrl: amz('B07DHJBL3Z'),
      category: 'Furniture',
    },
    {
      id: 'industrial-bar-stools-furn',
      name: 'Industrial Pipe Bar Stools Set of 2',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
      affiliateUrl: amz('B07PKFHZNP'),
      category: 'Furniture',
    },
    {
      id: 'besta-tv-console',
      name: 'WAMPAT Floating Media Console 70" Wall Mounted',
      price: '$229',
      image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&q=80',
      affiliateUrl: amz('B07VCMZGNJ'),
      category: 'Furniture',
    },
  ],

  'man-cave-decor': [
    {
      id: 'neon-sign-decor',
      name: 'ADVPRO Man Cave Neon Sign Dual-Color 16"x12"',
      price: '$74',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B01G9FD5RK'),
      category: 'Neon Signs',
    },
    {
      id: 'metal-tin-signs',
      name: 'Vintage Tin Metal Signs Set of 4 Bar Decor',
      price: '$32',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
      affiliateUrl: amz('B07QF5S4QN'),
      category: 'Decor',
    },
    {
      id: 'whiskey-decanter-decor',
      name: 'Godinger Whiskey Decanter Globe Set with 4 Glasses',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1602451930853-f69a1a0fa4f4?w=400&q=80',
      affiliateUrl: amz('B01LH0MKBS'),
      category: 'Bar',
    },
    {
      id: 'industrial-clock',
      name: 'Barnwood 24" Industrial Metal Wall Clock',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1517467139951-f5a925c9f9de?w=400&q=80',
      affiliateUrl: amz('B01B4LBV7I'),
      category: 'Decor',
    },
  ],

  'man-cave-signs': [
    {
      id: 'advpro-man-cave-neon',
      name: 'ADVPRO Man Cave Neon Sign 16"x12"',
      price: '$74',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B01G9FD5RK'),
      category: 'Neon Signs',
    },
    {
      id: 'personalized-wood-sign',
      name: 'Custom Name Man Cave Engraved Wood Sign',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
      affiliateUrl: amz('B08R1M47C4'),
      category: 'Personalized',
    },
    {
      id: 'vintage-tin-set',
      name: 'Retro Metal Tin Signs Man Cave Bar Set of 4',
      price: '$28',
      image: 'https://images.unsplash.com/photo-1517467139951-f5a925c9f9de?w=400&q=80',
      affiliateUrl: amz('B07PMNH8SN'),
      category: 'Metal Signs',
    },
    {
      id: 'led-neon-bar',
      name: 'VEVOR Neon Signs for Man Cave Bar LED 20"x16"',
      price: '$59',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
      affiliateUrl: amz('B09WY7XXNZ'),
      category: 'Neon Signs',
    },
  ],

  'man-cave-gifts': [
    {
      id: 'whiskey-gift-set',
      name: 'Godinger Whiskey Decanter Globe Set — Perfect Gift',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1602451930853-f69a1a0fa4f4?w=400&q=80',
      affiliateUrl: amz('B01LH0MKBS'),
      category: 'Bar Gifts',
    },
    {
      id: 'cocktail-smoker-kit',
      name: 'TMKEFFC Cocktail Smoker Kit with Torch',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1602451930853-f69a1a0fa4f4?w=400&q=80',
      affiliateUrl: amz('B09G9Z7XPF'),
      category: 'Bar Gifts',
    },
    {
      id: 'govee-smart-lights-gift',
      name: 'Govee Smart LED Strip Lights 32.8ft Gift',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B09B5MDKZB'),
      category: 'Tech Gifts',
    },
    {
      id: 'jbl-charge5',
      name: 'JBL Charge 5 Portable Bluetooth Speaker',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
      affiliateUrl: amz('B08WM3BBCK'),
      category: 'Tech Gifts',
    },
  ],

  'golf-simulator-man-cave': [
    {
      id: 'garmin-r10-page',
      name: 'Garmin Approach R10 Golf Launch Monitor',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&q=80',
      affiliateUrl: amz('B09BCQHRWX'),
      category: 'Launch Monitor',
    },
    {
      id: 'carls-impact-screen',
      name: "Carl's Place 10x8ft Golf Impact Screen",
      price: '$549',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=400&q=80',
      affiliateUrl: amz('B07MMZDYD9'),
      category: 'Simulator',
    },
    {
      id: 'country-club-mat',
      name: 'Real Feel Country Club Elite Golf Mat 5x5',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1593111774240-d529f12a1ca1?w=400&q=80',
      affiliateUrl: amz('B003JKRCUM'),
      category: 'Equipment',
    },
    {
      id: 'optoma-short-throw',
      name: 'Optoma GT1080HDR Short-Throw Projector',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1560725056-41c1d5e1ca00?w=400&q=80',
      affiliateUrl: amz('B07N8C5ZT6'),
      category: 'Projector',
    },
  ],

  'man-cave-shed': [
    {
      id: 'pioneer-mini-split',
      name: 'PIONEER 12,000 BTU Ductless Mini Split AC + Heat',
      price: '$699',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
      affiliateUrl: amz('B07QVPFHND'),
      category: 'Climate',
    },
    {
      id: 'shed-led-strips',
      name: 'Govee Outdoor LED Strip Lights Waterproof 32.8ft',
      price: '$45',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B09B5MDKZB'),
      category: 'Lighting',
    },
    {
      id: 'shed-bar-fridge',
      name: 'Midea 3.1 Cu Ft Compact Refrigerator',
      price: '$139',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&q=80',
      affiliateUrl: amz('B08GKQ9RLG'),
      category: 'Appliances',
    },
    {
      id: 'shed-bar-stools',
      name: 'Industrial Metal Bar Stools Set of 2',
      price: '$169',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
      affiliateUrl: amz('B07PKFHZNP'),
      category: 'Furniture',
    },
  ],

  'man-cave-bar': [
    {
      id: 'kegerator',
      name: 'EdgeStar Full Size Built-In Kegerator',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&q=80',
      affiliateUrl: amz('B003VAWV6G'),
      category: 'Bar Equipment',
    },
    {
      id: 'bar-stools-bar',
      name: 'Industrial Swivel Bar Stools Set of 2',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
      affiliateUrl: amz('B07PKFHZNP'),
      category: 'Furniture',
    },
    {
      id: 'neon-beer-bar',
      name: 'VEVOR LED Neon Beer Sign for Bar 20"x16"',
      price: '$69',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B09WY7XXNZ'),
      category: 'Neon Signs',
    },
    {
      id: 'cocktail-kit-bar',
      name: 'Cocktail Kingdom Home Bar Tools Set 7-Piece',
      price: '$79',
      image: 'https://images.unsplash.com/photo-1602451930853-f69a1a0fa4f4?w=400&q=80',
      affiliateUrl: amz('B00B1VWDV4'),
      category: 'Bar',
    },
  ],

  'man-cave-ideas': [
    {
      id: 'ideas-neon',
      name: 'ADVPRO Man Cave Neon Sign 16"x12"',
      price: '$74',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B01G9FD5RK'),
      category: 'Decor',
    },
    {
      id: 'ideas-led',
      name: 'Govee RGBIC LED Strip Lights 16.4ft',
      price: '$32',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B09B5MDKZB'),
      category: 'Lighting',
    },
    {
      id: 'ideas-fridge',
      name: 'Frigidaire 126-Can Beverage Refrigerator',
      price: '$329',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&q=80',
      affiliateUrl: amz('B08JNZRQ7K'),
      category: 'Appliances',
    },
    {
      id: 'ideas-dartboard',
      name: 'Viper Electronic Dartboard Cabinet Set',
      price: '$149',
      image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&q=80',
      affiliateUrl: amz('B0001E2YXQ'),
      category: 'Games',
    },
  ],

  'basement-man-cave-ideas': [
    {
      id: 'basement-dehumid',
      name: 'Frigidaire 70-Pint Basement Dehumidifier',
      price: '$279',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
      affiliateUrl: amz('B078H37DGT'),
      category: 'Appliances',
    },
    {
      id: 'basement-flooring',
      name: 'Rubber Cal Foam Floor Tiles 25-Pack',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1615875221248-d0b2d1500f4d?w=400&q=80',
      affiliateUrl: amz('B000NJPR1K'),
      category: 'Flooring',
    },
    {
      id: 'basement-bar-stools',
      name: 'Industrial Swivel Bar Stools Set of 2',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
      affiliateUrl: amz('B07PKFHZNP'),
      category: 'Furniture',
    },
    {
      id: 'basement-neon',
      name: 'ADVPRO Man Cave Neon Sign 16"x12"',
      price: '$74',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B01G9FD5RK'),
      category: 'Decor',
    },
  ],

  'garage-man-cave': [
    {
      id: 'garage-epoxy',
      name: "Rust-Oleum RockSolid Garage Floor Epoxy Kit",
      price: '$99',
      image: 'https://images.unsplash.com/photo-1615875221248-d0b2d1500f4d?w=400&q=80',
      affiliateUrl: amz('B00AXZGRQO'),
      category: 'Flooring',
    },
    {
      id: 'garage-storage-system',
      name: 'Gladiator GearWall Panels 2-Pack',
      price: '$179',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80',
      affiliateUrl: amz('B001BWPIZG'),
      category: 'Storage',
    },
    {
      id: 'garage-fridge-2',
      name: 'BLACK+DECKER Garage-Ready Refrigerator 10.1 cu ft',
      price: '$379',
      image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=400&q=80',
      affiliateUrl: amz('B08L9DZ7TD'),
      category: 'Appliances',
    },
    {
      id: 'garage-pegboard',
      name: 'FLEXIMOUNTS 4x8ft Pegboard Wall Panel Kit',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
      affiliateUrl: amz('B07PGLBL8K'),
      category: 'Storage',
    },
  ],

  'man-cave-storage': [
    {
      id: 'storage-pegboard',
      name: 'FLEXIMOUNTS 4x8ft Pegboard Wall Organizer Kit',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
      affiliateUrl: amz('B07PGLBL8K'),
      category: 'Storage',
    },
    {
      id: 'storage-shelving',
      name: 'Amazon Basics 5-Shelf Heavy Duty Shelving Unit',
      price: '$79',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80',
      affiliateUrl: amz('B071NRSXZW'),
      category: 'Storage',
    },
    {
      id: 'storage-cabinet',
      name: 'Gladiator Premier Rolling Garage Cabinet',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      affiliateUrl: amz('B001BWPIZG'),
      category: 'Storage',
    },
    {
      id: 'storage-ottoman',
      name: 'Nathan James Payton Foldable Storage Ottoman Bench',
      price: '$89',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
      affiliateUrl: amz('B07DGMP7YX'),
      category: 'Furniture',
    },
  ],

  'man-cave-wall-decor': [
    {
      id: 'walldecor-metal-art',
      name: 'Large Metal Wall Art Vintage Garage Sign 24"x16"',
      price: '$39',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
      affiliateUrl: amz('B07QF5S4QN'),
      category: 'Decor',
    },
    {
      id: 'walldecor-neon',
      name: 'ADVPRO Man Cave Neon Sign Dual-Color 16"x12"',
      price: '$74',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80',
      affiliateUrl: amz('B01G9FD5RK'),
      category: 'Neon Signs',
    },
    {
      id: 'walldecor-poster-frames',
      name: 'Americanflat 11x17 Movie Poster Frames Set of 6',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1517467139951-f5a925c9f9de?w=400&q=80',
      affiliateUrl: amz('B08RDJFVHQ'),
      category: 'Frames',
    },
    {
      id: 'walldecor-acoustic-panels',
      name: 'BUBOS Acoustic Foam Panels 12-Pack 12"x12"',
      price: '$29',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
      affiliateUrl: amz('B08LZ1V9QP'),
      category: 'Acoustic',
    },
  ],

  'outdoor-man-cave': [
    {
      id: 'outdoor-bar-cabinet',
      name: 'GDLF Outdoor Grill Table with Storage Cabinet',
      price: '$189',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80',
      affiliateUrl: amz('B0BPYQGGMZ'),
      category: 'Bar',
    },
    {
      id: 'outdoor-tv-cover',
      name: 'Garnetics Outdoor TV Cover 55" Weatherproof',
      price: '$29',
      image: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&q=80',
      affiliateUrl: amz('B01NBGRLZW'),
      category: 'Electronics',
    },
    {
      id: 'outdoor-string-lights',
      name: 'Brightech Ambience Pro 48ft Outdoor Edison Bulb String Lights',
      price: '$32',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B016N1M98Q'),
      category: 'Lighting',
    },
    {
      id: 'outdoor-patio-heater',
      name: 'AmazonBasics Outdoor Patio Heater 46,000 BTU',
      price: '$159',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
      affiliateUrl: amz('B00LKFNPU6'),
      category: 'Climate',
    },
  ],

  'man-cave-office': [
    {
      id: 'office-monitor-arm',
      name: 'HUANUO Dual Monitor Arm Stand',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80',
      affiliateUrl: amz('B07T5SY43T'),
      category: 'Desk Setup',
    },
    {
      id: 'office-led-bias',
      name: 'Govee Monitor Backlight LED Kit RGBIC',
      price: '$29',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=400&q=80',
      affiliateUrl: amz('B09RDCLXQ6'),
      category: 'Lighting',
    },
    {
      id: 'office-whiskey-set',
      name: 'Godinger Whiskey Decanter Globe with 4 Glasses',
      price: '$49',
      image: 'https://images.unsplash.com/photo-1602451930853-f69a1a0fa4f4?w=400&q=80',
      affiliateUrl: amz('B01LH0MKBS'),
      category: 'Bar',
    },
    {
      id: 'office-floor-lamp',
      name: 'Brightech Sparq Arc LED Floor Lamp',
      price: '$79',
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&q=80',
      affiliateUrl: amz('B01J0ORO5I'),
      category: 'Lighting',
    },
  ],
}

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

// Get products for AI generator (style-based + keyword enhancement)
export function getProductsForStyle(
  styleId: string,
  customDescription?: string
): Product[] {
  const styleProducts = STYLE_PRODUCTS[styleId] || []

  if (customDescription) {
    const desc = customDescription.toLowerCase()
    const keywordProducts: Product[] = []

    if (desc.includes('golf simulator') || desc.includes('golf sim')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.golf_simulator || []))
    }
    if (desc.includes('basement')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.basement || []))
    }
    if (desc.includes('garage')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.garage || []))
    }
    if (desc.includes('shed')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.shed || []))
    }
    if (desc.includes('budget') || desc.includes('cheap') || desc.includes('affordable')) {
      keywordProducts.push(...(KEYWORD_PRODUCTS.budget || []))
    }

    return [...styleProducts, ...keywordProducts].slice(0, 6)
  }

  return styleProducts.slice(0, 4)
}

// Get products for content/SEO pages
export function getProductsForPage(pageSlug: string): Product[] {
  return CONTENT_PAGE_PRODUCTS[pageSlug] || []
}
