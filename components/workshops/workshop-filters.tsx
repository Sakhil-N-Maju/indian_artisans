"use client"

interface WorkshopFiltersProps {
  selectedRegion: string | null
  onRegionChange: (region: string | null) => void
  selectedCraft: string | null
  onCraftChange: (craft: string | null) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  duration: string | null
  onDurationChange: (duration: string | null) => void
}

const regions = [
  { id: "rajasthan", name: "Rajasthan" },
  { id: "uttar-pradesh", name: "Uttar Pradesh" },
  { id: "gujarat", name: "Gujarat" },
  { id: "karnataka", name: "Karnataka" },
  { id: "tamil-nadu", name: "Tamil Nadu" },
  { id: "bihar", name: "Bihar" },
]

const crafts = [
  { id: "weaving", name: "Hand-Weaving" },
  { id: "pottery", name: "Pottery" },
  { id: "jewelry", name: "Jewelry Making" },
  { id: "woodcraft", name: "Woodcraft" },
  { id: "metalwork", name: "Metalwork" },
  { id: "painting", name: "Painting" },
]

const durations = [
  { id: "half-day", name: "Half Day (3-4 hrs)" },
  { id: "full-day", name: "Full Day (6-8 hrs)" },
  { id: "2-3-days", name: "2-3 Days" },
  { id: "1-week", name: "1 Week" },
  { id: "extended", name: "Extended (2+ weeks)" },
]

export function WorkshopFilters({
  selectedRegion,
  onRegionChange,
  selectedCraft,
  onCraftChange,
  priceRange,
  onPriceChange,
  duration,
  onDurationChange,
}: WorkshopFiltersProps) {
  return (
    <div className="space-y-6 sm:space-y-8 sticky top-24">
      {/* Region */}
      <div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-warm-charcoal mb-3 sm:mb-4">Region</h3>
        <div className="space-y-2 sm:space-y-3">
          {regions.map((region) => (
            <label key={region.id} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
              <input
                type="radio"
                name="region"
                value={region.id}
                checked={selectedRegion === region.id}
                onChange={() => onRegionChange(region.id)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm sm:text-base text-warm-charcoal/70 group-hover:text-primary transition">
                {region.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Craft */}
      <div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-warm-charcoal mb-3 sm:mb-4">Craft</h3>
        <div className="space-y-2 sm:space-y-3">
          {crafts.map((craft) => (
            <label key={craft.id} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
              <input
                type="radio"
                name="craft"
                value={craft.id}
                checked={selectedCraft === craft.id}
                onChange={() => onCraftChange(craft.id)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm sm:text-base text-warm-charcoal/70 group-hover:text-primary transition">
                {craft.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-warm-charcoal mb-3 sm:mb-4">Duration</h3>
        <div className="space-y-2 sm:space-y-3">
          {durations.map((dur) => (
            <label key={dur.id} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
              <input
                type="radio"
                name="duration"
                value={dur.id}
                checked={duration === dur.id}
                onChange={() => onDurationChange(dur.id)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm sm:text-base text-warm-charcoal/70 group-hover:text-primary transition">
                {dur.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-base sm:text-lg font-serif font-bold text-warm-charcoal mb-3 sm:mb-4">Price Range</h3>
        <div className="space-y-3 sm:space-y-3">
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              value={priceRange[0]}
              onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
              className="w-20 sm:w-24 px-2 sm:px-3 py-2 text-sm sm:text-base border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Min"
            />
            <span className="text-warm-charcoal/60 text-sm sm:text-base">to</span>
            <input
              type="number"
              max="100000"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
              className="w-20 sm:w-24 px-2 sm:px-3 py-2 text-sm sm:text-base border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Max"
            />
          </div>
          <p className="text-xs sm:text-sm text-warm-charcoal/60">
            ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
