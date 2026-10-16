import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://colorhexkit.vercel.app";

type Crumb = { name: string; path: string };

/** Server-rendered shell for the static detail pages (colors, palettes, gradients). */
export function DetailPage({ crumbs, children }: { crumbs: Crumb[]; children: React.ReactNode }) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.path === "/" ? "/" : crumb.path}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Navbar />
      <main className="flex-1 container mx-auto max-w-5xl px-4 pt-28 sm:pt-32 pb-16">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            {trail.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {index > 0 && <span aria-hidden>/</span>}
                {index === trail.length - 1 ? (
                  <span aria-current="page" className="text-foreground">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path} className="hover:text-foreground underline-offset-4 hover:underline">{crumb.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border/60 bg-muted/40 p-4 text-sm leading-6 text-foreground">
      <code>{code}</code>
    </pre>
  );
}
