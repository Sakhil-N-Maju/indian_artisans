'use client';

import Link from 'next/link';
import { MapPin, Star, Users, Package, Clock, BadgeCheck, MessageCircle } from 'lucide-react';

interface ArtisanCardProps {
  artisan: {
    id: number;
    name: string;
    craft: string;
    location: string;
    image: string;
    rating: number;
    reviews: number;
    followers: number;
    productsCount: number;
    yearsExperience: number;
    bio: string;
    verified: boolean;
    responseTime: string;
  };
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <div className="card-light overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Image */}
      <div className="bg-warm-sand relative mb-4 h-64 overflow-hidden rounded-lg">
        <img
          src={artisan.image || '/placeholder.svg'}
          alt={artisan.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="from-warm-charcoal/40 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>

      {/* Info */}
      <div className="space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-warm-charcoal font-serif text-xl font-bold">{artisan.name}</h3>
                {artisan.verified && <BadgeCheck className="text-primary h-5 w-5" />}
              </div>
              <p className="text-primary text-sm font-semibold">{artisan.craft}</p>
            </div>
          </div>

          <div className="text-warm-charcoal/60 mt-2 flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{artisan.location}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-warm-charcoal/70 line-clamp-2 text-sm">{artisan.bio}</p>

        {/* Stats */}
        <div className="border-border grid grid-cols-2 gap-3 border-y py-3">
          <div>
            <div className="mb-1 flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-warm-charcoal font-bold">{artisan.rating}</span>
            </div>
            <p className="text-warm-charcoal/60 text-xs">{artisan.reviews} reviews</p>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-1">
              <Users className="text-secondary h-4 w-4" />
              <span className="text-warm-charcoal font-bold">
                {(artisan.followers / 1000).toFixed(1)}K
              </span>
            </div>
            <p className="text-warm-charcoal/60 text-xs">Followers</p>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-1">
              <Package className="text-primary h-4 w-4" />
              <span className="text-warm-charcoal font-bold">{artisan.productsCount}</span>
            </div>
            <p className="text-warm-charcoal/60 text-xs">Products</p>
          </div>
          <div>
            <div className="mb-1 flex items-center gap-1">
              <Clock className="text-secondary h-4 w-4" />
              <span className="text-warm-charcoal font-bold">{artisan.yearsExperience}y</span>
            </div>
            <p className="text-warm-charcoal/60 text-xs">Experience</p>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-warm-sand/50 rounded-lg p-3 text-center">
          <p className="text-warm-charcoal/60 text-xs">Response Time</p>
          <p className="text-warm-charcoal font-semibold">{artisan.responseTime}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link
            href={`/artisans/${artisan.id}`}
            className="bg-primary hover:bg-warm-rust flex-1 rounded-lg py-3 text-center text-sm font-semibold text-white transition"
          >
            View Profile
          </Link>
          <button className="border-primary text-primary hover:bg-primary flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 font-semibold transition hover:text-white">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm">Message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
