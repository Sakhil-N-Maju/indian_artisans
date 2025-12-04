"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { CategoryGrid } from "@/components/category-grid"
import { ArtisanSpotlight } from "@/components/artisan-spotlight"
import { VoiceCallToAction } from "@/components/voice-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      <Navigation scrolled={scrolled} />
      <HeroSection />
      <FeaturedCarousel />
      <CategoryGrid />
      <ArtisanSpotlight />
      <VoiceCallToAction />
      <Footer />
    </main>
  )
}
