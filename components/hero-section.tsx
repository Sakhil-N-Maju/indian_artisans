"use client"

import { ChevronRight, Volume2 } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 bg-floral-soft">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 hero-gradient" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary opacity-5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-4">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                Celebrate Handcrafted Heritage
              </p>
              <h1 className="text-5xl sm:text-6xl font-serif font-bold text-warm-charcoal text-balance-heading leading-tight">
                Discover Authentic Stories Behind Every Craft
              </h1>
              <p className="text-lg text-warm-charcoal/70 max-w-md">
                Connect directly with Indian artisans, explore voice-guided product discovery, and support traditional
                craftsmanship through modern storytelling.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition-all duration-300 flex items-center gap-2 justify-center sm:justify-start">
                Explore Products
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 border-2 border-secondary text-warm-charcoal rounded-lg font-semibold hover:bg-warm-sand transition-all duration-300 flex items-center gap-2 justify-center sm:justify-start">
                <Volume2 className="w-5 h-5" />
                Voice Discovery
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div>
                <p className="text-2xl font-bold text-primary">5000+</p>
                <p className="text-sm text-warm-charcoal/60">Artisans</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">25K+</p>
                <p className="text-sm text-warm-charcoal/60">Products</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-sm text-warm-charcoal/60">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative h-96 sm:h-full min-h-96 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl" />
            <img
              src="/indian-artisan-pottery-workshop.jpg"
              alt="Indian artisan crafting pottery"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
