'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Breadcrumbs from './Breadcrumbs';

const STYLES = [
  { id: 'gaming', emoji: '🎮', label: 'Gaming' },
  { id: 'sports_bar', emoji: '🏈', label: 'Sports Bar' },
  { id: 'home_theater', emoji: '🎬', label: 'Theater' },
  { id: 'golf_simulator', emoji: '⛳', label: 'Golf Simulator' },
  { id: 'custom', emoji: '✨', label: 'Custom' },
];

const LOADING_MESSAGES: { [key: string]: string[] } = {
  gaming: ['Analyzing room layout...', 'Adding gaming setup...', 'Installing RGB lighting...', 'Final touches...'],
  sports_bar: ['Analyzing room layout...', 'Adding bar counter...', 'Installing big screens...', 'Setting up lighting...'],
  home_theater: ['Analyzing room layout...', 'Adding theater seating...', 'Installing projection...', 'Adjusting lighting...'],
  golf_simulator: ['Analyzing room layout...', 'Installing simulator bay...', 'Adding putting green...', 'Final adjustments...'],
  custom: ['Analyzing your vision...', 'Planning the layout...', 'Adding custom elements...', 'Bringing it to life...']
};

const ALL_PAGES = [
  { slug: 'man-cave-ideas', title: 'Man Cave Ideas' },
  { slug: 'basement-man-cave-ideas', title: 'Basement Man Cave' },
  { slug: 'garage-man-cave', title: 'Garage Man Cave' },
  { slug: 'man-cave-bar', title: 'Man Cave Bar' },
  { slug: 'golf-simulator-man-cave', title: 'Golf Simulator' },
  { slug: 'man-cave-shed', title: 'Man Cave Shed' },
  { slug: 'man-cave-decor', title: 'Man Cave Decor' },
  { slug: 'man-cave-furniture', title: 'Furniture Ideas' },
  { slug: 'man-cave-gifts', title: 'Man Cave Gifts' },
  { slug: 'man-cave-signs', title: 'Man Cave Signs' },
  { slug: 'man-cave-wall-decor', title: 'Wall Decor' },
  { slug: 'man-cave-lighting', title: 'Lighting Ideas' },
  { slug: 'man-cave-storage', title: 'Storage Ideas' },
  { slug: 'man-cave-office', title: 'Man Cave Office' },
  { slug: 'outdoor-man-cave', title: 'Outdoor Man Cave' },
];

interface RelatedPage {
  slug: string;
  title: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  affiliateUrl: string;
  category: string;
}

interface SEOPageLayoutProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  content: string;
  relatedPages: RelatedPage[];
  faqs?: FAQ[];
  defaultStyle?: string;
  products?: Product[];
}

type AppState = 'upload' | 'generating' | 'results';

export default function SEOPageLayout({
  title,
  metaTitle,
  metaDescription,
  h1,
  subtitle,
  content,
  relatedPages,
  faqs = [],
  defaultStyle = 'gaming',
  products = [],
}: SEOPageLayoutProps) {
  const [appState, setAppState] = useState<AppState>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(defaultStyle);
  const [customStyle, setCustomStyle] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const canonicalUrl = `https://mancaveai.com/${title.toLowerCase().replace(/\s+/g, '-')}`;

  useEffect(() => {
    if (appState !== 'generating') {
      setCurrentMessageIndex(0);
      return;
    }
    const messages = LOADING_MESSAGES[selectedStyle] || LOADING_MESSAGES.custom;
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [appState, selectedStyle]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      alert('Please upload a room photo first');
      return;
    }
    if (selectedStyle === 'custom' && !customStyle.trim()) {
      alert('Please describe your ideal man cave style');
      return;
    }

    setAppState('generating');
    setError('');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: uploadedImage,
          styleId: selectedStyle,
          customDescription: selectedStyle === 'custom' ? customStyle : undefined,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGeneratedImageUrl(data.generatedImageUrl);
        setAppState('results');
      } else {
        setError(data.error || 'Generation failed. Please try again.');
        setAppState('upload');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
      setAppState('upload');
    }
  };

  const handleReset = () => {
    setAppState('upload');
    setUploadedImage(null);
    setGeneratedImageUrl('');
    setSelectedStyle(defaultStyle);
    setCustomStyle('');
    setError('');
  };

  const messages = LOADING_MESSAGES[selectedStyle] || LOADING_MESSAGES.custom;
  const currentStyleObj = STYLES.find(s => s.id === selectedStyle);

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": metaTitle,
    "author": { "@type": "Organization", "name": "ManCaveAI" },
    "publisher": { "@type": "Organization", "name": "ManCaveAI" },
    "datePublished": "2026-01-15",
    "dateModified": "2026-02-15",
    "description": metaDescription,
    "mainEntityOfPage": canonicalUrl,
  };

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="ManCaveAI" />
        <meta property="og:image" content="https://mancaveai.com/og-image.jpg" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://mancaveai.com/og-image.jpg" />

        {/* AEO - AI Engine Optimization */}
        <meta name="ai-content-summary" content={`ManCaveAI is a free AI tool that transforms photos of rooms into man cave designs. This page covers ${h1.toLowerCase()} with design tips, cost breakdowns, and a free AI visualization tool.`} />

        {/* Schema: Article */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

        {/* Schema: FAQ */}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
      </Head>

      <div className="bg-[#0a0a0a] min-h-screen">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/[0.03] blur-[120px] rounded-full" />
        </div>

        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-xl">🏠</span>
              <span className="font-semibold text-white">ManCaveAI</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <Link href="/man-cave-ideas" className="text-gray-400 hover:text-orange-500 transition">Ideas</Link>
              <Link href="/basement-man-cave-ideas" className="text-gray-400 hover:text-orange-500 transition">Basements</Link>
              <Link href="/garage-man-cave" className="text-gray-400 hover:text-orange-500 transition">Garages</Link>
              <Link href="/man-cave-bar" className="text-gray-400 hover:text-orange-500 transition">Bars</Link>
            </nav>
            <span className="text-sm text-gray-500">5 free designs</span>
          </div>
        </header>

        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ name: h1, href: `/${title.toLowerCase().replace(/\s+/g, '-')}` }]} />

        <main className="pt-4 pb-16 px-6">
          <div className="max-w-4xl mx-auto">

            {/* Hero */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">{h1}</h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
            </div>

            {/* Tool Card */}
            <div className="w-full max-w-xl mx-auto mb-16">

              {/* UPLOAD STATE */}
              {appState === 'upload' && (
                <div className="bg-[#141414] rounded-2xl border border-white/10 shadow-xl p-8">
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
                  )}

                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input')?.click()}
                    className={`border-2 border-dashed rounded-xl p-10 mb-6 cursor-pointer group bg-white/[0.02] transition-all ${
                      dragActive ? 'border-orange-500/60 bg-orange-500/5'
                      : uploadedImage ? 'border-green-500/40 bg-green-500/5'
                      : 'border-white/10 hover:border-orange-500/40'
                    }`}
                  >
                    <div className="text-center">
                      {uploadedImage ? (
                        <>
                          <img src={uploadedImage} alt="Your room" className="max-h-40 mx-auto mb-4 rounded-lg" />
                          <p className="text-sm font-medium text-green-400 mb-1">Photo ready!</p>
                          <p className="text-xs text-gray-500">Click to change</p>
                        </>
                      ) : (
                        <>
                          <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center transition-all ${dragActive ? 'bg-orange-500/20 scale-110' : 'group-hover:bg-orange-500/20 group-hover:scale-110'}`}>
                            <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-base font-medium text-white mb-1">{dragActive ? 'Drop your photo' : 'Drop your room photo here'}</p>
                          <p className="text-sm text-gray-500">or click to browse</p>
                        </>
                      )}
                    </div>
                    <input type="file" id="file-input" className="hidden" accept="image/*" onChange={handleFileInput} />
                  </div>

                  <div className="mb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-medium">Choose style</p>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex flex-wrap justify-center gap-2">
                        {STYLES.slice(0, 3).map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              selectedStyle === style.id
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                          >
                            <span className="mr-1.5">{style.emoji}</span>{style.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {STYLES.slice(3).map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              selectedStyle === style.id
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                          >
                            <span className="mr-1.5">{style.emoji}</span>{style.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {selectedStyle === 'custom' && (
                    <div className="mb-6">
                      <input
                        type="text"
                        value={customStyle}
                        onChange={(e) => setCustomStyle(e.target.value)}
                        placeholder="Describe your ideal man cave style..."
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-2">e.g., &quot;Rustic cabin with whiskey bar&quot;</p>
                    </div>
                  )}

                  <button
                    onClick={handleGenerate}
                    disabled={!uploadedImage}
                    className={`w-full py-4 font-semibold rounded-xl transition-all active:scale-[0.98] ${
                      uploadedImage ? 'bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25' : 'bg-white/10 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Generate Design
                  </button>

                  <div className="flex items-center justify-center gap-4 mt-5 text-xs text-gray-500">
                    {['Free to try', '30 second results', 'No signup'].map((text) => (
                      <span key={text} className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {text}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* GENERATING STATE */}
              {appState === 'generating' && (
                <div className="bg-[#141414] rounded-2xl border border-orange-500/30 shadow-xl p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                    <span className="text-4xl animate-pulse">{currentStyleObj?.emoji || '✨'}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Creating your {currentStyleObj?.label || 'Custom'} man cave</h2>
                  <p className="text-orange-400 font-medium mb-6 h-6">{messages[currentMessageIndex]}</p>
                  <div className="w-full bg-white/10 rounded-full h-1.5 mb-4 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full animate-progress" />
                  </div>
                  <p className="text-sm text-gray-500">This usually takes 20-30 seconds...</p>
                </div>
              )}

              {/* RESULTS STATE */}
              {appState === 'results' && (
                <div className="max-w-4xl">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-green-400">Design complete!</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#141414] rounded-2xl border border-white/10 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Before</span>
                      </div>
                      <div className="p-4">
                        <img src={uploadedImage || ''} alt="Before" className="w-full rounded-xl" />
                      </div>
                    </div>
                    <div className="bg-[#141414] rounded-2xl border border-orange-500/30 overflow-hidden">
                      <div className="px-4 py-3 border-b border-orange-500/30 bg-orange-500/5">
                        <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">After — {currentStyleObj?.label}</span>
                      </div>
                      <div className="p-4">
                        <img src={generatedImageUrl} alt="After" className="w-full rounded-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={handleReset} className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all">
                      Create Another Design
                    </button>
                    <a href={generatedImageUrl} download="my-man-cave.jpg" className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-center">
                      Download Image
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* SEO Content - only show in upload state */}
            {appState === 'upload' && (
              <>
                <div className="max-w-2xl mx-auto mb-16">
                  <div className="prose prose-invert prose-orange max-w-none">
                    <div className="text-gray-300 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                </div>

                {products.length > 0 && (
                  <section className="max-w-6xl mx-auto mt-16 px-4 mb-16">
                    <h2 className="text-2xl font-bold mb-2 text-center">
                      Shop the <span className="text-orange-500">Look</span>
                    </h2>
                    <p className="text-center text-gray-400 mb-6">
                      Top picks to build your man cave
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {products.map((product) => (
                        <a
                          key={product.id}
                          href={product.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500 transition-all"
                        >
                          <div className="aspect-square bg-gray-800 overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="p-3">
                            <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                            <h3 className="text-sm font-medium text-white mb-1 line-clamp-2 group-hover:text-orange-500 transition-colors">{product.name}</h3>
                            <p className="text-lg font-bold text-orange-500">{product.price}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-4">
                      As an Amazon Associate, we earn from qualifying purchases.
                    </p>
                  </section>
                )}

                {faqs.length > 0 && (
                  <div className="max-w-2xl mx-auto mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div key={index} className="bg-[#141414] rounded-xl border border-white/10 p-6">
                          <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                          <p className="text-gray-400">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="max-w-2xl mx-auto">
                  <h2 className="text-xl font-bold text-white mb-6">Explore More Man Cave Ideas</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {relatedPages.map((page) => (
                      <Link key={page.slug} href={`/${page.slug}`} className="bg-[#141414] rounded-xl border border-white/10 p-4 hover:border-orange-500/30 hover:bg-white/5 transition-all group">
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{page.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>

        {/* Comprehensive Footer */}
        <footer className="border-t border-white/5 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Room Types</h3>
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
                  <li><Link href="/man-cave-ideas" className="text-gray-500 hover:text-orange-500 transition">All Ideas</Link></li>
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
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% { width: 5%; }
          50% { width: 70%; }
          100% { width: 95%; }
        }
        .animate-progress {
          animation: progress 25s ease-out forwards;
        }
      `}</style>
    </>
  );
}
