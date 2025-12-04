"use client"

import { useState } from "react"
import { Download, RotateCcw, MessageCircle } from "lucide-react"

interface Order {
  id: string
  product: string
  artisan: string
  date: string
  amount: number
  status: "Delivered" | "In Transit" | "Processing" | "Cancelled"
  trackingId: string
  image: string
}

const orders: Order[] = [
  {
    id: "ORD-2025-0456",
    product: "Hand-Woven Saree",
    artisan: "Priya Textiles",
    date: "Dec 2, 2025",
    amount: 4500,
    status: "Delivered",
    trackingId: "TRK-1234567890",
    image: "/placeholder.svg?key=hist1",
  },
  {
    id: "ORD-2025-0455",
    product: "Kundan Necklace",
    artisan: "Meera Jewelry",
    date: "Nov 28, 2025",
    amount: 8900,
    status: "In Transit",
    trackingId: "TRK-1234567891",
    image: "/placeholder.svg?key=hist2",
  },
  {
    id: "ORD-2025-0454",
    product: "Blue Pottery Set",
    artisan: "Rajesh Ceramics",
    date: "Nov 24, 2025",
    amount: 3200,
    status: "Delivered",
    trackingId: "TRK-1234567892",
    image: "/placeholder.svg?key=hist3",
  },
  {
    id: "ORD-2025-0453",
    product: "Wooden Jewelry Box",
    artisan: "Kumar Woodcraft",
    date: "Nov 18, 2025",
    amount: 2800,
    status: "Delivered",
    trackingId: "TRK-1234567893",
    image: "/placeholder.svg?key=hist4",
  },
]

export function OrderHistory() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700"
      case "In Transit":
        return "bg-blue-100 text-blue-700"
      case "Processing":
        return "bg-yellow-100 text-yellow-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
    }
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="card-light">
          {/* Order Header */}
          <button
            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            className="w-full text-left"
          >
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <img
                src={order.image || "/placeholder.svg"}
                alt={order.product}
                className="w-20 h-20 rounded object-cover"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-serif font-bold text-warm-charcoal">{order.product}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-warm-charcoal/60 mb-1">{order.artisan}</p>
                <p className="text-xs text-warm-charcoal/50">
                  {order.id} • {order.date}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-primary">₹{order.amount.toLocaleString()}</p>
              </div>
            </div>
          </button>

          {/* Order Details */}
          {expandedOrder === order.id && (
            <div className="pt-6 space-y-6">
              {/* Tracking */}
              <div>
                <h4 className="font-semibold text-warm-charcoal mb-3">Tracking Information</h4>
                <div className="bg-warm-sand/50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-warm-charcoal/60 mb-1">Tracking ID</p>
                  <p className="font-mono font-bold text-warm-charcoal">{order.trackingId}</p>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  {[
                    { stage: "Order Placed", date: "Nov 28, 2025", completed: true },
                    { stage: "Processing", date: "Nov 29, 2025", completed: true },
                    { stage: "Shipped", date: "Nov 30, 2025", completed: true },
                    { stage: "Out for Delivery", date: "Dec 1, 2025", completed: order.status === "Delivered" },
                    { stage: "Delivered", date: "Dec 2, 2025", completed: order.status === "Delivered" },
                  ].map((event, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${event.completed ? "bg-primary" : "bg-border"}`} />
                        {idx < 4 && <div className={`w-0.5 h-8 ${event.completed ? "bg-primary" : "bg-border"}`} />}
                      </div>
                      <div>
                        <p className="font-semibold text-warm-charcoal">{event.stage}</p>
                        <p className="text-sm text-warm-charcoal/60">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition">
                  <Download className="w-4 h-4" />
                  Invoice
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-border text-warm-charcoal rounded-lg font-semibold hover:bg-warm-sand transition">
                  <RotateCcw className="w-4 h-4" />
                  Return
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border-2 border-border text-warm-charcoal rounded-lg font-semibold hover:bg-warm-sand transition">
                  <MessageCircle className="w-4 h-4" />
                  Support
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
