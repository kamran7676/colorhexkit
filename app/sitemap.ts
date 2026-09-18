import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://colorhexkit.vercel.app'

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/palettes`, lastModified: new Date() },
    { url: `${baseUrl}/gradients`, lastModified: new Date() },
    { url: `${baseUrl}/picker`, lastModified: new Date() },
    { url: `${baseUrl}/contrast-checker`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
  ]
}