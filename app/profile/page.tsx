"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { User, Mail, Phone, MapPin, Edit2, LogOut, Package, Heart, Settings, Clock } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  avatar: string
  totalOrders: number
  totalSpent: number
}

const mockProfile: UserProfile = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@example.com",
  phone: "+91 98765 43210",
  address: "123 Artisan Street, Delhi, India 110001",
  joinDate: "January 2023",
  avatar: "/professional-profile.jpg",
  totalOrders: 24,
  totalSpent: 185400,
}

interface RecentOrder {
  id: string
  date: string
  items: number
  total: number
  status: "delivered" | "in-transit" | "processing"
}

const mockRecentOrders: RecentOrder[] = [
  { id: "ORD-2025-001", date: "Jan 15, 2025", items: 3, total: 15800, status: "delivered" },
  { id: "ORD-2025-002", date: "Jan 8, 2025", items: 1, total: 8900, status: "delivered" },
  { id: "ORD-2025-003", date: "Dec 28, 2024", items: 2, total: 12500, status: "delivered" },
  { id: "ORD-2024-148", date: "Dec 20, 2024", items: 1, total: 4500, status: "delivered" },
]

type ProfileTab = "overview" | "orders" | "addresses" | "settings"

export default function ProfilePage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview")

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-28 sm:pt-32">
        <div className="card-light mb-8 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={mockProfile.avatar || "/placeholder.svg"}
                alt={mockProfile.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-primary text-white rounded-lg hover:bg-warm-rust transition">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-warm-charcoal mb-2">{mockProfile.name}</h1>
              <div className="space-y-2 text-xs sm:text-sm text-warm-charcoal/60 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{mockProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  {mockProfile.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  Member since {mockProfile.joinDate}
                </div>
              </div>
              <button className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition text-sm">
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="text-center sm:text-right">
                <p className="text-xl sm:text-2xl font-bold text-primary">{mockProfile.totalOrders}</p>
                <p className="text-xs sm:text-sm text-warm-charcoal/60">Total Orders</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xl sm:text-2xl font-bold text-primary">
                  ₹{(mockProfile.totalSpent / 1000).toFixed(0)}K
                </p>
                <p className="text-xs sm:text-sm text-warm-charcoal/60">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-8 border-b border-border overflow-x-auto pb-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b-2 transition whitespace-nowrap text-sm sm:text-base ${
              activeTab === "overview"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b-2 transition whitespace-nowrap text-sm sm:text-base ${
              activeTab === "orders"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Orders</span>
          </button>
          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b-2 transition whitespace-nowrap text-sm sm:text-base ${
              activeTab === "addresses"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold border-b-2 transition whitespace-nowrap text-sm sm:text-base ${
              activeTab === "settings"
                ? "text-primary border-primary"
                : "text-warm-charcoal/60 border-transparent hover:text-warm-charcoal"
            }`}
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/favorites"
                className="card-light hover:shadow-lg transition flex items-center gap-4 p-4 sm:p-5 cursor-pointer"
              >
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-warm-charcoal text-sm sm:text-base">Favorites</p>
                  <p className="text-xs sm:text-sm text-warm-charcoal/60">12 items saved</p>
                </div>
              </a>
              <a
                href="/cart"
                className="card-light hover:shadow-lg transition flex items-center gap-4 p-4 sm:p-5 cursor-pointer"
              >
                <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-warm-charcoal text-sm sm:text-base">Cart</p>
                  <p className="text-xs sm:text-sm text-warm-charcoal/60">3 items in cart</p>
                </div>
              </a>
              <div className="card-light flex items-center gap-4 p-4 sm:p-5">
                <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-warm-charcoal text-sm sm:text-base">Preferences</p>
                  <p className="text-xs sm:text-sm text-warm-charcoal/60">Customize your experience</p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-warm-charcoal mb-4 sm:mb-6">
                Recent Orders
              </h2>
              <div className="space-y-3">
                {mockRecentOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="card-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-warm-charcoal text-sm sm:text-base">{order.id}</p>
                      <p className="text-xs sm:text-sm text-warm-charcoal/60">{order.date}</p>
                    </div>
                    <div className="flex items-center justify-between sm:text-right">
                      <p className="font-semibold text-warm-charcoal text-sm sm:text-base">
                        ₹{order.total.toLocaleString()}
                      </p>
                      <p
                        className={`text-xs font-semibold ml-4 sm:ml-0 ${
                          order.status === "delivered"
                            ? "text-green-600"
                            : order.status === "in-transit"
                              ? "text-blue-600"
                              : "text-orange-600"
                        }`}
                      >
                        {order.status.replace("-", " ").toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#"
                onClick={() => setActiveTab("orders")}
                className="mt-4 text-primary font-semibold hover:text-warm-rust transition text-sm"
              >
                View All Orders →
              </a>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-3">
            {mockRecentOrders.map((order) => (
              <div
                key={order.id}
                className="card-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-lg transition p-4 sm:p-5"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-warm-charcoal text-sm sm:text-base">{order.id}</p>
                  <p className="text-xs sm:text-sm text-warm-charcoal/60">
                    {order.date} • {order.items} item{order.items > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:text-right">
                  <p className="font-bold text-primary text-sm sm:text-base">₹{order.total.toLocaleString()}</p>
                  <p
                    className={`text-xs font-semibold ml-4 sm:ml-0 ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : order.status === "in-transit"
                          ? "text-blue-600"
                          : "text-orange-600"
                    }`}
                  >
                    {order.status.replace("-", " ").toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="space-y-4">
            <div className="card-light p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4 sm:mb-3">
                <div className="min-w-0">
                  <p className="font-semibold text-warm-charcoal text-sm sm:text-base">Home</p>
                  <p className="text-xs sm:text-sm text-warm-charcoal/60 mt-2">{mockProfile.address}</p>
                </div>
                <span className="px-3 py-1 bg-primary/10 text-xs font-semibold text-primary rounded-full whitespace-nowrap">
                  Default
                </span>
              </div>
              <button className="text-primary font-semibold hover:text-warm-rust transition text-xs sm:text-sm">
                Edit Address
              </button>
            </div>

            <button className="w-full card-light border-2 border-dashed border-border text-center py-6 sm:py-8 hover:bg-warm-sand/50 transition">
              <p className="font-semibold text-warm-charcoal text-sm sm:text-base">+ Add New Address</p>
            </button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6 max-w-2xl">
            <div className="card-light p-4 sm:p-5">
              <h3 className="font-semibold text-warm-charcoal mb-4 text-sm sm:text-base">Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-xs sm:text-sm text-warm-charcoal">Order updates</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-xs sm:text-sm text-warm-charcoal">Promotions and discounts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-xs sm:text-sm text-warm-charcoal">New artisan collections</span>
                </label>
              </div>
            </div>

            <div className="card-light p-4 sm:p-5">
              <h3 className="font-semibold text-warm-charcoal mb-4 text-sm sm:text-base">Security</h3>
              <button className="w-full px-4 py-2.5 border border-border rounded-lg hover:bg-warm-sand transition text-left font-semibold text-xs sm:text-sm">
                Change Password
              </button>
            </div>

            <div className="card-light p-4 sm:p-5">
              <h3 className="font-semibold text-warm-charcoal mb-4 text-red-600 text-sm sm:text-base">Danger Zone</h3>
              <button className="w-full px-4 py-2.5 border-2 border-destructive text-destructive rounded-lg hover:bg-destructive/5 transition font-semibold text-xs sm:text-sm">
                Delete Account
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition text-xs sm:text-sm">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
