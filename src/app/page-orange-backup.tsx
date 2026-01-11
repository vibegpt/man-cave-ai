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
      <main className="min-h-screen bg-black text-white">
        <header className="border-b border-gray-900">
          <div className="container mx-auto px-4 py-3">
            <Logo />
          </div>
        </header>

        <section className="container mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-500 font-medium text-sm">Design complete!</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Your <span className="text-orange-500">
                {selectedStyle === 'custom' ? 'Custom' : selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1).replace(/_/g, ' ')}
              </span> Man Cave
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-6">
            <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
              <h3 className="text-xs font-semibold mb-2 text-gray-400 uppercase tracking-wider">Before</h3>
              <img src={selectedImage!} alt="Before" className="rounded-lg w-full" />
            </div>
            <div className="bg-gray-900 rounded-xl p-3 border border-orange-500/30">
              <h3 className="text-xs font-semibold mb-2 text-orange-500 uppercase tracking-wider">
                After — {selectedStyle === 'custom' ? 'Custom' : selectedStyle.replace(/_/g, ' ')}
              </h3>
              <img src={result.imageUrl} alt="After" className="rounded-lg w-full" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={handleCreateAnother}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition shadow-lg shadow-orange-600/20"
            >
              Create Another Design
            </button>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition border border-gray-700"
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
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-xl text-gray-400">Generating your dream man cave...</p>
          <p className="text-sm text-gray-500 mt-2">This takes about 30 seconds</p>
        </div>
      </main>
    )
  }

  // Main homepage - NEW LAYOUT WITH HERO
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Compact Hero Banner */}
      <header className="border-b border-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <Logo />
            <div className="text-center md:text-right">
              <h1 className="text-xl md:text-2xl font-bold">
                Design Your Ultimate <span className="text-orange-500">Man Cave</span> with AI in 30 Seconds
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                <span className="inline-flex items-center gap-3">
                  <span>✓ Free</span>
                  <span>✓ No signup</span>
                  <span>✓ Instant results</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Tool Section - Side by Side Layout */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column: Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                1. Upload Your Space
              </label>
              <PhotoUpload onPhotoSelect={handleImageSelect} currentImage={selectedImage ?? undefined} />
            </div>

            {/* Right Column: Style Selection + Generate */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                2. Choose Your Style
              </label>
              <StyleSelector onStyleSelect={handleStyleSelect} selectedStyle={selectedStyle} compact />

              {/* Generate Button */}
              {selectedImage && selectedStyle && (
                <div className="mt-4">
                  <button
                    onClick={handleGenerate}
                    className="w-full px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-lg transition shadow-lg shadow-orange-600/30"
                  >
                    Generate My Man Cave Design
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Trust Indicators - only show when no image yet */}
          {!selectedImage && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                Free to try • 30 second results • No signup required
              </p>
            </div>
          )}
        </div>

        {/* Room-Specific Ideas Section */}
        <section className="max-w-6xl mx-auto mt-16 px-4">
          <h2 className="text-2xl font-bold text-center mb-2">
            Man Cave Ideas by <span className="text-orange-500">Room Type</span>
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Get design inspiration tailored to your specific space
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/basement-man-cave-ideas"
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-500 transition-all group text-center"
            >
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors mb-1">
                Basement
              </h3>
              <p className="text-xs text-gray-500">Home theaters & bars</p>
            </Link>

            <Link
              href="/garage-man-cave"
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-500 transition-all group text-center"
            >
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors mb-1">
                Garage
              </h3>
              <p className="text-xs text-gray-500">Sports bars & workshops</p>
            </Link>

            <Link
              href="/golf-simulator-man-cave"
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-500 transition-all group text-center"
            >
              <div className="text-4xl mb-3">⛳</div>
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors mb-1">
                Golf Simulator
              </h3>
              <p className="text-xs text-gray-500">Indoor golf setups</p>
            </Link>

            <Link
              href="/man-cave-shed"
              className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-orange-500 transition-all group text-center"
            >
              <div className="text-4xl mb-3">🏚️</div>
              <h3 className="font-semibold text-white group-hover:text-orange-500 transition-colors mb-1">
                Shed
              </h3>
              <p className="text-xs text-gray-500">Backyard retreats</p>
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
