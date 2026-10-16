import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-metadata";
import { catalogHexes, getColorDetails, isCatalogHex, type ColorDetails } from "@/lib/color-catalog";
import { CodeBlock, DetailPage, Section } from "@/components/detail-page";
import { ColorChip } from "@/components/color-chip";
import { CopyButton } from "@/components/copy-button";

type Props = { params: Promise<{ hex: string }> };

// Only the catalog colors exist as pages; any other HEX returns 404 instead of a thin page.
export const dynamicParams = false;

export function generateStaticParams() {
  return catalogHexes.map((hex) => ({ hex }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hex } = await params;
  if (!isCatalogHex(hex)) return {};
  const color = getColorDetails(hex);
  const upper = `#${hex.toUpperCase()}`;
  const { r, g, b } = color.rgb;
  const { h, s, l } = color.hsl;
  const title = color.exact ? `${upper} ${color.name} Color: RGB, HSL & Contrast` : `${upper} Color Code: RGB, HSL, CMYK & Contrast`;
  const description = `${upper}${color.exact ? ` (${color.name})` : ""} is RGB(${r}, ${g}, ${b}) and HSL(${h}, ${s}%, ${l}%). Contrast ${color.onWhite.ratio}:1 on white, ${color.onBlack.ratio}:1 on black. Shades, tints, harmonies and CSS.`;
  return pageMetadata(title, description, `/color/${hex}`);
}

const Pass = ({ ok }: { ok: boolean }) => (
  <span className={ok ? "font-semibold text-green-600 dark:text-green-400" : "font-semibold text-red-600 dark:text-red-400"}>{ok ? "Pass" : "Fail"}</span>
);

function ContrastCard({ label, background, text, result }: { label: string; background: string; text: string; result: ColorDetails["onWhite"] }) {
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden">
      <div className="p-4 text-lg font-semibold" style={{ backgroundColor: background, color: text }}>
        Sample text on {label}
      </div>
      <div className="p-4 space-y-1 text-sm">
        <p className="text-foreground">Contrast ratio: <strong>{result.ratio}:1</strong></p>
        <p>AA normal text (4.5:1): <Pass ok={result.aaNormal} /></p>
        <p>AA large text (3:1): <Pass ok={result.aaLarge} /></p>
        <p>AAA normal text (7:1): <Pass ok={result.aaaNormal} /></p>
        <p>AAA large text (4.5:1): <Pass ok={result.aaaLarge} /></p>
      </div>
    </div>
  );
}

export default async function ColorPage({ params }: Props) {
  const { hex } = await params;
  if (!isCatalogHex(hex)) notFound();
  const color = getColorDetails(hex);
  const upper = `#${hex.toUpperCase()}`;
  const { r, g, b } = color.rgb;
  const { h, s, l } = color.hsl;
  const { c, m, y, k } = color.cmyk;
  const formats = [
    { label: "HEX", value: upper },
    { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
    { label: "HSL", value: `hsl(${h}, ${s}%, ${l}%)` },
    { label: "CMYK", value: `cmyk(${c}%, ${m}%, ${y}%, ${k}%)` },
  ];
  const token = (color.cssName ?? color.tailwind ?? `color-${hex}`).split(" / ")[0].toLowerCase().replace(/\s+/g, "-");
  const css = `:root {\n  --${token}: ${upper};\n  --${token}-rgb: ${r} ${g} ${b};\n}\n\n.bg-${token} {\n  background-color: var(--${token});\n  color: ${color.textColor}; /* higher-contrast text */\n}\n\n.text-${token} {\n  color: var(--${token});\n}`;

  return (
    <DetailPage crumbs={[{ name: "Colors", path: "/color" }, { name: upper, path: `/color/${hex}` }]}>
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] items-start">
        <div className="aspect-square md:aspect-[4/3] rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10 flex items-end p-5" style={{ backgroundColor: upper, color: color.textColor }}>
          <span className="font-mono text-2xl font-semibold">{upper}</span>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {upper} {color.exact ? color.name : "color"}
          </h1>
          <p className="mt-3 text-muted-foreground leading-7">
            {color.cssName && <>{upper} is the CSS named color <strong>{color.cssName}</strong>. </>}
            {color.tailwind && <>It is <code>{color.tailwind}</code> in the default Tailwind CSS v3 palette. </>}
            {!color.exact && color.nearest && (
              <>The closest CSS named color is <Link className="underline underline-offset-4" href={`/color/${color.nearest.hex}`}>{color.nearest.name} (#{color.nearest.hex.toUpperCase()})</Link>. </>
            )}
            It has a hue of {h}°, {s}% saturation and {l}% lightness. For text on this color, {color.textColor === "#000000" ? "black" : "white"} gives the higher contrast.
          </p>
          <dl className="mt-6 divide-y divide-border/60 rounded-xl border border-border/60">
            {formats.map((format) => (
              <div key={format.label} className="flex items-center justify-between gap-3 px-4 py-3">
                <dt className="w-14 text-sm text-muted-foreground">{format.label}</dt>
                <dd className="flex-1 font-mono text-sm text-foreground">{format.value}</dd>
                <CopyButton value={format.value} />
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Section title={`${upper} contrast on white and black`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <ContrastCard label="white" background="#ffffff" text={upper} result={color.onWhite} />
          <ContrastCard label="black" background="#000000" text={upper} result={color.onBlack} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Ratios use the WCAG 2.x relative-luminance formula. Test other pairs with the <Link className="underline underline-offset-4" href="/contrast-checker">contrast checker</Link>.
        </p>
      </Section>

      <Section title="Shades and tints">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Shades (mixed with black, 15–75%)</h3>
        <div className="grid grid-cols-5 gap-3">{color.shades.map((shade) => <ColorChip key={shade} hex={shade} />)}</div>
        <h3 className="mb-2 mt-6 text-sm font-medium text-muted-foreground">Tints (mixed with white, 15–75%)</h3>
        <div className="grid grid-cols-5 gap-3">{color.tints.map((tint) => <ColorChip key={tint} hex={tint} />)}</div>
      </Section>

      <Section title="Color harmonies">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <ColorChip hex={color.complementary} label="Complementary" />
          {color.analogous.map((value, index) => <ColorChip key={value + index} hex={value} label={`Analogous ${index === 0 ? "−30°" : "+30°"}`} />)}
          {color.triadic.map((value, index) => <ColorChip key={value + index} hex={value} label={`Triadic ${index === 0 ? "+120°" : "+240°"}`} />)}
        </div>
      </Section>

      <Section title={`CSS for ${upper}`}>
        <div className="mb-2 flex justify-end"><CopyButton value={css} label="Copy CSS" /></div>
        <CodeBlock code={css} />
      </Section>

      {(color.palettes.length > 0 || color.gradients.length > 0) && (
        <Section title={`Palettes and gradients using ${upper}`}>
          <ul className="flex flex-wrap gap-2 text-sm">
            {color.palettes.map((palette) => (
              <li key={palette.slug}><Link className="inline-block rounded-full border border-border/60 px-3 py-1 hover:bg-muted" href={`/palettes/${palette.slug}`}>{palette.name} palette</Link></li>
            ))}
            {color.gradients.map((gradient) => (
              <li key={gradient.slug}><Link className="inline-block rounded-full border border-border/60 px-3 py-1 hover:bg-muted" href={`/gradients/${gradient.slug}`}>{gradient.name} gradient</Link></li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Similar colors">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">{color.related.map((value) => <ColorChip key={value} hex={value} />)}</div>
      </Section>
    </DetailPage>
  );
}
