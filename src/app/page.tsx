'use client'

import { useState } from 'react'
import PhotoUpload from '@/components/PhotoUpload'
import StyleSelector from '@/components/StyleSelector'
import InspirationLinks from '@/components/InspirationLinks'

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
  }

  const handleImageSelect = (imageData: string) => {
    setSelectedImage(imageData)
  }

  const handleGenerate = async () => {
    if (!selectedImage || !selectedStyle) {
      alert('Please upload an image and select a style')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: selectedImage,
          style: selectedStyle,
          customDescription: customDescription || undefined,
        }),
      })

      if (!response.ok) throw new Error('Generation failed')

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate design. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!result?.imageUrl) return
    const link = document.createElement('a')
    link.href = result.imageUrl
    link.download = `man-cave-${selectedStyle}-${Date.now()}.jpg`
    link.click()
  }

  const handleCreateAnother = () => {
    setResult(null)
    setSelectedImage(null)
    setSelectedStyle('')
    setCustomDescription('')
  }

  // Show results page
  if (result) {
    return (
      <main className="min-h-screen bg-black text-white">
        <section className="container mx-auto px-4 py-12">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-500 font-medium">Design complete!</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
            Your <span className="text-orange-500">
              {selectedStyle === 'custom' ? 'Custom' : selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1).replace(/_/g, ' ')}
            </span> Man Cave
          </h1>
          <p className="text-gray-400 text-center mb-12">Here's your AI-generated transformation</p>

          {/* Before/After Images */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Before */}
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <h3 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider">Before</h3>
              <img src={selectedImage!} alt="Before" className="rounded-lg w-full" />
            </div>

            {/* After */}
            <div className="bg-gray-900 rounded-xl p-4 border border-orange-500/30">
              <h3 className="text-sm font-semibold mb-3 text-orange-500 uppercase tracking-wider">
                After — {selectedStyle === 'custom' ? 'Custom' : selectedStyle.replace(/_/g, ' ')}
              </h3>
              <img src={result.imageUrl} alt="After" className="rounded-lg w-full" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={handleCreateAnother}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition shadow-lg shadow-orange-600/20"
            >
              Create Another Design
            </button>
            <button
              onClick={handleDownload}
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition border border-gray-700"
            >
              Download Image
            </button>
          </div>

          {/* Inspiration Links Component */}
          <section className="container mx-auto px-4 pb-16">
            <InspirationLinks />
          </section>
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

  // Main homepage - Upload + Styles on same page
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create your perfect <span className="text-orange-500">man cave</span>
          </h1>
          <p className="text-lg text-gray-400">
            Upload your garage, basement, shed or room photo. Get AI powered man cave ideas in seconds
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <PhotoUpload onPhotoSelect={handleImageSelect} />
          
          {/* Show selected image preview */}
          {selectedImage && (
            <div className="mt-4 bg-gray-900 rounded-xl p-3 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Photo</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-xs text-orange-500 hover:text-orange-400 transition"
                >
                  Change
                </button>
              </div>
              <img src={selectedImage} alt="Your space" className="w-full rounded-lg max-h-64 object-cover" />
            </div>
          )}
        </div>

        {/* Style Selector - Always visible */}
        <div className="max-w-4xl mx-auto mb-6">
          <StyleSelector onStyleSelect={handleStyleSelect} selectedStyle={selectedStyle} />
        </div>

        {/* Generate Button */}
        {selectedImage && selectedStyle && (
          <div className="text-center max-w-4xl mx-auto">
            <button
              onClick={handleGenerate}
              className="px-10 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold text-base transition shadow-lg shadow-orange-600/30"
            >
              Generate Design
            </button>
            <p className="text-xs text-gray-500 mt-3">
              ✓ Free to try  ✓ 30 second results  ✓ No signup
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
