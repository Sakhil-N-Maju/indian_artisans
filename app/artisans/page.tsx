"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArtisanDirectory } from "@/components/artisan-directory"
import { Search, Filter, Users, Award, Globe } from "lucide-react"

export default function ArtisansPage() {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCraft, setSelectedCraft] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-secondary/15 to-primary/15 overflow-hidden pt-20 pb-10 sm:pb-12 md:h-80">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-warm-charcoal">
              Meet Our Artisans
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-warm-charcoal/70 max-w-3xl">
              Discover the skilled craftspeople behind every handcrafted product. Each artisan has a unique story, years
              of dedication, and mastery of their craft passed down through generations.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <span className="text-2xl sm:text-3xl font-bold text-warm-charcoal">2,340+</span>
            </div>
            <p className="text-xs sm:text-sm text-warm-charcoal/60">Artisans</p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <span className="text-2xl sm:text-3xl font-bold text-warm-charcoal">18</span>
            </div>
            <p className="text-xs sm:text-sm text-warm-charcoal/60">States Covered</p>
          </div>
          <div className="bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-border">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <span className="text-2xl sm:text-3xl font-bold text-warm-charcoal">156</span>
            </div>
            <p className="text-xs sm:text-sm text-warm-charcoal/60">Countries Reached</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 sm:mb-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-warm-charcoal/40" />
              <input
                type="text"
                placeholder="Search artisans by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
            </div>
            <button className="px-5 sm:px-6 py-2.5 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Options */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-semibold text-warm-charcoal mb-2">Craft</label>
              <select
                value={selectedCraft || ""}
                onChange={(e) => setSelectedCraft(e.target.value || null)}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              >
                <option value="">All Crafts</option>
                <option value="weaving">Weaving</option>
                <option value="pottery">Pottery</option>
                <option value="jewelry">Jewelry</option>
                <option value="woodcraft">Woodcraft</option>
                <option value="metalwork">Metalwork</option>
                <option value="painting">Painting</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-xs sm:text-sm font-semibold text-warm-charcoal mb-2">Region</label>
              <select
                value={selectedRegion || ""}
                onChange={(e) => setSelectedRegion(e.target.value || null)}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
              >
                <option value="">All Regions</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="gujarat">Gujarat</option>
                <option value="karnataka">Karnataka</option>
                <option value="tamil-nadu">Tamil Nadu</option>
                <option value="bihar">Bihar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Artisan Directory */}
        <ArtisanDirectory searchQuery={searchQuery} craft={selectedCraft} region={selectedRegion} />
      </div>

      <Footer />
    </main>
  )
}
