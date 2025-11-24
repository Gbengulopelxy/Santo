# Animation System

This document outlines the comprehensive animation system implemented across the landing page.

## Animation Components

### 1. FadeInUp Component
**Location**: `components/animations/FadeInUp.tsx`

Reusable component for fade-in-up animations on scroll using Intersection Observer.

**Usage**:
```tsx
import FadeInUp from "@/components/animations/FadeInUp"

<FadeInUp delay={0.2} duration={0.6}>
  <div>Your content</div>
</FadeInUp>
```

**Props**:
- `children`: ReactNode - Content to animate
- `delay`: number (default: 0) - Animation delay in seconds
- `duration`: number (default: 0.6) - Animation duration in seconds
- `className`: string - Additional CSS classes
- `once`: boolean (default: true) - Animate only once
- `amount`: number (default: 0.3) - Visibility threshold (0-1)

### 2. Parallax Component
**Location**: `components/animations/Parallax.tsx`

Parallax scrolling effect for elements.

**Usage**:
```tsx
import Parallax from "@/components/animations/Parallax"

<Parallax speed={0.5} direction="up">
  <div>Your content</div>
</Parallax>
```

**Props**:
- `children`: ReactNode - Content to apply parallax
- `speed`: number (default: 0.5) - Parallax speed multiplier
- `className`: string - Additional CSS classes
- `direction`: "up" | "down" (default: "up") - Parallax direction

### 3. AnimatedCounter Component
**Location**: `components/animations/AnimatedCounter.tsx`

Number counting animation for statistics.

**Usage**:
```tsx
import AnimatedCounter from "@/components/animations/AnimatedCounter"

<AnimatedCounter 
  end={500} 
  suffix="+" 
  duration={2}
  decimals={0}
/>
```

**Props**:
- `end`: number - Target number
- `duration`: number (default: 2) - Animation duration in seconds
- `suffix`: string - Text after number (e.g., "+", "%")
- `prefix`: string - Text before number
- `decimals`: number (default: 0) - Decimal places
- `className`: string - Additional CSS classes

## Animation Features

### 1. Smooth Scroll Behaviors
**Location**: `app/globals.css`

- Enhanced smooth scrolling with `scroll-behavior: smooth`
- Respects `prefers-reduced-motion` for accessibility
- Scroll padding for fixed navigation

**Implementation**:
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}
```

### 2. Fade-in-up on Scroll (Intersection Observer)
**Implementation**: FadeInUp component uses Framer Motion's `useInView` hook

- Triggers when element enters viewport
- Configurable delay and duration
- Respects `once` prop to prevent re-animation
- Custom easing for smooth animation

### 3. Hover State Transitions (0.3s ease)
**Location**: `app/globals.css` and component styles

**CSS Classes**:
- `.transition-hover` - Standard 0.3s ease transition
- `.btn-micro` - Button micro-interactions
- `.card-micro` - Card micro-interactions

**Button Transitions**:
- Scale: 1.05 on hover
- TranslateY: -2px on hover
- Shadow enhancement
- Active state: scale 0.98

**Card Transitions**:
- TranslateY: -4px on hover
- Shadow enhancement
- Border color changes

### 4. Parallax Effects on Hero Section
**Location**: `components/VideoHero.tsx`

- Video background moves at different speed than content
- Uses Framer Motion's `useScroll` and `useTransform`
- Opacity fade as user scrolls
- Smooth parallax movement

**Implementation**:
```tsx
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
```

### 5. Micro-interactions on Buttons and Cards

**Buttons**:
- Hover: Scale 1.05, translateY -2px, enhanced shadow
- Active: Scale 0.98, translateY 0
- Transition: 0.3s cubic-bezier easing

**Cards**:
- Hover: TranslateY -4px, enhanced shadow
- Border color transitions
- Smooth transform animations

**Implementation**:
```css
.btn-micro {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-micro:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

### 6. Number Counting Animations for Statistics
**Location**: `components/animations/AnimatedCounter.tsx`

- Smooth counting animation from 0 to target
- Uses `requestAnimationFrame` for performance
- Ease-out-quart easing function
- Triggers on scroll into view
- Supports decimals, prefixes, and suffixes

**Features**:
- Intersection Observer integration
- Configurable duration
- Smooth easing curves
- Performance optimized

## CSS Animation Utilities

### Keyframe Animations
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Utility Classes
- `.animate-fade-in` - Fade in animation
- `.animate-fade-in-delay` - Fade in with delay
- `.animate-fade-in-up` - Fade in up animation
- `.transition-hover` - Standard hover transition
- `.btn-micro` - Button micro-interactions
- `.card-micro` - Card micro-interactions

## Accessibility

### Reduced Motion Support
All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Performance Optimizations
- Uses `requestAnimationFrame` for smooth animations
- Intersection Observer for scroll-triggered animations
- CSS transforms for hardware acceleration
- `will-change` property where appropriate

## Best Practices

1. **Use FadeInUp for scroll animations**: Consistent fade-in-up effect across components
2. **Apply micro-interactions sparingly**: Use for interactive elements (buttons, cards)
3. **Respect user preferences**: Always check `prefers-reduced-motion`
4. **Optimize performance**: Use CSS transforms instead of position changes
5. **Consistent timing**: Use 0.3s for hover transitions
6. **Smooth easing**: Use cubic-bezier for natural motion

## Component Integration

### Updated Components
- **VideoHero**: Parallax effect on video background
- **About**: AnimatedCounter for statistics
- **Features**: Card micro-interactions
- **CTA**: Button micro-interactions
- **ContactForm**: Button micro-interactions
- **Button**: Enhanced hover states

## Animation Timing

- **Hover transitions**: 0.3s ease
- **Scroll animations**: 0.6s duration
- **Counter animations**: 2s duration (configurable)
- **Parallax**: Smooth, continuous
- **Micro-interactions**: 0.3s cubic-bezier


