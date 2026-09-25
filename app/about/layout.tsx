import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - ColorHexKit',
  description:
    'Learn about ColorHexKit, a modern color tool for creators, developers, and artists. Open source, privacy-focused, and free.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
