import { pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('Privacy Policy - ColorHexKit', 'ColorHexKit privacy policy. We process images locally in your browser and do not collect or store personal data. Read our data practices.', '/privacy');

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
