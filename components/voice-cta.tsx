"use client"

import { Volume2 } from "lucide-react"

export function VoiceCallToAction() {
  return (
    <section className="py-20 bg-floral-full bg-cover bg-center bg-fixed relative">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
          <Volume2 className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Discover with Your Voice</h2>

        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Experience our innovative voice-first shopping platform. Listen to artisan stories, explore products
          hands-free, and discover the perfect handcrafted item just by speaking.
        </p>

        <button className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition-all duration-300 mb-6">
          <Volume2 className="w-5 h-5" />
          Start Voice Discovery
        </button>

        <p className="text-sm text-white/80">Available on iOS, Android, and web. Works in English and Hindi.</p>
      </div>
    </section>
  )
}
