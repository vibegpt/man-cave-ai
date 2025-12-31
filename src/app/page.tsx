'use client'

import { useState } from 'react'
import PhotoUpload from '@/components/PhotoUpload'
import StyleSelector from '@/components/StyleSelector'
import InspirationLinks from '@/components/InspirationLinks'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

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

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Space into the Ultimate <span className="text-orange-500">Man Cave</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Upload a photo and see your room instantly transformed with AI-powered design
          </p>
        </div>
      </section>

      {/* Upload Section */}
      {!result && !loading && (
        <section className="container mx-auto px-4">
          <PhotoUpload onPhotoSelect={setSelectedImage} />
          {selectedImage && (
            <div className="mt-8">
              <StyleSelector onStyleSelect={setSelectedStyle} />
              {selectedStyle && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleGenerate}
                    className="px-12 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium text-lg transition"
                  >
                    Generate My Man Cave
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <section className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-xl text-gray-400">Generating your dream man cave...</p>
          </div>
        </section>
      )}

      {/* Results Section */}
      {result && (
        <>
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

            {/* Before/After Images */}
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-8">
              {/* Before */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-400">BEFORE</h3>
                <img src={selectedImage!} alt="Before" className="rounded-lg w-full" />
              </div>

              {/* After */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-orange-500">AFTER — {selectedStyle}</h3>
                <img src={result.imageUrl} alt="After" className="rounded-lg w-full" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownload}
                className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition"
              >
                Download Image
              </button>
              <button
                onClick={() => setResult(null)}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition"
              >
                Create Another Design
              </button>
            </div>
          </section>

          {/* Inspiration Links Component */}
          <section className="container mx-auto px-4 pb-16">
            <InspirationLinks />
          </section>
        </>
      )}
    </main>
  )
}
