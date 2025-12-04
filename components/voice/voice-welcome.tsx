"use client"

import { Volume2, Sparkles, Zap, Users } from "lucide-react"

interface VoiceWelcomeProps {
  onStart: () => void
}

export function VoiceWelcome({ onStart }: VoiceWelcomeProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-12">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
            <div
              className="absolute inset-2 bg-primary/10 rounded-full animate-ping"
              style={{ animationDuration: "2s" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Volume2 className="w-12 h-12 text-primary animate-bounce" style={{ animationDuration: "2s" }} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-warm-charcoal text-balance-heading">
            Discover with Your Voice
          </h1>
          <p className="text-xl text-warm-charcoal/60">
            Experience the revolutionary voice-first shopping platform. Just speak, and we'll find the perfect
            handcrafted products for you.
          </p>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-warm-charcoal">Smart Discovery</h3>
            <p className="text-sm text-warm-charcoal/60">Describe what you're looking for in natural language</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-warm-charcoal">Instant Results</h3>
            <p className="text-sm text-warm-charcoal/60">Get personalized recommendations in seconds</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-warm-charcoal">Connect with Artisans</h3>
            <p className="text-sm text-warm-charcoal/60">Learn artisan stories behind each product</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="px-12 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-warm-rust transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-3"
        >
          <Volume2 className="w-6 h-6" />
          Start Voice Discovery
        </button>

        {/* Language Support */}
        <p className="text-sm text-warm-charcoal/60">Available in English and Hindi. Works on all devices.</p>
      </div>
    </div>
  )
}
