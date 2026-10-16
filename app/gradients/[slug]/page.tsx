import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo-metadata";
import { getGradientBySlug, gradients, gradientSlug } from "@/lib/gradients";
import { CodeBlock, DetailPage, Section } from "@/components/detail-page";
import { ColorChip } from "@/components/color-chip";
import { CopyButton } from "@/components/copy-button";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return gradients.map((gradient) => ({ slug: gradientSlug(gradient) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gradient = getGradientBySlug(slug);
  if (!gradient) return {};
  return pageMetadata(
    `${gradient.name} Gradient: CSS & Tailwind Code - ColorHexKit`,
    `${gradient.name} is a ${gradient.category.toLowerCase()} CSS linear gradient from ${gradient.colors.join(" to ")}. Copy the CSS background or Tailwind classes and preview it.`,
    `/gradients/${slug}`,
  );
}

export default async function GradientPage({ params }: Props) {
  const { slug } = await params;
  const gradient = getGradientBySlug(slug);
  if (!gradient) notFound();

  const [from, ...rest] = gradient.colors;
  const to = rest[rest.length - 1];
  const via = rest.length > 1 ? rest.slice(0, -1) : [];
  const css = `background-color: ${from}; /* fallback */\nbackground-image: ${gradient.css};`;
  const tailwindExact = `bg-[${gradient.css.replace(/,\s*/g, ",").replace(/\s+/g, "_")}]`;
  const tailwindUtility = ["bg-gradient-to-br", `from-[${from}]`, ...via.map((color) => `via-[${color}]`), `to-[${to}]`].join(" ");
  const related = gradients.filter((other) => other.category === gradient.category && other.id !== gradient.id).slice(0, 8);

  return (
    <DetailPage crumbs={[{ name: "Gradients", path: "/gradients/all" }, { name: gradient.name, path: `/gradients/${slug}` }]}>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{gradient.name} CSS gradient</h1>
      <p className="mt-3 text-muted-foreground leading-7">
        A {gradient.category.toLowerCase()} linear gradient at 135° from {gradient.colors.join(" to ")}.
      </p>

      <div className="mt-8 h-56 sm:h-72 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/10" style={{ background: gradient.css }} />

      <Section title="CSS">
        <div className="mb-2 flex justify-end"><CopyButton value={css} label="Copy CSS" /></div>
        <CodeBlock code={css} />
      </Section>

      <Section title="Tailwind CSS">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">Exact match (arbitrary value)</h3>
        <div className="mb-2 flex justify-end"><CopyButton value={tailwindExact} label="Copy class" /></div>
        <CodeBlock code={tailwindExact} />
        <h3 className="mb-2 mt-6 text-sm font-medium text-muted-foreground">Gradient utilities (Tailwind v3)</h3>
        <div className="mb-2 flex justify-end"><CopyButton value={tailwindUtility} label="Copy classes" /></div>
        <CodeBlock code={tailwindUtility} />
        <p className="mt-3 text-sm text-muted-foreground">
          <code>bg-gradient-to-br</code> runs toward the bottom-right corner, which equals 135° only on square elements. Use the arbitrary value when the angle must match exactly.
        </p>
      </Section>

      <Section title="Colors">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {gradient.colors.map((color, index) => <ColorChip key={color + index} hex={color} />)}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Want a different angle or more stops? Build your own in the <Link className="underline underline-offset-4" href="/gradients">gradient maker</Link>.
        </p>
      </Section>

      {related.length > 0 && (
        <Section title={`More ${gradient.category.toLowerCase()} gradients`}>
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((other) => (
              <li key={other.id}>
                <Link href={`/gradients/${gradientSlug(other)}`} className="block overflow-hidden rounded-xl border border-border/60 hover:shadow-md transition-shadow">
                  <span className="block h-20" style={{ background: other.css }} />
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
