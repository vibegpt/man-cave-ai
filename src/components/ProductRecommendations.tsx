'use client'

import { getProductsForStyle } from '@/data/productMappings'
import type { Product } from '@/data/productMappings'

interface ProductRecommendationsProps {
  selectedStyle: string
  customDescription?: string
}

export default function ProductRecommendations({
  selectedStyle,
  customDescription,
}: ProductRecommendationsProps) {
  const products = getProductsForStyle(selectedStyle, customDescription)

  if (!products || products.length === 0) {
    return null
  }

  const handleProductClick = (product: Product) => {
    // Track affiliate link click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'affiliate_click', {
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        style: selectedStyle,
      })
    }
  }

  return (
    <section className="max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Shop the <span className="text-orange-500">Look</span>
        </h2>
        <p className="text-gray-400">
          Products to bring your {selectedStyle.replace(/_/g, ' ')} man cave to life
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => handleProductClick(product)}
            className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500 transition-all"
          >
            {/* Product Image */}
            <div className="aspect-square bg-gray-800 relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white">
                {product.category}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-3">
              <h3 className="text-sm font-medium text-white mb-1 line-clamp-2 group-hover:text-orange-500 transition-colors">
                {product.name}
              </h3>
              <p className="text-lg font-bold text-orange-500">{product.price}</p>
              <div className="mt-2 flex items-center text-xs text-gray-400">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View on Amazon
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          As an Amazon Associate, we earn from qualifying purchases. Prices shown are approximate.
        </p>
      </div>
    </section>
  )
}
