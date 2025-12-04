"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Footer } from "@/components/footer"
import { Filter, TrendingUp } from "lucide-react"

export default function ShopPage() {
  const [scrolled, setScrolled] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState("trending")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden pt-20 pb-12 sm:pb-16 md:h-72">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">CURATED COLLECTION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-warm-charcoal">
              Shop Our Collection
            </h1>
            <p className="text-base sm:text-lg text-warm-charcoal/70 max-w-2xl">
              Browse thousands of authentic handcrafted products from artisans across India, each piece tells a story
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col gap-4 mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg hover:bg-warm-sand transition md:hidden w-full sm:w-auto justify-center font-semibold"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? "Hide" : "Show"} Filters
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
            >
              <option value="trending">Trending</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Filters Sidebar - Mobile Modal */}
          {showFilters && (
            <div className="md:col-span-1 mb-6 md:mb-0">
              <ProductFilters
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
              />
            </div>
          )}

          {/* Products Grid */}
          <div className={showFilters ? "md:col-span-3" : "md:col-span-4"}>
            <ProductGrid
              category={selectedCategory}
              priceRange={priceRange}
              sortBy={sortBy}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
