"use client"

import Link from "next/link"
import { Volume2, RotateCcw, Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface VoiceResultsProps {
  products: Product[]
  onReset: () => void
}

export function VoiceResults({ products, onReset }: VoiceResultsProps) {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Volume2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Voice Discovery Results</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-warm-charcoal mb-4">Perfect Matches Found</h1>
          <p className="text-warm-charcoal/60 max-w-2xl mx-auto">
            We found {products.length} products that match your description. Curated by AI to match your voice request.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="card-light hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 rounded-lg overflow-hidden mb-4 bg-warm-sand">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-warm-sand transition"
                >
                  <Heart
                    className={`w-5 h-5 transition ${
                      wishlist.includes(product.id) ? "fill-primary text-primary" : "text-warm-charcoal"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-3">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-serif font-bold text-warm-charcoal hover:text-primary transition">
                    {product.name}
                  </h3>
                </Link>

                <div className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</div>

                <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Refine Search or Explore */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={onReset}
            className="py-6 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Another Search
          </button>

          <Link
            href="/shop"
            className="py-6 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition flex items-center justify-center gap-2"
          >
            <span>Explore Full Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
