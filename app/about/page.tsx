"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, Users, Globe, Zap, Award, Target } from "lucide-react"

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)

  const values = [
    {
      icon: Heart,
      title: "Authentic",
      description:
        "Every product is handcrafted by skilled artisans using traditional techniques passed down through generations.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We empower artisans by providing direct market access, fair prices, and recognition for their craft.",
    },
    {
      icon: Globe,
      title: "Sustainable",
      description:
        "Supporting traditional crafts helps preserve cultural heritage and promotes sustainable, ethical production.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We blend traditional craftsmanship with modern technology to create unique, timeless products.",
    },
  ]

  const stats = [
    { number: "2,340+", label: "Artisans Connected" },
    { number: "45,000+", label: "Products Available" },
    { number: "185", label: "Countries Served" },
    { number: "98%", label: "Customer Satisfaction" },
  ]

  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      bio: "Passionate about preserving Indian heritage crafts and connecting artisans with global markets.",
      image: "/smiling-woman.png",
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Artisan Relations",
      bio: "Works directly with artisan communities to ensure fair practices and sustainable growth.",
      image: "/man-professional.jpg",
    },
    {
      name: "Amisha Patel",
      role: "Creative Director",
      bio: "Curates collections that celebrate the beauty and diversity of Indian craftsmanship.",
      image: "/woman-creative.jpg",
    },
    {
      name: "Vikram Singh",
      role: "Operations Lead",
      bio: "Ensures seamless logistics and delivery of artisan products to customers worldwide.",
      image: "/man-operations.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-warm-cream">
      <Navigation scrolled={scrolled} />

      {/* Hero Banner */}
      <section className="relative h-96 bg-gradient-to-br from-primary/15 to-secondary/15 overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-serif font-bold text-warm-charcoal">About Artisans of India</h1>
            <p className="text-lg text-warm-charcoal/70">
              A platform dedicated to connecting the world with authentic handcrafted products from India's most
              talented artisans.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-warm-charcoal mb-6">Our Story</h2>
              <div className="space-y-4 text-warm-charcoal/70">
                <p>
                  Founded in 2019, Artisans of India began with a simple mission: to preserve and celebrate the rich
                  cultural heritage of Indian handcrafts while creating sustainable livelihoods for artisans.
                </p>
                <p>
                  What started as a small initiative connecting 50 artisans has grown into a thriving community of over
                  2,340 skilled craftspeople across 18 states of India, reaching customers in more than 185 countries.
                </p>
                <p>
                  We believe that every handcrafted product tells a story of tradition, skill, and passion. Our platform
                  exists to ensure that artisans receive fair compensation, recognition, and the opportunity to grow
                  their businesses while preserving their craft for future generations.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md border border-border">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-charcoal mb-2">Our Mission</h3>
                    <p className="text-sm text-warm-charcoal/60">
                      Empower artisans by connecting them with global markets while preserving India's cultural
                      heritage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary/10 rounded-lg flex-shrink-0">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-charcoal mb-2">Our Vision</h3>
                    <p className="text-sm text-warm-charcoal/60">
                      To create a world where traditional crafts thrive in the modern economy and artisans are valued as
                      cultural ambassadors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold text-warm-charcoal mb-12 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-border text-center">
                <p className="text-3xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-sm text-warm-charcoal/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold text-warm-charcoal mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition"
                >
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-warm-charcoal mb-3">{value.title}</h3>
                  <p className="text-sm text-warm-charcoal/60">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <h2 className="text-4xl font-serif font-bold text-warm-charcoal mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition"
              >
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-semibold text-warm-charcoal mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-warm-charcoal/60">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-12 mb-20">
          <h2 className="text-3xl font-serif font-bold text-warm-charcoal mb-8 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-warm-charcoal text-lg">Artisan Empowerment</h3>
              <p className="text-warm-charcoal/70">
                We've helped artisans increase their income by an average of 45%, provided business training to over 500
                craftspeople, and created direct market access for traditional crafts.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-warm-charcoal text-lg">Cultural Preservation</h3>
              <p className="text-warm-charcoal/70">
                By supporting traditional crafts, we're helping preserve dying art forms and ensuring that cultural
                knowledge is passed to the next generation of artisans.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-warm-charcoal text-lg">Community Growth</h3>
              <p className="text-warm-charcoal/70">
                Our workshops and apprenticeship programs have trained over 800 individuals, creating new opportunities
                and strengthening artisan communities across India.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6 mb-20">
          <h2 className="text-3xl font-serif font-bold text-warm-charcoal">Join Our Community</h2>
          <p className="text-lg text-warm-charcoal/70 max-w-2xl mx-auto">
            Whether you're a conscious consumer, an aspiring artisan, or a collector of authentic crafts, there's a
            place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition">
              Start Shopping
            </button>
            <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition">
              Learn to Craft
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
