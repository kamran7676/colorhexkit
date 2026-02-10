"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { hexToRgb, rgbToHex, rgbToHsv, hsvToRgb } from "@/lib/color-utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CustomPickerProps {
    color: string
    onChange: (color: string) => void
}

export function CustomPicker({ color, onChange }: CustomPickerProps) {
    const [hsv, setHsv] = useState({ h: 0, s: 0, v: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    // Initialize HSV from color prop
    useEffect(() => {
        const rgb = hexToRgb(color)
        if (rgb) {
            const newHsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
            // Only update if significantly different to avoid jitter during drag
            // But for simplicity, we update on prop change. 
            // To avoid loop, we could check difference, but standard pattern is fine.
            setHsv(newHsv)
        }
    }, [color])

    const handleSaturationChange = useCallback(
        (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
            if (!containerRef.current) return

            const { left, top, width, height } = containerRef.current.getBoundingClientRect()
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

            const x = Math.max(0, Math.min(1, (clientX - left) / width))
            const y = Math.max(0, Math.min(1, (clientY - top) / height))

            const newS = Math.round(x * 100)
            const newV = Math.round((1 - y) * 100)

            const newRgb = hsvToRgb(hsv.h, newS, newV)
            onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
        },
        [hsv.h, onChange]
    )

    // Mouse event handlers for Saturation Area
    const onMouseDownSaturation = (e: React.MouseEvent) => {
        e.preventDefault()
        handleSaturationChange(e)
        window.addEventListener("mousemove", handleMouseMoveSaturation)
        window.addEventListener("mouseup", handleMouseUpSaturation)
    }

    const handleMouseMoveSaturation = (e: MouseEvent) => {
        handleSaturationChange(e)
    }

    const handleMouseUpSaturation = () => {
        window.removeEventListener("mousemove", handleMouseMoveSaturation)
        window.removeEventListener("mouseup", handleMouseUpSaturation)
    }

    // Hue Slider Handler
    const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newH = parseInt(e.target.value)
        const newRgb = hsvToRgb(newH, hsv.s, hsv.v)
        onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
    }

    // RGB Inputs Handler
    const handleRgbInputChange = (channel: 'r' | 'g' | 'b', value: string) => {
        const rgb = hexToRgb(color) || { r: 0, g: 0, b: 0 }
        const intVal = parseInt(value)
        if (isNaN(intVal)) return

        const newRgb = { ...rgb, [channel]: Math.max(0, Math.min(255, intVal)) }
        onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
    }

    const rgb = hexToRgb(color) || { r: 0, g: 0, b: 0 }

    return (
        <div className="w-64 p-3 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl space-y-4">
            {/* Saturation/Brightness Area */}
            <div
                ref={containerRef}
                className="w-full h-40 rounded-lg relative cursor-crosshair overflow-hidden shadow-inner"
                style={{
                    backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
                    backgroundImage: `
                linear-gradient(to bottom, transparent, #000),
                linear-gradient(to right, #fff, transparent)
            `
                }}
                onMouseDown={onMouseDownSaturation}
            >
                <div
                    className="absolute w-4 h-4 rounded-full border-2 border-white shadow-sm -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        left: `${hsv.s}%`,
                        top: `${100 - hsv.v}%`,
                        backgroundColor: color
                    }}
                />
            </div>

            {/* Hue Slider */}
            <div className="space-y-2">
                <div className="h-4 rounded-full w-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-magenta-500 to-red-500" />
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={hsv.h}
                        onChange={handleHueChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {/* Custom Thumb Indicator */}
                    <div
                        className="absolute top-0 h-full w-2bg-white border-2 border-white shadow-sm rounded-full pointer-events-none"
                        style={{
                            left: `${(hsv.h / 360) * 100}%`,
                            transform: 'translateX(-50%)',
                            width: '8px',
                            height: '100%',
                            backgroundColor: 'white'
                        }}
                    />
                </div>
            </div>

            {/* RGB Inputs */}
            <div className="grid grid-cols-3 gap-2">
                {(['r', 'g', 'b'] as const).map(channel => (
                    <div key={channel} className="space-y-1">
                        <Label className="text-[10px] text-muted-foreground uppercase font-bold pl-1">{channel}</Label>
                        <Input
                            value={rgb[channel]}
                            onChange={(e) => handleRgbInputChange(channel, e.target.value)}
                            className="h-8 text-center text-xs font-mono bg-black/40 border-white/10 focus:border-white/20"
                        />
                    </div>
                ))}
            </div>

            {/* Hex Preview - Minimal */}
            <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <div className="w-8 h-8 rounded-md border border-white/10" style={{ backgroundColor: color }} />
                <span className="font-mono text-xs text-muted-foreground">{color}</span>
            </div>
        </div>
    )
}
