"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, Trash2, ShoppingCart } from "lucide-react"

interface FavoriteItem {
  id: number
  name: string
  price: number
  image: string
  artisan: string
  category: string
  rating: number
  inStock: boolean
  addedDate: string
}

const mockFavorites: FavoriteItem[] = [
  {
    id: 1,
    name: "Hand-Woven Saree",
    price: 4500,
    image: "/hand-woven-saree.jpg",
    artisan: "Priya Textiles",
    category: "Textiles",
    rating: 4.8,
    inStock: true,
    addedDate: "2 days ago",
  },
  {
    id: 2,
    name: "Kundan Necklace",
    price: 8900,
    image: "/kundan-necklace.jpg",
    artisan: "Meera Jewelry",
    category: "Jewelry",
    rating: 4.9,
    inStock: true,
    addedDate: "1 week ago",
  },
  {
    id: 3,
    name: "Blue Pottery Bowl",
    price: 2800,
    image: "/blue-pottery-bowl.jpg",
    artisan: "Khurja Crafts",
    category: "Pottery",
    rating: 4.7,
    inStock: true,
    addedDate: "1 week ago",
  },
  {
    id: 4,
    name: "Leather Mojari Shoes",
    price: 3200,
    image: "/leather-mojari.jpg",
    artisan: "Jaipur Footwear",
    category: "Footwear",
    rating: 4.6,
    inStock: false,
    addedDate: "3 weeks ago",
  },
  {
    id: 5,
    name: "Brass Decorative Lamp",
    price: 5600,
    image: "/brass-lamp.jpg",
    artisan: "Mohan Metal Works",
    category: "Decor",
    rating: 4.8,
    inStock: true,
    addedDate: "1 month ago",
  },
  {
    id: 6,
    name: "Pashmina Shawl",
    price: 12000,
    image: "/pashmina-shawl.jpg",
    artisan: "Kashmir Weaves",
    category: "Textiles",
    rating: 4.9,
    inStock: true,
    addedDate: "1 month ago",
  },
]

export default function FavoritesPage() {
  const [scrolled, setScrolled] = useState(false)
  const [favorites, setFavorites] = useState(mockFavorites)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFavorites = selectedCategory
    ? favorites.filter((item) => item.category === selectedCategory)
    : favorites

  const categories = Array.from(new Set(mockFavorites.map((item) => item.category)))

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-28 sm:pt-32">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3 mb-8 sm:mb-12">
          <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-primary fill-current flex-shrink-0" />
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-warm-charcoal">My Favorites</h1>
          <span className="ml-auto px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-xs sm:text-sm font-semibold text-primary">
            {filteredFavorites.length} item{filteredFavorites.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-3 sm:pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full font-semibold transition whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${
              selectedCategory === null
                ? "bg-primary text-white"
                : "bg-warm-sand text-warm-charcoal hover:bg-warm-sand/80"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition whitespace-nowrap text-xs sm:text-sm flex-shrink-0 ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-warm-sand text-warm-charcoal hover:bg-warm-sand/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredFavorites.map((item) => (
              <div key={item.id} className="card-light hover:shadow-lg transition group p-4 sm:p-5 flex flex-col">
                {/* Image Container */}
                <div className="relative h-40 sm:h-48 rounded-lg overflow-hidden mb-3 sm:mb-4 bg-warm-sand flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="text-white font-semibold text-xs sm:text-sm">Out of Stock</span>
                    </div>
                  )}
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="absolute top-2 right-2 p-1.5 sm:p-2 bg-white rounded-lg shadow hover:bg-warm-sand transition"
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary fill-current" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-3 sm:mb-4 flex-1">
                  <p className="text-xs text-primary font-semibold">{item.category}</p>
                  <h3 className="text-sm sm:text-lg font-serif font-bold text-warm-charcoal line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-warm-charcoal/60">{item.artisan}</p>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-warm-charcoal">★ {item.rating}</span>
                  </div>
                  <p className="text-base sm:text-xl font-bold text-primary">₹{item.price.toLocaleString()}</p>
                </div>

                {/* Meta */}
                <p className="text-xs text-warm-charcoal/50 mb-3 sm:mb-4">Added {item.addedDate}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    disabled={!item.inStock}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 rounded-lg font-semibold transition text-xs sm:text-sm ${
                      item.inStock
                        ? "bg-primary text-white hover:bg-warm-rust"
                        : "bg-warm-sand text-warm-charcoal/40 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </button>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="px-2 sm:px-3 py-2 border border-border rounded-lg hover:bg-warm-sand transition"
                  >
                    <Trash2 className="w-4 h-4 text-warm-charcoal/60" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <Heart className="w-12 sm:w-16 h-12 sm:h-16 text-warm-sand mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-warm-charcoal mb-2">No Favorites Yet</h2>
            <p className="text-warm-charcoal/60 mb-6 text-sm sm:text-base">
              Start adding items to your favorites to see them here
            </p>
            <a
              href="/shop"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition text-sm"
            >
              Explore Shop
            </a>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
