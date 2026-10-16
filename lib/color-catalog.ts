import { cssNamedColors, tailwindColors } from "@/lib/color-catalog-data";
import { gradients, gradientSlug } from "@/lib/gradients";
import { colorPalettes, paletteSlug } from "@/lib/palettes";
import {
  generateAnalogous,
  generateComplementary,
  generateTriadic,
  getContrastRatio,
  hexToRgb,
  rgbToCmyk,
  rgbToHex,
  rgbToHsl,
  type RGB,
} from "@/lib/color-utils";

/** Normalizes "#ABC", "abc", "#AABBCC" to "aabbcc"; returns null for anything else. */
export function normalizeHex(value: string): string | null {
  const hex = value.replace(/^#/, "").toLowerCase();
  if (/^[0-9a-f]{6}$/.test(hex)) return hex;
  if (/^[0-9a-f]{3}$/.test(hex)) return hex.split("").map((c) => c + c).join("");
  return null;
}

const titleCase = (value: string) => value.replace(/(^|[\s-])([a-z])/g, (_, sep, c) => sep + c.toUpperCase());
const tailwindLabel = (token: string) => `Tailwind ${titleCase(token.replace("-", " "))}`;

const gradientHexes = gradients.flatMap((gradient) => gradient.colors.map((color) => normalizeHex(color)!));

/** Colors that get an indexable page: CSS named colors, the Tailwind palette, and every gradient-library color. */
export const catalogHexes: string[] = Array.from(
  new Set([...Object.keys(cssNamedColors), ...Object.keys(tailwindColors), ...gradientHexes]),
);

const catalogSet = new Set(catalogHexes);

export const isCatalogHex = (hex: string) => catalogSet.has(hex);

export const colorPath = (hex: string) => `/color/${normalizeHex(hex)}`;

const toRgb = (hex: string) => hexToRgb(`#${hex}`)!;

const distance = (a: RGB, b: RGB) => {
  // Weighted RGB distance ("redmean"), cheap and good enough for nearest-color lookups.
  const rMean = (a.r + b.r) / 2;
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt((2 + rMean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rMean) / 256) * db * db);
};

function nearestNamedColor(hex: string) {
  const rgb = toRgb(hex);
  let best = { hex: "", name: "", distance: Infinity };
  for (const [candidate, name] of Object.entries(cssNamedColors)) {
    const d = distance(rgb, toRgb(candidate));
    if (d < best.distance) best = { hex: candidate, name, distance: d };
  }
  return best;
}

export function getColorName(hex: string) {
  if (cssNamedColors[hex]) return { name: cssNamedColors[hex], exact: true };
  if (tailwindColors[hex]) return { name: tailwindLabel(tailwindColors[hex]), exact: true };
  return { name: nearestNamedColor(hex).name, exact: false };
}

const mix = (rgb: RGB, target: number, amount: number) =>
  rgbToHex(
    Math.round(rgb.r + (target - rgb.r) * amount),
    Math.round(rgb.g + (target - rgb.g) * amount),
    Math.round(rgb.b + (target - rgb.b) * amount),
  ).toLowerCase();

const contrast = (rgb: RGB, other: RGB) => {
  const ratio = Math.round(getContrastRatio(rgb, other) * 100) / 100;
  return { ratio, aaNormal: ratio >= 4.5, aaLarge: ratio >= 3, aaaNormal: ratio >= 7, aaaLarge: ratio >= 4.5 };
};

const strip = (hex: string) => normalizeHex(hex)!;

export function getColorDetails(hex: string) {
  const rgb = toRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
  const nearest = nearestNamedColor(hex);
  const onWhite = contrast(rgb, { r: 255, g: 255, b: 255 });
  const onBlack = contrast(rgb, { r: 0, g: 0, b: 0 });
  const steps = [0.15, 0.3, 0.45, 0.6, 0.75];

  const related = catalogHexes
    .filter((candidate) => candidate !== hex)
    .map((candidate) => ({ hex: candidate, d: distance(rgb, toRgb(candidate)) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 12)
    .map((entry) => entry.hex);

  const matches = (colors: string[]) => colors.some((color) => strip(color) === hex);

  return {
    hex,
    ...getColorName(hex),
    cssName: cssNamedColors[hex],
    tailwind: tailwindColors[hex],
    nearest: nearest.hex === hex ? null : { hex: nearest.hex, name: nearest.name },
    rgb,
    hsl,
    cmyk,
    onWhite,
    onBlack,
    textColor: onBlack.ratio >= onWhite.ratio ? "#000000" : "#ffffff",
    shades: steps.map((step) => mix(rgb, 0, step).slice(1)),
    tints: steps.map((step) => mix(rgb, 255, step).slice(1)),
    complementary: strip(generateComplementary(`#${hex}`)),
    analogous: generateAnalogous(`#${hex}`).slice(1).map(strip),
    triadic: generateTriadic(`#${hex}`).slice(1).map(strip),
    related,
    palettes: colorPalettes.filter((palette) => matches(palette.colors)).map((palette) => ({ name: palette.name, slug: paletteSlug(palette) })),
    gradients: gradients.filter((gradient) => matches(gradient.colors)).map((gradient) => ({ name: gradient.name, slug: gradientSlug(gradient) })),
  };
}

export type ColorDetails = ReturnType<typeof getColorDetails>;

export const catalogGroups = () => [
  { title: "CSS named colors", hexes: Object.keys(cssNamedColors) },
  { title: "Tailwind CSS colors", hexes: Object.keys(tailwindColors).filter((hex) => !cssNamedColors[hex]) },
  {
    title: "Gradient library colors",
    hexes: Array.from(new Set(gradientHexes)).filter((hex) => !cssNamedColors[hex] && !tailwindColors[hex]),
  },
];
