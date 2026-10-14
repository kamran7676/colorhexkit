import { pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('Color Palettes - ColorHexKit', 'Explore curated color palettes for your next project. Browse by category, search by name or hex code, and copy colors instantly.', '/palettes');

export default function PalettesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
