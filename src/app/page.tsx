'use client'

import { useState } from 'react'
import PhotoUpload from '@/components/PhotoUpload'
import StyleSelector from '@/components/StyleSelector'
import InspirationLinks from '@/components/InspirationLinks'  // ADD THIS

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedStyle, setSelectedStyle] = useState<string>('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // ... your existing functions ...

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        {/* ... existing content ... */}
      </section>

      {/* Upload Section */}
      {!result && (
        <section>
          <PhotoUpload onImageSelect={setSelectedImage} />
          <StyleSelector onStyleSelect={setSelectedStyle} />
          <button onClick={handleGenerate}>Generate</button>
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
                onClick={() => {/* download logic */ }}
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

          {/* NEW: Inspiration Links Component */}
          <section className="container mx-auto px-4 pb-16">
            <InspirationLinks />
          </section>
        </>
      )}
    </main>
  )
}