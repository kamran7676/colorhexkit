import type { Metadata } from "next";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const image = "/colorhexkit-og.svg";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: "ColorHexKit", title, description, url: path, images: [{ url: image, width: 1200, height: 630, alt: "ColorHexKit color tools" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
