import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - ColorHexKit',
  description:
    'ColorHexKit privacy policy. We process images locally in your browser and do not collect or store personal data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
