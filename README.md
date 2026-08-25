# ColorKit - Advanced Color Picker & Analyzer

![Banner](public/colorkit-cover.png)

ColorKit is a premium, all-in-one color management platform designed to elevate your creative workflow. Whether you're extracting the perfect shade from an image, generating harmonious palettes, or ensuring your designs meet global accessibility standards, ColorKit provides a seamless, highly visual experience.

Built for designers, developers, and creative minds, it allows you to explore the depths of color theory, test real-time contrast, and manage your color assets with an elegant, animated interface that inspires creativity at every click.

## Key Features

### Advanced Color Picking Tools
- **Image Color Extraction**: Upload images and instantly extract dominant color palettes using a k-means clustering algorithm.
- **Click-to-Pick**: Interactively click anywhere on an uploaded image to pick precise pixel colors.
- **Manual Color Picker**: Highly interactive visual color picker with RGB and HSL sliders.
- **Native Color Input**: Quick access to the browser's native color picker.
- **Instant Color Picker Component**: Pick colors directly from the homepage seamlessly.

### Comprehensive Color Formats & Conversions
- **Technical Formats**: Live conversion between **HEX, RGB, HSL, HSV, and CMYK**.
- **Practical Formats**: Support for CSS RGB/HSL, Android Color Format, Swift UIColor.
- **Easy Export**: One-click copy-to-clipboard functionality for all formats.

### Accessibility & Contrast Checker
- **WCAG Compliance**: Built-in checker for WCAG AA (4.5:1) and AAA (7:1) contrast standards.
- **Real-time Preview**: Test text legibility on colored backgrounds.
- **Smart Recommendations**: Pass/fail feedback and actionable accessibility insights.
- **Color Blindness Simulator**: Simulate how colors appear to people with Protanopia, Deuteranopia, and Tritanopia.

### Color Theory & Palettes
- **Harmonious Combinations**: Generate Complementary, Analogous, Triadic, and Tetradic schemes.
- **Color Variations**: Easily generate shades (adding black), tints (adding white), and tones (adding gray).
- **Curated Palettes & Gradients**: Explore and manage beautiful pre-designed color palettes and gradients.

### Color Analysis
- Color name identification based on hex codes.
- Breakdown of Hue, Saturation, Lightness, and Brightness.
- Temperature analysis (warm/cool) and vibrancy levels.
- Mood associations and best use-case recommendations.

### Beautiful UI/UX
- **Modern Aesthetics**: Animated dark gradient backgrounds, modern glassmorphism navbar, and capsule-style designs.
- **Smooth Interactions**: Framer Motion powered transitions, hover effects, and Lenis smooth scrolling.
- **Responsive Layout**: Fully optimized for mobile, tablet, and desktop devices.
- **Dark Mode**: Beautiful dark theme integration.

## Tech Stack & Architecture

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript (Strict typing for robustness)
- **Styling**: Tailwind CSS & Tailwind-Animate
- **UI Components**: Radix UI (via shadcn/ui) for accessible primitives
- **Animations**: Framer Motion
- **State Management**: Zustand for clean, global state handling
- **Authentication**: Clerk
- **Database/Backend**: Supabase
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **Smooth Scrolling**: Lenis

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/codewithdhruba01/ColorPicker.git
cd ColorPicker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## Reflections on the Project

Analyzing **ColorKit** reveals a meticulously crafted application that stands out for several reasons:

1. **Focus on Accessibility**: Beyond just picking colors, the inclusion of a robust Contrast Checker and Color Blindness Simulator demonstrates a deep understanding of modern web development standards. It encourages designers to create inclusive digital experiences.
2. **Exceptional User Experience**: The integration of `framer-motion` for micro-interactions and `lenis` for smooth scrolling creates a highly polished, "premium" feel. The glassmorphism UI and animated gradient backgrounds make the app visually stunning without compromising performance.
3. **Solid Technical Foundation**: Utilizing Next.js App Router along with TypeScript and Zustand ensures that the application is scalable, maintainable, and type-safe. The modular component structure (`components/color-picker`, `components/home`, etc.) reflects excellent separation of concerns.
4. **Comprehensive Tooling**: Integrating advanced algorithms like K-means clustering for image color extraction directly in the browser using the HTML5 Canvas API showcases a high level of technical competency.
5. **Modern Authentication & Data**: The groundwork laid with `Clerk` and `Supabase` indicates that the app is built to be a fully-fledged SaaS product, capable of saving user preferences, palettes, and historical data.

ColorKit is not just a utility; it is a comprehensive suite for color management that perfectly balances aesthetic appeal with technical depth.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for any bugs or feature requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
   
⭐ If you find this project useful, please give it a star!

**Built with ❤️ by [Dhrubaraj Pati](https://codewithdhruba.vercel.app/) for developers**

[Website](https://codewithdhruba.vercel.app/) • [GitHub](https://github.com/codewithdhruba01) • [Twitter](https://x.com/codewithdhruba)

</div>
