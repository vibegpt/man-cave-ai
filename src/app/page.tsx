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

  // Main homepage - RED/BLACK PREMIUM DESIGN
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm">
        <p>© 2025 ManCaveAI. All rights reserved.</p>
      </footer>
    </main>
  )
}
