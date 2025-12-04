import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _lora = localFont({
  src: "../public/fonts/Lora-VariableFont_wght.ttf",
  variable: "--font-serif",
  weight: "400 700",
})
const _inter = localFont({
  src: "../public/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Artisans of India | Celebrate Handcrafted Heritage",
  description:
    "Discover authentic handmade products from Indian artisans. Experience voice-guided discovery, workshops, and stories of skilled craftspeople.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_inter.variable} ${_lora.variable} font-sans antialiased bg-warm-cream text-warm-charcoal`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
