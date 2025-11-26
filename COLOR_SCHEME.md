# Color Scheme Implementation

This document outlines the color scheme changes implemented across the landing page.

## Color Palette

### Primary Colors
- **Professional Blue**: `#0066CC` (HSL: 210 100% 40%)
  - Used for: Primary buttons, links, accents, navigation highlights
  - Tailwind: `primary` (via CSS variables)

### Secondary Colors (CTAs)
- **Gold/Orange**: `#FF9900` (HSL: 36 100% 50%)
  - Used for: All Call-to-Action buttons, primary CTAs, conversion-focused elements
  - Tailwind: `secondary` (via CSS variables)

### Neutral Colors
- **Sophisticated Grays**:
  - `gray-50`: Light backgrounds, subtle gradients
  - `gray-100`: Hover states, light borders
  - `gray-200`: Borders, dividers
  - `gray-300`: Input borders
  - `gray-400`: Placeholder text, subtle text
  - `gray-600`: Secondary text, descriptions
  - `gray-700`: Body text
  - `gray-900`: Headings, primary text

### Background Colors
- **White**: `#FFFFFF` - Primary background
- **Gradient Backgrounds**: 
  - `from-white to-gray-50` - Subtle section transitions
  - `from-gray-50 via-white to-gray-50` - Card backgrounds

### Forbes Brand Colors
- **Forbes Blue**: `#0066CC` - Used for Forbes branding elements
- Applied to: Forbes logo, Forbes Business Council badges, Forbes-related credentials

## Component Updates

### Navigation
- Background: White with glassmorphism (`bg-white/95 backdrop-blur-md`)
- Text: Gray-700 for links, Primary blue for hover states
- CTA Button: Gold/Orange (`secondary`)

### Hero Section
- Text: White (for contrast against video background)
- CTA Button: Gold/Orange (`secondary`)
- Forbes Badge: Forbes blue background with white text

### Contact Form
- Background: White to gray-50 gradient
- Input Fields: White background, gray borders
- Text: Gray-900 for labels, gray-600 for descriptions
- Submit Button: Gold/Orange (`secondary`)

### Footer
- Background: White to gray-50 gradient
- Text: Gray-900 for headings, gray-600 for body
- Buttons: Gold/Orange for primary actions, Primary blue for secondary

### CTA Components
- Background: White with subtle gray gradients
- Text: Gray-900 for headings, gray-600 for descriptions
- Buttons: Gold/Orange (`secondary`) for all CTAs

## CSS Variables

Updated in `app/globals.css`:
```css
--primary: 210 100% 40%; /* Professional Blue #0066CC */
--primary-foreground: 0 0% 100%; /* White */
--secondary: 36 100% 50%; /* Gold/Orange #FF9900 */
--secondary-foreground: 0 0% 100%; /* White */
```

## Tailwind Config

Added custom Forbes colors in `tailwind.config.ts`:
```typescript
"forbes-blue": "#0066CC",
"forbes-gold": "#FF9900",
"forbes-dark": "#1A1A1A",
```

## Usage Guidelines

1. **Primary Actions**: Use `secondary` (gold/orange) for all CTAs and conversion-focused buttons
2. **Secondary Actions**: Use `primary` (blue) for links, navigation, and informational buttons
3. **Text Hierarchy**: 
   - Headings: `text-gray-900`
   - Body: `text-gray-700`
   - Descriptions: `text-gray-600`
   - Placeholders: `text-gray-400`
4. **Backgrounds**: Use white as primary, with subtle gray gradients for depth
5. **Forbes Branding**: Use `forbes-blue` for all Forbes-related elements

## Migration Notes

- All dark theme backgrounds (`bg-[#0f172a]`, `bg-[#1e293b]`) replaced with white/gray
- All `text-white` replaced with appropriate gray shades
- All `text-slate-*` replaced with `text-gray-*`
- All `border-slate-*` replaced with `border-gray-*`
- All primary CTAs changed from `bg-primary` to `bg-secondary` (gold/orange)



