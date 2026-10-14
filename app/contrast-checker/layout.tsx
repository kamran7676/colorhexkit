import { pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('Contrast Checker - ColorHexKit', 'Check color contrast ratios against WCAG AA and AAA standards. Ensure your text colors meet accessibility requirements for web content.', '/contrast-checker');

export default function ContrastCheckerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
