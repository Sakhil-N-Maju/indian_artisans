'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useParams, useRouter } from 'next/navigation';
import {
  MapPin,
  Users,
  Package,
  Clock,
  BadgeCheck,
  MessageCircle,
  Share2,
  Heart,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import { MessagePopup } from '@/components/message-popup';

export default function ArtisanProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [isFollowing, setIsFollowing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  const artisan = {
    id: Number.parseInt(id),
    name: 'Priya Sharma',
    craft: 'Hand-Weaving',
    location: 'Jaipur, Rajasthan',
    image: '/placeholder.svg?key=artisan-profile',
    coverImage: '/placeholder.svg?key=artisan-cover',
    rating: 4.9,
    reviews: 342,
    followers: 2850,
    productsCount: 156,
    yearsExperience: 35,
    bio: 'Master weaver with 35+ years of experience in traditional saree making. Uses natural dyes and preserves ancient weaving techniques.',
    verified: true,
    responseTime: 'Within 2 hours',
    joinedDate: 'March 2019',
    description: `
      I am Priya Sharma, a passionate weaver from Jaipur, Rajasthan. For over three decades, I have dedicated my life to preserving the ancient art of hand-weaving. Each saree I create is a testament to the rich cultural heritage of India.

      My journey began when I was just seven years old, learning from my grandmother. She taught me not just the techniques, but also the philosophy behind each pattern and color. Every thread I use is carefully selected, and I use only natural dyes to ensure both sustainability and authenticity.

      What makes my work special is the blend of tradition and innovation. While I honor the centuries-old patterns, I also explore contemporary designs that appeal to modern sensibilities. This balance has allowed me to reach customers across generations and geographies.

      I believe that supporting artisans like me means supporting livelihoods, preserving cultural heritage, and promoting sustainable practices. When you buy from me, you're not just getting a beautiful saree—you're becoming part of a larger movement to celebrate Indian craftsmanship.
    `,
    gallery: [
      '/placeholder.svg?key=work1',
      '/placeholder.svg?key=work2',
      '/placeholder.svg?key=work3',
      '/placeholder.svg?key=work4',
      '/placeholder.svg?key=work5',
      '/placeholder.svg?key=work6',
    ],
    videos: [
      {
        id: 1,
        title: 'Behind the Scenes: Weaving Process',
        thumbnail: '/placeholder.svg?key=video1',
      },
      { id: 2, title: 'Natural Dye Making', thumbnail: '/placeholder.svg?key=video2' },
      { id: 3, title: 'Customer Stories', thumbnail: '/placeholder.svg?key=video3' },
    ],
    socialStats: {
      profileViews: 15420,
      productClicks: 8932,
      communityEngagement: 2156,
    },
  };

  return (
    <main className="bg-warm-cream min-h-screen">
      <Navigation scrolled={scrolled} />

      <div className="w-full">
        {/* Back Button */}
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="text-warm-charcoal hover:text-primary group flex items-center gap-2 transition"
          >
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* Cover Image */}
        <div className="relative mt-4 h-64 overflow-hidden sm:h-80">
          <img
            src={artisan.coverImage || '/placeholder.svg'}
            alt="Cover"
            className="h-full w-full object-cover"
          />
          <div className="from-warm-charcoal/60 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>

        {/* Profile Content */}
        <div className="relative z-10 mx-auto -mt-32 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 md:col-span-2">
              {/* Profile Header */}
              <div className="card-light space-y-6">
                <div className="flex flex-col items-start gap-6 sm:flex-row">
                  <img
                    src={artisan.image || '/placeholder.svg'}
                    alt={artisan.name}
                    className="h-32 w-32 rounded-2xl object-cover"
                  />

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <h1 className="text-warm-charcoal font-serif text-4xl font-bold">
                          {artisan.name}
                        </h1>
                        {artisan.verified && <BadgeCheck className="text-primary h-8 w-8" />}
                      </div>
                      <p className="text-primary text-xl font-semibold">{artisan.craft}</p>
                    </div>

                    <div className="text-warm-charcoal/60 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{artisan.location}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-primary text-2xl font-bold">{artisan.rating}</p>
                        <p className="text-warm-charcoal/60 text-xs">{artisan.reviews} reviews</p>
                      </div>
                      <div>
                        <p className="text-primary text-2xl font-bold">
                          {(artisan.followers / 1000).toFixed(1)}K
                        </p>
                        <p className="text-warm-charcoal/60 text-xs">Followers</p>
                      </div>
                      <div>
                        <p className="text-primary text-2xl font-bold">{artisan.productsCount}</p>
                        <p className="text-warm-charcoal/60 text-xs">Products</p>
                      </div>
                      <div>
                        <p className="text-primary text-2xl font-bold">
                          {artisan.yearsExperience}y
                        </p>
                        <p className="text-warm-charcoal/60 text-xs">Experience</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`rounded-lg px-6 py-2 font-semibold transition ${
                          isFollowing
                            ? 'bg-primary text-white'
                            : 'border-primary text-primary hover:bg-primary border-2 hover:text-white'
                        }`}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </button>
                      <button
                        onClick={() => setShowMessagePopup(true)}
                        className="border-primary text-primary hover:bg-primary flex items-center gap-2 rounded-lg border-2 px-6 py-2 font-semibold transition hover:text-white"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Message
                      </button>
                      <button className="border-border text-warm-charcoal hover:bg-warm-sand rounded-lg border-2 px-6 py-2 font-semibold transition">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="border-border border-t pt-6">
                  <p className="text-warm-charcoal/70 leading-relaxed">{artisan.description}</p>
                </div>
              </div>

              {/* Gallery */}
              <div className="card-light">
                <h2 className="text-warm-charcoal mb-6 font-serif text-2xl font-bold">Gallery</h2>
                <div className="grid grid-cols-3 gap-4">
                  {artisan.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square cursor-pointer overflow-hidden rounded-lg transition hover:scale-105"
                    >
                      <img
                        src={img || '/placeholder.svg'}
                        alt={`Work ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div className="card-light">
                <h2 className="text-warm-charcoal mb-6 font-serif text-2xl font-bold">
                  Behind the Scenes
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {artisan.videos.map((video) => (
                    <div key={video.id} className="group cursor-pointer">
                      <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
                        <img
                          src={video.thumbnail || '/placeholder.svg'}
                          alt={video.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                        />
                        <div className="bg-warm-charcoal/40 group-hover:bg-warm-charcoal/20 absolute inset-0 flex items-center justify-center transition">
                          <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full transition group-hover:scale-110">
                            <span className="text-2xl text-white">▶</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-warm-charcoal group-hover:text-primary font-semibold transition">
                        {video.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Verification Card */}
              <div className="card-light space-y-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <BadgeCheck className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-warm-charcoal font-bold">Verified Artisan</h3>
                  <p className="text-warm-charcoal/60 text-sm">100% authentic & reliable</p>
                </div>
              </div>

              {/* Response Info */}
              <div className="card-light space-y-4">
                <h3 className="text-warm-charcoal font-bold">Response Info</h3>
                <div className="space-y-3">
                  <div className="text-warm-charcoal/70 flex items-center gap-2">
                    <Clock className="text-primary h-5 w-5" />
                    <span className="text-sm">{artisan.responseTime}</span>
                  </div>
                  <div className="text-warm-charcoal/70 flex items-center gap-2">
                    <Users className="text-primary h-5 w-5" />
                    <span className="text-sm">Joined {artisan.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Social Stats */}
              <div className="card-light space-y-4">
                <h3 className="text-warm-charcoal font-bold">Engagement</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="text-secondary h-5 w-5" />
                      <span className="text-warm-charcoal/60 text-sm">Profile Views</span>
                    </div>
                    <span className="font-bold">
                      {artisan.socialStats.profileViews.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="text-secondary h-5 w-5" />
                      <span className="text-warm-charcoal/60 text-sm">Product Clicks</span>
                    </div>
                    <span className="font-bold">
                      {artisan.socialStats.productClicks.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="text-secondary h-5 w-5" />
                      <span className="text-warm-charcoal/60 text-sm">Community</span>
                    </div>
                    <span className="font-bold">
                      {artisan.socialStats.communityEngagement.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Products */}
              <div className="card-light">
                <h3 className="text-warm-charcoal mb-4 font-bold">Featured Products</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="group flex cursor-pointer gap-3">
                      <img
                        src={`/ceholder-svg-key-product-.jpg?key=product-${idx}`}
                        alt="Product"
                        className="h-16 w-16 rounded object-cover transition group-hover:scale-110"
                      />
                      <div className="flex-1">
                        <p className="text-warm-charcoal group-hover:text-primary text-sm font-semibold transition">
                          Featured Product {idx}
                        </p>
                        <p className="text-primary text-sm">₹{3000 + idx * 500}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20" />
      <Footer />

      {/* Message Popup */}
      {showMessagePopup && (
        <MessagePopup
          artisanId={id}
          artisanName={artisan.name}
          artisanImage={artisan.image}
          onClose={() => setShowMessagePopup(false)}
        />
      )}
    </main>
  );
}
