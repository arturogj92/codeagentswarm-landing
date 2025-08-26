"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, X } from "lucide-react"

interface ShaderControlsProps {
  onSpeedChange: (speed: number) => void
  onOpacityChange: (opacity: number) => void
  onColorChange: (colorIndex: number, color: string) => void
  speed: number
  opacity: number
  colors: string[]
}

export default function ShaderControls({
  onSpeedChange,
  onOpacityChange,
  onColorChange,
  speed,
  opacity,
  colors,
}: ShaderControlsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const presetColors = [
    "#000000",
    "#ffffff",
    "#8b5cf6",
    "#1e1b4b",
    "#4c1d95",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
  ]

  return (
    <>
      {/* Controls Panel */}
      {isOpen && (
        <Card className="fixed top-32 right-4 z-40 w-80 bg-black/80 backdrop-blur-sm border border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-lg">Shader Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Speed Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Animation Speed: {speed.toFixed(1)}</label>
              <Slider
                value={[speed]}
                onValueChange={(value) => onSpeedChange(value[0])}
                min={0.1}
                max={2.0}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Opacity Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Overlay Opacity: {Math.round(opacity * 100)}%</label>
              <Slider
                value={[opacity]}
                onValueChange={(value) => onOpacityChange(value[0])}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Color Controls */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Colors</label>
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs w-8">#{index + 1}</span>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => onColorChange(index, e.target.value)}
                    className="w-8 h-8 rounded border border-white/20 bg-transparent cursor-pointer"
                  />
                  <div className="flex gap-1 flex-wrap">
                    {presetColors.map((presetColor) => (
                      <button
                        key={presetColor}
                        onClick={() => onColorChange(index, presetColor)}
                        className="w-4 h-4 rounded border border-white/20 hover:scale-110 transition-transform"
                        style={{ backgroundColor: presetColor }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Reset Button */}
            <Button
              onClick={() => {
                onSpeedChange(0.3)
                onOpacityChange(0.6)
                const defaultColors = ["#0a0a0a", "#6366f1", "#8b5cf6", "#ec4899", "#06b6d4"]
                defaultColors.forEach((color, index) => onColorChange(index, color))
              }}
              variant="outline"
              className="w-full bg-white/10 border-white/20 hover:bg-white/20"
            >
              Reset to Default
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 z-50 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
        size="icon"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
      </Button>
    </>
  )
}