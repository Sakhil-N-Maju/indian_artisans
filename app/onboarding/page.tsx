"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChevronRight, Volume2, Zap } from "lucide-react"

type OnboardingStep = "welcome" | "preferences" | "voice" | "complete"

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("welcome")
  const [scrolled, setScrolled] = useState(false)
  const [preferences, setPreferences] = useState({
    favoriteCategories: [] as string[],
    budget: "medium" as "low" | "medium" | "high",
    enableVoice: false,
    language: "english" as "english" | "hindi",
  })

  const toggleCategory = (category: string) => {
    setPreferences((prev) => ({
      ...prev,
      favoriteCategories: prev.favoriteCategories.includes(category)
        ? prev.favoriteCategories.filter((c) => c !== category)
        : [...prev.favoriteCategories, category],
    }))
  }

  const handleComplete = () => {
    setStep("complete")
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      {step === "welcome" && (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-2xl w-full text-center space-y-8">
            <div>
              <h1 className="text-5xl sm:text-6xl font-serif font-bold text-warm-charcoal mb-4">
                Welcome to Artisans of India
              </h1>
              <p className="text-xl text-warm-charcoal/60">
                Let's personalize your shopping experience to find the perfect handcrafted products for you.
              </p>
            </div>

            <button
              onClick={() => setStep("preferences")}
              className="px-12 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-warm-rust transition inline-flex items-center gap-2"
            >
              Get Started
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === "preferences" && (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
          <div className="max-w-2xl w-full space-y-8">
            <div>
              <h2 className="text-4xl font-serif font-bold text-warm-charcoal mb-2">Your Preferences</h2>
              <p className="text-warm-charcoal/60">Help us understand what you love</p>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-warm-charcoal">Favorite Categories</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Textiles", "Pottery", "Jewelry", "Woodcraft", "Metalwork", "Paintings"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`p-4 rounded-lg border-2 font-semibold transition ${
                      preferences.favoriteCategories.includes(cat)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-warm-charcoal hover:border-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-warm-charcoal">Budget Range</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "low", label: "Under ₹3K" },
                  { value: "medium", label: "₹3K - ₹10K" },
                  { value: "high", label: "Above ₹10K" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setPreferences((prev) => ({ ...prev, budget: value as any }))}
                    className={`p-4 rounded-lg border-2 font-semibold transition ${
                      preferences.budget === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-warm-charcoal hover:border-primary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-warm-charcoal">Preferred Language</label>
              <div className="flex gap-3">
                {[
                  { value: "english", label: "English" },
                  { value: "hindi", label: "Hindi" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setPreferences((prev) => ({ ...prev, language: value as any }))}
                    className={`flex-1 p-4 rounded-lg border-2 font-semibold transition ${
                      preferences.language === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-warm-charcoal hover:border-primary"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setStep("welcome")}
                className="flex-1 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep("voice")}
                className="flex-1 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition flex items-center justify-center gap-2"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "voice" && (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12">
          <div className="max-w-2xl w-full space-y-8 card-light">
            <div>
              <h2 className="text-4xl font-serif font-bold text-warm-charcoal mb-2">Voice Discovery</h2>
              <p className="text-warm-charcoal/60">Enable voice-first shopping for a revolutionary experience</p>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-primary/5 border-2 border-primary rounded-lg">
                <div className="flex items-start gap-4">
                  <Volume2 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-warm-charcoal mb-2">Discover with Your Voice</h3>
                    <p className="text-warm-charcoal/70">
                      Simply speak to describe what you're looking for. Our AI understands natural language and finds
                      perfect matches for you.
                    </p>
                  </div>
                </div>
              </div>

              <label className="flex items-center gap-4 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition">
                <input
                  type="checkbox"
                  checked={preferences.enableVoice}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, enableVoice: e.target.checked }))}
                  className="w-5 h-5 accent-primary"
                />
                <span className="font-semibold text-warm-charcoal">Enable voice discovery on my account</span>
              </label>

              <button
                onClick={() => handleComplete()}
                className="w-full py-4 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Complete Onboarding
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "complete" && (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-2xl w-full text-center space-y-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-10 h-10 text-green-600" />
            </div>

            <div>
              <h2 className="text-4xl font-serif font-bold text-warm-charcoal mb-2">All Set!</h2>
              <p className="text-lg text-warm-charcoal/60">
                Your personalized shopping experience is ready. Start exploring handcrafted products now.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-warm-charcoal/70 font-semibold">Preferences Saved:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm text-warm-charcoal/60">Categories</p>
                  <p className="font-semibold">{preferences.favoriteCategories.length || "All"}</p>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-sm text-warm-charcoal/60">Budget</p>
                  <p className="font-semibold capitalize">{preferences.budget}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => (window.location.href = "/")}
              className="px-12 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-warm-rust transition inline-flex items-center gap-2"
            >
              Start Shopping
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
