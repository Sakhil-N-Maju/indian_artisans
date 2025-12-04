"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FeaturedItem {
  id: number
  image: string
  title: string
  artisan: string
  price: string
  category: string
}

const featuredItems: FeaturedItem[] = [
  {
    id: 1,
    image: "/indian-handmade-textiles-fabric.jpg",
    title: "Hand-Woven Saree",
    artisan: "Priya Textiles",
    price: "₹4,500",
    category: "Textiles",
  },
  {
    id: 2,
    image: "/traditional-indian-pottery-ceramic.jpg",
    title: "Terracotta Pottery Set",
    artisan: "Rajesh Ceramics",
    price: "₹3,200",
    category: "Ceramics",
  },
  {
    id: 3,
    image: "/indian-jewelry-gold-traditional.jpg",
    title: "Kundan Jewelry Set",
    artisan: "Meera Jewelry",
    price: "₹8,900",
    category: "Jewelry",
  },
  {
    id: 4,
    image: "/wooden-handicraft-indian-carving.jpg",
    title: "Wooden Carving",
    artisan: "Kumar Woodcraft",
    price: "₹2,800",
    category: "Woodcraft",
  },
  {
    id: 5,
    image: "/indian-hand-painted-art.jpg",
    title: "Hand-Painted Tiles",
    artisan: "Anita Art Studio",
    price: "₹5,600",
    category: "Painting",
  },
]

export function FeaturedCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredItems.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % featuredItems.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)
    setAutoPlay(false)
  }

  return (
    <section className="py-20 bg-floral-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Featured Collection</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-warm-charcoal mt-2">Artisan Treasures</h2>
          <p className="text-warm-charcoal/60 mt-4 max-w-2xl mx-auto">
            Curated selections from master craftspeople who preserve traditions through contemporary design.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <div key={item.id} className="min-w-full">
                  <div className="grid md:grid-cols-2 gap-8 items-center py-8">
                    <div className="relative h-96 rounded-xl overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {item.category}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-secondary font-semibold text-sm uppercase tracking-wide">
                          By {item.artisan}
                        </p>
                        <h3 className="text-4xl font-serif font-bold text-warm-charcoal mt-2">{item.title}</h3>
                      </div>

                      <p className="text-warm-charcoal/60 text-lg">
                        Each piece is meticulously crafted by skilled artisans using traditional techniques passed down
                        through generations.
                      </p>

                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-primary">{item.price}</div>
                        <button className="w-full py-4 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition-all duration-300">
                          Add to Cart
                        </button>
                      </div>

                      {/* Indicators */}
                      <div className="flex gap-2 pt-4">
                        {featuredItems.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setCurrent(idx)
                              setAutoPlay(false)
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              idx === current ? "bg-primary w-8" : "bg-border w-2"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md"
          >
            <ChevronLeft className="w-6 h-6 text-warm-charcoal" />
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md"
          >
            <ChevronRight className="w-6 h-6 text-warm-charcoal" />
          </button>
        </div>
      </div>
    </section>
  )
}
