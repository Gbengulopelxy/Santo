# Accessibility Implementation - WCAG 2.1 AA Compliance

This document outlines the accessibility features implemented to meet WCAG 2.1 AA compliance standards.

## WCAG 2.1 AA Compliance Checklist

### 1. Perceivable

#### 1.1 Text Alternatives (Level A)
- ✅ **All images have descriptive alt text**
  - Hero section images: Descriptive alt text provided
  - Company logos: Company name in alt text
  - Decorative images: `aria-hidden="true"` where appropriate
  - Icon images: Descriptive labels or aria-labels

#### 1.2 Time-based Media (Level A)
- ✅ **Video content**: 
  - Video has `aria-label` with descriptive title
  - Poster image fallback provided
  - Autoplay is muted and can be paused
  - Subtitles/captions support ready (track element)

#### 1.3 Adaptable (Level A)
- ✅ **Information and relationships**:
  - Proper heading hierarchy (h1 → h2 → h3)
  - Semantic HTML elements used throughout
  - Lists properly structured
  - Form labels associated with inputs

#### 1.4 Distinguishable (Level AA)
- ✅ **Color contrast**: 
  - Text meets 4.5:1 contrast ratio for normal text
  - Large text meets 3:1 contrast ratio
  - Focus indicators have sufficient contrast
- ✅ **Text resizing**: 
  - Text can be resized up to 200% without loss of functionality
  - Responsive design adapts to text size changes
- ✅ **Images of text**: 
  - No images of text used (all text is actual text)
- ✅ **Focus indicators**: 
  - All interactive elements have visible focus indicators
  - Focus outline: 2px solid primary color with 2px offset

### 2. Operable

#### 2.1 Keyboard Accessible (Level A)
- ✅ **Keyboard navigation**:
  - All functionality available via keyboard
  - No keyboard traps
  - Tab order is logical and intuitive
  - Skip to main content link provided
- ✅ **Keyboard shortcuts**:
  - Escape key closes modals/dialogs
  - Enter/Space activates buttons and links
  - Tab navigation works throughout

#### 2.2 Enough Time (Level A)
- ✅ **No time limits**: 
  - No time-based content that requires user interaction
  - Cookie banner can be dismissed
  - No auto-updating content that requires user attention

#### 2.3 Seizures and Physical Reactions (Level AAA)
- ✅ **No flashing content**: 
  - No content flashes more than 3 times per second
  - Animations respect `prefers-reduced-motion`

#### 2.4 Navigable (Level AA)
- ✅ **Skip links**: 
  - "Skip to main content" link provided
  - Visible on keyboard focus
- ✅ **Page titles**: 
  - Descriptive page titles
  - Template for consistent titles
- ✅ **Focus order**: 
  - Logical tab order throughout
  - Focus management in modals
- ✅ **Link purpose**: 
  - Link text is descriptive
  - ARIA labels where needed
  - Context provided for ambiguous links

#### 2.5 Input Modalities (Level AA)
- ✅ **Pointer gestures**: 
  - All functionality available without complex gestures
  - Touch targets are at least 44x44px
- ✅ **Pointer cancellation**: 
  - No accidental activations
  - Confirmation for destructive actions

### 3. Understandable

#### 3.1 Readable (Level A)
- ✅ **Language**: 
  - `lang="en"` attribute on html element
  - Language changes marked where applicable

#### 3.2 Predictable (Level AA)
- ✅ **On focus**: 
  - No context changes on focus
- ✅ **On input**: 
  - No unexpected context changes
  - Form validation provides clear feedback
- ✅ **Consistent navigation**: 
  - Navigation is consistent across pages
  - Components behave consistently

#### 3.3 Input Assistance (Level AA)
- ✅ **Error identification**: 
  - Form errors are clearly identified
  - Error messages are descriptive
  - Visual and text-based error indicators
- ✅ **Labels or instructions**: 
  - All form inputs have associated labels
  - Instructions provided where needed
  - Placeholder text used appropriately
- ✅ **Error suggestion**: 
  - Suggestions provided for form errors
  - Real-time validation feedback

### 4. Robust

#### 4.1 Compatible (Level A)
- ✅ **Parsing**: 
  - Valid HTML5 markup
  - No duplicate IDs
  - Proper nesting of elements
- ✅ **Name, Role, Value**: 
  - ARIA attributes used correctly
  - Custom components have proper roles
  - States and properties communicated to assistive technology

## Implementation Details

### Focus Indicators

All interactive elements have visible focus indicators:

```css
*:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Skip to Main Content

A "Skip to main content" link is provided for keyboard users:

```tsx
<a href="#main-content" className="skip-to-main">
  Skip to main content
</a>
```

### Keyboard Navigation

- **Tab**: Navigate through interactive elements
- **Shift + Tab**: Navigate backwards
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and dialogs
- **Arrow keys**: Navigate within components (where applicable)

### ARIA Labels and Roles

#### Navigation
- `aria-label="Toggle menu"` on mobile menu button
- `aria-expanded` on collapsible menus
- `aria-controls` linking buttons to controlled elements

#### Modals and Dialogs
- `role="dialog"` on modal containers
- `aria-modal="true"` on modal dialogs
- `aria-labelledby` and `aria-describedby` for dialog content

#### Forms
- All inputs have associated `<label>` elements
- `aria-required="true"` on required fields
- `aria-invalid` and `aria-describedby` for error states
- `aria-live="polite"` for dynamic content updates

#### Images
- Descriptive `alt` text for all images
- `aria-hidden="true"` for decorative images
- Empty `alt=""` for purely decorative images

### Heading Hierarchy

Proper heading hierarchy is maintained:

```
h1 - Main page title (Hero section)
  h2 - Section titles (About, Features, etc.)
    h3 - Subsection titles
      h4 - Sub-subsection titles
```

### Color Contrast

All text meets WCAG AA contrast requirements:
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+): 3:1 contrast ratio
- Focus indicators: High contrast

### Reduced Motion

Animations respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Screen Reader Support

- Semantic HTML elements used throughout
- ARIA labels for icon-only buttons
- Descriptive link text
- Form labels properly associated
- Error messages announced to screen readers
- Live regions for dynamic content

## Testing

### Automated Testing
- Use tools like:
  - axe DevTools
  - WAVE (Web Accessibility Evaluation Tool)
  - Lighthouse Accessibility audit
  - Pa11y

### Manual Testing
1. **Keyboard Navigation**:
   - Tab through all interactive elements
   - Verify focus indicators are visible
   - Test all functionality with keyboard only

2. **Screen Reader Testing**:
   - Test with NVDA (Windows)
   - Test with JAWS (Windows)
   - Test with VoiceOver (macOS/iOS)
   - Verify all content is announced correctly

3. **Visual Testing**:
   - Test with browser zoom at 200%
   - Test with high contrast mode
   - Test with color blindness simulators

4. **Form Testing**:
   - Submit forms with errors
   - Verify error messages are clear
   - Test with screen reader

## Components with Accessibility Features

### Header/Navigation
- Skip to main content link
- Keyboard accessible menu
- ARIA labels on all interactive elements
- Focus management

### Cookie Banner
- Dialog role with proper ARIA attributes
- Keyboard accessible
- Focus trap within dialog

### Contact Form
- All inputs have labels
- Error messages with ARIA attributes
- Real-time validation feedback
- Required field indicators

### Buttons
- Visible focus indicators
- Keyboard accessible
- ARIA labels where needed
- Proper button semantics

### Images
- Descriptive alt text
- Decorative images marked with aria-hidden
- Proper image sizing

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Maintenance

- Regularly audit with automated tools
- Test with real screen readers
- Keep up with WCAG updates
- Review user feedback
- Test with actual users with disabilities
