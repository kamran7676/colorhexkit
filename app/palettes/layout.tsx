import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Palettes - ColorHexKit',
  description:
    'Explore curated color palettes for your next project. Browse by category, search by name or hex code, and copy colors instantly.',
  alternates: { canonical: '/palettes' },
};

export default function PalettesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
