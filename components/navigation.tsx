"use client"

import Link from "next/link"
import { Menu, X, Search, Heart, ShoppingCart, User } from "lucide-react"
import { useState } from "react"

interface NavigationProps {
  scrolled: boolean
}

export function Navigation({ scrolled }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-warm-cream"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">꿀</span>
            </div>
            <Link href="/" className="text-2xl font-serif font-bold text-warm-charcoal hidden sm:block">
              Artisans of India
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-sm font-medium text-warm-charcoal hover:text-primary transition">
              Shop
            </Link>
            <Link href="/artisans" className="text-sm font-medium text-warm-charcoal hover:text-primary transition">
              Artisans
            </Link>
            <Link href="/workshops" className="text-sm font-medium text-warm-charcoal hover:text-primary transition">
              Workshops
            </Link>
            <Link href="/about" className="text-sm font-medium text-warm-charcoal hover:text-primary transition">
              About
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-warm-sand rounded-lg transition hidden sm:block">
              <Search className="w-5 h-5 text-warm-charcoal" />
            </button>
            <Link href="/favorites" className="p-2 hover:bg-warm-sand rounded-lg transition hidden sm:flex">
              <Heart className="w-5 h-5 text-warm-charcoal" />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-warm-sand rounded-lg transition hidden sm:block relative">
              <ShoppingCart className="w-5 h-5 text-warm-charcoal" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Link>
            <Link href="/profile" className="p-2 hover:bg-warm-sand rounded-lg transition hidden sm:block">
              <User className="w-5 h-5 text-warm-charcoal" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 hover:bg-warm-sand rounded-lg transition"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border space-y-2">
            <Link href="/shop" className="block px-4 py-2 text-sm hover:bg-warm-sand rounded transition">
              Shop
            </Link>
            <Link href="/artisans" className="block px-4 py-2 text-sm hover:bg-warm-sand rounded transition">
              Artisans
            </Link>
            <Link href="/workshops" className="block px-4 py-2 text-sm hover:bg-warm-sand rounded transition">
              Workshops
            </Link>
            <Link href="/about" className="block px-4 py-2 text-sm hover:bg-warm-sand rounded transition">
              About
            </Link>
            <Link href="/favorites" className="block px-4 py-2 text-sm hover:bg-warm-sand rounded transition">
              Favorites
            </Link>
            <Link href="/cart" className="block px-4 py-2 text-sm hover:bg-warm-sand rounded transition">
              Cart
            </Link>
            <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-warm-sand rounded transition">
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
