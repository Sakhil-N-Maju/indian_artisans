'use client';

import { ArtisanCard } from '@/components/artisan-card';

interface Artisan {
  id: number;
  name: string;
  craft: string;
  location: string;
  region: string;
  image: string;
  rating: number;
  reviews: number;
  followers: number;
  productsCount: number;
  yearsExperience: number;
  bio: string;
  verified: boolean;
  responseTime: string;
}

const artisans: Artisan[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    craft: 'Weaving',
    location: 'Jaipur, Rajasthan',
    region: 'rajasthan',
    image: '/placeholder.svg?key=artisan1',
    rating: 4.9,
    reviews: 342,
    followers: 2850,
    productsCount: 156,
    yearsExperience: 35,
    bio: 'Master weaver with 35+ years of experience in traditional saree making. Uses natural dyes and preserves ancient weaving techniques.',
    verified: true,
    responseTime: 'Within 2 hours',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    craft: 'Pottery',
    location: 'Khurja, Uttar Pradesh',
    region: 'uttar-pradesh',
    image: '/placeholder.svg?key=artisan2',
    rating: 4.8,
    reviews: 278,
    followers: 1920,
    productsCount: 89,
    yearsExperience: 28,
    bio: 'Award-winning ceramics artist specializing in traditional blue pottery. Each piece is handcrafted with authentic techniques passed down through generations.',
    verified: true,
    responseTime: 'Within 4 hours',
  },
  {
    id: 3,
    name: 'Meera Patel',
    craft: 'Jewelry',
    location: 'Ahmedabad, Gujarat',
    region: 'gujarat',
    image: '/placeholder.svg?key=artisan3',
    rating: 4.9,
    reviews: 456,
    followers: 3420,
    productsCount: 234,
    yearsExperience: 22,
    bio: 'Contemporary Kundan and Meenakari jewelry designer. Blends traditional craftsmanship with modern design aesthetics.',
    verified: true,
    responseTime: 'Within 1 hour',
  },
  {
    id: 4,
    name: 'Kumar Woodcraft',
    craft: 'Woodcraft',
    location: 'Bangalore, Karnataka',
    region: 'karnataka',
    image: '/placeholder.svg?key=artisan4',
    rating: 4.7,
    reviews: 201,
    followers: 1650,
    productsCount: 127,
    yearsExperience: 30,
    bio: 'Skilled woodcarver working with traditional Indian timber. Specializes in intricate inlay work and decorative panels.',
    verified: true,
    responseTime: 'Within 3 hours',
  },
  {
    id: 5,
    name: 'Anita Singh',
    craft: 'Painting',
    location: 'Madhubani, Bihar',
    region: 'bihar',
    image: '/placeholder.svg?key=artisan5',
    rating: 4.8,
    reviews: 312,
    followers: 2340,
    productsCount: 198,
    yearsExperience: 26,
    bio: 'Renowned Madhubani artist preserving ancient art forms. Uses natural pigments and teaches the craft to younger generation.',
    verified: true,
    responseTime: 'Within 5 hours',
  },
  {
    id: 6,
    name: 'Mohan Lal',
    craft: 'Metalwork',
    location: 'Moradabad, Uttar Pradesh',
    region: 'uttar-pradesh',
    image: '/placeholder.svg?key=artisan6',
    rating: 4.6,
    reviews: 189,
    followers: 1420,
    productsCount: 156,
    yearsExperience: 32,
    bio: 'Expert in brass and copper metalwork. Creates functional art pieces using traditional techniques and sustainable materials.',
    verified: true,
    responseTime: 'Within 6 hours',
  },
  {
    id: 7,
    name: 'Lakshmi Devi',
    craft: 'Weaving',
    location: 'Varanasi, Uttar Pradesh',
    region: 'uttar-pradesh',
    image: '/placeholder.svg?key=artisan7',
    rating: 4.7,
    reviews: 267,
    followers: 2100,
    productsCount: 143,
    yearsExperience: 31,
    bio: 'Master silk weaver from the banks of Ganges. Creates exquisite silk sarees with traditional Varanasi weaving methods.',
    verified: true,
    responseTime: 'Within 2 hours',
  },
  {
    id: 8,
    name: 'Deepak Nair',
    craft: 'Pottery',
    location: 'Chennai, Tamil Nadu',
    region: 'tamil-nadu',
    image: '/placeholder.svg?key=artisan8',
    rating: 4.8,
    reviews: 298,
    followers: 2650,
    productsCount: 176,
    yearsExperience: 24,
    bio: 'Contemporary potter blending traditional Tamil pottery with modern minimalist designs. Uses sustainable clay sourcing.',
    verified: true,
    responseTime: 'Within 3 hours',
  },
];

interface ArtisanDirectoryProps {
  searchQuery: string;
  craft: string | null;
  region: string | null;
}

export function ArtisanDirectory({ searchQuery, craft, region }: ArtisanDirectoryProps) {
  const filteredArtisans = artisans.filter((artisan) => {
    if (searchQuery && !artisan.name.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    if (craft && artisan.craft.toLowerCase() !== craft.toLowerCase()) return false;
    if (region && artisan.region !== region) return false;
    return true;
  });

  return (
    <div>
      <div className="text-warm-charcoal/60 mb-8">
        Found {filteredArtisans.length} artisan{filteredArtisans.length !== 1 ? 's' : ''}
      </div>

      {filteredArtisans.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-warm-charcoal/60 text-lg">No artisans found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      )}
    </div>
  );
}
