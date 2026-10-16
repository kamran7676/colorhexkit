import Link from "next/link";
import { colorPalettes, paletteSlug } from "@/lib/palettes";
import { gradients, gradientSlug } from "@/lib/gradients";

// All of these are CSS named or Tailwind colors, so each has a /color page.
const popularColors = [
  ["000000", "Black"], ["ffffff", "White"], ["ff0000", "Red"], ["0000ff", "Blue"],
  ["008000", "Green"], ["ffff00", "Yellow"], ["ffa500", "Orange"], ["800080", "Purple"],
  ["ffc0cb", "Pink"], ["000080", "Navy"], ["008080", "Teal"], ["3b82f6", "Tailwind Blue 500"],
];

/** Crawlable links from the tool pages into the color, palette and gradient detail pages. */
export function ExploreLinks() {
  return (
    <section aria-labelledby="explore-heading" className="container mx-auto max-w-5xl px-4 py-12">
      <h2 id="explore-heading" className="mb-6 text-2xl font-semibold text-foreground">Explore colors, palettes and gradients</h2>

      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Popular color codes</h3>
      <ul className="flex flex-wrap gap-2">
        {popularColors.map(([hex, name]) => (
          <li key={hex}>
            <Link href={`/color/${hex}`} className="flex items-center gap-2 rounded-full border border-border/60 py-1 pl-1 pr-3 text-sm hover:bg-muted">
              <span className="h-5 w-5 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10" style={{ backgroundColor: `#${hex}` }} />
              {name}
            </Link>
          </li>
        ))}
        <li><Link href="/color" className="inline-block rounded-full px-3 py-1 text-sm underline underline-offset-4">All color codes</Link></li>
      </ul>

      <h3 className="mb-3 mt-8 text-sm font-medium text-muted-foreground">Palettes</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {colorPalettes.slice(0, 6).map((palette) => (
          <li key={palette.id}>
            <Link href={`/palettes/${paletteSlug(palette)}`} className="block overflow-hidden rounded-xl border border-border/60 hover:shadow-md transition-shadow">
              <span className="grid h-12 grid-cols-4">{palette.colors.map((color) => <span key={color} style={{ backgroundColor: color }} />)}</span>
              <span className="block truncate p-2 text-sm text-foreground">{palette.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mb-3 mt-8 text-sm font-medium text-muted-foreground">Gradients</h3>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {gradients.slice(0, 6).map((gradient) => (
          <li key={gradient.id}>
            <Link href={`/gradients/${gradientSlug(gradient)}`} className="block overflow-hidden rounded-xl border border-border/60 hover:shadow-md transition-shadow">
              <span className="block h-12" style={{ background: gradient.css }} />
              <span className="block truncate p-2 text-sm text-foreground">{gradient.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
