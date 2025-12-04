"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { OrderOverview } from "@/components/dashboard/order-overview"
import { OrderHistory } from "@/components/dashboard/order-history"
import { AccountSettings } from "@/components/dashboard/account-settings"
import { Package, Settings, History, Heart } from "lucide-react"

type DashboardTab = "overview" | "orders" | "wishlist" | "settings"

export default function DashboardPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview")

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-warm-charcoal mb-2">My Dashboard</h1>
          <p className="text-warm-charcoal/60">Track your orders, manage your account, and explore your wishlist</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === "overview"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <Package className="w-5 h-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === "orders"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <History className="w-5 h-5" />
            Order History
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === "wishlist"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <Heart className="w-5 h-5" />
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === "settings"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>

        {/* Content */}
        {activeTab === "overview" && <OrderOverview />}
        {activeTab === "orders" && <OrderHistory />}
        {activeTab === "wishlist" && <WishlistTab />}
        {activeTab === "settings" && <AccountSettings />}
      </div>

      <Footer />
    </main>
  )
}

function WishlistTab() {
  const wishlist = [
    { id: 1, name: "Hand-Woven Saree", price: 4500, image: "/placeholder.svg?key=wish1", artisan: "Priya Textiles" },
    { id: 2, name: "Kundan Necklace", price: 8900, image: "/placeholder.svg?key=wish2", artisan: "Meera Jewelry" },
    { id: 3, name: "Blue Pottery Bowl", price: 2800, image: "/placeholder.svg?key=wish3", artisan: "Khurja Crafts" },
  ]

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-8">
        {wishlist.map((item) => (
          <div key={item.id} className="card-light hover:shadow-lg transition">
            <div className="h-48 rounded-lg overflow-hidden mb-4 bg-warm-sand">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-serif font-bold text-warm-charcoal mb-2">{item.name}</h3>
            <p className="text-sm text-warm-charcoal/60 mb-4">{item.artisan}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-primary">₹{item.price.toLocaleString()}</p>
              <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
