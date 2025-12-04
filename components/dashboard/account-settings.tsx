"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Lock, Bell, Shield } from "lucide-react"

export function AccountSettings() {
  const [formData, setFormData] = useState({
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    address: "123 Street, City, State 12345",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    zipCode: "400001",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    reviews: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="space-y-12">
      {/* Profile Settings */}
      <div className="card-light">
        <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6">Profile Information</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-warm-charcoal mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-warm-charcoal mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-warm-charcoal mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-warm-charcoal mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-warm-charcoal mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-charcoal mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-charcoal mb-2">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-charcoal mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-warm-charcoal mb-2">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-warm-rust transition">
          Save Changes
        </button>
      </div>

      {/* Notification Settings */}
      <div className="card-light">
        <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6 flex items-center gap-2">
          <Bell className="w-6 h-6" />
          Notification Settings
        </h2>

        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => {
            const labels: Record<string, { title: string; description: string }> = {
              orderUpdates: {
                title: "Order Updates",
                description: "Get notified about order status changes and delivery updates",
              },
              promotions: {
                title: "Promotions & Offers",
                description: "Receive special offers and discount codes",
              },
              newsletter: {
                title: "Newsletter",
                description: "Weekly stories, artisan highlights, and craft tips",
              },
              reviews: {
                title: "Review Requests",
                description: "Ask for your feedback on recent purchases",
              },
            }

            return (
              <label
                key={key}
                className="flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-warm-sand/30 transition"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleNotificationChange(key as any)}
                  className="w-5 h-5 accent-primary"
                />
                <div className="flex-1">
                  <p className="font-semibold text-warm-charcoal">{labels[key].title}</p>
                  <p className="text-sm text-warm-charcoal/60">{labels[key].description}</p>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* Security Settings */}
      <div className="card-light">
        <h2 className="text-2xl font-serif font-bold text-warm-charcoal mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Security & Privacy
        </h2>

        <div className="space-y-4">
          <button className="w-full p-4 border-2 border-border rounded-lg hover:bg-warm-sand transition text-left flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-warm-charcoal">Change Password</p>
                <p className="text-sm text-warm-charcoal/60">Update your password regularly for security</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>

          <button className="w-full p-4 border-2 border-border rounded-lg hover:bg-warm-sand transition text-left flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-warm-charcoal">Two-Factor Authentication</p>
                <p className="text-sm text-warm-charcoal/60">Add an extra layer of security to your account</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>

          <button className="w-full p-4 border-2 border-border rounded-lg hover:bg-warm-sand transition text-left flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-warm-charcoal">Privacy Policy</p>
                <p className="text-sm text-warm-charcoal/60">Review how we handle your data</p>
              </div>
            </div>
            <span className="text-primary">→</span>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card-light border-2 border-red-200 bg-red-50">
        <h2 className="text-2xl font-serif font-bold text-red-700 mb-6">Danger Zone</h2>

        <button className="px-6 py-3 border-2 border-red-500 text-red-600 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition">
          Delete Account
        </button>
        <p className="text-sm text-red-600 mt-2">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
      </div>
    </div>
  )
}
