# Design Guidelines: macOS-Inspired Portfolio

## Design Approach
**Reference-Based: macOS Big Sur/Monterey Aesthetic**
This portfolio leverages the familiar macOS interface as a creative framework for showcasing professional work. The design should evoke the polish, clarity, and attention to detail that Apple is known for while maintaining personality and warmth.

## Core Design Elements

### A. Color Palette

**Light Mode (Primary)**
- Background: 245 8% 97% (soft warm white)
- Window backgrounds: 0 0% 100% (pure white)
- Primary text: 220 13% 13% (deep charcoal)
- Secondary text: 220 9% 46% (medium gray)
- Tertiary text: 220 9% 70% (light gray)
- Accent: 211 100% 50% (macOS blue for interactive elements)
- Borders: 220 13% 91% (subtle gray borders)
- Window chrome: 0 0% 98% with slight transparency
- Dock background: 0 0% 100% with 20% opacity blur

**Shadows & Depth**
- Window shadows: 0 0% 0% at 8% opacity, 0px 12px 48px with 24px blur
- Dock shadow: 0 0% 0% at 15% opacity, 0px 8px 32px
- Button hover states: 220 13% 95% (light gray)

### B. Typography

**Font Stack**
- Primary: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif
- Monospace (if needed): "SF Mono", Monaco, monospace

**Type Scale**
- Hero/Welcome: 3rem (48px) font-weight 300 (light)
- Section Headers: 1.5rem (24px) font-weight 300
- Subsection Headers: 1rem (16px) font-weight 500
- Body: 0.875rem (14px) font-weight 400
- Small/Meta: 0.75rem (12px) font-weight 400
- Line height: 1.6 for body, 1.2 for headings

### C. Layout System

**Spacing Primitives**
Use Tailwind units: 2, 4, 6, 8, 10, 12 as core spacing values
- Component padding: p-10 (40px) for window content
- Section gaps: space-y-6 or space-y-8
- Card/Item gaps: gap-6
- Tight spacing: p-2, p-4 for compact UI

**Window System**
- Default window size: 700×500px
- Minimum window size: 400×300px
- Window title bar height: 40px
- Window border radius: 12px (rounded-xl)
- Window chrome blur: backdrop-blur-xl

**Dock**
- Height: 80px
- Icon size: 56×56px
- Spacing between icons: 12px
- Dock padding: 12px
- Border radius: 20px
- Position: Fixed bottom, centered with 16px margin

### D. Component Library

**Window Chrome**
- Traffic lights (close/minimize/maximize): 12px circles, 6px spacing
- Close: 255 69 58 (red), Minimize: 255 204 0 (yellow), Maximize: 40 205 65 (green)
- Title bar: semi-transparent with blur, centered title text
- Active window: full opacity chrome, Inactive: 60% opacity

**Dock Icons**
- Rounded square icons (16px radius)
- Active indicator: 4px wide subtle line below icon
- Hover effect: scale(1.2) with 200ms transition
- Background: light gray on hover

**Menu Bar**
- Height: 28px
- Background: semi-transparent white with blur
- Text size: 13px font-weight 500
- Dropdown menus: white background, 8px border radius, subtle shadow

**Buttons**
- Primary: bg-gray-900 text-white, 8px border radius, py-2.5 px-6
- Hover: bg-gray-800
- Secondary: bg-gray-100 text-gray-900
- All transitions: 200ms ease

**Content Cards (Projects)**
- White background with subtle border
- 8px border radius
- 6px bottom border on hover
- Smooth transitions (300ms)

**Forms (Contact)**
- Input fields: border-gray-200, rounded-lg, px-4 py-3
- Focus state: border-blue-500, ring-2 ring-blue-100
- Labels: text-sm font-medium text-gray-700, mb-2

### E. Animations

**Window Interactions**
- Opening: fade-in + scale(0.95 to 1) over 200ms
- Closing: fade-out + scale(1 to 0.95) over 150ms
- Minimize: scale down to dock position over 300ms with ease-in-out
- Drag: cursor changes to grab/grabbing, smooth position updates

**Dock Behaviors**
- Icon hover: scale(1.2) + translateY(-8px) over 200ms
- Active bounce: subtle spring animation on click
- Magnification: optional subtle scale on nearby icons

**Micro-interactions**
- Button hover: 150ms background color transition
- Menu dropdowns: 200ms slide-down with fade
- Window focus: subtle shadow intensity increase

**Performance**
- Use transform and opacity for animations (GPU-accelerated)
- Minimize use of box-shadow animations
- Debounce drag events for smooth performance

## Special Considerations

**Window Management**
- Active window has darker shadow and full opacity
- Inactive windows: slightly reduced opacity (95%)
- Windows stack with proper z-index management
- Draggable from title bar only

**Content Sections**
- Welcome: Center-aligned, minimal, inviting with emoji
- About: Left-aligned prose with principle cards
- Work: Timeline-style with clear hierarchy
- Projects: Grid of cards with hover states
- Resume: Structured sections with tags for skills
- Contact: Clean form with validation states

**Accessibility**
- Maintain 4.5:1 contrast ratios minimum
- Focus states visible on all interactive elements
- Keyboard navigation for window management
- Screen reader labels for icon-only buttons

**Responsive Behavior** (if implemented)
- Mobile: Switch to single-window fullscreen mode
- Dock transforms to bottom navigation
- Menu bar simplifies or hides
- Windows stack vertically rather than overlap

This design creates a polished, professional portfolio that leverages the familiarity and elegance of macOS while showcasing creative technical execution.