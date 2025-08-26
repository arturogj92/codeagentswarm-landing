"use client"

import { PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

export default function PulsingCircle() {
  return (
    <div className="fixed bottom-8 right-8 z-30">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Pulsing Border Circle with CodeAgentSwarm colors */}
        <PulsingBorder
          colors={["#fbbf24", "#6366f1", "#ec4899", "#06b6d4", "#8b5cf6", "#fbbf24", "#10b981"]}
          colorBack="#00000000"
          speed={1.5}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={5}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.5}
          smokeSize={4}
          scale={0.65}
          rotation={0}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        />

        {/* CodeAgentSwarm Logo in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="CodeAgentSwarm" 
            className="w-8 h-8 object-contain"
          />
        </div>

        {/* Rotating Text Around the Pulsing Border */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-sm fill-white/80">
            <textPath href="#circle" startOffset="0%">
              CodeAgentSwarm • CodeAgentSwarm •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}