import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Picker & Analyzer - ColorHexKit',
  description:
    'Extract colors from images or pick manually. Analyze HEX, RGB, HSL values and explore palettes with professional-grade tools.',
  alternates: { canonical: '/picker' },
};

export default function PickerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
