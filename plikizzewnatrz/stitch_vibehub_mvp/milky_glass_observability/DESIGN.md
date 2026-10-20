---
name: Milky Glass Observability
colors:
  surface: '#faf9fe'
  surface-dim: '#dad9df'
  surface-bright: '#faf9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#414753'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005cbb'
  primary: '#0059b5'
  on-primary: '#ffffff'
  primary-container: '#0071e3'
  on-primary-container: '#fcfbff'
  inverse-primary: '#abc7ff'
  secondary: '#006e28'
  on-secondary: '#ffffff'
  secondary-container: '#6ffb85'
  on-secondary-container: '#00732a'
  tertiary: '#884d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ab6200'
  on-tertiary-container: '#fffaf9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#abc7ff'
  on-primary-fixed: '#001b3f'
  on-primary-fixed-variant: '#00458f'
  secondary-fixed: '#72fe88'
  secondary-fixed-dim: '#53e16f'
  on-secondary-fixed: '#002107'
  on-secondary-fixed-variant: '#00531c'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb874'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#faf9fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-lg:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-md:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.04em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an airy, high-precision desktop interface designed specifically for modern developer observability and systems engineering. Drawing from macOS desktop standards and high-craft frosted glass design, it departs from the conventional oppressive "dark-mode only" developer console aesthetic. Instead, it introduces a clean, serene environment where complex metric densities, real-time distributed tracing, and critical telemetry feel weightless, distinct, and legible.

The aesthetic pairs luminous translucence with technical rigor:
- **Atmospheric Clarity:** Milky off-white canvases (#F8F9FA) paired with layered translucent glass sheets evoke physical presence without visual noise.
- **Micro-Precision Engineering:** Crisp hairline inner highlights, ultra-fine typography scales, and deliberate typographic rhythm allow high information density without clutter.
- **Intentional Restraint:** Color is deployed primarily for state telemetry, log severities, and primary system actions, preserving visual focus during mission-critical triaging.

## Colors

The color system uses Apple-inspired system primaries, anchored by a milky canvas and neutral zinc-slate hierarchy. Translucency is calibrated directly against surface stacking levels.

### Surface System
- **Canvas Base:** `#F8F9FA` — Soft milky ground tint with an ambient top-center radial gradient (`radial-gradient(100% 50% at 50% 0%, #FFFFFF 0%, #F8F9FA 100%)`).
- **Glass Panel Surface:** `rgba(255, 255, 255, 0.72)` paired with `backdrop-filter: blur(24px) saturate(180%)`.
- **Raised Glass Overlay:** `rgba(255, 255, 255, 0.88)` for dropdowns, tooltips, and floating diagnostic command palettes.
- **Inset Surface (Metric Gutter / Terminal Backing):** `rgba(0, 0, 0, 0.025)` or `rgba(240, 242, 245, 0.75)`.

### Typography Colors
- **Text Primary:** `#1C1C1E` — Primary labels, active telemetry values, critical table headers.
- **Text Secondary:** `#636366` — Secondary metrics, timestamps, auxiliary breadcrumbs.
- **Text Tertiary / Muted:** `#8E8E93` — Inactive units, placeholder hints, micro-labels.
- **Monospace Foreground:** `#3A3A3C` — Code blocks, payload spans, JSON key-values, and hex IDs.

### State & Telemetry Semantic Palette
- **System Active / Operational:** `#34C759` (Surface tint: `rgba(52, 199, 89, 0.12)`)
- **System Warning / Degraded:** `#FF9500` (Surface tint: `rgba(255, 149, 0, 0.12)`)
- **System Error / Critical Breach:** `#FF3B30` (Surface tint: `rgba(255, 59, 48, 0.12)`)
- **System Idle / Stale / Disconnected:** `#8E8E93` (Surface tint: `rgba(142, 142, 147, 0.14)`)
- **Interactive Action / Primary Accent:** `#0071E3` (Hover: `#0077ED`, Active: `#0062C4`)

### Borders & Rim Highlights
- **Outer Perimeter Border:** `rgba(0, 0, 0, 0.08)`
- **Hairline Inner Rim Highlight:** `inset 0 1px 0 0 rgba(255, 255, 255, 0.85)`

## Typography

The type scale is optimized for high-density dashboards, flame graphs, and tabular logs.

- **Primary Sans (`Inter`):** Applied across global navigational chrome, canvas section headings, card containers, dialog structures, and diagnostic analytics. Uses tight negative letter-spacing for headline sizes to reflect macOS-native typography.
- **Monospace & Metadata (`Geist`):** Applied for all log records, transaction spans, raw duration markers (e.g., `42ms`, `p99.9`), latency percentiles, memory allocations, and terminal feeds. Monospace numbers enforce tabular lining (`font-feature-settings: "tnum" 1, "cv05" 1`) across all metric charts to prevent layout shift during streaming real-time updates.

## Layout & Spacing

The layout is structured around an ultra-crisp responsive desktop canvas with floating glass panels.

- **Grid Architecture:** 12-column adaptive layout on desktop with fixed 16px (`1rem`) gutters and 24px (`1.5rem`) outer canvas padding. Left-hand navigation operates as an independent frosted dock fixed at 240px width (collapsible to 68px icon-only mode).
- **Metric Dashboard Reflow:**
  - **Desktop (>= 1280px):** Multi-column dashboard grid. Telemetry panels span 3, 4, 6, or 12 columns with uniform 16px gaps.
  - **Tablet (768px – 1279px):** 6-column reflow. Panels collapse to 3-column pairs or full-width 6-column spans; dock collapses to an overlaid sheet.
  - **Mobile (< 768px):** Single-column stacked stream with 16px margins, edge-to-edge glass cards, and sticky horizontal tab bars for trace visualizers.
- **Rhythm Rules:** Component internal padding uses compact boundaries (`space-md` for standard cards, `space-sm` for table cells and log lines) to maximize information density while maintaining breathability via card gaps.

## Elevation & Depth

Elevation is rendered through multi-layered ambient light diffusion and translucent refractive glass surfaces instead of heavy dark drop shadows.

### Glass Stack Hierarchy
1. **Level 0 (Base Canvas):** Solid milky canvas `#F8F9FA` with zero elevation.
2. **Level 1 (Dock & Primary Tiles):** Translucent background `rgba(255, 255, 255, 0.72)` supported by:
   - `backdrop-filter: blur(24px) saturate(180%)`
   - `box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 20px 40px -15px rgba(0, 0, 0, 0.06)`
   - Border: `1px solid rgba(0, 0, 0, 0.08)`
   - Rim highlight: `inset 0 1px 0 0 rgba(255, 255, 255, 0.85)`
3. **Level 2 (Popovers, Select Panels, Context Menus):** Translucent background `rgba(255, 255, 255, 0.88)` with:
   - `backdrop-filter: blur(32px) saturate(200%)`
   - `box-shadow: 0 14px 34px -6px rgba(0, 0, 0, 0.08), 0 30px 60px -12px rgba(0, 0, 0, 0.10)`
   - Border: `1px solid rgba(0, 0, 0, 0.1)`
   - Rim highlight: `inset 0 1px 0 0 #FFFFFF`
4. **Level 3 (Modal Dialogs & Command Bar):** Centered floating glass overlay with:
   - Backdrop overlay: `rgba(0, 0, 0, 0.15)` with `backdrop-filter: blur(8px)`
   - Window shadow: `0 24px 60px -12px rgba(0, 0, 0, 0.14), 0 12px 24px -6px rgba(0, 0, 0, 0.06)`

## Shapes

The interface embraces modern macOS window curvature standards. Structural panels adopt deliberate roundedness, while granular micro-elements and telemetry markers use compact radii.

- **Primary Windows & Metric Panels:** `rounded-2xl` (16px / `1rem`) to impart an inviting, floating physical feel.
- **Form Controls, Code Blocks, and Table Rows:** `rounded-lg` (8px / `0.5rem`) for crisp boundary alignment.
- **Badges, Status Indicators, and Pill Tabs:** Full pill rounding (`rounded-full` / 9999px) to differentiate persistent operational status chips from interactive rectangular targets.

## Components

### Buttons
- **Primary Action:** Solid Apple Blue `#0071E3` with white text, crisp 0.5px hairline top highlight `inset 0 1px 0 0 rgba(255, 255, 255, 0.25)`, and subtle shadow `0 2px 6px rgba(0, 113, 227, 0.25)`. Radius: `0.5rem`.
- **Secondary (Glass Subtle):** `background: rgba(255, 255, 255, 0.65)`, border `1px solid rgba(0, 0, 0, 0.08)`, text `#1C1C1E`. Hover: `background: rgba(255, 255, 255, 0.95)`, `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04)`.
- **Destructive:** Frosted soft red `rgba(255, 59, 48, 0.1)` with solid `#FF3B30` text and border `rgba(255, 59, 48, 0.2)`.

### Cards & Metric Tiles
- Frosted glass body (`rgba(255, 255, 255, 0.72)` + blur), `16px` radius, padding `1.25rem`.
- Header houses category label (`label-md`, `#8E8E93`), trailing status pill badge, and bold metric count (`headline-lg`, `#1C1C1E`).
- Sparkline charts and trace timelines embed seamlessly with minimal border dividers (`border-t border-black/[0.04]`).

### Status Badges & Pills
- Pill shape (`rounded-full`), padding `2px 8px`, `label-sm` font.
- Contains a centered `6px` circular status beacon with a soft pulse animation for active real-time ingest.
  - *Active:* Background `rgba(52, 199, 89, 0.12)`, text `#248A3D`, beacon `#34C759`.
  - *Warning:* Background `rgba(255, 149, 0, 0.12)`, text `#B26600`, beacon `#FF9500`.
  - *Error:* Background `rgba(255, 59, 48, 0.12)`, text `#D70015`, beacon `#FF3B30`.
  - *Idle:* Background `rgba(142, 142, 147, 0.12)`, text `#636366`, beacon `#8E8E93`.

### Input Fields & Search Bars
- Translucent inset styling: `background: rgba(0, 0, 0, 0.03)`, `border: 1px solid rgba(0, 0, 0, 0.08)`.
- Text `#1C1C1E`, placeholder `#8E8E93`.
- Focus state: `background: #FFFFFF`, `border-color: #0071E3`, `box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.15)`.
- Trailing shortcut chips (e.g. `⌘K`) rendered in `Geist` font with `rgba(0, 0, 0, 0.05)` backing.

### Checkboxes & Switch Controls
- **Switches:** Apple-style smooth toggle. Track `rgba(120, 120, 128, 0.16)`, active track `#34C759`. Floating thumb `#FFFFFF` with drop shadow `0 2px 4px rgba(0,0,0,0.15)`.
- **Checkboxes:** 16x16px, `4px` corner radius. Checked background `#0071E3` displaying a crisp white micro checkmark.

### Telemetry Stream & Log Viewer
- Embedded card within `rgba(255, 255, 255, 0.5)` with `Geist` monospace typography.
- Alternating subtle line hover `rgba(0, 0, 0, 0.02)`.
- Color-coded severity vertical micro-bars (`2px` left border: Red for FATAL/ERR, Amber for WARN, Green for INFO, Slate for DEBUG).