"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, Volume2 } from "lucide-react"

interface VoiceDiscoveryProps {
  onComplete: (products: any[]) => void
}

export function VoiceDiscovery({ onComplete }: VoiceDiscoveryProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [visualization, setVisualization] = useState<number[]>(Array(20).fill(0))
  const [isProcessing, setIsProcessing] = useState(false)

  // Simulate voice input
  useEffect(() => {
    if (!isListening) return

    const interval = setInterval(() => {
      setVisualization((prev) => prev.map(() => Math.random() * 100))
    }, 100)

    // Simulate listening after 3 seconds
    const timer = setTimeout(() => {
      setTranscript("I am looking for handwoven textiles, preferably sarees with natural dyes in earth tones")
      setIsListening(false)
      setIsProcessing(true)

      // Simulate processing
      setTimeout(() => {
        const mockProducts = [
          { id: 1, name: "Hand-Woven Saree", price: 4500, image: "/placeholder.svg?key=voice1" },
          { id: 3, name: "Silk Shawl", price: 8900, image: "/placeholder.svg?key=voice2" },
          { id: 2, name: "Organic Cotton Dupatta", price: 2200, image: "/placeholder.svg?key=voice3" },
        ]
        onComplete(mockProducts)
      }, 2000)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [isListening, onComplete])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-12">
        {/* Voice Waveform */}
        <div className="space-y-8">
          <div className="flex items-end justify-center gap-1 h-48 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl p-8">
            {visualization.map((height, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-full transition-all duration-100"
                style={{ height: `${Math.max(height, 10)}%` }}
              />
            ))}
          </div>

          {/* Status */}
          <div className="text-center space-y-4">
            {isListening && (
              <div>
                <p className="text-lg font-semibold text-warm-charcoal">Listening...</p>
                <p className="text-warm-charcoal/60">Speak naturally about what you're looking for</p>
              </div>
            )}

            {transcript && !isProcessing && (
              <div>
                <p className="text-lg font-semibold text-warm-charcoal mb-2">Heard:</p>
                <div className="bg-white rounded-lg p-6 border-2 border-primary">
                  <p className="text-warm-charcoal italic">"{transcript}"</p>
                </div>
              </div>
            )}

            {isProcessing && (
              <div>
                <p className="text-lg font-semibold text-warm-charcoal mb-4">Finding perfect matches...</p>
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Microphone Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsListening(!isListening)}
            disabled={isProcessing}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
              isListening
                ? "bg-red-500 text-white shadow-lg shadow-red-500/50 scale-110"
                : isProcessing
                  ? "bg-primary/50 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-warm-rust shadow-lg hover:shadow-xl hover:scale-105"
            }`}
          >
            {isListening ? (
              <MicOff className="w-10 h-10" />
            ) : isProcessing ? (
              <Volume2 className="w-10 h-10" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-6 border border-border">
          <h3 className="font-semibold text-warm-charcoal mb-3">Tips for best results:</h3>
          <ul className="space-y-2 text-warm-charcoal/70 text-sm">
            <li>• Be specific about what you're looking for</li>
            <li>• Mention materials, colors, or style preferences</li>
            <li>• Tell us about the occasion or use case</li>
            <li>• Specify your budget if you have one</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
