"use client"

import { MapPin, Award, Heart } from "lucide-react"

interface Artisan {
  id: number
  name: string
  location: string
  craft: string
  image: string
  rating: number
  reviews: number
  description: string
}

const artisans: Artisan[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    craft: "Hand-Weaving",
    image: "/indian-woman-weaving.jpg",
    rating: 4.9,
    reviews: 342,
    description: "Master weaver with 30+ years experience in traditional saree making",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Khurja, Uttar Pradesh",
    craft: "Pottery",
    image: "/potter-making-clay-pots.jpg",
    rating: 4.8,
    reviews: 278,
    description: "Award-winning ceramics artist specializing in traditional blue pottery",
  },
  {
    id: 3,
    name: "Meera Patel",
    location: "Ahmedabad, Gujarat",
    craft: "Jewelry Design",
    image: "/jeweler-crafting-jewelry.jpg",
    rating: 4.9,
    reviews: 456,
    description: "Contemporary Kundan and Meenakari jewelry designer",
  },
]

export function ArtisanSpotlight() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Meet The Masters</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-warm-charcoal mt-2">Artisan Profiles</h2>
          <p className="text-warm-charcoal/60 mt-4 max-w-2xl mx-auto">
            Get to know the skilled craftspeople behind your favorite products
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="group card-light hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <img
                  src={artisan.image || "/placeholder.svg"}
                  alt={artisan.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-warm-sand transition">
                  <Heart className="w-5 h-5 text-warm-charcoal" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-warm-charcoal">{artisan.name}</h3>
                  <p className="text-primary font-semibold text-sm">{artisan.craft}</p>
                </div>

                <div className="flex items-center gap-1 text-warm-charcoal/60">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{artisan.location}</span>
                </div>

                <p className="text-warm-charcoal/70 text-sm">{artisan.description}</p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-semibold">{artisan.rating}</span>
                    <span className="text-xs text-warm-charcoal/60">({artisan.reviews})</span>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-warm-rust transition">
                    Visit Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
