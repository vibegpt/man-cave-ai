'use client'

import { useState } from 'react'
import Link from 'next/link'
import PhotoUpload from '@/components/PhotoUpload'
import StyleSelector from '@/components/StyleSelector'
import InspirationLinks from '@/components/InspirationLinks'
import ProductRecommendations from '@/components/ProductRecommendations'
import Logo from '@/components/Logo'
import {
  trackPhotoUpload,
  trackStyleSelect,
  trackGenerationStart,
  trackGenerationComplete,
  trackGenerationError,
  trackDownload,
  trackCreateAnother,
} from '@/lib/analytics'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [customDescription, setCustomDescription] = useState<string>('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleStyleSelect = (styleId: string, customDesc?: string) => {
    setSelectedStyle(styleId)
    if (customDesc) {
      setCustomDescription(customDesc)
    }
    trackStyleSelect(styleId)
  }

  const handleImageSelect = (imageData: string) => {
    setSelectedImage(imageData)
    if (imageData) {
      trackPhotoUpload()
    }
  }

  const handleGenerate = async () => {
    if (!selectedImage || !selectedStyle) {
      alert('Please upload an image and select a style')
      return
    }

    setLoading(true)
    trackGenerationStart(selectedStyle, !!customDescription)

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          styleId: selectedStyle,
          customDescription: customDescription || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Generation failed')
      }

      trackGenerationComplete(selectedStyle, data.processingTime || 0, data.generationId)
      setResult({ imageUrl: data.generatedImageUrl })
    } catch (error: any) {
      console.error('Error:', error)
      trackGenerationError(selectedStyle, error.message || 'Unknown error')
      alert('Failed to generate design. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!result?.imageUrl) return
    trackDownload(selectedStyle)
    const link = document.createElement('a')
    link.href = result.imageUrl
    link.download = `man-cave-${selectedStyle}-${Date.now()}.jpg`
    link.click()
  }

  const handleCreateAnother = () => {
    trackCreateAnother(selectedStyle)
    setResult(null)
    setSelectedImage(null)
    setSelectedStyle('')
    setCustomDescription('')
  }

  // Show results page
  if (result) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <header className="border-b border-red-900/30">
          <div className="container mx-auto px-4 py-3">
            <Logo />
          </div>
        </header>

        <section className="container mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-2">
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-red-400 font-medium text-sm">Design complete!</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Your <span className="text-red-500">
                {selectedStyle === 'custom' ? 'Custom' : selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1).replace(/_/g, ' ')}
              </span> Man Cave
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-6">
            <div className="bg-[#111] rounded-xl p-3 border border-gray-800">
              <h3 className="text-xs font-semibold mb-2 text-gray-500 uppercase tracking-wider">Before</h3>
              <img src={selectedImage!} alt="Before" className="rounded-lg w-full" />
            </div>
            <div className="bg-[#111] rounded-xl p-3 border border-red-500/40">
              <h3 className="text-xs font-semibold mb-2 text-red-500 uppercase tracking-wider">
                After — {selectedStyle === 'custom' ? 'Custom' : selectedStyle.replace(/_/g, ' ')}
              </h3>
              <img src={result.imageUrl} alt="After" className="rounded-lg w-full" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={handleCreateAnother}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition shadow-lg shadow-red-600/30"
            >
              Create Another Design
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-[#1a1a1a] hover:bg-[#222] text-white rounded-lg font-medium transition border border-gray-700"
            >
              Download Image
            </button>
          </div>

          {/* Product Recommendations */}
          <ProductRecommendations
            selectedStyle={selectedStyle}
            customDescription={customDescription}
          />

          {/* Inspiration Links */}
          <div className="mt-12">
            <InspirationLinks />
          </div>
        </section>
      </main>
    )
  }

  // Show loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p className="text-xl text-gray-400">Generating your dream man cave...</p>
          <p className="text-sm text-gray-500 mt-2">This takes about 30 seconds</p>
        </div>
      </main>
    )
  }

  const homepageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is ManCaveAI really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You get 5 free man cave design generations with no signup or credit card required. Upload a photo, pick a style, and get your design in about 30 seconds." } },
      { "@type": "Question", "name": "What rooms work best for a man cave?", "acceptedAnswer": { "@type": "Answer", "text": "Basements are the most popular choice because they offer space, natural soundproofing, and privacy. Garages work well if you can spare the parking. Sheds provide complete separation from the house. Spare bedrooms and bonus rooms are the easiest to convert." } },
      { "@type": "Question", "name": "How accurate are the AI-generated designs?", "acceptedAnswer": { "@type": "Answer", "text": "Our AI analyzes your room's layout, dimensions, and lighting to create realistic transformations. The designs show what your actual space could look like with the selected man cave style." } },
      { "@type": "Question", "name": "What man cave styles can I choose from?", "acceptedAnswer": { "@type": "Answer", "text": "ManCaveAI offers gaming setups, sports bars, home theaters, golf simulator bays, and a custom option where you describe any style you want." } },
      { "@type": "Question", "name": "How much does it cost to build a man cave?", "acceptedAnswer": { "@type": "Answer", "text": "Costs vary dramatically by scope: budget builds run $500-$2,000, mid-range setups cost $5,000-$15,000, and premium builds range from $20,000-$50,000+." } },
    ]
  };

  // Main homepage - RED/BLACK PREMIUM DESIGN
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      {/* Premium Header */}
      <header className="border-b border-red-900/20 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Logo />
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/basement-man-cave-ideas" className="text-gray-400 hover:text-red-500 transition">Basements</Link>
              <Link href="/garage-man-cave" className="text-gray-400 hover:text-red-500 transition">Garages</Link>
              <Link href="/man-cave-bar" className="text-gray-400 hover:text-red-500 transition">Bars</Link>
              <Link href="/golf-simulator-man-cave" className="text-gray-400 hover:text-red-500 transition">Golf Sims</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-12 border-b border-gray-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-red-400 text-xs font-medium uppercase tracking-wider">AI-Powered Design</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Design Your <span className="text-red-500">Man Cave</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Transform any room into your ultimate retreat. Upload a photo, pick a style, get results in 30 seconds.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free to use
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No signup
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Instant results
            </span>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Photo Upload */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold text-sm">1</span>
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Upload Your Space
                </label>
              </div>
              <PhotoUpload onPhotoSelect={handleImageSelect} currentImage={selectedImage ?? undefined} />
            </div>

            {/* Right Column: Style Selection */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold text-sm">2</span>
                <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  Choose Your Style
                </label>
              </div>
              <StyleSelector onStyleSelect={handleStyleSelect} selectedStyle={selectedStyle} compact />

              {/* Generate Button */}
              {selectedImage && selectedStyle && (
                <div className="mt-6">
                  <button
                    onClick={handleGenerate}
                    className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-bold text-lg transition shadow-xl shadow-red-600/30 border border-red-500/30"
                  >
                    🚀 Generate My Man Cave Design
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          {!selectedImage && (
            <div className="text-center py-8 mt-4 border-t border-gray-900/50">
              <p className="text-sm text-gray-600">
                Trusted by thousands of homeowners • 30 second results • No credit card required
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Room-Specific Ideas Section */}
      <section className="bg-[#0f0f0f] border-t border-b border-gray-900/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Man Cave Ideas by <span className="text-red-500">Room Type</span>
              </h2>
              <p className="text-gray-500">
                Get design inspiration tailored to your specific space
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/basement-man-cave-ideas"
                className="group relative bg-[#111] rounded-xl p-6 border border-gray-800 hover:border-red-500/50 transition-all overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">🏠</div>
                  <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors mb-1">
                    Basement
                  </h3>
                  <p className="text-xs text-gray-600">Home theaters & bars</p>
                </div>
              </Link>

              <Link
                href="/garage-man-cave"
                className="group relative bg-[#111] rounded-xl p-6 border border-gray-800 hover:border-red-500/50 transition-all overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">🚗</div>
                  <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors mb-1">
                    Garage
                  </h3>
                  <p className="text-xs text-gray-600">Sports bars & workshops</p>
                </div>
              </Link>

              <Link
                href="/golf-simulator-man-cave"
                className="group relative bg-[#111] rounded-xl p-6 border border-gray-800 hover:border-red-500/50 transition-all overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">⛳</div>
                  <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors mb-1">
                    Golf Simulator
                  </h3>
                  <p className="text-xs text-gray-600">Indoor golf setups</p>
                </div>
              </Link>

              <Link
                href="/man-cave-shed"
                className="group relative bg-[#111] rounded-xl p-6 border border-gray-800 hover:border-red-500/50 transition-all overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">🏚️</div>
                  <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors mb-1">
                    Shed
                  </h3>
                  <p className="text-xs text-gray-600">Backyard retreats</p>
                </div>
              </Link>
            </div>

            {/* Scroll indicator arrow */}
            <div className="flex justify-center mt-10">
              <div className="flex flex-col items-center text-gray-500 animate-bounce">
                <span className="text-xs mb-2">More below</span>
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 32 32" 
                  fill="none" 
                  className="text-red-500/60"
                >
                  <path 
                    d="M8 12C8 12 12 8 16 8C20 8 24 12 24 12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M16 8V24" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <path 
                    d="M10 18L16 24L22 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 border-b border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                How <span className="text-red-500">ManCaveAI</span> Works
              </h2>
              <p className="text-gray-500">Transform any room in three simple steps</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold">1</div>
                <h3 className="font-semibold text-white mb-2">Upload a Photo</h3>
                <p className="text-sm text-gray-500">Take a photo of your basement, garage, shed, or spare room. Any angle works—our AI adapts to your space.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold">2</div>
                <h3 className="font-semibold text-white mb-2">Pick a Style</h3>
                <p className="text-sm text-gray-500">Choose from gaming setups, sports bars, home theaters, golf simulators, or describe your own custom vision.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-500 font-bold">3</div>
                <h3 className="font-semibold text-white mb-2">Get Your Design</h3>
                <p className="text-sm text-gray-500">In about 30 seconds, see your room transformed into a man cave. Download the image or try another style.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Guides Section */}
      <section className="py-16 border-b border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Man Cave Ideas by <span className="text-red-500">Style</span>
              </h2>
              <p className="text-gray-500">Browse design guides for every type of man cave</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Link href="/man-cave-bar" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">🍺</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Bar Ideas</h3>
              </Link>
              <Link href="/man-cave-decor" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Decor</h3>
              </Link>
              <Link href="/man-cave-furniture" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">🛋️</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Furniture</h3>
              </Link>
              <Link href="/man-cave-lighting" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Lighting</h3>
              </Link>
              <Link href="/man-cave-signs" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">🪧</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Signs</h3>
              </Link>
              <Link href="/man-cave-wall-decor" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">🖼️</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Wall Decor</h3>
              </Link>
              <Link href="/man-cave-storage" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Storage</h3>
              </Link>
              <Link href="/man-cave-office" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">💻</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Office</h3>
              </Link>
              <Link href="/outdoor-man-cave" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">🌳</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Outdoor</h3>
              </Link>
              <Link href="/man-cave-gifts" className="group bg-[#111] rounded-xl p-5 border border-gray-800 hover:border-red-500/50 transition-all text-center">
                <div className="text-3xl mb-3">🎁</div>
                <h3 className="font-semibold text-sm text-white group-hover:text-red-500 transition">Gift Ideas</h3>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-16 border-b border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h2 className="text-2xl font-bold text-white mb-4">What Is a Man Cave?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              A man cave is a dedicated personal space—typically a basement, garage, shed, or spare room—designed as a retreat for relaxation and hobbies. Whether it is a sports bar with multiple screens, a gaming paradise with RGB lighting, a home theater with surround sound, or a golf simulator bay, the best man caves reflect the owner&apos;s personality and interests.
            </p>
            <h2 className="text-2xl font-bold text-white mb-4">How Much Does a Man Cave Cost?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Man cave costs range widely based on scope and ambition. Budget builds ($500-$2,000) cover basic furniture, a TV, and simple decor. Mid-range setups ($5,000-$15,000) include quality furniture, a home bar, upgraded audio/visual equipment, and custom lighting. Premium man caves ($20,000-$50,000+) feature custom built-ins, golf simulators, home theaters with acoustic treatment, or full wet bars with plumbing. Our free AI design tool helps you visualize what is possible in your actual space before spending a dollar.
            </p>
            <h2 className="text-2xl font-bold text-white mb-4">Why Use AI to Design Your Man Cave?</h2>
            <p className="text-gray-400 leading-relaxed">
              Traditional interior design consultation costs $150-$500 per hour. ManCaveAI lets you upload a photo of your room and see it transformed into multiple man cave styles in seconds—completely free. Try a sports bar look, switch to a gaming setup, or describe your own custom vision. Each design is generated using AI that understands your room&apos;s dimensions, lighting, and layout to create realistic transformations you can actually build.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 border-b border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              Frequently Asked <span className="text-red-500">Questions</span>
            </h2>
            <div className="space-y-4">
              {[
                { q: 'Is ManCaveAI really free?', a: 'Yes. You get 5 free man cave design generations with no signup or credit card required. Upload a photo, pick a style, and get your design in about 30 seconds.' },
                { q: 'What rooms work best for a man cave?', a: 'Basements are the most popular choice because they offer space, natural soundproofing, and privacy. Garages work well if you can spare the parking. Sheds provide complete separation from the house. Spare bedrooms and bonus rooms are the easiest to convert.' },
                { q: 'How accurate are the AI-generated designs?', a: 'Our AI analyzes your room\'s layout, dimensions, and lighting to create realistic transformations. The designs show what your actual space could look like with the selected man cave style—not generic renders.' },
                { q: 'What man cave styles can I choose from?', a: 'ManCaveAI offers gaming setups, sports bars, home theaters, golf simulator bays, and a custom option where you describe any style you want—rustic cabin, whiskey lounge, retro arcade, modern minimalist, or anything else you can imagine.' },
                { q: 'How much does it cost to build a man cave?', a: 'Costs vary dramatically by scope: budget builds run $500-$2,000 (basic furniture and TV), mid-range setups cost $5,000-$15,000 (bar, quality furniture, better AV), and premium builds range from $20,000-$50,000+ (golf simulators, home theaters, custom built-ins).' },
              ].map((faq, i) => (
                <div key={i} className="bg-[#111] rounded-xl border border-gray-800 p-6">
                  <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="py-12 border-t border-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Room Types</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/basement-man-cave-ideas" className="text-gray-600 hover:text-red-500 transition">Basement</Link></li>
                  <li><Link href="/garage-man-cave" className="text-gray-600 hover:text-red-500 transition">Garage</Link></li>
                  <li><Link href="/man-cave-shed" className="text-gray-600 hover:text-red-500 transition">Shed</Link></li>
                  <li><Link href="/outdoor-man-cave" className="text-gray-600 hover:text-red-500 transition">Outdoor</Link></li>
                  <li><Link href="/man-cave-office" className="text-gray-600 hover:text-red-500 transition">Office</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Features</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/man-cave-bar" className="text-gray-600 hover:text-red-500 transition">Bar Ideas</Link></li>
                  <li><Link href="/golf-simulator-man-cave" className="text-gray-600 hover:text-red-500 transition">Golf Simulator</Link></li>
                  <li><Link href="/man-cave-lighting" className="text-gray-600 hover:text-red-500 transition">Lighting</Link></li>
                  <li><Link href="/man-cave-storage" className="text-gray-600 hover:text-red-500 transition">Storage</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Style & Decor</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/man-cave-decor" className="text-gray-600 hover:text-red-500 transition">Decor Ideas</Link></li>
                  <li><Link href="/man-cave-furniture" className="text-gray-600 hover:text-red-500 transition">Furniture</Link></li>
                  <li><Link href="/man-cave-signs" className="text-gray-600 hover:text-red-500 transition">Signs</Link></li>
                  <li><Link href="/man-cave-wall-decor" className="text-gray-600 hover:text-red-500 transition">Wall Decor</Link></li>
                  <li><Link href="/man-cave-gifts" className="text-gray-600 hover:text-red-500 transition">Gift Ideas</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Tool</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/" className="text-gray-600 hover:text-red-500 transition">AI Design Generator</Link></li>
                  <li><Link href="/man-cave-ideas" className="text-gray-600 hover:text-red-500 transition">All Man Cave Ideas</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-900/50 pt-6 text-center">
              <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} ManCaveAI. Free AI-powered man cave design tool.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
