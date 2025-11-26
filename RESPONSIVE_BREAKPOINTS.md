# Responsive Breakpoints

This document outlines the responsive breakpoint system used throughout the application.

## Breakpoint Specifications

### Mobile
- **Range**: 320px - 767px
- **Prefix**: None (base/default styles)
- **Use Case**: Small mobile devices, phones in portrait mode
- **Example Classes**: `text-base`, `px-4`, `grid-cols-1`

### Tablet
- **Range**: 768px - 1023px
- **Prefix**: `md:`
- **Use Case**: Tablets, large phones in landscape mode
- **Example Classes**: `md:text-lg`, `md:px-6`, `md:grid-cols-2`

### Desktop
- **Range**: 1024px - 1439px
- **Prefix**: `lg:`
- **Use Case**: Laptops, small desktop screens
- **Example Classes**: `lg:text-xl`, `lg:px-8`, `lg:grid-cols-3`

### Large Desktop
- **Range**: 1440px+
- **Prefix**: `xl:`
- **Use Case**: Large desktop monitors, wide screens
- **Example Classes**: `xl:text-2xl`, `xl:px-12`, `xl:grid-cols-4`

### Extra Large Desktop (Optional)
- **Range**: 1920px+
- **Prefix**: `2xl:`
- **Use Case**: Very large monitors, 4K displays
- **Example Classes**: `2xl:text-3xl`, `2xl:px-16`, `2xl:max-w-7xl`

## Tailwind Configuration

The breakpoints are configured in `tailwind.config.ts`:

```typescript
screens: {
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1440px',  // Large Desktop
  '2xl': '1920px', // Extra Large Desktop
}
```

## Usage Guidelines

### Mobile-First Approach
Always design mobile-first, then add larger breakpoint styles:

```tsx
// ✅ Good: Mobile-first
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Content
</div>

// ❌ Bad: Desktop-first
<div className="text-xl lg:text-lg md:text-base text-sm">
  Content
</div>
```

### Common Patterns

#### Typography Scaling
```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  Heading
</h1>
```

#### Grid Layouts
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {/* Grid items */}
</div>
```

#### Spacing
```tsx
<section className="px-4 md:px-6 lg:px-8 xl:px-12 py-8 md:py-12 lg:py-16">
  Content
</section>
```

#### Visibility
```tsx
{/* Show on mobile only */}
<div className="md:hidden">Mobile Content</div>

{/* Show on tablet and up */}
<div className="hidden md:block">Tablet+ Content</div>

{/* Show on desktop and up */}
<div className="hidden lg:block">Desktop+ Content</div>
```

#### Container Widths
```tsx
<div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
  Content
</div>
```

## Component Examples

### Navigation
```tsx
{/* Mobile menu button */}
<button className="lg:hidden">Menu</button>

{/* Desktop navigation */}
<nav className="hidden lg:flex">
  Navigation Links
</nav>
```

### Hero Section
```tsx
<section className="h-screen flex items-center justify-center px-4 md:px-6 lg:px-8">
  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
    Hero Title
  </h1>
</section>
```

### Cards Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  {/* Cards */}
</div>
```

### Forms
```tsx
<form className="space-y-4 md:space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Form fields */}
  </div>
</form>
```

## Testing

### Browser DevTools
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test at these viewport widths:
   - 320px (Mobile - smallest)
   - 375px (Mobile - iPhone)
   - 768px (Tablet - start)
   - 1024px (Desktop - start)
   - 1440px (Large Desktop - start)
   - 1920px (Extra Large)

### Responsive Design Checklist
- [ ] Content is readable at 320px width
- [ ] Navigation works on mobile
- [ ] Forms are usable on touch devices
- [ ] Images scale appropriately
- [ ] Text doesn't overflow containers
- [ ] Buttons are large enough for touch (min 44x44px)
- [ ] Spacing is appropriate at all breakpoints
- [ ] Grid layouts adapt correctly
- [ ] Modals/dialogs fit on screen
- [ ] No horizontal scrolling

## Common Issues and Solutions

### Issue: Content overflowing on mobile
**Solution**: Use `overflow-hidden` or `overflow-x-auto` on containers

### Issue: Text too small on mobile
**Solution**: Ensure minimum font size of 16px for body text

### Issue: Buttons too small for touch
**Solution**: Use minimum size of 44x44px for touch targets

### Issue: Images not scaling
**Solution**: Use `w-full h-auto` or `object-cover` with proper sizing

### Issue: Grid breaking on tablet
**Solution**: Add `md:` breakpoint styles between mobile and desktop

## Best Practices

1. **Mobile-First**: Always start with mobile styles, then enhance for larger screens
2. **Progressive Enhancement**: Add features for larger screens, don't remove for smaller
3. **Touch Targets**: Ensure interactive elements are at least 44x44px on mobile
4. **Readable Text**: Maintain minimum 16px font size for body text
5. **Consistent Spacing**: Use consistent spacing scale across breakpoints
6. **Test Real Devices**: Test on actual devices when possible
7. **Performance**: Consider loading different image sizes for different breakpoints
8. **Accessibility**: Ensure all breakpoints maintain accessibility standards

## Breakpoint Reference Table

| Breakpoint | Min Width | Prefix | Device Type |
|------------|-----------|--------|-------------|
| Mobile | 320px | (none) | Phones, small devices |
| Tablet | 768px | `md:` | Tablets, large phones |
| Desktop | 1024px | `lg:` | Laptops, small desktops |
| Large Desktop | 1440px | `xl:` | Large monitors |
| Extra Large | 1920px | `2xl:` | 4K displays |

## Media Query Equivalents

If you need to use CSS media queries directly:

```css
/* Mobile (default) */
.element { /* styles */ }

/* Tablet and up */
@media (min-width: 768px) {
  .element { /* styles */ }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element { /* styles */ }
}

/* Large Desktop and up */
@media (min-width: 1440px) {
  .element { /* styles */ }
}

/* Extra Large and up */
@media (min-width: 1920px) {
  .element { /* styles */ }
}
```



