'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { useParams } from 'next/navigation';
import { Clock, Users, MapPin, Heart, Share2, Check } from 'lucide-react';

export default function WorkshopDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [scrolled, setScrolled] = useState(false);

  const workshop = {
    id: Number.parseInt(id),
    name: 'Hand-Weaving Masterclass with Priya Sharma',
    artisan: 'Priya Sharma',
    location: 'Jaipur, Rajasthan',
    image: '/placeholder.svg?key=workshop-detail',
    gallery: [
      '/placeholder.svg?key=wdetail1',
      '/placeholder.svg?key=wdetail2',
      '/placeholder.svg?key=wdetail3',
    ],
    rating: 4.9,
    reviews: 234,
    price: 8500,
    duration: 'Full Day (8 hours)',
    groupSize: 8,
    language: 'English & Hindi',
    startDate: 'Dec 15, 2025',
    schedule: [
      { time: '9:00 AM - 10:30 AM', activity: 'Introduction & Thread Selection' },
      { time: '10:30 AM - 12:30 PM', activity: 'Loom Setup & Basic Techniques' },
      { time: '12:30 PM - 1:30 PM', activity: 'Lunch Break' },
      { time: '1:30 PM - 4:00 PM', activity: 'Hands-on Weaving Practice' },
      { time: '4:00 PM - 5:00 PM', activity: 'Q&A & Certificate Ceremony' },
    ],
    includes: [
      'All materials and equipment',
      'Professional instruction from master weaver',
      'Lunch & refreshments',
      'Certificate of completion',
      'Take-home woven sample',
      'Photo memory collection',
      'Access to artisan community',
    ],
    whatToBring: ['Comfortable clothing', 'Closed-toe shoes', 'Water bottle', 'Camera (optional)'],
    description: `
      Learn the ancient art of hand-weaving from Priya Sharma, a master weaver with over 35 years of experience. This immersive full-day workshop takes you through the complete hand-weaving process, from thread selection to creating your first woven piece.

      In this hands-on session, you'll work directly on traditional looms, experiencing the same techniques that have been perfected over generations. Priya will guide you through the meditative practice of weaving while sharing stories of her craft, the significance of traditional patterns, and the philosophy behind each weave.

      This is not just a workshop—it's a cultural immersion that connects you to centuries of Indian textile heritage. Whether you're a complete beginner or have some experience, this workshop is designed to be both accessible and enriching.
    `,
    highlights: [
      'Work with traditional looms',
      'Learn from a decorated master craftsperson',
      'Create your own woven piece',
      'Understand natural dye processes',
      'Connect with a global community of artisans',
    ],
  };

  return (
    <main className="bg-warm-cream min-h-screen">
      <Navigation scrolled={scrolled} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            <div className="bg-warm-sand aspect-square overflow-hidden rounded-2xl">
              <img
                src={workshop.image || '/placeholder.svg'}
                alt={workshop.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {workshop.gallery.map((img, idx) => (
                <button
                  key={idx}
                  className="border-primary aspect-square overflow-hidden rounded-lg border-2 transition hover:scale-105"
                >
                  <img
                    src={img || '/placeholder.svg'}
                    alt={`Gallery ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-secondary mb-2 text-sm font-semibold tracking-wide uppercase">
                Hand-Weaving
              </p>
              <h1 className="text-warm-charcoal mb-3 font-serif text-4xl font-bold">
                {workshop.name}
              </h1>
              <p className="text-warm-charcoal/70">By {workshop.artisan}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(workshop.rating)
                        ? 'text-xl text-yellow-400'
                        : 'text-warm-charcoal/20 text-xl'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-warm-charcoal/60">{workshop.reviews} reviews</span>
            </div>

            {/* Details Grid */}
            <div className="bg-warm-sand/50 grid grid-cols-2 gap-4 rounded-lg p-4">
              <div>
                <p className="text-warm-charcoal/60 mb-1 text-sm">Duration</p>
                <p className="text-warm-charcoal flex items-center gap-2 font-semibold">
                  <Clock className="h-4 w-4" />
                  {workshop.duration}
                </p>
              </div>
              <div>
                <p className="text-warm-charcoal/60 mb-1 text-sm">Group Size</p>
                <p className="text-warm-charcoal flex items-center gap-2 font-semibold">
                  <Users className="h-4 w-4" />
                  Max {workshop.groupSize}
                </p>
              </div>
              <div>
                <p className="text-warm-charcoal/60 mb-1 text-sm">Location</p>
                <p className="text-warm-charcoal flex items-center gap-2 font-semibold">
                  <MapPin className="h-4 w-4" />
                  {workshop.location}
                </p>
              </div>
              <div>
                <p className="text-warm-charcoal/60 mb-1 text-sm">Language</p>
                <p className="text-warm-charcoal font-semibold">{workshop.language}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-warm-charcoal/70 leading-relaxed">{workshop.description}</p>

            {/* Action Buttons */}
            <div className="border-border space-y-3 border-t pt-6">
              <div className="text-primary text-3xl font-bold">
                ₹{workshop.price.toLocaleString()}
              </div>
              <button className="bg-primary hover:bg-warm-rust w-full rounded-lg py-4 font-semibold text-white transition">
                Book This Workshop
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="border-primary text-primary hover:bg-primary flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 font-semibold transition hover:text-white"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Saved' : 'Save'}
                </button>
                <button className="border-border text-warm-charcoal hover:bg-warm-sand flex flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 font-semibold transition">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Info */}
        <div className="mb-12 grid gap-12 md:grid-cols-2">
          {/* Schedule */}
          <div className="card-light">
            <h2 className="text-warm-charcoal mb-6 font-serif text-2xl font-bold">
              Daily Schedule
            </h2>
            <div className="space-y-4">
              {workshop.schedule.map((item, idx) => (
                <div key={idx} className="border-primary border-l-4 pl-4">
                  <p className="text-warm-charcoal font-semibold">{item.time}</p>
                  <p className="text-warm-charcoal/70 text-sm">{item.activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div className="card-light">
            <h2 className="text-warm-charcoal mb-6 font-serif text-2xl font-bold">
              What&apos;s Included
            </h2>
            <div className="mb-8 space-y-3">
              {workshop.includes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-warm-charcoal/70">{item}</span>
                </div>
              ))}
            </div>

            <div className="border-border border-t pt-6">
              <h3 className="text-warm-charcoal mb-3 font-bold">What to Bring</h3>
              <ul className="text-warm-charcoal/70 space-y-2 text-sm">
                {workshop.whatToBring.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="card-light mb-12">
          <h2 className="text-warm-charcoal mb-6 font-serif text-2xl font-bold">Highlights</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {workshop.highlights.map((highlight, idx) => (
              <div key={idx} className="bg-primary/5 rounded-lg p-4">
                <p className="text-warm-charcoal font-semibold">{highlight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="card-light">
          <h2 className="text-warm-charcoal mb-6 font-serif text-2xl font-bold">Guest Reviews</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="border-border border-b pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <img
                    src={`/ceholder-svg-key-reviewer.jpg?key=reviewer${idx}`}
                    alt="Reviewer"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-warm-charcoal font-semibold">Guest Reviewer {idx}</h3>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-sm text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-warm-charcoal/70">
                      An absolutely transformative experience! Priya&apos;s patience and expertise
                      made it perfect for beginners while still challenging. Highly recommended!
                    </p>
                    <p className="text-warm-charcoal/60 mt-2 text-xs">1 week ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
