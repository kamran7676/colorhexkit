import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-metadata";
import { colorPalettes, getPaletteBySlug, paletteSlug } from "@/lib/palettes";
import { getColorName, isCatalogHex, normalizeHex } from "@/lib/color-catalog";
import { getContrastRatio, hexToRgb, rgbToHsl } from "@/lib/color-utils";
import { CodeBlock, DetailPage, Section } from "@/components/detail-page";
import { CopyButton } from "@/components/copy-button";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return colorPalettes.map((palette) => ({ slug: paletteSlug(palette) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const palette = getPaletteBySlug(slug);
  if (!palette) return {};
  return pageMetadata(
    `${palette.name} Color Palette - ColorHexKit`,
    `${palette.name} is a ${palette.colors.length}-color ${palette.category.toLowerCase()} palette: ${palette.colors.join(", ")}. Copy HEX, RGB and CSS variables for each color.`,
    `/palettes/${slug}`,
  );
}

export default async function PalettePage({ params }: Props) {
  const { slug } = await params;
  const palette = getPaletteBySlug(slug);
  if (!palette) notFound();

  const colors = palette.colors.map((color) => {
    const hex = normalizeHex(color)!;
    const rgb = hexToRgb(color)!;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const { name, exact } = getColorName(hex);
    return {
      hex,
      upper: `#${hex.toUpperCase()}`,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      label: exact ? name : `Near ${name}`,
      onWhite: Math.round(getContrastRatio(rgb, { r: 255, g: 255, b: 255 }) * 100) / 100,
    };
  });
  const allHex = colors.map((color) => color.upper).join(", ");
  const css = `:root {\n${colors.map((color, index) => `  --${slug}-${index + 1}: ${color.upper};`).join("\n")}\n}`;
  const related = colorPalettes.filter((other) => other.category === palette.category && other.id !== palette.id).slice(0, 6);

  return (
    <DetailPage crumbs={[{ name: "Palettes", path: "/palettes" }, { name: palette.name, path: `/palettes/${slug}` }]}>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{palette.name} color palette</h1>
      <p className="mt-3 text-muted-foreground leading-7">
        A {colors.length}-color palette in the <strong>{palette.category}</strong> category: {allHex}.
      </p>

      <div className="mt-8 grid h-48 sm:h-64 overflow-hidden rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10" style={{ gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}>
        {colors.map((color) => <div key={color.hex} style={{ backgroundColor: color.upper }} />)}
      </div>
      <div className="mt-3 flex justify-end"><CopyButton value={allHex} label="Copy all HEX" /></div>

      <Section title="Colors in this palette">
        <ul className="divide-y divide-border/60 rounded-xl border border-border/60">
          {colors.map((color) => (
            <li key={color.hex} className="flex flex-wrap items-center gap-4 p-3">
              <span className="h-12 w-12 flex-shrink-0 rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10" style={{ backgroundColor: color.upper }} />
              <div className="min-w-[10rem] flex-1">
                {isCatalogHex(color.hex) ? (
                  <Link href={`/color/${color.hex}`} className="font-mono font-semibold text-foreground underline-offset-4 hover:underline">{color.upper}</Link>
                ) : (
                  <p className="font-mono font-semibold text-foreground">{color.upper}</p>
                )}
                <p className="text-xs text-muted-foreground">{color.label} · {color.rgb} · {color.hsl} · {color.onWhite}:1 on white</p>
              </div>
              <div className="flex gap-2">
                <CopyButton value={color.upper} label="HEX" />
                <CopyButton value={color.rgb} label="RGB" />
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="CSS variables">
        <div className="mb-2 flex justify-end"><CopyButton value={css} label="Copy CSS" /></div>
        <CodeBlock code={css} />
        <p className="mt-3 text-sm text-muted-foreground">
          Check text and background pairs from this palette with the <Link className="underline underline-offset-4" href="/contrast-checker">contrast checker</Link>.
        </p>
      </Section>

      {related.length > 0 && (
        <Section title={`More ${palette.category.toLowerCase()} palettes`}>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {related.map((other) => (
              <li key={other.id}>
                <Link href={`/palettes/${paletteSlug(other)}`} className="block overflow-hidden rounded-xl border border-border/60 hover:shadow-md transition-shadow">
                  <span className="grid h-16 grid-cols-4">{other.colors.map((color) => <span key={color} style={{ backgroundColor: color }} />)}</span>
                  <span className="block p-2 text-sm font-medium text-foreground">{other.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </DetailPage>
  );
}
