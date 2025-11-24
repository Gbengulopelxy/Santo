# Typography System

This document outlines the typography system implemented across the landing page.

## Font Families

### Headings: Montserrat or Inter (Bold, 700-800 weight)
- **Primary**: Montserrat (700, 800)
- **Fallback**: Inter (700, 800)
- **Usage**: All headings (h1, h2, h3, h4, h5, h6)
- **CSS Variable**: `--font-montserrat`
- **Tailwind Class**: `font-heading` (700) or `font-heading-bold` (800)

### Body: Inter or Open Sans (Regular, 400 weight)
- **Primary**: Inter (400, 500, 600)
- **Fallback**: Open Sans (400, 500, 600)
- **Usage**: All body text, paragraphs, descriptions
- **CSS Variables**: `--font-inter`, `--font-open-sans`
- **Tailwind Class**: `font-body` (400), `font-body-medium` (500), `font-body-semibold` (600)

### Accent: Playfair Display (Elegant touches)
- **Weights**: 400, 500, 600, 700
- **Usage**: Elegant accent text, special quotes, decorative elements
- **CSS Variable**: `--font-playfair`
- **Tailwind Classes**: 
  - `font-accent` (400)
  - `font-accent-medium` (500)
  - `font-accent-semibold` (600)
  - `font-accent-bold` (700)

## Font Configuration

### Layout Setup (`app/layout.tsx`)
```tsx
// Body fonts
const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
})

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
})

// Heading fonts
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
})

// Accent font
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})
```

### Tailwind Config (`tailwind.config.ts`)
```typescript
fontFamily: {
  sans: ["var(--font-inter)", "var(--font-open-sans)", "system-ui", "sans-serif"],
  heading: ["var(--font-montserrat)", "var(--font-inter)", "system-ui", "sans-serif"],
  accent: ["var(--font-playfair)", "serif"],
  inter: ["var(--font-inter)", "sans-serif"],
  "open-sans": ["var(--font-open-sans)", "sans-serif"],
  montserrat: ["var(--font-montserrat)", "sans-serif"],
  playfair: ["var(--font-playfair)", "serif"],
}
```

## Usage Guidelines

### Headings
```tsx
// H1 - Extra Bold (800)
<h1 className="font-heading-bold text-4xl">Main Heading</h1>

// H2 - Bold (700)
<h2 className="font-heading text-3xl">Section Heading</h2>

// H3 - Bold (700)
<h3 className="font-heading text-2xl">Subsection Heading</h3>
```

### Body Text
```tsx
// Regular body text (400)
<p className="font-body text-base">Regular paragraph text</p>

// Medium weight (500)
<p className="font-body-medium text-base">Emphasized text</p>

// Semibold (600)
<p className="font-body-semibold text-base">Strong text</p>
```

### Accent Text
```tsx
// Elegant accent text
<span className="font-accent-bold text-2xl">Elegant Quote</span>

// Decorative text
<div className="font-accent text-lg">Special Message</div>
```

## Component Updates

### Updated Components
- **HeroContent**: Main headline uses `font-heading-bold`, Forbes badge uses `font-accent-semibold`
- **ContactForm**: All headings use `font-heading` or `font-heading-bold`
- **Footer**: Section headings use `font-heading`
- **CTA**: Headings use `font-heading-bold`
- **About**: Main heading uses `font-heading-bold`, accent text uses `font-accent-bold`

## Typography Utilities

### CSS Classes (in `globals.css`)
- `.font-heading` - Montserrat/Inter, weight 700
- `.font-heading-bold` - Montserrat/Inter, weight 800
- `.font-body` - Inter/Open Sans, weight 400
- `.font-body-medium` - Inter/Open Sans, weight 500
- `.font-body-semibold` - Inter/Open Sans, weight 600
- `.font-accent` - Playfair Display, weight 400
- `.font-accent-medium` - Playfair Display, weight 500
- `.font-accent-semibold` - Playfair Display, weight 600
- `.font-accent-bold` - Playfair Display, weight 700

### Default Styles
- All `h1-h6` elements automatically use Montserrat/Inter with appropriate weights
- All body text (`p`, `span`, `div`, etc.) uses Inter/Open Sans with 400 weight
- Letter spacing: Headings have `-0.02em` for tighter spacing
- Line height: Headings use `1.2` for optimal readability

## Best Practices

1. **Headings**: Always use `font-heading` or `font-heading-bold` for consistency
2. **Body Text**: Use default body font (Inter/Open Sans) for all paragraphs and descriptions
3. **Accent Text**: Use `font-accent` sparingly for elegant touches (quotes, special messages, decorative text)
4. **Weights**: 
   - Use 800 for main hero headings
   - Use 700 for section headings
   - Use 400 for body text
   - Use 500-600 for emphasis
5. **Responsive**: Font sizes should be responsive using Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, etc.)

## Font Loading

All fonts are loaded with `display: "swap"` for optimal performance, ensuring text remains visible during font loading.

