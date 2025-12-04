"use client"

import Link from "next/link"
import { MapPin, Star, Users, Package, Clock, BadgeCheck, MessageCircle } from "lucide-react"

interface ArtisanCardProps {
  artisan: {
    id: number
    name: string
    craft: string
    location: string
    image: string
    rating: number
    reviews: number
    followers: number
    productsCount: number
    yearsExperience: number
    bio: string
    verified: boolean
    responseTime: string
  }
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <div className="card-light hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-64 rounded-lg overflow-hidden mb-4 bg-warm-sand">
        <img
          src={artisan.image || "/placeholder.svg"}
          alt={artisan.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/40 to-transparent" />
      </div>

      {/* Info */}
      <div className="space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-serif font-bold text-warm-charcoal">{artisan.name}</h3>
                {artisan.verified && <BadgeCheck className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-primary font-semibold text-sm">{artisan.craft}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-warm-charcoal/60 mt-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{artisan.location}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-warm-charcoal/70 text-sm line-clamp-2">{artisan.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-border">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-warm-charcoal">{artisan.rating}</span>
            </div>
            <p className="text-xs text-warm-charcoal/60">{artisan.reviews} reviews</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Users className="w-4 h-4 text-secondary" />
              <span className="font-bold text-warm-charcoal">{(artisan.followers / 1000).toFixed(1)}K</span>
            </div>
            <p className="text-xs text-warm-charcoal/60">Followers</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Package className="w-4 h-4 text-primary" />
              <span className="font-bold text-warm-charcoal">{artisan.productsCount}</span>
            </div>
            <p className="text-xs text-warm-charcoal/60">Products</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="font-bold text-warm-charcoal">{artisan.yearsExperience}y</span>
            </div>
            <p className="text-xs text-warm-charcoal/60">Experience</p>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-warm-sand/50 rounded-lg p-3 text-center">
          <p className="text-xs text-warm-charcoal/60">Response Time</p>
          <p className="font-semibold text-warm-charcoal">{artisan.responseTime}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/artisans/${artisan.id}`}
            className="flex-1 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition text-center text-sm"
          >
            View Profile
          </Link>
          <button className="flex-1 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Message</span>
          </button>
        </div>
      </div>
    </div>
  )
}
