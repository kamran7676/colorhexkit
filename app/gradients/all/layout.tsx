import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Gradients Library - ColorHexKit',
  description:
    'Browse the full library of beautiful CSS gradients. Filter by category, search by name, and copy gradient CSS with one click.',
  alternates: { canonical: '/gradients/all' },
};

export default function AllGradientsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
