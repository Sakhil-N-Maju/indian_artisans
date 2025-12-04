"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface Post {
  id: number
  author: string
  avatar: string
  craft: string
  timestamp: string
  content: string
  image: string
  likes: number
  comments: number
  isLiked: boolean
}

const communityPosts: Post[] = [
  {
    id: 1,
    author: "Priya Sharma",
    avatar: "/placeholder.svg?key=avatar1",
    craft: "Weaving",
    timestamp: "2 hours ago",
    content:
      "Just finished this beautiful saree using natural indigo dye. The blue turned out perfectly this time! Sharing the dye recipe in tomorrow's workshop.",
    image: "/placeholder.svg?key=post1",
    likes: 324,
    comments: 45,
    isLiked: false,
  },
  {
    id: 2,
    author: "Rajesh Kumar",
    avatar: "/placeholder.svg?key=avatar2",
    craft: "Pottery",
    timestamp: "4 hours ago",
    content: "New technique experiment with local clay. The texture turned out amazing. Thoughts?",
    image: "/placeholder.svg?key=post2",
    likes: 567,
    comments: 89,
    isLiked: false,
  },
  {
    id: 3,
    author: "Meera Patel",
    avatar: "/placeholder.svg?key=avatar3",
    craft: "Jewelry",
    timestamp: "6 hours ago",
    content: "Grateful for the amazing response to my latest Kundan collection. Your support means everything!",
    image: "/placeholder.svg?key=post3",
    likes: 892,
    comments: 156,
    isLiked: false,
  },
]

export default function CommunityPage() {
  const [scrolled, setScrolled] = useState(false)
  const [posts, setPosts] = useState(communityPosts)

  const toggleLike = (id: number) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-warm-charcoal mb-4">Artisan Community</h1>
          <p className="text-lg text-warm-charcoal/60">Connect with artisans, share stories, and celebrate the craft</p>
        </div>

        {/* Create Post */}
        <div className="card-light mb-8">
          <div className="flex gap-4">
            <img
              src="/placeholder.svg?key=user-avatar"
              alt="Your avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <input
                type="text"
                placeholder="Share your craft journey..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-warm-sand/50"
              />
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 text-primary hover:bg-warm-sand rounded transition">📷 Photo</button>
                <button className="px-4 py-2 text-primary hover:bg-warm-sand rounded transition">🎥 Video</button>
                <button className="ml-auto px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="card-light">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <img
                    src={post.avatar || "/placeholder.svg"}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-warm-charcoal">{post.author}</h3>
                    <p className="text-sm text-warm-charcoal/60">
                      {post.craft} · {post.timestamp}
                    </p>
                  </div>
                </div>
                <button className="text-warm-charcoal/60 hover:text-warm-charcoal">⋮</button>
              </div>

              {/* Content */}
              <p className="text-warm-charcoal/70 mb-4">{post.content}</p>

              {/* Image */}
              {post.image && (
                <img
                  src={post.image || "/placeholder.svg"}
                  alt="Post"
                  className="w-full rounded-lg mb-4 object-cover max-h-96"
                />
              )}

              {/* Stats */}
              <div className="flex justify-between text-sm text-warm-charcoal/60 pb-4 border-b border-border mb-4">
                <span>{post.likes} likes</span>
                <span>{post.comments} comments</span>
              </div>

              {/* Actions */}
              <div className="flex justify-around">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    post.isLiked ? "text-primary" : "text-warm-charcoal/60 hover:text-warm-charcoal"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
                  <span>Like</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-warm-charcoal/60 hover:text-warm-charcoal transition">
                  <MessageCircle className="w-5 h-5" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-warm-charcoal/60 hover:text-warm-charcoal transition">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
