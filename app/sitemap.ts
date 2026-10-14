import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://colorhexkit.vercel.app'

  return [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/palettes`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gradients`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gradients/all`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/picker`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contrast-checker`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.4 },
  ]
}
