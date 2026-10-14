import { pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('All Gradients Library - ColorHexKit', 'Browse the full library of beautiful CSS gradients. Filter by category, search by name, and copy gradient CSS with one click.', '/gradients/all');

export default function AllGradientsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
