import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - ColorHexKit',
  description:
    'Terms of service for ColorHexKit. Read about permitted use, intellectual property, and your rights when using our color tools.',
  alternates: { canonical: '/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
