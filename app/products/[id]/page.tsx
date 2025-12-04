"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Mock product data
  const product = {
    id: Number.parseInt(id),
    name: "Hand-Woven Saree",
    artisan: "Priya Textiles",
    location: "Jaipur, Rajasthan",
    price: 4500,
    originalPrice: 5500,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?key=saree-detail",
    images: ["/placeholder.svg?key=saree1", "/placeholder.svg?key=saree2", "/placeholder.svg?key=saree3"],
    description: `
      This exquisite hand-woven saree showcases the timeless craftsmanship of Jaipur's finest artisans. 
      Made from pure cotton with traditional weaving techniques, each piece is unique and tells a story 
      of generations of expertise. The intricate patterns are created using natural dyes, ensuring 
      eco-friendly and sustainable production.
    `,
    features: [
      "Pure cotton material",
      "Hand-woven with traditional techniques",
      "Natural dyes used",
      "Approximately 5.5 meters in length",
      "Includes matching blouse piece",
      "Dry clean recommended",
    ],
    inStock: true,
    shippingTime: "3-5 business days",
    returnPolicy: "30 days easy returns",
    warranty: "Authenticity guaranteed",
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-warm-sand">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button key={idx} className="aspect-square rounded-lg overflow-hidden border-2 border-primary">
                  <img src={img || "/placeholder.svg"} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-secondary font-semibold uppercase tracking-wide text-sm">By {product.artisan}</p>
              <h1 className="text-4xl font-serif font-bold text-warm-charcoal mt-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-warm-charcoal/20"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-warm-charcoal/60">{product.reviews} reviews</span>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                <span className="text-xl text-warm-charcoal/50 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-lg font-semibold text-green-600">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-serif font-bold text-warm-charcoal mb-4">About This Product</h3>
              <p className="text-warm-charcoal/70 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-serif font-bold text-warm-charcoal mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-warm-charcoal/70">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Artisan Info */}
            <div className="bg-warm-sand/50 rounded-lg p-6">
              <p className="text-sm text-warm-charcoal/60 mb-2">Handcrafted by</p>
              <h4 className="text-xl font-serif font-bold text-warm-charcoal">{product.artisan}</h4>
              <p className="text-warm-charcoal/60 mt-1">{product.location}</p>
              <button className="mt-4 px-6 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition">
                Visit Artisan Profile
              </button>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 border-t border-border pt-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border border-border rounded-lg hover:bg-warm-sand transition"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border border-border rounded-lg hover:bg-warm-sand transition"
                >
                  +
                </button>
              </div>

              <button
                disabled={!product.inStock}
                className="w-full py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-warm-rust transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
              </button>

              <button className="w-full py-3 border-2 border-border text-warm-charcoal rounded-lg font-semibold hover:bg-warm-sand transition flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
              <div className="text-center space-y-2">
                <Truck className="w-6 h-6 text-primary mx-auto" />
                <p className="text-sm font-semibold text-warm-charcoal">Free Shipping</p>
                <p className="text-xs text-warm-charcoal/60">All orders over ₹500</p>
              </div>
              <div className="text-center space-y-2">
                <RotateCcw className="w-6 h-6 text-primary mx-auto" />
                <p className="text-sm font-semibold text-warm-charcoal">Easy Returns</p>
                <p className="text-xs text-warm-charcoal/60">{product.returnPolicy}</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="w-6 h-6 text-primary mx-auto" />
                <p className="text-sm font-semibold text-warm-charcoal">Secure</p>
                <p className="text-xs text-warm-charcoal/60">{product.warranty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
