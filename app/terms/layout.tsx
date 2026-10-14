import { pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('Terms of Service - ColorHexKit', 'Terms of service for ColorHexKit. Read about permitted use, intellectual property, and your rights when using our color tools.', '/terms');

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
