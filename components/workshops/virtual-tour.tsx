"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Volume2, 
  VolumeX,
  Info,
  MapPin,
  Camera
} from "lucide-react"

interface VirtualTourStop {
  id: string
  title: string
  description: string
  image: string
  hotspots?: {
    x: number // percentage
    y: number // percentage
    label: string
    info: string
  }[]
}

interface VirtualTourProps {
  title: string
  location: string
  stops: VirtualTourStop[]
  autoPlay?: boolean
}

export function VirtualTour({ title, location, stops, autoPlay = false }: VirtualTourProps) {
  const [currentStop, setCurrentStop] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStop((prev) => (prev + 1) % stops.length)
      }, 5000) // Change stop every 5 seconds

      return () => clearInterval(interval)
    }
  }, [isPlaying, stops.length])

  const handlePrevious = () => {
    setCurrentStop((prev) => (prev - 1 + stops.length) % stops.length)
  }

  const handleNext = () => {
    setCurrentStop((prev) => (prev + 1) % stops.length)
  }

  const handleReset = () => {
    setCurrentStop(0)
    setIsPlaying(false)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const currentStopData = stops[currentStop]

  return (
    <Card className="overflow-hidden">
      <div ref={containerRef} className="relative bg-black">
        {/* Main Tour Image */}
        <div className="relative aspect-video bg-gray-900">
          <img
            src={currentStopData.image}
            alt={currentStopData.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {/* Hotspots */}
          {currentStopData.hotspots?.map((hotspot, index) => (
            <button
              key={index}
              onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
              className="absolute w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform cursor-pointer animate-pulse"
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Info className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </button>
          ))}

          {/* Hotspot Info Panel */}
          {selectedHotspot !== null && currentStopData.hotspots && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-white rounded-lg shadow-2xl p-4 animate-in slide-in-from-bottom-4">
              <h4 className="font-semibold text-lg mb-2">
                {currentStopData.hotspots[selectedHotspot].label}
              </h4>
              <p className="text-sm text-gray-600">
                {currentStopData.hotspots[selectedHotspot].info}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => setSelectedHotspot(null)}
              >
                Close
              </Button>
            </div>
          )}

          {/* Tour Info Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
              <h3 className="font-semibold text-lg">{title}</h3>
              <div className="flex items-center gap-2 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>
            <Badge variant="secondary" className="bg-black/70 backdrop-blur-sm text-white border-white/20">
              <Camera className="w-3 h-3 mr-1" />
              360° View
            </Badge>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {stops.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStop(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStop 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-white/50 w-2 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:bg-white/10"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                className="text-white hover:bg-white/10"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="text-white hover:bg-white/10"
                >
                  ←
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="text-white hover:bg-white/10"
                >
                  →
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/10"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/10"
              >
                <Maximize2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Stop Information */}
          <div>
            <h4 className="font-semibold mb-1">
              {currentStop + 1}. {currentStopData.title}
            </h4>
            <p className="text-sm text-gray-300">
              {currentStopData.description}
            </p>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="bg-gray-800 p-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {stops.map((stop, index) => (
              <button
                key={stop.id}
                onClick={() => setCurrentStop(index)}
                className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all ${
                  index === currentStop 
                    ? 'ring-2 ring-orange-500' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={stop.image}
                  alt={stop.title}
                  className="w-24 h-16 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-1 left-1 text-xs text-white font-medium">
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
