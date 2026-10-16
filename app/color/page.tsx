import Link from "next/link";
import { pageMetadata } from "@/lib/seo-metadata";
import { catalogGroups, catalogHexes, getColorName } from "@/lib/color-catalog";
import { DetailPage, Section } from "@/components/detail-page";

export const metadata = pageMetadata(
  "HEX Color Codes: CSS Named & Tailwind Colors - ColorHexKit",
  "Browse HEX color codes for CSS named colors, the Tailwind CSS palette and gradient colors. Each page lists RGB, HSL, CMYK, WCAG contrast and shades.",
  "/color",
);

const label = (hex: string) => {
  const { name, exact } = getColorName(hex);
  return exact ? name : `Near ${name}`;
};

export default function ColorIndexPage() {
  return (
    <DetailPage crumbs={[{ name: "Colors", path: "/color" }]}>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground">HEX color codes</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground leading-7">
        {catalogHexes.length} colors, each with HEX, RGB, HSL and CMYK values, contrast against white and black, shades, tints and
        harmonies. Need a color that is not listed? Use the <Link className="underline underline-offset-4" href="/picker">color picker</Link>.
      </p>
      {catalogGroups().map((group) => (
        <Section key={group.title} title={`${group.title} (${group.hexes.length})`}>
          <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {group.hexes.map((hex) => (
              <li key={hex}>
                <Link href={`/color/${hex}`} className="flex items-center gap-2 rounded-lg border border-border/50 p-1.5 hover:bg-muted">
                  <span className="h-7 w-7 flex-shrink-0 rounded-md ring-1 ring-inset ring-black/10 dark:ring-white/10" style={{ backgroundColor: `#${hex}` }} />
                  <span className="min-w-0">
                    <span className="block font-mono text-xs text-foreground">#{hex.toUpperCase()}</span>
                    <span className="block truncate text-[11px] text-muted-foreground">{label(hex)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </DetailPage>
  );
}
