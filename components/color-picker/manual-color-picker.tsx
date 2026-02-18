"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Copy,
  Download,
  Plus,
  Minus,
  RefreshCcw,
  Check,
  ChevronDown,
  Palette
} from "lucide-react"
import { toast } from "sonner"
import {
  generateSmartScale,
  getColorName,
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hexToOklch
} from "@/lib/color-utils"
import { useColorStore } from "@/hooks/use-color-store"
import { cn } from "@/lib/utils"
import { CodeHighlighter } from "@/components/ui/code-highlighter"

export default function ManualColorPicker() {
  const { color, setColor } = useColorStore()

  // Local state for hex input
  const [localHex, setLocalHex] = useState(color)

  useEffect(() => {
    setLocalHex(color.toUpperCase())
  }, [color])

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase()
    setLocalHex(val)

    // Validate and update if valid hex
    if (/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(val)) {
      setColor(val.startsWith('#') ? val : '#' + val)
    }
  }

  // Configuration State
  const [algorithm, setAlgorithm] = useState("tailwind")
  const [contrastShift, setContrastShift] = useState(0)
  const [shadeCount, setShadeCount] = useState(11)
  const [namingPattern, setNamingPattern] = useState("standard") // standard (50..950), numeric (1..n)

  // Display State
  const [isCopied, setIsCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("css") // css, tailwind, tokens
  const [codeFormat, setCodeFormat] = useState("hex") // hex, rgb, hsl, oklch

  // Derived State
  const shades = useMemo(() => {
    const scale = generateSmartScale(color, shadeCount, contrastShift)

    if (namingPattern === 'numeric') {
      return scale.map((s, i) => ({ ...s, label: i + 1 }))
    }
    if (namingPattern === 'tens') {
      return scale.map((s, i) => ({ ...s, label: (i + 1) * 10 }))
    }
    if (namingPattern === 'standard') {
      return scale.map((s, i) => {
        const val = 50 + (900 - 50) * (i / Math.max(1, scale.length - 1))
        return { ...s, label: Math.round(val / 10) * 10 }
      })
    }

    return scale
  }, [color, shadeCount, contrastShift, namingPattern])

  const colorName = useMemo(() => getColorName(color), [color])

  const hsl = useMemo(() => {
    const rgb = hexToRgb(color)
    return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 }
  }, [color])

  // Effects
  useEffect(() => {
    if (algorithm === 'radix') {
      setShadeCount(12)
      setNamingPattern('numeric')
    } else if (algorithm === 'tailwind') {
      setShadeCount(11)
      setNamingPattern('standard')
    }
  }, [algorithm])

  // Handlers
  const handleHslChange = (channel: 'h' | 's' | 'l', value: number) => {
    let newHsl = { ...hsl, [channel]: value }
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setIsCopied(false), 2000)
  }

  const getCodeSnippet = () => {
    const formatColor = (hex: string) => {
      if (codeFormat === 'hex') return hex
      const rgb = hexToRgb(hex)
      if (!rgb) return hex

      if (codeFormat === 'rgba') return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`

      if (codeFormat === 'hsl') {
        const h = rgbToHsl(rgb.r, rgb.g, rgb.b)
        return `hsl(${h.h}, ${h.s}%, ${h.l}%)`
      }

      if (codeFormat === 'oklch') {
        const oklch = hexToOklch(hex)
        if (!oklch) return hex
        return `oklch(${oklch.l} ${oklch.c} ${oklch.h})`
      }

      return hex // fallback
    }

    const toCamelCase = (str: string) => {
      return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
    }

    const variableName = colorName.toLowerCase().replace(/\s+/g, '-')
    const variableNameCamel = toCamelCase(colorName)

    if (activeTab === 'css') {
      return `:root {\n${shades.map(s => `  --${variableName}-${s.label}: ${formatColor(s.hex)};`).join('\n')}\n}`
    }
    if (activeTab === 'tailwind') {
      return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        '${variableName}': {\n${shades.map(s => `          '${s.label}': '${formatColor(s.hex)}',`).join('\n')}\n        },\n      }\n    }\n  }\n}`
    }
    if (activeTab === 'tokens') {
      const jsonStructure = {
        tokens: {
          color: {
            [variableNameCamel]: shades.reduce((acc, s) => ({
              ...acc,
              [s.label]: {
                value: formatColor(s.hex),
                type: "color"
              }
            }), {})
          }
        }
      }
      return JSON.stringify(jsonStructure, null, 2)
    }
    return ''
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Top Control Panel */}
      <Card className="p-6 md:p-8 rounded-[2rem] border-border/40 bg-background/60 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">

          {/* Color Display & HSL Sliders */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Large Color Block */}
              <div
                className="w-full sm:w-32 aspect-square sm:aspect-auto sm:h-32 rounded-2xl shadow-inner border border-white/10 relative overflow-hidden group transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
              </div>

              {/* HSL Sliders */}
              <div className="flex-1 w-full space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="relative">
                      <Input
                        value={localHex}
                        onChange={handleHexChange}
                        maxLength={7}
                        className="text-2xl font-bold font-mono tracking-tight h-auto p-0 border-none bg-transparent focus-visible:ring-0 w-[140px] uppercase placeholder:text-muted/50 shadow-none hover:bg-transparent"
                        placeholder="#000000"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
                      {colorName} <Badge variant="secondary" className="text-[10px] h-5">HSL</Badge>
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'H', value: hsl.h, max: 360, bg: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' },
                    { label: 'S', value: hsl.s, max: 100, bg: 'linear-gradient(to right, #808080, #ff0000)' }, // Simplified gradient
                    { label: 'L', value: hsl.l, max: 100, bg: 'linear-gradient(to right, #000, #fff)' }
                  ].map((channel, i) => (
                    <div key={channel.label} className="flex items-center gap-4">
                      <span className="w-8 text-xs font-bold text-muted-foreground font-mono">{channel.label} {channel.value}</span>
                      <div className="relative flex-1 h-6 flex items-center">
                        <div
                          className="absolute inset-x-0 h-2 rounded-full opacity-80"
                          style={{ background: channel.bg }}
                        />
                        <input
                          type="range"
                          min="0"
                          max={channel.max}
                          value={channel.value}
                          onChange={(e) => handleHslChange(channel.label.toLowerCase() as any, Number(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div
                          className="absolute h-5 w-5 bg-white rounded-full shadow-md border border-black/10 pointer-events-none transition-transform active:scale-95"
                          style={{ left: `calc(${(channel.value / channel.max) * 100}% - 10px)` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Settings: Algorithm & Contrast */}
          <div className="flex-1 flex flex-col justify-between gap-6 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Algorithm</Label>
                <Select value={algorithm} onValueChange={setAlgorithm}>
                  <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border/50 font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tailwind">Tailwind CSS</SelectItem>
                    <SelectItem value="material">Material Design</SelectItem>
                    <SelectItem value="radix">Radix UI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Contrast Shift</Label>
                  <span className="font-mono text-xs font-medium">{contrastShift.toFixed(2)}</span>
                </div>
                <div className="h-12 flex items-center px-1">
                  <Slider
                    value={[contrastShift]}
                    min={-1}
                    max={1}
                    step={0.05}
                    onValueChange={([v]) => setContrastShift(v)}
                    className="[&_.bg-primary]:bg-foreground/80 [&_.border-primary]:border-foreground/80"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Naming Pattern</Label>
                <Select value={namingPattern} onValueChange={setNamingPattern}>
                  <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-border/50 font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">50, 100...900</SelectItem>
                    <SelectItem value="numeric">1, 2, 3...20</SelectItem>
                    <SelectItem value="tens">10, 20, 30...200</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Shade Count</Label>
                <div className="flex items-center gap-2 h-12 bg-muted/30 rounded-xl px-2 border border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShadeCount(prev => Math.max(3, prev - 1))}
                    className="h-8 w-8 rounded-lg hover:bg-background/80"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 text-center font-mono font-medium text-lg">
                    {shadeCount}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShadeCount(prev => Math.min(24, prev + 1))}
                    className="h-8 w-8 rounded-lg hover:bg-background/80"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Card>

      {/* Palette Grid Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold tracking-tight">{colorName}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const generateSvg = () => {
                  const width = 100
                  const height = 120
                  const totalWidth = shades.length * width

                  const rects = shades.map((s, i) => {
                    const rgbVal = hexToRgb(s.hex) || { r: 0, g: 0, b: 0 }
                    const isLight = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b).l > 50
                    const textColor = isLight ? "#000000" : "#FFFFFF"
                    const labelY = 50
                    const hexY = 75

                    return `
    <g transform="translate(${i * width}, 0)">
      <rect width="${width}" height="${height}" fill="${s.hex}" />
      <text x="${width / 2}" y="${labelY}" fill="${textColor}" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${s.label}</text>
      <text x="${width / 2}" y="${hexY}" fill="${textColor}" font-family="sans-serif" font-size="12" text-anchor="middle" opacity="0.8">${s.hex}</text>
    </g>`
                  }).join("\n")

                  return `<svg width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${rects}
</svg>`
                }

                const svg = generateSvg()
                navigator.clipboard.writeText(svg)
                toast.success("SVG copied for Figma")
              }}
              className="h-9 gap-2 rounded-lg text-xs font-medium bg-background/50 backdrop-blur-sm"
            >
              <Download className="w-3.5 h-3.5" /> SVG/Figma
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const generateSvg = () => {
                  const width = 100
                  const height = 120
                  const totalWidth = shades.length * width

                  const rects = shades.map((s, i) => {
                    const rgbVal = hexToRgb(s.hex) || { r: 0, g: 0, b: 0 }
                    const isLight = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b).l > 50
                    const textColor = isLight ? "#000000" : "#FFFFFF"
                    const labelY = 50
                    const hexY = 75

                    return `
    <g transform="translate(${i * width}, 0)">
      <rect width="${width}" height="${height}" fill="${s.hex}" />
      <text x="${width / 2}" y="${labelY}" fill="${textColor}" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${s.label}</text>
      <text x="${width / 2}" y="${hexY}" fill="${textColor}" font-family="sans-serif" font-size="12" text-anchor="middle" opacity="0.8">${s.hex}</text>
    </g>`
                  }).join("\n")

                  return `<svg width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${rects}
</svg>`
                }

                const svg = generateSvg()
                const blob = new Blob([svg], { type: "image/svg+xml" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `${colorName.toLowerCase().replace(/\s+/g, '-')}-palette.svg`
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
                toast.success("SVG downloaded")
              }}
              className="h-9 gap-2 rounded-lg text-xs font-medium bg-foreground text-background hover:bg-foreground/90"
            >
              <Download className="w-3.5 h-3.5" /> SVG
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-3">
          {shades.map((shade, idx) => {
            const rgbVal = hexToRgb(shade.hex) || { r: 0, g: 0, b: 0 }
            const isLight = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b).l > 50
            return (
              <div
                key={idx}
                className="group relative aspect-[3/4] sm:aspect-square rounded-2xl flex flex-col justify-between p-3 sm:p-4 shadow-sm transition-all hover:scale-105 hover:shadow-lg hover:z-10 cursor-pointer"
                style={{ backgroundColor: shade.hex }}
                onClick={() => copyToClipboard(shade.hex)}
              >
                <span className={cn("text-[10px] sm:text-xs font-bold font-mono opacity-70", isLight ? "text-black" : "text-white")}>
                  {shade.label}
                </span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 flex items-center justify-center">
                  <Copy className={cn("w-5 h-5", isLight ? "text-black/50" : "text-white/50")} />
                </div>
                <span className={cn("text-[10px] sm:text-xs font-mono font-medium uppercase", isLight ? "text-black/90" : "text-white/90")}>
                  {shade.hex.replace('#', '')}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Code Export Section */}
      <div className="pt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <TabsList className="h-10 bg-muted/40 p-1 rounded-xl">
              <TabsTrigger value="css" className="rounded-lg text-xs font-medium px-4">CSS</TabsTrigger>
              <TabsTrigger value="tailwind" className="rounded-lg text-xs font-medium px-4">Tailwind</TabsTrigger>
              <TabsTrigger value="tokens" className="rounded-lg text-xs font-medium px-4">Tokens</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg border border-border/30">
              {['HEX', 'RGBA', 'HSL', 'OKLCH'].map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setCodeFormat(fmt.toLowerCase())}
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-bold rounded-md transition-all",
                    codeFormat === fmt.toLowerCase()
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="relative group rounded-xl overflow-hidden border border-border/40 bg-[#1e1e1e] shadow-2xl">
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-white/10 hover:bg-white/20 text-white border-none"
                  onClick={() => copyToClipboard(getCodeSnippet())}
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="max-h-[400px] overflow-auto p-4 sm:p-6 custom-scrollbar bg-[#1e1e1e]">
                <CodeHighlighter
                  code={getCodeSnippet()}
                  language={activeTab === 'tokens' ? 'json' : activeTab === 'css' ? 'css' : 'javascript'}
                  className="font-mono text-xs sm:text-sm leading-relaxed"
                />
              </div>
              <div className="absolute top-0 right-0 p-2 text-[10px] font-medium text-white/30 font-mono pointer-events-none">
                    /* Generated from ColorPicker */
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </div>
  )
}

