import { pageMetadata } from '@/lib/seo-metadata';

export const metadata = pageMetadata('Color Picker & Analyzer - ColorHexKit', 'Extract colors from images or pick manually. Analyze HEX, RGB, HSL values and explore palettes with professional-grade tools.', '/picker');

export default function PickerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
