// components/shared/VideoBackground.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, motion } from "framer-motion"
import Image from "next/image"
import ParticleBackground from "../ParticleBackground"

interface VideoBackgroundProps {
  /** Path to the video file (e.g., "/videos/hero-video.mp4") */
  src: string
  /** Path to the poster image fallback (e.g., "/images/hero-poster.jpg") */
  poster?: string
  /** Accessibility title/aria-label for the video */
  title?: string
  /** Whether to show the gradient overlay (default: true) */
  overlay?: boolean
  /** Overlay opacity (default: 0.7) */
  overlayOpacity?: number
  /** Children components (e.g., HeroContent) */
  children?: React.ReactNode
}

export default function VideoBackground({
  src,
  poster,
  title = "Background video showcasing professional business environment, strategy meetings, and corporate growth",
  overlay = true,
  overlayOpacity = 0.7,
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldPlay, setShouldPlay] = useState(true)
  const [usePosterFallback, setUsePosterFallback] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    // Check for low bandwidth or reduced motion preferences
    const checkPlaybackConditions = () => {
      // Check for data saver mode
      const saveData =
        (navigator as any).connection?.saveData ||
        (navigator as any).mozConnection?.saveData ||
        (navigator as any).webkitConnection?.saveData

      // Check for prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      // Check connection type (slow connections)
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection
      const slowConnection =
        connection &&
        (connection.effectiveType === "slow-2g" ||
          connection.effectiveType === "2g")

      if (saveData || prefersReducedMotion || slowConnection) {
        setShouldPlay(false)
        setUsePosterFallback(true)
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }
    }

    // Initial check
    checkPlaybackConditions()

    // Listen for connection changes
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection
    if (connection) {
      connection.addEventListener("change", checkPlaybackConditions)
    }

    // Listen for prefers-reduced-motion changes
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setShouldPlay(false)
        setUsePosterFallback(true)
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }
    }
    mediaQuery.addEventListener("change", handleMotionChange)

    // Cleanup
    return () => {
      if (connection) {
        connection.removeEventListener("change", checkPlaybackConditions)
      }
      mediaQuery.removeEventListener("change", handleMotionChange)
    }
  }, [])

  // Handle video load error - fallback to poster
  const handleVideoError = () => {
    setUsePosterFallback(true)
    if (videoRef.current) {
      videoRef.current.style.display = "none"
    }
  }

  // Handle video loaded
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  // Lazy load video when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && !isVideoLoaded) {
            // Video will autoplay when loaded
            if (videoRef.current.readyState >= 2) {
              setIsVideoLoaded(true)
            }
          }
        })
      },
      { rootMargin: "50px" }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [isVideoLoaded])

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background with CSS fallback - Parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        {!usePosterFallback && shouldPlay ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={poster}
            aria-label={title}
            title={title}
            className="absolute inset-0 w-full h-full object-cover scale-105 sm:scale-100 md:scale-105 lg:scale-100 xl:scale-105 transition-transform duration-300"
            style={{ 
              objectFit: "cover", 
              width: "100%", 
              height: "100%",
              minWidth: "100%",
              minHeight: "100%",
            }}
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
          >
            <source src={src} type="video/mp4" />
            {/* Accessible captions/track for decorative video */}
            <track kind="captions" src="" srcLang="en" label="English" />
            {/* Fallback text for browsers that don't support video */}
            <p className="sr-only">
              Your browser does not support the video tag. Please update your
              browser or view the poster image instead.
            </p>
          </video>
        ) : (
          /* Poster image fallback */
          poster && (
            <Image
              src={poster}
              alt={title}
              fill
              priority={false}
              className="object-cover scale-105 sm:scale-100 md:scale-105 lg:scale-100 xl:scale-105 transition-transform duration-300"
              style={{ 
                objectFit: "cover",
              }}
              sizes="100vw"
              quality={85}
              aria-hidden={true}
            />
          )
        )}

        {/* Subtle overlay with 0.7 opacity */}
        {overlay && (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
            aria-hidden="true"
          />
        )}

        {/* Particle Background Effect */}
        <ParticleBackground />
      </motion.div>

      {/* Content slot for HeroContent component */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  )
}
