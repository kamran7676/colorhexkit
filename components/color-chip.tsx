import Link from "next/link";
import { colorPath, isCatalogHex, normalizeHex } from "@/lib/color-catalog";

/** A swatch with its HEX value. Links to the color's page only when that page exists. */
export function ColorChip({ hex, label }: { hex: string; label?: string }) {
  const value = normalizeHex(hex)!;
  const content = (
    <>
      <span className="block h-14 w-full rounded-lg ring-1 ring-inset ring-black/10 dark:ring-white/10" style={{ backgroundColor: `#${value}` }} />
      <span className="mt-1.5 block font-mono text-xs text-foreground">#{value.toUpperCase()}</span>
      {label && <span className="block text-xs text-muted-foreground">{label}</span>}
    </>
  );
  return isCatalogHex(value) ? (
    <Link href={colorPath(value)} className="block rounded-lg transition-opacity hover:opacity-80">{content}</Link>
  ) : (
    <div>{content}</div>
  );
}
