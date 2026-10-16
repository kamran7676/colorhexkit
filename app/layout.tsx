import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import SmoothScrolling from "@/components/smooth-scrolling";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://colorhexkit.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ColorHexKit Color Picker & Palette Generator",
  description:
    "Pick colors from images, create palettes, and check color contrast with free design tools. Explore gradients and copy color codes instantly.",
  icons: {
    icon: "/colorhexkit-logo.svg",
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    siteName: "ColorHexKit",
    title: "ColorHexKit — Color Picker, Palettes & Contrast Tools",
    description: "Pick colors from images, create balanced palettes, and check color contrast with free online design tools.",
    url: "/",
    images: [{ url: "/colorhexkit-og.svg", width: 1200, height: 630, alt: "ColorHexKit color tools" }],
  },
  twitter: { card: "summary_large_image", title: "ColorHexKit — Color Tools", description: "Pick colors, build palettes, and check contrast with free online tools.", images: ["/colorhexkit-og.svg"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const layout = (
      <html lang="en" suppressHydrationWarning>
        <head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "ColorHexKit", url: siteUrl }) }} />
          {/* eslint-disable-next-line @next/next/no-css-tags */}
          <link
            href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,501,700,701,900,1&f[]=ranade@400,500&f[]=general-sans@300,301,400,401,500,501,600&f[]=cabinet-grotesk@400,500,700,800,900,1&f[]=clash-grotesk@200,300,400,500,600,700,1&f[]=sentient@500,701&f[]=chillax@200,300,400,500,600,700,1&f[]=excon@500,700&f[]=telma@400,500,700&f[]=rosaline@400&f[]=dancing-script@400,700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} font-sans`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScrolling>{children}</SmoothScrolling>
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
  );
  return layout;
}
