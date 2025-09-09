"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"
import ShaderControls from "./shader-controls"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  const [speed, setSpeed] = useState(0.4)
  const [overlayOpacity, setOverlayOpacity] = useState(0.5)
  const [colors, setColors] = useState(["#050505", "#4338ca", "#ca8a04", "#be185d", "#0891b2"])

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
  }

  const handleOpacityChange = (newOpacity: number) => {
    setOverlayOpacity(newOpacity)
  }

  const handleColorChange = (colorIndex: number, newColor: string) => {
    const newColors = [...colors]
    newColors[colorIndex] = newColor
    setColors(newColors)
  }

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="bg-black relative">
      {/* Shader Controls - Hidden
      <ShaderControls
        onSpeedChange={handleSpeedChange}
        onOpacityChange={handleOpacityChange}
        onColorChange={handleColorChange}
        speed={speed}
        opacity={overlayOpacity}
        colors={colors}
      />
      */}

      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Fixed Background Shaders */}
      <div className="fixed inset-0 pointer-events-none">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={colors}
          speed={speed}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          style={{ opacity: overlayOpacity }}
          colors={["#000000", "#1a1a1a", "#6b46c1", "#000000"]}
          speed={speed * 0.67} // Made second layer speed relative to main speed
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}