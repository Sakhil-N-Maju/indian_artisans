"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WorkshopGrid } from "@/components/workshops/workshop-grid"
import { WorkshopFilters } from "@/components/workshops/workshop-filters"
import { Search, Filter, Star, Clock, Users } from "lucide-react"

export default function WorkshopsPage() {
  const [scrolled, setScrolled] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [selectedCraft, setSelectedCraft] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [duration, setDuration] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      {/* Hero Banner */}
      <section className="relative h-56 sm:h-72 md:h-80 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0 -z-10 hero-gradient" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-20 right-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="space-y-2 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-warm-charcoal text-pretty">
              Artisan Experiences & Workshops
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-warm-charcoal/70 max-w-3xl leading-relaxed">
              Immerse yourself in authentic craft experiences. Learn directly from master artisans and discover India's
              cultural heritage through hands-on workshops.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 mb-8 sm:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-border flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-warm-charcoal/60">Average Rating</p>
              <p className="text-xl sm:text-2xl font-bold text-warm-charcoal">4.8/5</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-border flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-secondary/10 rounded-lg flex-shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-warm-charcoal/60">Active Workshops</p>
              <p className="text-xl sm:text-2xl font-bold text-warm-charcoal">347</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-border flex items-center gap-3 sm:gap-4 sm:col-span-2 md:col-span-1">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-lg flex-shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-warm-charcoal/60">Total Participants</p>
              <p className="text-xl sm:text-2xl font-bold text-warm-charcoal">18,500+</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search & Filters Toggle */}
        <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-2.5 sm:top-3 w-4 sm:w-5 h-4 sm:h-5 text-warm-charcoal/40" />
              <input
                type="text"
                placeholder="Search workshops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-primary text-primary text-sm sm:text-base rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center gap-2 justify-center md:hidden"
            >
              <Filter className="w-4 sm:w-5 h-4 sm:h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="md:col-span-1">
              <WorkshopFilters
                selectedRegion={selectedRegion}
                onRegionChange={setSelectedRegion}
                selectedCraft={selectedCraft}
                onCraftChange={setSelectedCraft}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                duration={duration}
                onDurationChange={setDuration}
              />
            </div>
          )}

          {/* Workshops Grid */}
          <div className={showFilters ? "md:col-span-3" : "md:col-span-4"}>
            <WorkshopGrid
              region={selectedRegion}
              craft={selectedCraft}
              priceRange={priceRange}
              duration={duration}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
