import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contrast Checker - ColorHexKit',
  description:
    'Check color contrast ratios against WCAG AA and AAA standards. Ensure your text colors meet accessibility requirements.',
  alternates: { canonical: '/contrast-checker' },
};

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
