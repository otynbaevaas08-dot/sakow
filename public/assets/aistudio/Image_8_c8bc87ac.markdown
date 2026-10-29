---
name: Gothic Horror Minimal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e4bdbb'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ab8886'
  outline-variant: '#5b403e'
  surface-tint: '#ffb3af'
  primary: '#ffb3af'
  on-primary: '#68000f'
  primary-container: '#b00020'
  on-primary-container: '#ffbbb8'
  inverse-primary: '#bc1127'
  secondary: '#ffb691'
  on-secondary: '#552100'
  secondary-container: '#ee6803'
  on-secondary-container: '#4a1c00'
  tertiary: '#97cbff'
  on-tertiary: '#003353'
  tertiary-container: '#005a8e'
  on-tertiary-container: '#a1d0ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3af'
  on-primary-fixed: '#410006'
  on-primary-fixed-variant: '#930019'
  secondary-fixed: '#ffdbcb'
  secondary-fixed-dim: '#ffb691'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783100'
  tertiary-fixed: '#cee5ff'
  tertiary-fixed-dim: '#97cbff'
  on-tertiary-fixed: '#001d33'
  on-tertiary-fixed-variant: '#004a76'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Epilogue
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  story-lead:
    fontFamily: Courier Prime
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Courier Prime
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Courier Prime
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  code-riddle:
    fontFamily: Courier Prime
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.15em
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 3rem
  margin-sm: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system crafts an immersive, literary psychological horror aesthetic grounded in restraint and tension. It strips away campy tropes in favor of an austere, high-contrast dark gothic minimalism—balancing abyssal voids with sharp, clinical, tactile precision.

### Personality & Tone
- **Dread & Stillness:** Expansive empty space evokes the claustrophobia of absolute silence rather than chaotic terror.
- **Literary Relic:** Typographic juxtaposition merges decaying antiquarian print with rigorous modern utility.
- **Subtle Visceral Tactility:** Interactive elements behave like ancient stone tablets, cursed typewriters, and tarnished velvet.

### Target Audience
Fans of psychological horror, interactive fiction, dark fantasy lorebooks, and ambient audio-visual narrative engines who demand immersive mood without sacrificing readability or functional speed.

## Colors

The palette simulates candlelit obsidian chambers and blood-soaked ritualism, engineered for strict WCAG AAA readability against ultra-deep black substrates.

### Palette Hierarchy
- **Abyssal Ground (`#080808`):** The master canvas tone; infinite, absorption-heavy black.
- **Surface Elevation:**
  - `Surface Tier 1 (#121212)`: Root containers, narrative viewports, major backplates.
  - `Surface Tier 2 (#1a1a1a)`: Interactive panels, inspectable puzzle chambers, elevated cards.
  - `Border Obsidian (`#272727`)`: Crisp architectural bounds preventing muddy blending.
- **Accents:**
  - `Crimson (Blood Velvet - #B00020)`: Primary action vector, critical states, irreversible choices, dread markers.
  - `Ember (Haunted Glow - #FF7518)`: Secondary illumination, atmospheric clues, hover states, audio activation.
- **Typography Tiers:**
  - `High Contrast Bone (`#F5F5F5`)`: Primary narrative text, imperative headlines, active states.
  - `Muted Silver (`#B8B8B8`)`: Auxiliary details, secondary lore, metadata, system labels.
  - `Cryptic Ash (`#666666`)`: Inactive controls, subtle keystroke counters, hairline dividers.

## Typography

Typography establishes an unsettling dichotomy between brutal modernist headers, raw mechanical relic text, and precise instrumentation.

- **Epilogue (Headlines):** Used in heavy weights (`700`, `800`) to evoke monumental monoliths, stone carvings, and modern dread without sacrificing structural purity.
- **Courier Prime (Story & Narrative Puzzles):** Monospaced, mechanical, and unadorned. Recreates the feel of forensic case files, typed grimoires, and relentless typewriter keys.
- **Space Grotesk (System UI & Metadata):** A stark geometric sans-serif ensuring immediate cognitive clarity for menus, audio toggles, inventory, and stats.

### Typographic Execution
- Story text must always maintain generous line height (`1.6x` or higher) to avoid visual fatigue during prolonged reading in dark mode.
- System labels and buttons utilize uppercase tracking (`letter-spacing: 0.08em` to `0.1em`) to maintain clinical detachment against evocative narrative passages.

## Layout & Spacing

The layout is architected around an 8-column mobile and 12-column desktop fluid responsive grid, deliberately framed by restrictive negative space to manifest psychological tension.

### Canvas & Framing
- **Atmospheric Dead Space:** Wide outer margins (`3rem` on desktop) force the eye inward, isolating narrative elements like artifacts pinned inside a specimen drawer.
- **Column Strategy:**
  - Desktop: Maximum reading containment width of `760px` centered within a 12-column layout to preserve the rhythmic cadence of monospaced narrative prose.
  - Mobile: Full-bleed edge margins (`1.25rem`) with dense vertical padding to maximize reading continuity.
- **Vertical Rhythm:** Content chunks use `space-xl` and `space-lg` to create distinct dramatic pauses between clues, events, and UI clusters.

## Elevation & Depth

Depth is not achieved through typical soft drop-shadows; instead, it uses tonal stacking, hair-thin obsidian borders, and spectral back-lighting.

### Depth Mechanics
1. **The Static Vignette:** A fixed, non-scrolling radial gradient masks the viewport edges (`radial-gradient(circle at 50% 50%, rgba(8,8,8,0) 60%, rgba(8,8,8,0.95) 100%)`), giving the illusion that UI exists in a diminishing sphere of light.
2. **Obsidian Line Work:** Elevation breaks are delineated by `1px solid #272727` borders, providing structural definition without synthetic blur.
3. **Spectral Light Pools (Aura Glows):**
   - Critical containers and active artifacts emit low-spread, saturated under-glows: `box-shadow: 0 0 25px -5px rgba(176, 0, 32, 0.35)` for crimson dread states.
   - Ember highlights emit focused, heat-lamp radiance: `box-shadow: 0 0 20px -3px rgba(255, 117, 24, 0.25)`.
4. **Surface Stacking:** Modal overlays and drawer inspectables elevate from `#080808` to `#121212`, bounded by strict perimeter borders.

## Shapes

The design system enforces a zero-radius (`roundedness: 0`), strictly orthogonal geometry.

- **Sharp Edges:** All buttons, cards, input frames, and dialogs feature `0px` border-radius.
- **Metaphorical Weight:** The absence of curves reinforces architectural stone, cut metal, and raw parchment sheets. 
- **Notched Variants:** Selected decorative components may incorporate subtle diagonal 45-degree chamfers (`4px` clip-path) to mimic weathered occult relics and heavy iron plating.

## Components

### 1. Buttons
- **Primary (Blood Velvet):** Solid `#B00020` background with `#F5F5F5` bold uppercase text (`Space Grotesk`). Hover triggers an intense inward glow (`box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.2)`) and shifts border to `#FF7518`.
- **Secondary (Obsidian Ghost):** `#121212` background, `1px solid #272727` border, `#B8B8B8` text. Hover shifts border to Crimson `#B00020` and font to `#F5F5F5`.
- **Audio Toggle Button:** Fixed-position minimal HUD control. Square 40x40px enclosure, featuring a pulsating waveform icon or speaker symbol. Active state casts an ember glow (`#FF7518`) with animated flicker keyframes replicating candlelight.

### 2. Ominous Aura Cards
- Constructed with `#121212` core and `1px solid #272727` hairline frame.
- **Hover/Active State:** Emits a faint outward crimson or ember aura (`0 0 30px rgba(176, 0, 32, 0.2)`). Card header set in `Epilogue`, supporting inspection lore in monospaced `Courier Prime`.

### 3. Tactile Riddle Inputs
- **Cipher & Code Inputs:** Monospaced letter/digit blocks with individual bordered cells (`48x56px`), centered cursor, `#F5F5F5` characters.
- **Text Entry Fields:** Minimalist underline-only or full boxed `#1a1a1a` fields. Focus switches border color instantly to `#FF7518` with zero easing, accompanied by a subtle ember focus halo. Placeholder text sits in dimmed ash `#666666`.

### 4. Parchment & Dungeon Borders
- Secondary narrative modals use double hairline borders: an outer `1px solid #272727` frame separated by `3px` transparent inset from an inner `1px solid rgba(184, 184, 184, 0.15)` line.
- Gives an austere, hand-bound manuscript or ledger aesthetic without kitsch textures.

### 5. Checkboxes, Radios, & Choice Nodes
- **Choice Cards (Branching Story):** Full-width interactive bars styled like typewriter strike plates. Selection strikes through or underlines adjacent text with blood velvet accent bars (`border-left: 3px solid #B00020`).
- **Checkboxes:** Sharp square boxes (`18x18px`) with high-contrast `#FF7518` X-shaped crossmarks instead of rounded ticks.

### 6. Atmospheric Vignette Overlay
- Global non-interactive viewport mask layer (`pointer-events: none; z-index: 9999`) creating organic peripheral darkness across all viewports.