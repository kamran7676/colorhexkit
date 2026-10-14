import { pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('About ColorHexKit', 'Learn about ColorHexKit, a modern color tool for creators, developers, and artists. Open source, privacy-focused, and free.', '/about');

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
