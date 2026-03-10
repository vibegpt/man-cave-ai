'use client'

import { useState } from 'react'
import PhotoUpload from '@/components/PhotoUpload'
import StyleSelector from '@/components/StyleSelector'
import ProductRecommendations from '@/components/ProductRecommendations'
import InspirationLinks from '@/components/InspirationLinks'
import {
  trackPhotoUpload,
  trackStyleSelect,
  trackGenerationStart,
  trackGenerationComplete,
  trackGenerationError,
  trackDownload,
  trackCreateAnother,
} from '@/lib/analytics'

export default function HomeTool() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [customDescription, setCustomDescription] = useState<string>('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleStyleSelect = (styleId: string, customDesc?: string) => {
    setSelectedStyle(styleId)
    if (customDesc) setCustomDescription(customDesc)
    trackStyleSelect(styleId)
  }

  const handleImageSelect = (imageData: string) => {
    setSelectedImage(imageData)
    if (imageData) trackPhotoUpload()
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
      if (!response.ok || !data.success) throw new Error(data.error || 'Generation failed')
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

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-10">
        <div className="min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mb-4"></div>
            <p className="text-xl text-gray-400">Generating your dream man cave...</p>
            <p className="text-sm text-gray-500 mt-2">This takes about 30 seconds</p>
          </div>
        </div>
      </section>
    )
  }

  if (result) {
    return (
      <section className="container mx-auto px-4 py-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-2">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-red-400 font-medium text-sm">Design complete!</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Your <span className="text-red-500">
              {selectedStyle === 'custom' ? 'Custom' : selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1).replace(/_/g, ' ')}
            </span> Man Cave
          </h2>
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

        <ProductRecommendations selectedStyle={selectedStyle} customDescription={customDescription} />

        <div className="mt-12">
          <InspirationLinks />
        </div>
      </section>
    )
  }

  return (
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

        {!selectedImage && (
          <div className="text-center py-8 mt-4 border-t border-gray-900/50">
            <p className="text-sm text-gray-600">
              Trusted by thousands of homeowners • 30 second results • No credit card required
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
