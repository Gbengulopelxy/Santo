# Video Container Specifications

This document outlines the video container specifications and implementation.

## Specifications

### 1. Background Video with Subtle Overlay
- **Overlay Opacity**: 0.7 (70% opacity)
- **Overlay Type**: Solid black overlay for consistent darkening
- **Configurable**: Can be adjusted via `overlayOpacity` prop (default: 0.7)

### 2. Autoplay, Loop, Muted
- **Autoplay**: Enabled for immediate playback
- **Loop**: Video loops continuously
- **Muted**: Required for autoplay in most browsers
- **PlaysInline**: Ensures inline playback on mobile devices

### 3. Fallback Poster Image
- **Poster Image**: Shown before video loads and as fallback
- **Error Handling**: Automatically falls back to poster on video load error
- **Accessibility**: Proper alt text and aria labels
- **Lazy Loading**: Poster image uses `loading="lazy"` for performance

### 4. Responsive Scaling
- **Object Fit**: `cover` ensures video fills container
- **Responsive Scaling**: Scale adjustments for different screen sizes:
  - Mobile: `scale-105` (slight zoom to prevent letterboxing)
  - Tablet: `scale-100` (normal scale)
  - Desktop: `scale-105` (slight zoom for better coverage)
  - Large screens: `scale-100` (normal scale)
- **Min Dimensions**: Ensures video always covers full container

### 5. Lazy Loading for Performance
- **Preload Strategy**: `preload="metadata"` - loads only metadata initially
- **Intersection Observer**: Monitors when video enters viewport
- **Conditional Loading**: Video loads based on:
  - Viewport visibility
  - Connection speed
  - User preferences (reduced motion, data saver)
- **Poster Image**: Uses native `loading="lazy"` attribute

### 6. Business/Professional Environment
- **Video Content**: Should showcase:
  - Professional business environment
  - Strategy meetings
  - Corporate growth scenes
  - Business professionals
  - Modern office spaces
- **Default Title**: "Background video showcasing professional business environment, strategy meetings, and corporate growth"

## Implementation

### Component: `VideoBackground.tsx`

**Location**: `/components/shared/VideoBackground.tsx`

**Props**:
```typescript
interface VideoBackgroundProps {
  src: string                    // Video file path
  poster?: string                // Poster image path (fallback)
  title?: string                 // Accessibility title
  overlay?: boolean              // Show overlay (default: true)
  overlayOpacity?: number        // Overlay opacity (default: 0.7)
  children?: React.ReactNode     // Content to display over video
}
```

**Usage**:
```tsx
<VideoBackground
  src="/videos/business-video.mp4"
  poster="/images/hero-poster.png"
  title="Professional business environment video"
  overlay={true}
  overlayOpacity={0.7}
>
  <HeroContent />
</VideoBackground>
```

## Performance Optimizations

### 1. Conditional Playback
- Checks for data saver mode
- Respects `prefers-reduced-motion`
- Detects slow connections (2g, slow-2g)
- Falls back to poster image when appropriate

### 2. Loading Strategy
- **Preload**: `metadata` only (not full video)
- **Intersection Observer**: Loads when in viewport
- **Error Handling**: Graceful fallback to poster

### 3. Responsive Behavior
- Scales appropriately for different screen sizes
- Maintains aspect ratio with `object-fit: cover`
- Prevents letterboxing on mobile devices

## Accessibility

- **ARIA Labels**: Proper `aria-label` and `title` attributes
- **Screen Reader Support**: Fallback text for unsupported browsers
- **Reduced Motion**: Respects user preferences
- **Keyboard Navigation**: Video doesn't interfere with navigation

## Browser Compatibility

- **Modern Browsers**: Full support with autoplay
- **Mobile Browsers**: Uses `playsInline` for iOS compatibility
- **Older Browsers**: Falls back to poster image
- **No JavaScript**: Shows poster image

## Video File Recommendations

### Format
- **Codec**: H.264 (MP4)
- **Resolution**: 1920x1080 (Full HD)
- **Aspect Ratio**: 16:9
- **File Size**: Under 10MB for fast loading

### Content Guidelines
- **Duration**: 10-30 seconds (loops seamlessly)
- **Subject**: Professional business environment
- **Style**: Modern, clean, professional
- **Lighting**: Well-lit, professional quality
- **Audio**: None (muted for autoplay)

### Poster Image
- **Format**: JPG or PNG
- **Resolution**: 1920x1080
- **File Size**: Under 500KB
- **Content**: Representative frame from video or branded image

## Example Configuration

```tsx
// In HeroSection.tsx
<VideoBackground
  src="/videos/business-strategy-hero.mp4"
  poster="/images/hero-poster.jpg"
  title="Professional business strategy consulting environment"
  overlay={true}
  overlayOpacity={0.7}
>
  <HeroContent />
</VideoBackground>
```

## Testing Checklist

- [ ] Video autoplays on page load
- [ ] Video loops continuously
- [ ] Video is muted
- [ ] Overlay opacity is 0.7
- [ ] Poster image shows before video loads
- [ ] Poster image shows on error
- [ ] Responsive scaling works on all devices
- [ ] Lazy loading works correctly
- [ ] Performance is optimized
- [ ] Accessibility features work
- [ ] Reduced motion is respected



