import Link from "next/link";

const pages = {
  home: {
    title: "Free Online Color Picker and Palette Generator",
    intro: "ColorHexKit brings everyday color tasks together in one browser-based workspace. Pick a color from an image, explore coordinated palettes, build a CSS gradient, and check contrast before using a color combination in a design.",
    paragraphs: [
      "Start with the tool that matches your current task. The image picker samples a color from a local picture, while the manual picker lets you work from a known HEX value. The palette library helps you compare curated combinations, and the gradient maker turns selected colors into a CSS background. If you are preparing text or controls, use the contrast checker to evaluate foreground and background pairs against common WCAG criteria. Moving between these tools can help turn an early visual idea into practical values for a website or application.",
      "Color values are useful across design and development workflows because they can be copied into stylesheets, design tokens, mockups, and graphics software. HEX codes are compact and widely used on the web; RGB describes red, green, and blue channels; HSL represents hue, saturation, and lightness. These formats describe related ways to express color, and the picker analyzer helps you inspect them without converting values by hand. Save a consistent set of named values in your project so the same brand color appears reliably across pages and components.",
      "A color tool can speed up exploration, but the design context still matters. Check your palette against the content, screen sizes, and themes where it will appear. Test text contrast at the actual font size, review gradients in their final containers, and make sure color is not the only way important information is communicated. The image picker works in your browser for local sampling, and the rest of the tools provide quick previews and copyable results. Browse the palettes for inspiration, use the picker to sample an existing reference, or start building a gradient. ColorHexKit is free to use and designed to make color exploration approachable for designers, developers, and curious creators."
    ],
    faqs: ["What can I do with ColorHexKit? Pick colors, inspect color values, browse palettes, create gradients, and check contrast.", "Is ColorHexKit free? The browser tools are available free of charge.", "Can I use these colors in my website? Yes. Copy color codes and generated CSS into your own project.", "How can I check text accessibility? Use the contrast checker for a color pair, then review the complete interface against accessibility guidance."]
  },
  picker: {
    title: "Online Color Picker and Image Color Analyzer",
    intro: "Use this online color picker to sample a shade from an image or enter a color manually. ColorHexKit displays useful color formats and gives you a practical starting point for a consistent design system.",
    paragraphs: [
      "A dependable color workflow starts with a color you can identify and reuse. Upload an image to sample its pixels, or switch to the manual picker when you already know a HEX value. The analyzer helps translate a chosen shade into familiar HEX, RGB, and HSL values so the same color can move between a design mockup, a stylesheet, and a graphics editor. When exploring a photograph, sample several areas instead of relying on one pixel: lighting, shadows, and compression can all change the apparent shade.",
      "After finding a base color, compare it with a palette and check how it behaves beside lighter or darker colors. Color relationships matter in buttons, backgrounds, charts, and illustrations, where a single attractive swatch may not be enough. Use the contrast checker to review text combinations before shipping an interface. For broader inspiration, browse curated palettes or try the gradient maker to see how neighboring hues transition. These related tools help turn a sampled color into a complete visual direction.",
      "ColorHexKit runs the image sampling interaction in your browser. Choose a local image, inspect it, and click the area whose color you want to capture. For a manual value, use a standard six-digit HEX code such as #336699. Copy the result into your project and check the rendered color in its final context; different displays, opacity, and surrounding colors can affect perception. The picker is useful for designers matching a reference, developers extracting brand colors, and anyone learning how digital color formats relate to one another. It is a practical exploration aid, while final accessibility decisions should be checked against the actual text size and interface states in your product."
    ],
    faqs: ["How do I pick a color from an image? Upload an image in the picker and select the pixel or area you want to inspect.", "Which color formats can I inspect? The analyzer presents common formats including HEX, RGB, and HSL.", "Can I enter a color manually? Yes. Switch to the manual picker and enter a HEX color value.", "Are uploaded images sent to a server? Sampling is performed in your browser; avoid uploading sensitive images to any online tool unless you have permission."]
  },
  palettes: {
    title: "Color Palette Generator and Curated Color Schemes",
    intro: "Browse curated color palettes to find a coordinated set of shades for a website, illustration, presentation, or brand concept. Search by palette name or HEX value, explore categories, and copy colors for your project.",
    paragraphs: [
      "A useful color palette gives a project more direction than a collection of unrelated swatches. Start by thinking about the job each color needs to do: a background, primary action, supporting accent, or text. Curated schemes can help you discover relationships you might not choose on your own, from calm analogous hues to high-energy complementary combinations. Treat each palette as inspiration rather than a fixed rule, then adjust individual colors to fit your brand, content, and accessibility needs.",
      "Use search to find a palette by its displayed name or by a HEX value you already have. Category filters make it easier to narrow the collection, while the palette details show individual colors and their codes. Copy a swatch and paste it into a stylesheet, design tool, or color token document. Keeping a small set of named design tokens makes later edits faster: if the primary color changes, you can update its uses consistently instead of hunting through one-off values.",
      "When a scheme looks promising, preview it in the interface where it will appear. A palette that works in a large illustration may need a different balance when used for small text, controls, or data visualizations. Check foreground and background combinations with the contrast checker, and consider how the colors look in both light and dark contexts. You can also take a color from an existing image with the image picker, then search for palettes that complement it. For gradients between selected colors, continue to the gradient maker. ColorHexKit helps you move from visual inspiration to reusable color values, but the final choices should reflect your content, audience, and accessibility requirements."
    ],
    faqs: ["How do I search palettes? Enter a palette name or HEX value in the search field, then choose a category filter.", "Can I copy a palette color? Open a palette and use its color controls to copy individual values.", "Are the palettes suitable for every brand? They are starting points; review each scheme against your brand and interface context.", "How can I check palette accessibility? Test the actual foreground and background pairs with the contrast checker."]
  },
  gradients: {
    title: "CSS Gradient Generator and Gradient Maker",
    intro: "Build a CSS color gradient with a visual editor. Choose colors, set a direction or gradient type, preview the blend, and copy CSS to use in a web project.",
    paragraphs: [
      "CSS gradients create smooth transitions between colors without requiring a separate image file. They can add depth to a hero section, give a button a subtle highlight, or provide a continuous color scale for a visual. Begin with two colors that have a clear relationship, then adjust the direction and transition points to fit the element. A restrained gradient often keeps text readable and gives surrounding content room to breathe.",
      "The gradient maker lets you work visually and inspect a live preview as you adjust settings. Select a linear or radial treatment, choose the colors, and tune the angle where available. Once the result looks right, copy the generated CSS and place it in a stylesheet or component. Review the copied rule in the browser where it will be used, since an element's size and surrounding layout can change how a gradient appears. Keep a solid fallback color when the gradient sits behind important content.",
      "Color choices affect more than decoration. If text sits on top of a gradient, test contrast at the lightest and darkest points behind the text, not only at the center. Avoid placing small labels across a rapidly changing background. For a coordinated result, start with a palette from the palette library or sample a source image with the picker. The all-gradients library offers examples to browse when you need a direction before editing. Gradients are supported by modern browsers, but the generated CSS should still be checked in your target browsers and responsive layouts. ColorHexKit is intended to make experimentation quick: generate a starting rule, copy it, and refine it in the context of your actual page."
    ],
    faqs: ["How do I create a CSS gradient? Pick the gradient type and colors, adjust its direction, then copy the generated CSS.", "Can I use more than two colors? The editor supports multiple color stops where available; inspect the preview as you add them.", "What is the difference between linear and radial? Linear blends along a direction; radial blends outward from a point.", "Is text readable over a gradient automatically? No. Check contrast across every part of the gradient behind the text."]
  },
  contrast: {
    title: "WCAG Color Contrast Checker for Text and Backgrounds",
    intro: "Check the contrast ratio between foreground and background colors with this online contrast checker. Use the result to review text readability and compare it with WCAG AA and AAA thresholds.",
    paragraphs: [
      "Color contrast is an important part of readable interface design. A foreground and background can look distinct to one person yet be difficult to distinguish for another, especially at small text sizes or on low-quality displays. A contrast ratio gives designers and developers a consistent way to compare two colors. Enter the text color and its background to inspect their ratio, then evaluate the result against the relevant WCAG success criterion for the content you are designing.",
      "WCAG uses different thresholds for normal text and large text, and enhanced AAA criteria are stricter than AA. Do not treat a passing result as proof that an entire interface is accessible: focus indicators, icons, states, color meaning, and text over images need their own review. Test actual component states such as hover, disabled, and selected, and test every theme your product supports. If a pair fails, adjust lightness or choose a different foreground or background, then run the check again.",
      "Use the picker to sample a color from a reference image, or open the palette library to explore alternative combinations. A palette can be visually harmonious and still contain a low-contrast text pairing, so check each intended foreground and background role separately. For gradients and image backgrounds, inspect the weakest point behind the text rather than relying on a single sampled value. Record approved combinations as design tokens so teams can reuse them consistently. This free browser-based checker supports an iterative workflow: enter two values, review the ratio, and make an informed color adjustment. Always evaluate contrast alongside the complete page and applicable accessibility guidance before release."
    ],
    faqs: ["What does a contrast ratio mean? It compares the relative luminance of foreground and background colors.", "What ratio does WCAG AA require? Normal text generally needs 4.5:1; large text generally needs 3:1 under WCAG 2.x.", "Does passing this check make a page accessible? No. It checks a color pair; other accessibility requirements need separate review.", "How do I improve a failing color pair? Darken the foreground, lighten the background, or choose a different color, then check again."]
  },
  library: {
    title: "Browse CSS Gradient Examples and Color Blends",
    intro: "Explore a library of gradient examples for ideas, then use the gradient maker to customize colors and copy CSS for your own interface.",
    paragraphs: [
      "Finding a useful gradient often starts with browsing examples. A library gives you a quick way to compare color transitions, notice how different hues interact, and choose a visual direction before writing CSS. Look for a blend that supports the mood and purpose of your page: a quiet background wash, a bold call-to-action, or a bright accent for a graphic. The examples are references to adapt, not finished answers for every screen or brand.",
      "Use the search and category controls to narrow the collection when you have a particular style in mind. Compare the colors and transition in the preview, then open the gradient maker to change the angle, type, or individual stops. Copy the resulting CSS into your project and check it with the actual element dimensions. A gradient that looks balanced in a wide preview can feel different in a narrow mobile component, so review responsive layouts before release.",
      "If you are choosing a gradient for text or controls, review contrast at every point where the content overlays the color. For complex backgrounds, a plain color contrast calculation may not represent the true result across the entire element. Consider placing a solid or semi-opaque surface behind small text. You can find coordinating base colors in the palette library or sample an existing image with the color picker. After choosing colors, the contrast checker can help assess solid pairs used in the design. The gradient collection is meant to speed up inspiration and experimentation; refine each example to match your own design tokens, accessibility needs, and browser support targets."
    ],
    faqs: ["Can I copy a gradient from the library? Yes. Click a preview to copy its CSS, or open the gradient's page for CSS and Tailwind code.", "How do I find a particular style? Use the library search or category filters to narrow the examples.", "Can I edit library colors? Yes. Continue to the gradient maker and adjust the gradient settings.", "Do example gradients guarantee readable text? No. Check readability and contrast in the final layout."]
  }
} as const;

type SeoPage = keyof typeof pages;

// Pages that are interactive tools get WebApplication structured data.
const webApps: Partial<Record<SeoPage, string>> = {
  home: "ColorHexKit Color Palette Generator",
  picker: "ColorHexKit Color Picker",
  gradients: "ColorHexKit CSS Gradient Maker",
  contrast: "ColorHexKit Contrast Checker",
};

export function SeoContent({ page }: { page: SeoPage }) {
  const item = pages[page];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://colorhexkit.vercel.app";
  const path = page === "home" ? "" : page === "library" ? "gradients/all" : page === "contrast" ? "contrast-checker" : page;
  const url = `${baseUrl}/${path}`;
  const breadcrumb = [{ "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` }, { "@type": "ListItem", position: 2, name: item.title, item: url }];
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: item.faqs.map((entry) => { const [question, answer] = entry.split("?"); return { "@type": "Question", name: `${question}?`, acceptedAnswer: { "@type": "Answer", text: answer.trim() } }; }) };
  const appName = webApps[page];
  const webApp = appName && { "@context": "https://schema.org", "@type": "WebApplication", name: appName, url, description: item.intro, applicationCategory: "DesignApplication", operatingSystem: "Any (web browser)", browserRequirements: "Requires JavaScript", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } };
  return <section className="container mx-auto max-w-5xl px-4 py-12 text-muted-foreground" aria-labelledby={`${page}-guide`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumb }, faq, ...(webApp ? [webApp] : [])]) }} />
    <h2 id={`${page}-guide`} className="mb-4 text-2xl font-semibold text-foreground">{item.title}</h2>
    <p className="mb-4 leading-7">{item.intro}</p>
    {item.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)} className="mb-4 leading-7">{paragraph}</p>)}
    <h3 className="mb-3 mt-8 text-xl font-semibold text-foreground">Frequently asked questions</h3>
    {item.faqs.map((entry) => { const [question, answer] = entry.split("?"); return <details key={question} className="border-b border-border py-3"><summary className="cursor-pointer font-medium text-foreground">{question}?</summary><p className="pt-2 leading-7">{answer.trim()}</p></details>; })}
    <nav aria-label="Related color tools" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      <Link className="underline underline-offset-4" href="/picker">Color picker</Link>
      <Link className="underline underline-offset-4" href="/palettes">Color palettes</Link>
      <Link className="underline underline-offset-4" href="/gradients">Gradient maker</Link>
      <Link className="underline underline-offset-4" href="/gradients/all">Gradient library</Link>
      <Link className="underline underline-offset-4" href="/contrast-checker">Contrast checker</Link>
      <Link className="underline underline-offset-4" href="/color">HEX color codes</Link>
    </nav>
  </section>;
}

