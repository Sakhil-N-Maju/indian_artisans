"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useParams } from "next/navigation"
import { Heart, Share2, Bookmark, Calendar, User, Clock, ArrowRight } from "lucide-react"

export default function StoryDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const story = {
    id: Number.parseInt(id),
    title: "The Weaver's Legacy: 35 Years of Tradition in Jaipur",
    excerpt: "Priya Sharma carries forward the ancient art of hand-weaving, transforming threads into stories.",
    author: "Priya Sharma",
    craft: "Hand-Weaving",
    location: "Jaipur, Rajasthan",
    date: "December 3, 2025",
    readTime: 8,
    likes: 1203,
    image: "/placeholder.svg?key=story-detail",
    content: `
# The Weaver's Legacy: 35 Years of Tradition in Jaipur

In the bustling lanes of Jaipur, where the echo of looms has resonated for centuries, sits Priya Sharma—a master weaver whose hands have never forgotten the language of threads.

## A Journey Begins

At seven years old, Priya didn't choose weaving. Weaving chose her, as it had chosen her grandmother, and her grandmother before that. In the cramped quarters of their family workshop, surrounded by spools of thread and the rhythmic clack of wooden looms, she learned not just a craft, but a philosophy.

"My grandmother used to say," Priya recalls, her eyes distant with memory, "that every knot in the thread carries a story. Every pattern is a conversation between the weaver and the cloth."

## The Art of Natural Dyes

What sets Priya apart in the world of contemporary weaving is her unwavering commitment to natural dyes. While many artisans have shifted to synthetic colors for consistency and cost-effectiveness, Priya has devoted decades to mastering the unpredictable art of natural dyeing.

Her process begins not in the workshop, but in the fields and gardens around Jaipur. Indigo plants carefully cultivated. Turmeric from local farmers. Pomegranate leaves collected during specific seasons. Each ingredient is harvested with intention, processed with precision, and transformed into dyes that seem to hold the very essence of nature.

"Synthetic dyes are predictable," Priya explains while stirring a vat of deep blue indigo. "But natural dyes are alive. They change with the season, with the phase of the moon, with the energy you bring to them. That's what makes them real."

## The Pattern Language

Each saree Priya creates tells a distinct story through its patterns. The borders are not merely decorative—they are historical documents. Some patterns have remained unchanged for 300 years, while others are Priya's contemporary interpretations of ancient designs.

"When I design a new pattern," she says, "I think about the woman who will wear it. What is her story? What does she want to express? I try to weave her essence into the cloth."

## Challenges and Resilience

The journey hasn't been without its hardships. The rise of power looms in the 1990s threatened the entire handweaving industry. Cheaper, faster production methods made traditional weavers seem obsolete.

"There was a time I thought about stopping," Priya admits quietly. "Customers were fewer, profit margins were shrinking. My children asked if they should pursue other careers."

But Priya persisted. She began documenting her techniques, teaching younger artisans, and eventually, connecting with global customers who valued authenticity over price.

## A Living Legacy

Today, at 57, Priya stands at the intersection of tradition and progress. She has trained over 200 younger artisans, many of them women who might have otherwise had limited economic opportunities.

"The true legacy isn't just the sarees I've created," Priya reflects. "It's the knowledge I've passed on. It's the women I've trained. It's the thousands of customers around the world who understand and appreciate what hand-weaving truly means."

Her workshop is now a living museum of textile arts—looms from different eras, dye vats bubbling with color, walls adorned with photographs of satisfied customers from across continents.

## The Future of Handweaving

As technology disrupts every industry, Priya remains optimistic about handweaving's future. "Machines can replicate patterns," she says. "But they cannot replicate the human touch, the soul, the intention. That's what makes handmade textiles invaluable."

Her message to the younger generation is clear: "Don't see handweaving as a relic of the past. See it as a bridge between where we came from and where we're going. Every time someone chooses a handwoven saree over a machine-made one, they're choosing authenticity, sustainability, and human connection."

---

*Priya Sharma's work can be found on the Artisans of India platform, where each saree comes with a certificate of authenticity and the complete story of its creation.*
    `,
    relatedStories: [
      { id: 2, title: "Blue Pottery: Khurja's Art of Resilience", author: "Rajesh Kumar" },
      { id: 5, title: "Madhubani: Where Ancient Lines Paint Modern Dreams", author: "Anita Singh" },
    ],
  }

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={false} />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-primary font-semibold uppercase tracking-wide text-sm mb-2">{story.craft}</p>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-warm-charcoal mb-4 text-balance-heading">
            {story.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-6 text-warm-charcoal/60 mb-8 border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{story.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{story.readTime} min read</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-warm-sand transition"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-primary text-primary" : ""}`} />
              <span className="text-sm">{story.likes}</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                isBookmarked ? "border-primary bg-primary/10" : "border-border hover:bg-warm-sand"
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
              <span className="text-sm">{isBookmarked ? "Saved" : "Save"}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-warm-sand transition">
              <Share2 className="w-5 h-5" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-96 rounded-2xl overflow-hidden mb-12 bg-warm-sand">
          <img src={story.image || "/placeholder.svg"} alt={story.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <div className="text-warm-charcoal/80 leading-relaxed whitespace-pre-line">{story.content}</div>
        </div>

        {/* Author Card */}
        <div className="card-light mb-16">
          <div className="flex items-start gap-4">
            <img
              src="/placeholder.svg?key=author-avatar"
              alt={story.author}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-serif font-bold text-warm-charcoal">{story.author}</h3>
              <p className="text-warm-charcoal/60 mb-3">
                {story.craft} Artisan from {story.location}
              </p>
              <p className="text-warm-charcoal/70 mb-4">
                Master craftsperson with decades of experience in preserving traditional techniques while connecting
                with global audiences.
              </p>
              <button className="text-primary font-semibold hover:text-warm-rust transition">View Full Profile</button>
            </div>
          </div>
        </div>

        {/* Related Stories */}
        {story.relatedStories.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-warm-charcoal mb-8">Related Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {story.relatedStories.map((related) => (
                <div key={related.id} className="card-light hover:shadow-lg transition">
                  <h3 className="text-lg font-serif font-bold text-warm-charcoal mb-2">{related.title}</h3>
                  <p className="text-warm-charcoal/60 text-sm mb-4">By {related.author}</p>
                  <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition">
                    Read Story
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </main>
  )
}
