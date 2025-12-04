"use client"

import Link from "next/link"
import { Calendar, Users, MapPin, Heart } from "lucide-react"
import { useState } from "react"

interface Workshop {
  id: number
  name: string
  artisan: string
  location: string
  region: string
  craft: string
  image: string
  rating: number
  reviews: number
  price: number
  duration: string
  groupSize: number
  startDate: string
  description: string
}

const workshops: Workshop[] = [
  {
    id: 1,
    name: "Hand-Weaving Masterclass with Priya Sharma",
    artisan: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    region: "rajasthan",
    craft: "weaving",
    image: "/placeholder.svg?key=workshop1",
    rating: 4.9,
    reviews: 234,
    price: 8500,
    duration: "full-day",
    groupSize: 8,
    startDate: "Dec 15, 2025",
    description: "Learn the art of hand-weaving directly from a master weaver with 35 years of experience",
  },
  {
    id: 2,
    name: "Blue Pottery Workshop: Traditional Khurja Techniques",
    artisan: "Rajesh Kumar",
    location: "Khurja, Uttar Pradesh",
    region: "uttar-pradesh",
    craft: "pottery",
    image: "/placeholder.svg?key=workshop2",
    rating: 4.8,
    reviews: 189,
    price: 6500,
    duration: "full-day",
    groupSize: 10,
    startDate: "Dec 18, 2025",
    description: "Master the 600-year-old art of blue pottery in this immersive workshop",
  },
  {
    id: 3,
    name: "Kundan Jewelry Making: 3-Day Intensive",
    artisan: "Meera Patel",
    location: "Ahmedabad, Gujarat",
    region: "gujarat",
    craft: "jewelry",
    image: "/placeholder.svg?key=workshop3",
    rating: 4.9,
    reviews: 312,
    price: 18500,
    duration: "2-3-days",
    groupSize: 6,
    startDate: "Dec 20, 2025",
    description: "Create your own Kundan jewelry piece under expert guidance in this 3-day intensive",
  },
  {
    id: 4,
    name: "Woodcarving Fundamentals: Inlay Work",
    artisan: "Kumar Woodcraft",
    location: "Bangalore, Karnataka",
    region: "karnataka",
    craft: "woodcraft",
    image: "/placeholder.svg?key=workshop4",
    rating: 4.7,
    reviews: 156,
    price: 7800,
    duration: "full-day",
    groupSize: 8,
    startDate: "Dec 22, 2025",
    description: "Learn traditional woodcarving and inlay techniques in this hands-on workshop",
  },
  {
    id: 5,
    name: "Madhubani Art: Sacred Patterns Workshop",
    artisan: "Anita Singh",
    location: "Madhubani, Bihar",
    region: "bihar",
    craft: "painting",
    image: "/placeholder.svg?key=workshop5",
    rating: 4.8,
    reviews: 198,
    price: 5500,
    duration: "full-day",
    groupSize: 12,
    startDate: "Dec 25, 2025",
    description: "Discover the sacred patterns and meanings behind Madhubani art",
  },
  {
    id: 6,
    name: "Metalwork & Brass Engraving: 2-Day Workshop",
    artisan: "Mohan Lal",
    location: "Moradabad, Uttar Pradesh",
    region: "uttar-pradesh",
    craft: "metalwork",
    image: "/placeholder.svg?key=workshop6",
    rating: 4.6,
    reviews: 142,
    price: 12000,
    duration: "2-3-days",
    groupSize: 8,
    startDate: "Dec 28, 2025",
    description: "Learn brass working and traditional engraving techniques",
  },
  {
    id: 7,
    name: "Natural Dye Making: Full-Week Immersion",
    artisan: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    region: "rajasthan",
    craft: "weaving",
    image: "/placeholder.svg?key=workshop7",
    rating: 4.9,
    reviews: 89,
    price: 35000,
    duration: "1-week",
    groupSize: 6,
    startDate: "Jan 5, 2026",
    description: "Deep dive into natural dye extraction, processing, and application",
  },
  {
    id: 8,
    name: "Tanjore Painting: Gold Foil Art Workshop",
    artisan: "South Indian Gallery",
    location: "Chennai, Tamil Nadu",
    region: "tamil-nadu",
    craft: "painting",
    image: "/placeholder.svg?key=workshop8",
    rating: 4.7,
    reviews: 167,
    price: 7200,
    duration: "full-day",
    groupSize: 10,
    startDate: "Jan 8, 2026",
    description: "Learn the intricate art of creating Tanjore paintings with gold foil",
  },
]

interface WorkshopGridProps {
  region: string | null
  craft: string | null
  priceRange: [number, number]
  duration: string | null
  searchQuery: string
}

export function WorkshopGrid({ region, craft, priceRange, duration, searchQuery }: WorkshopGridProps) {
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredWorkshops = workshops.filter((workshop) => {
    if (region && workshop.region !== region) return false
    if (craft && workshop.craft !== craft) return false
    if (duration && workshop.duration !== duration) return false
    if (workshop.price < priceRange[0] || workshop.price > priceRange[1]) return false
    if (
      searchQuery &&
      !workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !workshop.artisan.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }
    return true
  })

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div>
      <div className="mb-4 sm:mb-6 text-xs sm:text-base text-warm-charcoal/60">
        Found {filteredWorkshops.length} workshop{filteredWorkshops.length !== 1 ? "s" : ""}
      </div>

      {filteredWorkshops.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <p className="text-warm-charcoal/60 text-base sm:text-lg">No workshops found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {filteredWorkshops.map((workshop) => (
            <Link key={workshop.id} href={`/workshops/${workshop.id}`}>
              <div className="card-light hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col">
                {/* Image */}
                <div className="relative h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden mb-3 sm:mb-4 bg-warm-sand group">
                  <img
                    src={workshop.image || "/placeholder.svg"}
                    alt={workshop.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleWishlist(workshop.id)
                    }}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-warm-sand transition"
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition ${
                        wishlist.includes(workshop.id) ? "fill-primary text-primary" : "text-warm-charcoal"
                      }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2 sm:space-y-3">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-wide">
                      {workshop.craft}
                    </p>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-warm-charcoal group-hover:text-primary transition line-clamp-2">
                      {workshop.name}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-warm-charcoal/70 line-clamp-2">{workshop.description}</p>

                  {/* Artisan */}
                  <p className="text-xs sm:text-sm text-warm-charcoal/60">By {workshop.artisan}</p>

                  {/* Details */}
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-warm-charcoal/60">
                      <MapPin className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{workshop.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-warm-charcoal/60">
                      <Calendar className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      <span>{workshop.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-warm-charcoal/60">
                      <Users className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      <span>Max {workshop.groupSize} participants</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm sm:text-base ${
                            i < Math.floor(workshop.rating) ? "text-yellow-400" : "text-warm-charcoal/20"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-warm-charcoal/60">({workshop.reviews})</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="border-t border-border pt-3 sm:pt-4 mt-3 sm:mt-4 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-primary">₹{workshop.price.toLocaleString()}</p>
                    <p className="text-xs text-warm-charcoal/60">per person</p>
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="px-3 sm:px-6 py-1.5 sm:py-2 bg-primary text-white text-xs sm:text-sm rounded-lg font-semibold hover:bg-warm-rust transition whitespace-nowrap"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
