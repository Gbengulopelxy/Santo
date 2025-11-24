// components/sections/HeroSection.tsx
"use client"

import VideoBackground from "@/components/shared/VideoBackground"
import HeroContent from "@/components/HeroContent"
import HeroSocialBanner from "@/components/sections/HeroSocialBanner"

interface HeroSectionProps {
  videoSrc?: string
  poster?: string
  title?: string
  overlay?: boolean
  overlayOpacity?: number
}

export default function HeroSection({
  videoSrc = "/videos/Hero4.mp4",
  poster = "/images/hero-poster.png",
  title = "Background video showcasing professional business environment, strategy meetings, and corporate growth",
  overlay = true,
  overlayOpacity = 0.7,
}: HeroSectionProps) {
  return (
    <VideoBackground
      src={videoSrc}
      poster={poster}
      title={title}
      overlay={overlay}
      overlayOpacity={overlayOpacity}
    >
      <HeroContent />
      <HeroSocialBanner />
    </VideoBackground>
  )
}

