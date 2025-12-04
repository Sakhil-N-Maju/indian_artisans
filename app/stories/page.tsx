"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BookOpen, Video, Sparkles, Search } from "lucide-react"
import { StoryGrid } from "@/components/stories/story-grid"
import { VideoGallery } from "@/components/stories/video-gallery"
import { BlogSection } from "@/components/stories/blog-section"

type ContentTab = "stories" | "videos" | "blog"

export default function StoriesPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<ContentTab>("stories")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">AI-Powered Narratives</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-warm-charcoal mb-4">
            Stories Behind the Craft
          </h1>
          <p className="text-lg text-warm-charcoal/60 max-w-2xl mx-auto">
            Discover the artisans, their heritage, and the ancient traditions preserved through handcrafted excellence.
            Each story celebrates culture, craftsmanship, and human connection.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-warm-charcoal/40" />
            <input
              type="text"
              placeholder="Search stories, artisans, or crafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-border">
          <button
            onClick={() => setActiveTab("stories")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === "stories"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            AI Stories
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === "videos"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <Video className="w-5 h-5" />
            Video Gallery
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition ${
              activeTab === "blog"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <span>Blog</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === "stories" && <StoryGrid searchQuery={searchQuery} />}
        {activeTab === "videos" && <VideoGallery searchQuery={searchQuery} />}
        {activeTab === "blog" && <BlogSection searchQuery={searchQuery} />}
      </div>

      <Footer />
    </main>
  )
}
