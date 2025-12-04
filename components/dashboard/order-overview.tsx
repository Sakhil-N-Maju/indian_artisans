"use client"

import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export function OrderOverview() {
  const stats = [
    { label: "Total Orders", value: "12", icon: Package, color: "primary" },
    { label: "In Transit", value: "2", icon: Truck, color: "secondary" },
    { label: "Delivered", value: "10", icon: CheckCircle, color: "sage" },
    { label: "Processing", value: "1", icon: Clock, color: "rust" },
  ]

  const recentOrders = [
    {
      id: "ORD-2025-0456",
      product: "Hand-Woven Saree",
      date: "Dec 2, 2025",
      amount: "₹4,500",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      image: "/placeholder.svg?key=order1",
    },
    {
      id: "ORD-2025-0455",
      product: "Kundan Necklace",
      date: "Nov 28, 2025",
      amount: "₹8,900",
      status: "In Transit",
      statusColor: "bg-blue-100 text-blue-700",
      image: "/placeholder.svg?key=order2",
    },
    {
      id: "ORD-2025-0454",
      product: "Blue Pottery Set",
      date: "Nov 24, 2025",
      amount: "₹3,200",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-700",
      image: "/placeholder.svg?key=order3",
    },
  ]

  return (
    <div className="space-y-12">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="card-light">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-warm-charcoal/60 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-warm-charcoal">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}/10 rounded-full flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="card-light">
        <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6">Recent Orders</h2>

        <div className="space-y-4">
          {recentOrders.map((order) => (
            <Link key={order.id} href={`/dashboard/orders/${order.id}`}>
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-warm-sand/30 transition cursor-pointer">
                <img
                  src={order.image || "/placeholder.svg"}
                  alt={order.product}
                  className="w-16 h-16 rounded object-cover"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-warm-charcoal">{order.product}</p>
                  <p className="text-sm text-warm-charcoal/60">{order.id}</p>
                  <p className="text-xs text-warm-charcoal/50">{order.date}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-warm-charcoal">{order.amount}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="#orders" className="text-primary font-semibold hover:text-warm-rust transition mt-6 inline-block">
          View All Orders →
        </Link>
      </div>
    </div>
  )
}
