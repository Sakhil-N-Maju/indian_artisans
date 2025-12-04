"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  artisan: string
  category: string
}

const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Hand-Woven Saree",
    price: 4500,
    quantity: 1,
    image: "/hand-woven-saree.jpg",
    artisan: "Priya Textiles",
    category: "Textiles",
  },
  {
    id: 2,
    name: "Kundan Necklace",
    price: 8900,
    quantity: 2,
    image: "/kundan-necklace.jpg",
    artisan: "Meera Jewelry",
    category: "Jewelry",
  },
  {
    id: 3,
    name: "Blue Pottery Bowl",
    price: 2800,
    quantity: 1,
    image: "/blue-pottery-bowl.jpg",
    artisan: "Khurja Crafts",
    category: "Pottery",
  },
]

export default function CartPage() {
  const [scrolled, setScrolled] = useState(false)
  const [cartItems, setCartItems] = useState(mockCartItems)

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(
      cartItems
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 5000 ? 0 : 200
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + shipping + tax

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-28 sm:pt-32">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-3 mb-8 sm:mb-12">
          <ShoppingCart className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-warm-charcoal">Shopping Cart</h1>
          <span className="ml-auto px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-xs sm:text-sm font-semibold text-primary">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </span>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="card-light flex gap-4 p-4 sm:p-5">
                  {/* Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-warm-sand flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-primary font-semibold mb-1">{item.category}</p>
                      <h3 className="text-sm sm:text-lg font-serif font-bold text-warm-charcoal line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-warm-charcoal/60 mt-1">{item.artisan}</p>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-primary mt-2">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-warm-charcoal/60 hover:text-primary transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 bg-warm-sand rounded-lg px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-warm-cream rounded transition"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-warm-charcoal" />
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-warm-cream rounded transition"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-warm-charcoal" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              {/* Summary Card */}
              <div className="card-light sticky top-28 sm:top-32 space-y-5 p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-serif font-bold text-warm-charcoal">Order Summary</h2>

                <div className="space-y-3 pb-5 sm:pb-6 border-b border-border">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-warm-charcoal/60">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-warm-charcoal/60">Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-warm-charcoal/60">Tax (5%)</span>
                    <span className="font-semibold">₹{tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between text-base sm:text-lg">
                  <span className="font-bold text-warm-charcoal">Total</span>
                  <span className="font-bold text-primary">₹{total.toLocaleString()}</span>
                </div>

                {subtotal > 5000 && (
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-xs text-primary font-semibold">FREE SHIPPING</p>
                    <p className="text-xs text-primary/70">You qualified for free shipping!</p>
                  </div>
                )}

                <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-warm-rust transition flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition">
                  Continue Shopping
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex gap-3 text-xs sm:text-sm">
                  <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-warm-charcoal">Free shipping over ₹5000</p>
                    <p className="text-warm-charcoal/60 text-xs">On orders above ₹5000</p>
                  </div>
                </div>
                <div className="flex gap-3 text-xs sm:text-sm">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-warm-charcoal">Secure checkout</p>
                    <p className="text-warm-charcoal/60 text-xs">Your data is safe with us</p>
                  </div>
                </div>
                <div className="flex gap-3 text-xs sm:text-sm">
                  <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-warm-charcoal">Easy returns</p>
                    <p className="text-warm-charcoal/60 text-xs">30-day return guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <ShoppingCart className="w-12 sm:w-16 h-12 sm:h-16 text-warm-sand mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-warm-charcoal mb-2">Cart is Empty</h2>
            <p className="text-warm-charcoal/60 mb-6 text-sm sm:text-base">
              Add some beautiful handcrafted items to your cart
            </p>
            <a
              href="/shop"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition"
            >
              Start Shopping
            </a>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
