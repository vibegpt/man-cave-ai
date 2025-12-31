import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mancaveai.com';
  const currentDate = new Date().toISOString();

  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/generator-complete`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  // SEO Landing Pages - High-volume keywords
  const seoPages = [
    // Highest volume pages (1000+ monthly searches)
    { slug: 'man-cave-ideas', priority: 0.9 },           // 8,100
    { slug: 'man-cave-decor', priority: 0.9 },           // 2,900
    { slug: 'garage-man-cave', priority: 0.9 },          // 2,400 (garage man cave ideas)
    { slug: 'man-cave-furniture', priority: 0.8 },       // 1,000
    { slug: 'man-cave-gifts', priority: 0.8 },           // 1,000
    { slug: 'man-cave-signs', priority: 0.8 },           // 1,300
    { slug: 'basement-man-cave-ideas', priority: 0.9 },  // 1,600
    { slug: 'man-cave-shed', priority: 0.8 },            // 1,600
    
    // High volume pages (500-999 monthly searches)
    { slug: 'man-cave-bar', priority: 0.8 },             // 1,300
    { slug: 'golf-simulator-man-cave', priority: 0.8 }, // 880
    { slug: 'man-cave-wall-decor', priority: 0.7 },      // 720
    { slug: 'man-cave-lighting', priority: 0.7 },        // 480
    { slug: 'man-cave-storage', priority: 0.7 },         // varies
    { slug: 'outdoor-man-cave', priority: 0.7 },         // 390
    { slug: 'man-cave-office', priority: 0.7 },          // 320
  ];

  const seoSitemapEntries = seoPages.map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }));

  return [...corePages, ...seoSitemapEntries];
}
