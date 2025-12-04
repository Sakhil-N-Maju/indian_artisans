"use client"

import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
  readTime: number
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Renaissance of Indian Handcrafts in the Digital Age",
    excerpt:
      "How technology is empowering artisans while preserving ancient traditions. Exploring the intersection of heritage and innovation.",
    author: "Priya Sharma",
    date: "Dec 3, 2025",
    category: "Heritage",
    image: "/placeholder.svg?key=blog1",
    readTime: 10,
  },
  {
    id: 2,
    title: "Sustainable Craftsmanship: The Environmental Impact",
    excerpt:
      "Understanding how handcrafted products contribute to environmental sustainability and circular economies.",
    author: "Anita Singh",
    date: "Dec 1, 2025",
    category: "Sustainability",
    image: "/placeholder.svg?key=blog2",
    readTime: 8,
  },
  {
    id: 3,
    title: "Natural Dyes: From Ancient Knowledge to Modern Practice",
    excerpt:
      "Discover the science and artistry behind natural dyes, and why artisans are returning to traditional methods.",
    author: "Kumar Woodcraft",
    date: "Nov 29, 2025",
    category: "Craft Guide",
    image: "/placeholder.svg?key=blog3",
    readTime: 12,
  },
  {
    id: 4,
    title: "The Economics of Fair Trade in Artisan Communities",
    excerpt: "How direct purchasing supports artisans and ensures fair compensation for their skilled labor.",
    author: "Rajesh Kumar",
    date: "Nov 27, 2025",
    category: "Community",
    image: "/placeholder.svg?key=blog4",
    readTime: 9,
  },
  {
    id: 5,
    title: "Women Artisans Leading the Craft Revolution",
    excerpt: "Celebrating the women redefining Indian craftsmanship and empowering future generations.",
    author: "Meera Patel",
    date: "Nov 25, 2025",
    category: "Stories",
    image: "/placeholder.svg?key=blog5",
    readTime: 11,
  },
  {
    id: 6,
    title: "Global Markets: How Indian Crafts are Winning Worldwide",
    excerpt: "Exploring how artisans are reaching international audiences and maintaining cultural authenticity.",
    author: "Mohan Lal",
    date: "Nov 23, 2025",
    category: "Business",
    image: "/placeholder.svg?key=blog6",
    readTime: 8,
  },
]

interface BlogSectionProps {
  searchQuery: string
}

export function BlogSection({ searchQuery }: BlogSectionProps) {
  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <Link href={`/blog/${filteredPosts[0].id}`}>
          <div className="card-light hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 rounded-lg overflow-hidden bg-warm-sand">
                <img
                  src={filteredPosts[0].image || "/placeholder.svg"}
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-2">
                    {filteredPosts[0].category}
                  </p>
                  <h3 className="text-3xl font-serif font-bold text-warm-charcoal mb-3 group-hover:text-primary transition">
                    {filteredPosts[0].title}
                  </h3>
                  <p className="text-warm-charcoal/70 text-lg">{filteredPosts[0].excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-warm-charcoal/60">
                      <User className="w-4 h-4" />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-warm-charcoal/60">
                      <Calendar className="w-4 h-4" />
                      <span>{filteredPosts[0].date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition">
                    Read
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(1).map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <article className="card-light hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer group">
              <div className="h-48 rounded-lg overflow-hidden mb-4 bg-warm-sand">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 space-y-3">
                <p className="text-primary font-semibold text-xs uppercase tracking-wide">{post.category}</p>
                <h3 className="text-lg font-serif font-bold text-warm-charcoal group-hover:text-primary transition line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-warm-charcoal/70 text-sm line-clamp-2">{post.excerpt}</p>
              </div>

              <div className="border-t border-border pt-3 mt-4 space-y-2 text-xs text-warm-charcoal/60">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {post.date} • {post.readTime} min read
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
