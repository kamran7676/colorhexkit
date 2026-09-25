import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gradient Maker - ColorHexKit',
  description:
    'Create beautiful multi-color CSS gradients with a visual editor. Choose linear or radial, customize rotation, and copy CSS instantly.',
  alternates: { canonical: '/gradients' },
};

export default function GradientsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
