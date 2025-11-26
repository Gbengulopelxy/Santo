# Decision Points Implementation

This document explains the three decision points implemented in the landing page.

## 1. VAT Decision Point (`PricingDisplay`)

**Location**: `/components/PricingDisplay.tsx`

**Decision Flow**:
- **Condition**: When user selects a country that requires VAT (UK, Isle of Man, Jersey)
- **Question**: "Is VAT?" - Should VAT be included in pricing?
- **Options**:
  - **YES**: Include VAT (20%) - Prices show with VAT added
  - **NO**: Exclude VAT - Prices show without VAT
- **State Management**: Uses `DecisionContext` (`vatDecision`)
- **Behavior**:
  - If VAT decision is `null` and country requires VAT → Shows VAT decision card
  - Once decision is made → Hides decision card, shows pricing with/without VAT
  - VAT amount is calculated dynamically (20% of base price)
  - Legal disclaimers shown based on decision

**Implementation**:
```tsx
const { vatDecision, setVatDecision } = useDecision()
const includeVAT = vatDecision
```

---

## 2. Form Validation Decision Point (`ContactForm` → `Footer`)

**Location**: 
- `/components/ContactForm.tsx` (tracks completion)
- `/components/Footer.tsx` (conditionally renders)

**Decision Flow**:
- **Condition**: Are all required form fields complete?
- **Required Fields**:
  - Full Name (min 2 characters)
  - Email (valid email format)
  - Message (min 10 characters)
  - GDPR Consent (must be checked)
- **Behavior**:
  - **If YES (Complete)**: Footer section is fully visible with all features
  - **If NO (Incomplete)**: Footer shows a message: "Complete the contact form above to access the footer section with additional resources."
- **State Management**: Uses `DecisionContext` (`isFormComplete`)
- **Real-time Tracking**: Form completion is tracked in real-time using `useEffect` watching form fields

**Implementation**:
```tsx
// In ContactForm.tsx
useEffect(() => {
  const requiredFieldsComplete = 
    watchedFields.fullName?.length >= 2 &&
    watchedFields.email?.includes("@") &&
    watchedFields.message?.length >= 10 &&
    watchedFields.gdprConsent === true

  setFormComplete(requiredFieldsComplete || false)
}, [watchedFields, setFormComplete])

// In Footer.tsx
const { isFormComplete } = useDecision()
if (!isFormComplete) {
  return <FooterPlaceholder />
}
```

---

## 3. Legal Compliance Decision Point (`ContactForm` → `LegalComplianceSidebar`)

**Location**:
- `/components/ContactForm.tsx` (checkbox trigger)
- `/components/LegalComplianceSidebar.tsx` (conditional sidebar)

**Decision Flow**:
- **Condition**: Does user want to review legal terms?
- **Trigger**: "I have read and agree to the Terms of Service and Legal Terms & Conditions" checkbox
- **Behavior**:
  - **If YES (Checkbox checked)**: 
    - Opens primary sidebar with full Terms & Conditions
    - Shows detailed legal information:
      - Service Agreement
      - Payment Terms
      - Cancellation Policy
      - Limitation of Liability
      - Privacy & Data Protection
    - User can accept terms or close sidebar
  - **If NO (Checkbox unchecked)**: Standard form flow continues
- **State Management**: Uses `DecisionContext` (`showPrimarySidebar`, `legalComplianceAccepted`)

**Implementation**:
```tsx
// In ContactForm.tsx
<input
  type="checkbox"
  id="termsAccepted"
  onChange={(e) => {
    if (e.target.checked) {
      setShowPrimarySidebar(true)
    }
  }}
/>

// In LegalComplianceSidebar.tsx
const { showPrimarySidebar, setShowPrimarySidebar } = useDecision()
```

---

## Context Provider

All decision points are managed through a centralized context:

**Location**: `/contexts/DecisionContext.tsx`

**State Variables**:
- `vatDecision`: `boolean | null` - VAT inclusion decision
- `isFormComplete`: `boolean` - Form completion status
- `legalComplianceAccepted`: `boolean` - Legal terms acceptance
- `showPrimarySidebar`: `boolean` - Sidebar visibility

**Usage**:
```tsx
import { DecisionProvider } from "@/contexts/DecisionContext"
import { useDecision } from "@/contexts/DecisionContext"

// In layout.tsx
<DecisionProvider>
  {children}
</DecisionProvider>

// In components
const { vatDecision, setVatDecision, isFormComplete, ... } = useDecision()
```

---

## Integration Points

1. **Layout** (`/app/layout.tsx`):
   - Wraps entire app with `DecisionProvider`
   - Includes `LegalComplianceSidebar` component

2. **Pricing Display** (`/components/PricingDisplay.tsx`):
   - Uses `vatDecision` from context
   - Updates context when user makes VAT decision

3. **Contact Form** (`/components/ContactForm.tsx`):
   - Tracks form completion in real-time
   - Updates `isFormComplete` in context
   - Triggers legal sidebar when checkbox is checked

4. **Footer** (`/components/Footer.tsx`):
   - Conditionally renders based on `isFormComplete`
   - Shows placeholder message when form is incomplete

---

## User Experience Flow

1. **User visits pricing section**:
   - If in VAT-required country → Sees VAT decision card
   - Makes VAT decision → Pricing updates accordingly

2. **User fills contact form**:
   - As they type, form completion is tracked
   - Footer remains hidden until all required fields are complete
   - Optional: Can check legal compliance checkbox to review terms

3. **User completes form**:
   - Footer becomes fully visible
   - Can access newsletter, social media, Free University, etc.

4. **User reviews legal terms** (optional):
   - Checks legal compliance checkbox
   - Sidebar opens with full terms
   - Can accept or close sidebar

---

## Benefits

- **Progressive Disclosure**: Footer only shows when user is engaged (form complete)
- **Legal Compliance**: Clear terms review process
- **Transparent Pricing**: VAT decision made upfront
- **Better UX**: Users understand why certain sections are hidden
- **Centralized State**: All decisions managed in one place



