# Design Guidelines: Self-Serve Ad Campaign Creation Tool

## Design Approach

**Selected System**: Material Design with adaptations for business SaaS applications

**Justification**: This is a utility-focused, form-heavy application where efficiency, clarity, and trust matter most. Material Design provides excellent patterns for stepped workflows, data visualization, and form interactions that small business owners will find familiar and easy to navigate.

**Core Principles**:
- Progressive disclosure through clear step progression
- Immediate feedback for all user actions
- Scannable information hierarchy
- Touch-friendly, accessible controls

## Typography

**Font Family**: Inter (Primary), Roboto (Fallback) via Google Fonts CDN

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl, font-bold, tracking-tight
- Section Headers: text-3xl md:text-4xl, font-semibold
- Step Titles: text-2xl, font-semibold
- Card Headers: text-xl, font-semibold
- Body Text: text-base, font-normal, leading-relaxed
- Helper Text: text-sm, font-normal
- Metric Labels: text-xs, font-medium, uppercase, tracking-wide
- Metric Values: text-3xl md:text-4xl, font-bold, tabular-nums

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Tight spacing: p-2, gap-2 (form elements)
- Standard spacing: p-4, gap-4 (cards, sections)
- Comfortable spacing: p-6, gap-6 (step containers)
- Generous spacing: p-8, py-12, py-16 (page sections)

**Container Strategy**:
- Landing page: max-w-7xl with full-width hero
- Wizard: max-w-3xl centered for focused form completion
- Dashboard: max-w-7xl for data overview
- Review page: max-w-4xl for readability

**Responsive Breakpoints**: Follow standard Tailwind (sm, md, lg, xl)

## Component Library

### Landing Page Structure

**Hero Section** (py-20 md:py-32):
- Full-width with subtle gradient overlay on background image
- Centered content with max-w-4xl
- Headline + supporting text (max-w-2xl) + primary CTA
- Below hero: Trust indicators row (3-column grid on desktop, stack on mobile) showing "1000+ Businesses", "Easy Setup", "24/7 Support" with icons

**How It Works Section** (py-16 md:py-24):
- 3-column grid (grid-cols-1 md:grid-cols-3, gap-8)
- Each step card: Large number badge, heading, description
- Visual timeline connector on desktop (border-t with positioned elements)

**CTA Section** (py-12 md:py-16):
- Centered content, prominent button with supporting text

### Wizard Interface

**Progress Indicator** (sticky top, bg with shadow):
- Horizontal stepper with 3 steps
- Step states: completed (checkmark), active (numbered), upcoming (numbered, muted)
- Mobile: Compact version showing "Step 2 of 3" text

**Step Container**:
- Card-based (rounded-xl, shadow-lg, p-6 md:p-8)
- Step title at top (text-2xl, mb-6)
- Form sections with logical grouping (space-y-6)
- Navigation footer: Back + Next/Submit buttons (justify-between, pt-6, border-t)

**Form Components**:
- Input fields: Stacked labels (text-sm, font-medium, mb-2), full-width inputs with border, rounded-lg, p-3, focus ring treatment
- Dropdown: Custom select with chevron icon, same styling as inputs
- Radio cards (audience templates): Full-width cards (p-4, border-2, rounded-lg) with hover state, selected state with checkmark
- Slider: Custom range input with value display above thumb, tick marks at intervals (₹10k, ₹20k, ₹30k, ₹40k, ₹50k)
- Helper text: Below inputs (text-sm, mt-1)

### Review Page

**Section Cards**:
- Each info category in separate card (mb-6, p-6, rounded-lg, border)
- Section header (text-lg, font-semibold, mb-4)
- Key-value pairs in 2-column grid on desktop (grid-cols-2, gap-4)
- Edit links for each section (text-sm, font-medium)
- Prominent "Launch Campaign" button at bottom

### Dashboard

**Header Area**:
- Page title + "Create New Campaign" button (justify-between, items-center, mb-8)

**Metrics Cards Grid** (grid-cols-1 md:grid-cols-2 lg:grid-cols-4, gap-6):
- Each metric card: Compact padding (p-4), rounded-lg, border
- Label at top, large value below, trend indicator if applicable
- Responsive: Stack to 2 columns on tablet, 1 on mobile

**Campaign Cards** (space-y-4):
- Full-width cards with horizontal layout on desktop (flex, items-center, justify-between, p-6)
- Left: Campaign name (font-semibold) + status badge
- Right: Metrics row (3-column on desktop: Daily Spend | Clicks | CTR)
- Mobile: Stack vertically with clear sections

**Empty State** (when no campaigns):
- Centered content (py-16), illustration placeholder, heading, description, CTA button

## Navigation

**Top Navigation Bar** (fixed, full-width, border-b, backdrop-blur):
- Container: max-w-7xl, px-4, h-16, items-center
- Logo/Brand on left
- Navigation links center (hidden on mobile, show in hamburger menu)
- User actions right (icon buttons for mobile)

## Interactive Elements

**Buttons**:
- Primary: Large (px-8, py-3, text-base, rounded-lg, font-semibold), full-width on mobile
- Secondary: Same size, border variant
- Icon buttons: Square (p-2), rounded-lg, hover state
- All buttons: Subtle shadow, active state with slight scale

**Cards**: 
- Default: border, rounded-lg, hover state with shadow lift
- Interactive cards: Cursor pointer, transition all

**Form Validation**:
- Inline error messages (text-sm, mt-1) below fields
- Error state: border treatment on inputs
- Success state: Subtle checkmark icon in input

## Animations

**Minimal, purposeful animations**:
- Step transitions: Simple fade + slight slide
- Card hovers: Shadow elevation change (transition-shadow, duration-200)
- Button presses: Scale 95% on active state
- Wizard progress: Smooth checkmark animation on step completion
- NO scroll-triggered animations, NO complex page transitions

## Images

**Hero Section Image**:
- Full-width background image showing small business owners/entrepreneurs working on campaigns
- Image treatment: Subtle gradient overlay (from transparent to semi-opaque) for text readability
- Modern, diverse representation of users
- Should convey "empowerment" and "simplicity"

**Trust/Social Proof** (Optional section after hero):
- Logo grid of well-known businesses using the platform (grayscale treatment)

## Accessibility

- All form inputs with proper labels and ARIA attributes
- Focus indicators on all interactive elements (ring offset pattern)
- Sufficient contrast ratios maintained throughout
- Touch targets minimum 44x44px on mobile
- Keyboard navigation support for wizard (arrow keys, enter to proceed)
- Screen reader announcements for step changes

## Mobile Optimization

- Forms: Single column, full-width inputs
- Wizard: Sticky bottom navigation for actions
- Dashboard: Cards stack vertically with touch-friendly tap areas
- Slider: Larger touch target for thumb control
- Header: Collapsible hamburger menu