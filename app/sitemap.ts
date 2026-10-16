import type { MetadataRoute } from 'next'
import { catalogHexes } from '@/lib/color-catalog'
import { colorPalettes, paletteSlug } from '@/lib/palettes'
import { gradients, gradientSlug } from '@/lib/gradients'

// Dates the content of each page last changed. Update the matching entry when you edit a page;
// do not replace these with the build time.
const CONTENT_UPDATED = {
  legal: '2026-10-14', // /about, /privacy, /terms
  tools: '2026-10-16', // home, picker, gradient maker, contrast checker
  palettes: '2026-10-16', // /palettes and /palettes/[slug]
  gradients: '2026-10-16', // /gradients/all and /gradients/[slug]
  colors: '2026-10-16', // /color and /color/[hex]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://colorhexkit.vercel.app'
  const entry = (path: string, lastModified: string) => ({ url: `${baseUrl}${path}`, lastModified })

  return [
    entry('', CONTENT_UPDATED.tools),
    entry('/picker', CONTENT_UPDATED.tools),
    entry('/gradients', CONTENT_UPDATED.tools),
    entry('/contrast-checker', CONTENT_UPDATED.tools),
    entry('/palettes', CONTENT_UPDATED.palettes),
    ...colorPalettes.map((palette) => entry(`/palettes/${paletteSlug(palette)}`, CONTENT_UPDATED.palettes)),
    entry('/gradients/all', CONTENT_UPDATED.gradients),
    ...gradients.map((gradient) => entry(`/gradients/${gradientSlug(gradient)}`, CONTENT_UPDATED.gradients)),
    entry('/color', CONTENT_UPDATED.colors),
    ...catalogHexes.map((hex) => entry(`/color/${hex}`, CONTENT_UPDATED.colors)),
    entry('/about', CONTENT_UPDATED.legal),
    entry('/privacy', CONTENT_UPDATED.legal),
    entry('/terms', CONTENT_UPDATED.legal),
  ]
}
