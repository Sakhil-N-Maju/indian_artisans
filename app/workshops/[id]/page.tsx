"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useParams } from "next/navigation"
import { Clock, Users, MapPin, Heart, Share2, Check } from "lucide-react"

export default function WorkshopDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [scrolled, setScrolled] = useState(false)

  const workshop = {
    id: Number.parseInt(id),
    name: "Hand-Weaving Masterclass with Priya Sharma",
    artisan: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    image: "/placeholder.svg?key=workshop-detail",
    gallery: ["/placeholder.svg?key=wdetail1", "/placeholder.svg?key=wdetail2", "/placeholder.svg?key=wdetail3"],
    rating: 4.9,
    reviews: 234,
    price: 8500,
    duration: "Full Day (8 hours)",
    groupSize: 8,
    language: "English & Hindi",
    startDate: "Dec 15, 2025",
    schedule: [
      { time: "9:00 AM - 10:30 AM", activity: "Introduction & Thread Selection" },
      { time: "10:30 AM - 12:30 PM", activity: "Loom Setup & Basic Techniques" },
      { time: "12:30 PM - 1:30 PM", activity: "Lunch Break" },
      { time: "1:30 PM - 4:00 PM", activity: "Hands-on Weaving Practice" },
      { time: "4:00 PM - 5:00 PM", activity: "Q&A & Certificate Ceremony" },
    ],
    includes: [
      "All materials and equipment",
      "Professional instruction from master weaver",
      "Lunch & refreshments",
      "Certificate of completion",
      "Take-home woven sample",
      "Photo memory collection",
      "Access to artisan community",
    ],
    whatToBring: ["Comfortable clothing", "Closed-toe shoes", "Water bottle", "Camera (optional)"],
    description: `
      Learn the ancient art of hand-weaving from Priya Sharma, a master weaver with over 35 years of experience. This immersive full-day workshop takes you through the complete hand-weaving process, from thread selection to creating your first woven piece.

      In this hands-on session, you'll work directly on traditional looms, experiencing the same techniques that have been perfected over generations. Priya will guide you through the meditative practice of weaving while sharing stories of her craft, the significance of traditional patterns, and the philosophy behind each weave.

      This is not just a workshop—it's a cultural immersion that connects you to centuries of Indian textile heritage. Whether you're a complete beginner or have some experience, this workshop is designed to be both accessible and enriching.
    `,
    highlights: [
      "Work with traditional looms",
      "Learn from a decorated master craftsperson",
      "Create your own woven piece",
      "Understand natural dye processes",
      "Connect with a global community of artisans",
    ],
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-warm-sand">
              <img
                src={workshop.image || "/placeholder.svg"}
                alt={workshop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {workshop.gallery.map((img, idx) => (
                <button
                  key={idx}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-primary hover:scale-105 transition"
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-secondary font-semibold uppercase tracking-wide text-sm mb-2">Hand-Weaving</p>
              <h1 className="text-4xl font-serif font-bold text-warm-charcoal mb-3">{workshop.name}</h1>
              <p className="text-warm-charcoal/70">By {workshop.artisan}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(workshop.rating) ? "text-yellow-400 text-xl" : "text-warm-charcoal/20 text-xl"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-warm-charcoal/60">{workshop.reviews} reviews</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-warm-sand/50 rounded-lg">
              <div>
                <p className="text-sm text-warm-charcoal/60 mb-1">Duration</p>
                <p className="font-semibold text-warm-charcoal flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {workshop.duration}
                </p>
              </div>
              <div>
                <p className="text-sm text-warm-charcoal/60 mb-1">Group Size</p>
                <p className="font-semibold text-warm-charcoal flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Max {workshop.groupSize}
                </p>
              </div>
              <div>
                <p className="text-sm text-warm-charcoal/60 mb-1">Location</p>
                <p className="font-semibold text-warm-charcoal flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {workshop.location}
                </p>
              </div>
              <div>
                <p className="text-sm text-warm-charcoal/60 mb-1">Language</p>
                <p className="font-semibold text-warm-charcoal">{workshop.language}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-warm-charcoal/70 leading-relaxed">{workshop.description}</p>

            {/* Action Buttons */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="text-3xl font-bold text-primary">₹{workshop.price.toLocaleString()}</div>
              <button className="w-full py-4 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition">
                Book This Workshop
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex-1 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  {isWishlisted ? "Saved" : "Save"}
                </button>
                <button className="flex-1 py-3 border-2 border-border text-warm-charcoal rounded-lg font-semibold hover:bg-warm-sand transition flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Info */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Schedule */}
          <div className="card-light">
            <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6">Daily Schedule</h2>
            <div className="space-y-4">
              {workshop.schedule.map((item, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-4">
                  <p className="font-semibold text-warm-charcoal">{item.time}</p>
                  <p className="text-warm-charcoal/70 text-sm">{item.activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div className="card-light">
            <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6">What's Included</h2>
            <div className="space-y-3 mb-8">
              {workshop.includes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-warm-charcoal/70">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="font-bold text-warm-charcoal mb-3">What to Bring</h3>
              <ul className="space-y-2 text-sm text-warm-charcoal/70">
                {workshop.whatToBring.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="card-light mb-12">
          <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6">Highlights</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {workshop.highlights.map((highlight, idx) => (
              <div key={idx} className="p-4 bg-primary/5 rounded-lg">
                <p className="text-warm-charcoal font-semibold">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="card-light">
          <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6">Guest Reviews</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <img
                    src={`/ceholder-svg-key-reviewer.jpg?key=reviewer${idx}`}
                    alt="Reviewer"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-warm-charcoal">Guest Reviewer {idx}</h3>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-warm-charcoal/70">
                      An absolutely transformative experience! Priya's patience and expertise made it perfect for
                      beginners while still challenging. Highly recommended!
                    </p>
                    <p className="text-xs text-warm-charcoal/60 mt-2">1 week ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
