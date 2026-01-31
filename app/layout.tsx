import type React from "react"
import type { Metadata } from "next"
import { Geist, Manrope, Outfit } from "next/font/google"
import "./globals.css"
import MobileActionBar from "@/component/mobile-bar"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Nypuniya Aesthetic Clinic",
  description:
    "Only The Best For You.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/logo-web.png", sizes: "16x16", type: "image/png" },
      { url: "/logo-web.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-web.png", sizes: "48x48", type: "image/png" },
      { url: "/logo-web.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-web.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/logo-web.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/logo-web.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable} ${outfit.variable} antialiased`}
    >
      <head />
      <body className="--font-outfit">{children}
        <MobileActionBar />
      </body>
    </html>
  )
}
