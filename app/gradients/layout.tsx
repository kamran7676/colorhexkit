import { pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('Gradient Maker - ColorHexKit', 'Create beautiful multi-color CSS gradients with a visual editor. Choose linear or radial, customize rotation, and copy CSS instantly.', '/gradients');

export default function GradientsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
