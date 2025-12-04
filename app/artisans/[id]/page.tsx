"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useParams } from "next/navigation"
import { MapPin, Users, Package, Clock, BadgeCheck, MessageCircle, Share2, Heart, Eye } from "lucide-react"

export default function ArtisanProfilePage() {
  const params = useParams()
  const id = params.id as string
  const [isFollowing, setIsFollowing] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const artisan = {
    id: Number.parseInt(id),
    name: "Priya Sharma",
    craft: "Hand-Weaving",
    location: "Jaipur, Rajasthan",
    image: "/placeholder.svg?key=artisan-profile",
    coverImage: "/placeholder.svg?key=artisan-cover",
    rating: 4.9,
    reviews: 342,
    followers: 2850,
    productsCount: 156,
    yearsExperience: 35,
    bio: "Master weaver with 35+ years of experience in traditional saree making. Uses natural dyes and preserves ancient weaving techniques.",
    verified: true,
    responseTime: "Within 2 hours",
    joinedDate: "March 2019",
    description: `
      I am Priya Sharma, a passionate weaver from Jaipur, Rajasthan. For over three decades, I have dedicated my life to preserving the ancient art of hand-weaving. Each saree I create is a testament to the rich cultural heritage of India.

      My journey began when I was just seven years old, learning from my grandmother. She taught me not just the techniques, but also the philosophy behind each pattern and color. Every thread I use is carefully selected, and I use only natural dyes to ensure both sustainability and authenticity.

      What makes my work special is the blend of tradition and innovation. While I honor the centuries-old patterns, I also explore contemporary designs that appeal to modern sensibilities. This balance has allowed me to reach customers across generations and geographies.

      I believe that supporting artisans like me means supporting livelihoods, preserving cultural heritage, and promoting sustainable practices. When you buy from me, you're not just getting a beautiful saree—you're becoming part of a larger movement to celebrate Indian craftsmanship.
    `,
    gallery: [
      "/placeholder.svg?key=work1",
      "/placeholder.svg?key=work2",
      "/placeholder.svg?key=work3",
      "/placeholder.svg?key=work4",
      "/placeholder.svg?key=work5",
      "/placeholder.svg?key=work6",
    ],
    videos: [
      { id: 1, title: "Behind the Scenes: Weaving Process", thumbnail: "/placeholder.svg?key=video1" },
      { id: 2, title: "Natural Dye Making", thumbnail: "/placeholder.svg?key=video2" },
      { id: 3, title: "Customer Stories", thumbnail: "/placeholder.svg?key=video3" },
    ],
    socialStats: {
      profileViews: 15420,
      productClicks: 8932,
      communityEngagement: 2156,
    },
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="w-full">
        {/* Cover Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img src={artisan.coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/60 to-transparent" />
        </div>

        {/* Profile Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Profile Header */}
              <div className="card-light space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src={artisan.image || "/placeholder.svg"}
                    alt={artisan.name}
                    className="w-32 h-32 rounded-2xl object-cover"
                  />

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-4xl font-serif font-bold text-warm-charcoal">{artisan.name}</h1>
                        {artisan.verified && <BadgeCheck className="w-8 h-8 text-primary" />}
                      </div>
                      <p className="text-xl text-primary font-semibold">{artisan.craft}</p>
                    </div>

                    <div className="flex items-center gap-1 text-warm-charcoal/60">
                      <MapPin className="w-4 h-4" />
                      <span>{artisan.location}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-primary">{artisan.rating}</p>
                        <p className="text-xs text-warm-charcoal/60">{artisan.reviews} reviews</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{(artisan.followers / 1000).toFixed(1)}K</p>
                        <p className="text-xs text-warm-charcoal/60">Followers</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{artisan.productsCount}</p>
                        <p className="text-xs text-warm-charcoal/60">Products</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{artisan.yearsExperience}y</p>
                        <p className="text-xs text-warm-charcoal/60">Experience</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`px-6 py-2 rounded-lg font-semibold transition ${
                          isFollowing
                            ? "bg-primary text-white"
                            : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                        }`}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                      <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </button>
                      <button className="px-6 py-2 border-2 border-border text-warm-charcoal rounded-lg font-semibold hover:bg-warm-sand transition">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="border-t border-border pt-6">
                  <p className="text-warm-charcoal/70 leading-relaxed">{artisan.description}</p>
                </div>
              </div>

              {/* Gallery */}
              <div className="card-light">
                <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6">Gallery</h2>
                <div className="grid grid-cols-3 gap-4">
                  {artisan.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Work ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Videos */}
              <div className="card-light">
                <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6">Behind the Scenes</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {artisan.videos.map((video) => (
                    <div key={video.id} className="cursor-pointer group">
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-warm-charcoal/40 group-hover:bg-warm-charcoal/20 transition flex items-center justify-center">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition">
                            <span className="text-white text-2xl">▶</span>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-semibold text-warm-charcoal group-hover:text-primary transition">
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
              <div className="card-light text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <BadgeCheck className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-warm-charcoal">Verified Artisan</h3>
                  <p className="text-sm text-warm-charcoal/60">100% authentic & reliable</p>
                </div>
              </div>

              {/* Response Info */}
              <div className="card-light space-y-4">
                <h3 className="font-bold text-warm-charcoal">Response Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-warm-charcoal/70">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm">{artisan.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-charcoal/70">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm">Joined {artisan.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Social Stats */}
              <div className="card-light space-y-4">
                <h3 className="font-bold text-warm-charcoal">Engagement</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-warm-charcoal/60">Profile Views</span>
                    </div>
                    <span className="font-bold">{artisan.socialStats.profileViews.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-warm-charcoal/60">Product Clicks</span>
                    </div>
                    <span className="font-bold">{artisan.socialStats.productClicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-secondary" />
                      <span className="text-sm text-warm-charcoal/60">Community</span>
                    </div>
                    <span className="font-bold">{artisan.socialStats.communityEngagement.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Featured Products */}
              <div className="card-light">
                <h3 className="font-bold text-warm-charcoal mb-4">Featured Products</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className="flex gap-3 cursor-pointer group">
                      <img
                        src={`/ceholder-svg-key-product-.jpg?key=product-${idx}`}
                        alt="Product"
                        className="w-16 h-16 rounded object-cover group-hover:scale-110 transition"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-warm-charcoal group-hover:text-primary transition">
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
    </main>
  )
}
