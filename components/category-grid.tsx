"use client"

export interface Category {
  id: number
  name: string
  image: string
  count: number
}

const categories: Category[] = [
  { id: 1, name: "Textiles", image: "/colorful-indian-fabrics.jpg", count: 450 },
  { id: 2, name: "Pottery", image: "/terracotta-pots.jpg", count: 320 },
  { id: 3, name: "Jewelry", image: "/traditional-jewelry.png", count: 280 },
  { id: 4, name: "Woodcraft", image: "/carved-wood-art.jpg", count: 195 },
  { id: 5, name: "Metalwork", image: "/brass-copper-metalwork.jpg", count: 165 },
  { id: 6, name: "Paintings", image: "/indian-traditional-art.jpg", count: 240 },
]

export function CategoryGrid() {
  return (
    <section className="py-20 bg-floral-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Shop By Category</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-warm-charcoal mt-2">Explore Crafts</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group relative overflow-hidden rounded-xl h-64 cursor-pointer">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/80 via-warm-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-serif font-bold text-white">{category.name}</h3>
                <p className="text-warm-sand/80 text-sm mt-2">{category.count} products</p>
              </div>

              {/* Static overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-serif font-bold text-white">{category.name}</h3>
                <p className="text-warm-sand/80 text-sm mt-2">{category.count} products</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
