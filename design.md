# Design System & UI/UX Specification — ArcMentor

> **Design Reference:** Inspired by [Interview Scheduling Software Landing Page](https://dribbble.com/shots/27126909-Interview-Scheduling-Software-Landing-Page) by Syed Sanib on Dribbble.

---

## 1. Design Philosophy & Visual Identity

| Attribute | Description |
| :--- | :--- |
| **Overall Aesthetic** | Clean, professional SaaS interface with a premium, high-trust feel. Prioritizes clarity and functional aesthetics — every design choice serves the user's ability to understand the platform immediately. |
| **Design Mood** | Modern, approachable, and confident. Balances a corporate-grade trustworthiness with a subtle warmth via gradient accents and intentional whitespace. |
| **Core Principle** | "Clarity is King" — complex scheduling, matching, and analytics workflows must feel intuitive at a glance. Generous whitespace gives the interface room to breathe, maintaining a premium, uncluttered feel. |

---

## 2. Color Palette

### Primary Palette

| Token | Color | Hex | Usage |
| :--- | :--- | :--- | :--- |
| `--color-primary` | Vivid Blue | `#4F46E5` | Primary CTA buttons, active navigation states, interactive highlights |
| `--color-primary-light` | Soft Indigo | `#818CF8` | Hover states, secondary accents, gradient endpoints |
| `--color-primary-dark` | Deep Indigo | `#3730A3` | Pressed states, header underlines, focused inputs |

### Gradient Accents

| Token | Gradient | Usage |
| :--- | :--- | :--- |
| `--gradient-primary` | `linear-gradient(135deg, #4F46E5, #7C3AED)` | Primary CTA buttons, hero section accent shapes, highlighted badges |
| `--gradient-hero` | `linear-gradient(180deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)` | Hero section dark background with depth |
| `--gradient-card` | `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))` | Glassmorphic card overlays on dark backgrounds |

### Neutral Palette

| Token | Color | Hex | Usage |
| :--- | :--- | :--- | :--- |
| `--color-bg-dark` | Slate Black | `#0F172A` | Dark hero & feature sections background |
| `--color-bg-light` | Off-White | `#F8FAFC` | Dashboard surfaces, light sections, content areas |
| `--color-bg-card` | White | `#FFFFFF` | Card backgrounds, modal surfaces |
| `--color-bg-subtle` | Cool Gray | `#F1F5F9` | Alternating section backgrounds, sidebar |
| `--color-border` | Light Slate | `#E2E8F0` | Card borders, dividers, input outlines |
| `--color-border-dark` | Dark Slate | `#334155` | Borders on dark backgrounds |

### Text Colors

| Token | Color | Hex | Usage |
| :--- | :--- | :--- | :--- |
| `--color-text-primary` | Charcoal | `#0F172A` | Headings, primary body text (light mode) |
| `--color-text-secondary` | Slate Gray | `#64748B` | Subheadings, descriptions, labels |
| `--color-text-muted` | Light Gray | `#94A3B8` | Placeholder text, metadata, timestamps |
| `--color-text-on-dark` | Pure White | `#FFFFFF` | Text on dark/gradient backgrounds |
| `--color-text-on-dark-muted` | Faded White | `#CBD5E1` | Secondary text on dark backgrounds |

### Semantic Colors

| Token | Color | Hex | Usage |
| :--- | :--- | :--- | :--- |
| `--color-success` | Emerald | `#10B981` | Success states, credit earned, positive metrics |
| `--color-warning` | Amber | `#F59E0B` | Warnings, pending states, low-credit alerts |
| `--color-error` | Rose | `#EF4444` | Errors, no-show penalties, destructive actions |
| `--color-info` | Sky Blue | `#0EA5E9` | Informational badges, tooltips, session-in-progress |

---

## 3. Typography

| Role | Font Family | Weight | Size | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero Heading** | `Inter` | 700 (Bold) | 56px / 3.5rem | 1.1 | -0.02em |
| **Section Heading (H2)** | `Inter` | 700 (Bold) | 36px / 2.25rem | 1.2 | -0.01em |
| **Sub-heading (H3)** | `Inter` | 600 (Semibold) | 24px / 1.5rem | 1.3 | -0.005em |
| **Card Title (H4)** | `Inter` | 600 (Semibold) | 18px / 1.125rem | 1.4 | 0 |
| **Body Text** | `Inter` | 400 (Regular) | 16px / 1rem | 1.6 | 0 |
| **Small / Caption** | `Inter` | 400 (Regular) | 14px / 0.875rem | 1.5 | 0.01em |
| **Code / Monospace** | `JetBrains Mono` | 400 (Regular) | 14px / 0.875rem | 1.6 | 0 |
| **Button Label** | `Inter` | 600 (Semibold) | 15px / 0.9375rem | 1.0 | 0.02em |

> **Font Loading:** Import from Google Fonts — `Inter:wght@400;500;600;700` and `JetBrains Mono:wght@400;500`.

---

## 4. Spacing & Layout System

### Spacing Scale

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--space-xs` | 4px | Inline icon gaps, tight element padding |
| `--space-sm` | 8px | Badge padding, compact list gaps |
| `--space-md` | 16px | Card inner padding, form field gaps |
| `--space-lg` | 24px | Section sub-padding, card group gaps |
| `--space-xl` | 32px | Between card groups, dashboard widget gaps |
| `--space-2xl` | 48px | Section top/bottom padding |
| `--space-3xl` | 64px | Hero section padding, major section separators |
| `--space-4xl` | 96px | Page-level section vertical padding |

### Layout Grid

| Property | Value |
| :--- | :--- |
| **Max Content Width** | 1200px |
| **Grid Columns** | 12-column CSS Grid |
| **Column Gap** | 24px |
| **Page Side Padding** | 24px (mobile) → 48px (tablet) → 80px (desktop) |
| **Section Vertical Padding** | 80px–120px between major sections |

### Breakpoints

| Name | Width | Description |
| :--- | :--- | :--- |
| `mobile` | < 640px | Single column, stacked layout |
| `tablet` | 640px–1024px | 2-column grid, collapsible sidebar |
| `desktop` | > 1024px | Full 12-column grid, persistent sidebar |

---

## 5. Component Design Tokens

### Buttons

| Variant | Background | Text | Border | Border Radius | Padding | Shadow |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary** | `--gradient-primary` | `#FFFFFF` | none | 12px | 14px 28px | `0 4px 14px rgba(79, 70, 229, 0.4)` |
| **Secondary** | `transparent` | `#4F46E5` | 1.5px solid `#4F46E5` | 12px | 14px 28px | none |
| **Ghost** | `transparent` | `#64748B` | none | 12px | 14px 28px | none |
| **Destructive** | `#EF4444` | `#FFFFFF` | none | 12px | 14px 28px | `0 4px 14px rgba(239, 68, 68, 0.3)` |

> **Hover:** All buttons shift `translateY(-1px)` with increased shadow opacity.  
> **Active:** Buttons shift `translateY(0px)` with decreased shadow.  
> **Transition:** `all 0.2s ease`.

### Cards

| Variant | Background | Border | Border Radius | Shadow | Padding |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Default (Light)** | `#FFFFFF` | 1px solid `#E2E8F0` | 16px | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | 24px |
| **Elevated** | `#FFFFFF` | 1px solid `#E2E8F0` | 16px | `0 10px 25px rgba(0,0,0,0.08)` | 24px |
| **Glass (on Dark)** | `rgba(255,255,255,0.06)` | 1px solid `rgba(255,255,255,0.1)` | 16px | `0 8px 32px rgba(0,0,0,0.3)` | 24px |

> **Hover (Elevated & Glass):** Shadow increases, subtle `translateY(-2px)` lift.  
> **Backdrop Filter (Glass):** `blur(16px) saturate(180%)`.

### Badges & Status Pills

| Variant | Background | Text | Border Radius | Padding |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `#F1F5F9` | `#475569` | 100px (pill) | 4px 12px |
| **Success** | `#ECFDF5` | `#059669` | 100px | 4px 12px |
| **Warning** | `#FFFBEB` | `#D97706` | 100px | 4px 12px |
| **Error** | `#FEF2F2` | `#DC2626` | 100px | 4px 12px |
| **Info** | `#F0F9FF` | `#0284C7` | 100px | 4px 12px |
| **Credit** | `linear-gradient(135deg, #4F46E5, #7C3AED)` | `#FFFFFF` | 100px | 4px 12px |

### Input Fields

| Property | Value |
| :--- | :--- |
| **Background** | `#FFFFFF` |
| **Border** | 1.5px solid `#E2E8F0` |
| **Border (Focus)** | 1.5px solid `#4F46E5` + `box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15)` |
| **Border Radius** | 12px |
| **Padding** | 12px 16px |
| **Font Size** | 15px |
| **Placeholder Color** | `#94A3B8` |

### Avatar & Profile Thumbnails

| Property | Value |
| :--- | :--- |
| **Shape** | Circle (50% radius) |
| **Sizes** | 32px (inline), 40px (list), 48px (card), 80px (profile) |
| **Border** | 2px solid `#FFFFFF` (for stacked/overlapping avatars) |
| **Fallback** | Gradient background with user initials in `Inter 600` |

---

## 6. Screen Layouts & Wireframes

### 6.1 Landing Page (Hero + Features)

```
┌──────────────────────────────────────────────────────────────────┐
│ NAVIGATION BAR                                                   │
│ ┌────────┐    Home   Features   Pricing   FAQ    ┌──────────┐  │
│ │ ArcLogo│                                       │ Sign Up →│  │
│ └────────┘                                       └──────────┘  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│            HERO SECTION (Dark gradient background)               │
│                                                                  │
│          Practice Interviews. Land Your Dream Job.               │
│                                                                  │
│      Get matched with peers for realistic mock interviews.       │
│      Earn credits, receive structured feedback, and track        │
│      your progress — all for free.                               │
│                                                                  │
│         ┌─────────────────┐  ┌───────────────────┐              │
│         │  Get Started ▸  │  │  See How It Works  │              │
│         └─────────────────┘  └───────────────────┘              │
│                                                                  │
│         ┌──────────────────────────────────────────┐             │
│         │  ┌─────────────────────────────────┐     │             │
│         │  │   DASHBOARD PREVIEW MOCKUP      │     │             │
│         │  │   (Elevated card with shadow,   │     │             │
│         │  │    showing calendar + match      │     │             │
│         │  │    queue + upcoming sessions)    │     │             │
│         │  └─────────────────────────────────┘     │             │
│         └──────────────────────────────────────────┘             │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│            TRUST BAR (Logos / Stats)                              │
│      "Trusted by 2,000+ engineers from"                          │
│      [Google] [Meta] [Amazon] [Microsoft] [Stripe]               │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│            HOW IT WORKS — 3-Step Flow                             │
│                                                                  │
│    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│    │  ① Set Your  │  │  ② Get       │  │  ③ Practice  │         │
│    │  Preferences │  │  Matched     │  │  & Grow      │         │
│    │              │  │              │  │              │         │
│    │ Pick role,   │  │ Our engine   │  │ Join live    │         │
│    │ seniority,   │  │ pairs you    │  │ sessions,    │         │
│    │ & language.  │  │ with an      │  │ get rubric   │         │
│    │ Add calendar │  │ ideal peer   │  │ feedback,    │         │
│    │ slots.       │  │ within hours │  │ track skills │         │
│    └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│            KEY FEATURES (2x2 Feature Card Grid)                  │
│                                                                  │
│    ┌────────────────────────┐  ┌────────────────────────┐       │
│    │ 🗓  Smart Matching      │  │ 💻  Live Workspace     │       │
│    │ Multi-attribute match  │  │ Shared code editor +   │       │
│    │ by role, tier, lang    │  │ whiteboard + video     │       │
│    └────────────────────────┘  └────────────────────────┘       │
│    ┌────────────────────────┐  ┌────────────────────────┐       │
│    │ 📊  Skill Analytics    │  │ 🎯  Credit Economy     │       │
│    │ Radar maps, trends,   │  │ Fair reciprocal system │       │
│    │ weak-spot alerts      │  │ with karma safeguards  │       │
│    └────────────────────────┘  └────────────────────────┘       │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│            TESTIMONIAL SECTION                                   │
│                                                                  │
│    ┌──────────────────────────────────────────────────────┐      │
│    │  "ArcMentor helped me go from struggling with        │      │
│    │   system design to landing a Staff offer at Google." │      │
│    │                                                      │      │
│    │   ┌──┐  Sarah K. — Staff Software Engineer          │      │
│    │   │🧑│  ★★★★★                                       │      │
│    │   └──┘                                               │      │
│    └──────────────────────────────────────────────────────┘      │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│            CTA SECTION (Gradient background card)                │
│                                                                  │
│       Ready to ace your next interview?                          │
│       Start with 2 free credits. No payment needed.              │
│                                                                  │
│              ┌──────────────────────┐                            │
│              │   Create Free Account │                            │
│              └──────────────────────┘                            │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ FOOTER                                                           │
│ ArcMentor    Product   Company   Legal       ┌──────────────┐   │
│              Features  About     Privacy     │ Social Icons │   │
│              Pricing   Blog      Terms       └──────────────┘   │
│              Docs      Careers                                   │
│                                                                  │
│ © 2026 ArcMentor. All rights reserved.                           │
└──────────────────────────────────────────────────────────────────┘
```

### 6.2 Dashboard — Session Queue & Calendar

```
┌──────────────────────────────────────────────────────────────────┐
│ TOP NAV BAR                                                      │
│ ┌────────┐  Dashboard  Sessions  Analytics    🔔  ┌────┐  ┌──┐ │
│ │ ArcLogo│                                        │ 2⚡│  │🧑│ │
│ └────────┘                                        └────┘  └──┘ │
├──────────────┬───────────────────────────────────────────────────┤
│              │                                                   │
│  SIDEBAR     │   MAIN CONTENT AREA                               │
│              │                                                   │
│  🏠 Dashboard│   ┌─────────────────────┐ ┌─────────────────────┐│
│  📅 Schedule │   │ Credits Remaining   │ │ Sessions This Week  ││
│  📝 Feedback │   │       ⚡ 5          │ │       📈 3          ││
│  📊 Analytics│   └─────────────────────┘ └─────────────────────┘│
│  ⚙️ Settings │                                                   │
│              │   ┌──────────────────────────────────────────────┐│
│              │   │  UPCOMING SESSIONS (Card List)               ││
│              │   │                                              ││
│              │   │  ┌───────────────────────────────────────┐   ││
│              │   │  │ Oct 6 · 10:00 AM · System Design     │   ││
│              │   │  │ with @alex_chen · Senior · ⏱ 60min   │   ││
│              │   │  │ [Join Session →]       [Reschedule]   │   ││
│              │   │  └───────────────────────────────────────┘   ││
│              │   │                                              ││
│              │   │  ┌───────────────────────────────────────┐   ││
│              │   │  │ Oct 7 · 2:00 PM · DSA (Python)       │   ││
│              │   │  │ with @priya_m · Mid · ⏱ 60min        │   ││
│              │   │  │ [Join Session →]       [Reschedule]   │   ││
│              │   │  └───────────────────────────────────────┘   ││
│              │   │                                              ││
│              │   └──────────────────────────────────────────────┘│
│              │                                                   │
│              │   ┌──────────────────────────────────────────────┐│
│              │   │  MATCH QUEUE STATUS                          ││
│              │   │  "Finding a Backend · Senior · Java peer…"  ││
│              │   │  ████████░░░░░░░░  Estimated: ~4 hours      ││
│              │   └──────────────────────────────────────────────┘│
│              │                                                   │
├──────────────┴───────────────────────────────────────────────────┤
```

### 6.3 Live Session Workspace (Dual-View)

```
┌──────────────────────────────────────────────────────────────────┐
│ SESSION HEADER BAR                                               │
│ System Design · Senior · with @alex_chen       ⏱ 35:22 / 60:00 │
│ [Phase: Practice]                              [End Session ✕]  │
├────────────────────────────────┬─────────────────────────────────┤
│                                │                                 │
│   CODE EDITOR PANEL            │   PROBLEM / PROMPT PANEL        │
│   (Monaco Editor)              │                                 │
│                                │   Design a URL Shortener        │
│   ┌──────────────────────────┐ │                                 │
│   │ 1  class URLShortener:   │ │   Requirements:                 │
│   │ 2    def __init__(self): │ │   • Handle 100M URLs/day        │
│   │ 3      self.store = {}   │ │   • < 100ms redirect latency    │
│   │ 4                        │ │   • Custom alias support        │
│   │ 5    def encode(self,    │ │                                 │
│   │ 6      url: str) -> str: │ │   ┌─────────────────────────┐  │
│   │ 7      ...               │ │   │ Hints (Progressive)     │  │
│   │                          │ │   │ ▸ Hint 1: Consider      │  │
│   │ [▶ Run]  [Language: Py▾] │ │   │   base62 encoding       │  │
│   └──────────────────────────┘ │   │ ▸ Hint 2: (locked)      │  │
│                                │   └─────────────────────────┘  │
│   ┌──────────────────────────┐ │                                 │
│   │ OUTPUT / TEST RESULTS    │ │   ┌─────────────────────────┐  │
│   │ ✓ Test 1: Passed         │ │   │ WHITEBOARD              │  │
│   │ ✗ Test 2: Failed         │ │   │ (System Design Canvas)  │  │
│   │   Expected: "abc"        │ │   │                         │  │
│   │   Got: "xyz"             │ │   │  [Client] → [LB] →     │  │
│   └──────────────────────────┘ │   │  [API] → [Cache] → [DB]│  │
│                                │   └─────────────────────────┘  │
├────────────────────────────────┴─────────────────────────────────┤
│ BOTTOM BAR: 🎤 Mic ✓  📹 Camera ✓  💬 Chat  👥 Participants    │
└──────────────────────────────────────────────────────────────────┘
```

### 6.4 Feedback & Skill Analytics

```
┌──────────────────────────────────────────────────────────────────┐
│ FEEDBACK SUBMISSION (Post-Session Modal)                         │
│                                                                  │
│   Session with @priya_m · DSA (Python) · Oct 7                  │
│                                                                  │
│   Rate on each dimension (1–5 stars):                           │
│                                                                  │
│   Technical Correctness    ★★★★☆                                │
│   Problem Clarification    ★★★☆☆                                │
│   Communication            ★★★★★                                │
│   Behavioral / STAR        ★★★★☆                                │
│                                                                  │
│   Key Strengths:           [________________________]            │
│   Areas for Growth:        [________________________]            │
│                                                                  │
│              ┌──────────────────────┐                            │
│              │   Submit Feedback →  │                            │
│              └──────────────────────┘                            │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│ SKILL ANALYTICS DASHBOARD                                        │
│                                                                  │
│  ┌─────────────────────────┐  ┌─────────────────────────────┐   │
│  │  RADAR SKILL MAP        │  │  SCORE TRENDS OVER TIME     │   │
│  │                         │  │                             │   │
│  │       Technical         │  │  5 ┤ ·  ·  ·  ···*         │   │
│  │          /\              │  │  4 ┤·  *  *··              │   │
│  │     Comm/  \Clarify     │  │  3 ┤                        │   │
│  │        \  /              │  │  2 ┤                        │   │
│  │      STAR               │  │  1 ┤────────────────────    │   │
│  │                         │  │    Sep  Oct  Nov  Dec       │   │
│  └─────────────────────────┘  └─────────────────────────────┘   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  WEAK-SPOT ALERTS                                        │   │
│  │  ⚠ Edge-case handling scores dropped 15% this month      │   │
│  │  ⚠ System Design sessions below peer average             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Interaction & Motion Design

### Transitions

| Element | Trigger | Animation | Duration | Easing |
| :--- | :--- | :--- | :--- | :--- |
| **Buttons** | Hover | `translateY(-1px)` + shadow expand | 200ms | `ease` |
| **Cards** | Hover | `translateY(-2px)` + shadow deepen | 250ms | `ease-out` |
| **Page Sections** | Scroll into view | `opacity: 0→1` + `translateY(20px→0)` | 500ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Modals** | Open | `opacity: 0→1` + `scale(0.95→1)` | 300ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| **Sidebar Nav** | Active change | Background color slide | 200ms | `ease` |
| **Match Queue** | Progress | Gradient shimmer across progress bar | 2000ms | `linear` (loop) |
| **Toast / Alert** | Appear | Slide in from top-right + `opacity: 0→1` | 300ms | `ease-out` |
| **Tooltip** | Hover | `opacity: 0→1` + `translateY(4px→0)` | 150ms | `ease` |

### Micro-Interactions

* **Credit Badge Pulse:** Subtle pulse animation when credits change (`scale(1→1.08→1)` over 600ms).
* **Session Timer:** Smooth second-by-second countdown with color shift from `--color-success` → `--color-warning` → `--color-error` as time runs low.
* **Star Rating Hover:** Stars fill with `--gradient-primary` sequentially on hover with 50ms stagger delay.
* **Skeleton Loading:** `background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)` animated shimmer at 1.5s loop for all data-loading states.
* **Match Found Celebration:** Brief confetti burst + haptic-style card bounce when a peer match is confirmed.

---

## 8. Iconography & Imagery

| Element | Style |
| :--- | :--- |
| **Icon Set** | Lucide Icons (consistent 1.5px stroke, 24px default size) |
| **Icon Color** | Inherits `currentColor`; primary icons use `--color-primary` |
| **Illustrations** | Minimal, line-art + flat-fill illustrations for empty states and onboarding flows |
| **Dashboard Mockups** | High-fidelity UI screenshots used in landing page hero section — displayed in elevated cards with realistic shadow and slight perspective rotation (2–3° tilt) |
| **User Avatars** | Real-profile photos in circles; fallback to gradient-initial badges |

---

## 9. Accessibility & Responsive Notes

* **Contrast Ratios:** All text meets WCAG 2.1 AA minimum (4.5:1 for body, 3:1 for large text).
* **Focus States:** Visible focus rings using `box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.4)` on all interactive elements.
* **Touch Targets:** Minimum 44×44px for all tappable elements on mobile.
* **Reduced Motion:** Respect `prefers-reduced-motion` — disable all transforms/animations and fall back to instant opacity changes.
* **Dark Mode Support:** Full dark mode palette (swap light backgrounds to `--color-bg-dark` derivatives) toggled via system preference or manual switch.
* **Responsive Cards:** Feature cards reflow from 2×2 grid → single column stack below `640px`.