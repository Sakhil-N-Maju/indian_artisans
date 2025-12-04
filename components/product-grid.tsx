"use client"

import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  artisan: string
  price: number
  image: string
  rating: number
  reviews: number
  category: string
  inStock: boolean
}

const allProducts: Product[] = [
  // Textiles
  {
    id: 1,
    name: "Hand-Woven Saree",
    artisan: "Priya Textiles",
    price: 4500,
    image: "/placeholder.svg?key=textile1",
    rating: 4.8,
    reviews: 124,
    category: "textiles",
    inStock: true,
  },
  {
    id: 2,
    name: "Organic Cotton Dupatta",
    artisan: "Sharma Weaves",
    price: 2200,
    image: "/placeholder.svg?key=textile2",
    rating: 4.6,
    reviews: 89,
    category: "textiles",
    inStock: true,
  },
  {
    id: 3,
    name: "Silk Shawl",
    artisan: "Kashmir Silks",
    price: 8900,
    image: "/placeholder.svg?key=textile3",
    rating: 4.9,
    reviews: 156,
    category: "textiles",
    inStock: true,
  },
  {
    id: 4,
    name: "Block Print Fabric",
    artisan: "Rajasthani Arts",
    price: 1800,
    image: "/placeholder.svg?key=textile4",
    rating: 4.5,
    reviews: 67,
    category: "textiles",
    inStock: true,
  },

  // Pottery
  {
    id: 5,
    name: "Terracotta Pot Set",
    artisan: "Rajesh Ceramics",
    price: 3200,
    image: "/placeholder.svg?key=pottery1",
    rating: 4.7,
    reviews: 98,
    category: "pottery",
    inStock: true,
  },
  {
    id: 6,
    name: "Blue Pottery Bowl",
    artisan: "Khurja Crafts",
    price: 2800,
    image: "/placeholder.svg?key=pottery2",
    rating: 4.8,
    reviews: 112,
    category: "pottery",
    inStock: true,
  },
  {
    id: 7,
    name: "Hand-Painted Vase",
    artisan: "Delhi Ceramics",
    price: 4600,
    image: "/placeholder.svg?key=pottery3",
    rating: 4.6,
    reviews: 76,
    category: "pottery",
    inStock: true,
  },
  {
    id: 8,
    name: "Earthen Dinner Set",
    artisan: "Jaipur Pottery",
    price: 5800,
    image: "/placeholder.svg?key=pottery4",
    rating: 4.9,
    reviews: 145,
    category: "pottery",
    inStock: false,
  },

  // Jewelry
  {
    id: 9,
    name: "Kundan Necklace",
    artisan: "Meera Jewelry",
    price: 8900,
    image: "/placeholder.svg?key=jewelry1",
    rating: 4.9,
    reviews: 203,
    category: "jewelry",
    inStock: true,
  },
  {
    id: 10,
    name: "Meenakari Earrings",
    artisan: "Jaipur Jewels",
    price: 3500,
    image: "/placeholder.svg?key=jewelry2",
    rating: 4.7,
    reviews: 134,
    category: "jewelry",
    inStock: true,
  },
  {
    id: 11,
    name: "Temple Jewelry Set",
    artisan: "South Indian Arts",
    price: 6200,
    image: "/placeholder.svg?key=jewelry3",
    rating: 4.8,
    reviews: 167,
    category: "jewelry",
    inStock: true,
  },
  {
    id: 12,
    name: "Silver Bangles",
    artisan: "Silversmith Studio",
    price: 4400,
    image: "/placeholder.svg?key=jewelry4",
    rating: 4.6,
    reviews: 98,
    category: "jewelry",
    inStock: true,
  },

  // Woodcraft
  {
    id: 13,
    name: "Carved Wooden Panel",
    artisan: "Kumar Woodcraft",
    price: 5600,
    image: "/placeholder.svg?key=wood1",
    rating: 4.8,
    reviews: 87,
    category: "woodcraft",
    inStock: true,
  },
  {
    id: 14,
    name: "Sandalwood Box",
    artisan: "Mysore Crafts",
    price: 3900,
    image: "/placeholder.svg?key=wood2",
    rating: 4.7,
    reviews: 102,
    category: "woodcraft",
    inStock: true,
  },
  {
    id: 15,
    name: "Wooden Jewelry Box",
    artisan: "Handicraft Studio",
    price: 2800,
    image: "/placeholder.svg?key=wood3",
    rating: 4.5,
    reviews: 61,
    category: "woodcraft",
    inStock: true,
  },
  {
    id: 16,
    name: "Inlay Work Table",
    artisan: "Agra Handicrafts",
    price: 12500,
    image: "/placeholder.svg?key=wood4",
    rating: 4.9,
    reviews: 143,
    category: "woodcraft",
    inStock: true,
  },

  // Metalwork
  {
    id: 17,
    name: "Brass Diya Set",
    artisan: "Moradabad Brass",
    price: 2200,
    image: "/placeholder.svg?key=metal1",
    rating: 4.6,
    reviews: 78,
    category: "metalwork",
    inStock: true,
  },
  {
    id: 18,
    name: "Copper Utensil Set",
    artisan: "Madhya Pradesh Crafts",
    price: 5400,
    image: "/placeholder.svg?key=metal2",
    rating: 4.8,
    reviews: 119,
    category: "metalwork",
    inStock: true,
  },
  {
    id: 19,
    name: "Iron Wall Hanging",
    artisan: "Rajasthan Ironwork",
    price: 3800,
    image: "/placeholder.svg?key=metal3",
    rating: 4.7,
    reviews: 84,
    category: "metalwork",
    inStock: true,
  },
  {
    id: 20,
    name: "Bronze Sculpture",
    artisan: "Art Foundry India",
    price: 8900,
    image: "/placeholder.svg?key=metal4",
    rating: 4.9,
    reviews: 167,
    category: "metalwork",
    inStock: true,
  },

  // Paintings
  {
    id: 21,
    name: "Miniature Mughal Painting",
    artisan: "Anita Art Studio",
    price: 6800,
    image: "/placeholder.svg?key=art1",
    rating: 4.9,
    reviews: 156,
    category: "paintings",
    inStock: true,
  },
  {
    id: 22,
    name: "Madhubani Artwork",
    artisan: "Bihar Art Collective",
    price: 4200,
    image: "/placeholder.svg?key=art2",
    rating: 4.7,
    reviews: 98,
    category: "paintings",
    inStock: true,
  },
  {
    id: 23,
    name: "Warli Painting",
    artisan: "Tribal Arts",
    price: 3600,
    image: "/placeholder.svg?key=art3",
    rating: 4.6,
    reviews: 76,
    category: "paintings",
    inStock: true,
  },
  {
    id: 24,
    name: "Tanjore Painting",
    artisan: "South Indian Gallery",
    price: 9200,
    image: "/placeholder.svg?key=art4",
    rating: 4.9,
    reviews: 189,
    category: "paintings",
    inStock: true,
  },
]

interface ProductGridProps {
  category: string | null
  priceRange: [number, number]
  sortBy: string
  searchQuery: string
}

export function ProductGrid({ category, priceRange, sortBy, searchQuery }: ProductGridProps) {
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = allProducts.filter((product) => {
    if (category && product.category !== category) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.id - a.id
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "trending":
      default:
        return b.reviews - a.reviews
    }
  })

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div>
      <div className="mb-6 text-warm-charcoal/60">Showing {sortedProducts.length} products</div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-warm-charcoal/60 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="group card-light hover:shadow-2xl transition-all duration-300">
              {/* Image */}
              <div className="relative mb-4 h-64 rounded-lg overflow-hidden bg-warm-sand">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-warm-charcoal/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-warm-sand transition opacity-0 group-hover:opacity-100"
                >
                  <Heart
                    className={`w-5 h-5 transition ${
                      wishlist.includes(product.id) ? "fill-primary text-primary" : "text-warm-charcoal"
                    }`}
                  />
                </button>
              </div>

              {/* Info */}
              <div className="space-y-3">
                <div>
                  <p className="text-secondary font-semibold text-xs uppercase tracking-wide">{product.artisan}</p>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-serif font-bold text-warm-charcoal hover:text-primary transition">
                      {product.name}
                    </h3>
                  </Link>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-warm-charcoal/20"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-warm-charcoal/60">({product.reviews})</span>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
                  <button
                    disabled={!product.inStock}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-warm-rust transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
