# Electric Blue Bento — Redesign Spec (Ruang Cipta Digital Compro)

Project root: `/Users/apple/Documents/Perusahaan/app/Ruang-Cipta-Digital-Compro`
Read `src/styles/global.css` FIRST — all tokens live there and are already final. Do not edit it.

## Direction
Flat, bold, light-first. Brand blue sampled from the logo (electric cyan-blue tech mark
with circuit nodes). Space Grotesk display type, DM Sans body. Bento grids for showcase
sections. Hierarchy comes from **borders, tinted surfaces, type weight, and blue** —
never from shadows, glows, or gradients. The old look (violet, Playfair serif, animated
gradient blobs, glow cards) is being fully replaced; if you see remnants of it in your
files, that is exactly what you must redesign.

## Foundation already done (DO NOT EDIT these files)
- `src/styles/global.css` — tokens, fonts, utilities (`.eyebrow`, `.flat-card`,
  `.flat-card-hover`, `.blueprint-grid`, `.blueprint-fade`, `.circuit-node`),
  fluid type steps `text-eyebrow|lede|heading|title|display|figure` (weights baked in).
- `src/lib/components/common/SectionWrapper.astro` — section shell (container + AOS). Unchanged API.
- `src/lib/components/common/SectionHeading.astro` — eyebrow (with circuit-node marker) + title + lede.
- `src/lib/components/common/GlowCard.astro` — now THE flat bento card primitive (name kept for imports).
- `src/lib/components/common/CircuitNodes.astro` — NEW decorative circuit-trace SVG.
  Usage: `<CircuitNodes class="absolute -right-6 top-10 w-56 opacity-50" />` inside a `relative` parent.
- `src/layouts/BaseLayout.astro`, `src/lib/components/common/icons.ts` — off limits.
  Need an icon not exported by `icons.ts`? Inline your own small SVG (24×24, stroke-width 2) in your file.
- `src/content/*`, `src/config/*` — copy/data. NEVER edit; all strings come from props (bilingual site).

## Hard rules (violations = review failure)
1. **Banned classes/effects:** `shadow-*`, `drop-shadow-*`, `blur-*`, `backdrop-*`,
   `bg-gradient-*` / `from-* via-* to-*`, glow effects, `hover:scale-*`, `animate-pulse` decorations.
2. **Only semantic tokens** — `bg-brand`, `text-brand-quiet`, `border-border`, `bg-secondary`,
   `text-muted-foreground`, `bg-brand-soft`, `text-brand-bright`, `bg-circuit`, etc. No raw hex, no
   Tailwind palette colors (`blue-500`, `zinc-*`, `slate-*`…), except `text-white` never (use `text-brand-on`).
3. **Contrast:** body text = `text-foreground` / `text-muted-foreground`; brand-colored text on
   white/secondary = `text-brand-quiet` (never `text-brand-bright` or `text-circuit` for text —
   those are decorative/large-numeral only).
4. **Motion:** keep existing `data-aos` attributes/pattern. Hover = `transition-colors duration-200`
   (border/bg/text shifts) only; arrows may `group-hover:translate-x-0.5 transition-transform`.
5. **Keep every component's props interface, aria attributes, focus-visible states, and semantic
   HTML exactly as functional today.** Restyle markup/classes freely; never drop accessibility.
6. Interactive elements: `cursor-pointer`, visible focus, min touch target ~44px.
7. No emoji as icons. SVG only.

## Design vocabulary (use these consistently)
- **Cards:** `GlowCard` component, or `flat-card flat-card-hover` utilities directly. `rounded-2xl`.
- **Icon chip:** `flex size-12 items-center justify-center rounded-xl bg-brand-soft text-brand`
  with icon `class="size-6"`.
- **Primary button/link-button:** `inline-flex h-11 items-center justify-center gap-2 rounded-lg
  bg-brand px-6 font-medium text-brand-on transition-colors duration-200 hover:bg-brand-hover`.
- **Secondary button:** same shape, `border border-border bg-transparent text-foreground
  hover:border-brand-ring hover:bg-accent`.
- **Section banding:** default sections on white; alternate emphasis bands via
  `class="bg-secondary border-border border-y"` on `SectionWrapper`.
- **Big numerals** (metrics, phase numbers, percentages): `font-display text-figure text-brand`.
- **Eyebrows:** only via `SectionHeading`'s `eyebrow` prop (or copy its exact markup).
- **Bento grids:** `grid gap-3 sm:gap-4` (tight!), mixed spans (`sm:col-span-2`, `lg:row-span-2`)
  with ONE larger feature cell when content allows; cells are flat cards. Mobile = single column stack.
- **Decoration budget:** max one `CircuitNodes` + optionally one `blueprint-grid blueprint-fade`
  layer per PAGE-level band (hero and/or CTA). Don't sprinkle it on every section.
- **Tone:** confident, engineered, precise. Generous whitespace INSIDE sections, tight gaps INSIDE grids.

## Group briefs

### G1 — Chrome (Navbar, Footer, MobileMenu, LanguageSwitcher, ThemeToggle, ui/button)
Navbar: white/translucent-solid (`bg-background/90` + `border-b border-border`; solid — no backdrop-blur,
it's banned), logo + wordmark, links with `hover:text-brand-quiet` + active underline (2px brand),
primary CTA button on the right. Footer: `bg-secondary border-t border-border` (or dark `bg-foreground
text-background` inverted band if it reads better — your call, stay flat), columns + a thin bottom bar;
may include one subtle `CircuitNodes` at low opacity. Update `ui/button/button.svelte` variants to the
button vocabulary above (keep the shadcn-svelte API surface — variants/sizes — intact).

### G2 — Home narrative (HeroSection, AnimatedGradient, PitchSection, ProblemSection, VisionSection, MissionCards, pages/[lang]/index.astro)
Hero: white canvas + `blueprint-grid blueprint-fade` layer + one `CircuitNodes`; `text-display`
Space Grotesk headline with ONE word/phrase accented in `text-brand` (flat color, no gradient text);
lede; primary + secondary buttons. Delete the blob ambience: either delete `AnimatedGradient.svelte`
and its import, or rewrite it as a flat decorative — no gradients either way.
ProblemSection: numbered flat list/grid (`01 02 03` figures in `text-brand`).
PitchSection: big statement typography, left-aligned option kept.
VisionSection: emphasis band (`bg-secondary border-y` or inverted `bg-foreground text-background` — flat).
MissionCards: BENTO — 4 missions in mixed-span grid, icon chips, one feature cell.
index.astro: composition/order/props only — do not modify components owned by other groups.

### G3 — Product & data (ProductCard, ProductDemo, MetricsRow, CountUp, MarketOpportunity, BusinessModelCards, ComparisonTable)
ProductCard: the flagship BENTO grid — products as flat cards with icon chip, name, description,
`ArrowUpRight` link affordance; feature cell spans 2 cols on lg. MetricsRow: flat stat tiles,
`text-figure font-display text-brand` numerals (CountUp stays functional), label in
`text-eyebrow text-muted-foreground uppercase`. MarketOpportunity: stat tiles + chart-ish icons in chips.
BusinessModelCards: flat cards w/ icon chips. ComparisonTable: flat bordered table, header row
`bg-secondary`, Check in `text-brand`, X in `text-muted-foreground`; rounded-2xl border wrapper,
`overflow-x-auto` for mobile. ProductDemo: screenshot/mock area framed by a flat browser-chrome bar
(three `bg-border` dots, no shadow), checklist with brand Check icons.

### G4 — Journey & pages (TimelineSection, RoadmapSection, CTASection, pages/[lang]/career-mate.astro, digitool.astro)
TimelineSection: vertical/horizontal steps with square circuit-node markers (`.circuit-node`) and
1px connector lines (`bg-border`), phase numbers `text-figure`. RoadmapSection: phases as bento cards
with big `0N` numerals in `text-brand`, current-phase card gets `border-brand` + `bg-brand-soft` badge.
CTASection: full-width closing band — inverted flat panel (`bg-foreground text-background`, or
`bg-brand text-brand-on`) with `blueprint-grid` at low opacity and/or one `CircuitNodes`; big display
headline + white/inverted button. Pages: composition/order/props/wrapper-classes only — do not modify
components owned by other groups.

### G5 — Transaction (TransactionFinishPage, StatusIcon, CSSConfetti)
Light-touch: align surfaces/buttons/typography to the new tokens (flat cards, brand button, Space
Grotesk headings). StatusIcon: flat filled circle `bg-success/–destructive/–warning` + white glyph, no
rings/glows. Keep CSSConfetti behavior (already respects reduced motion). Keep all payment logic intact.

## Definition of done per group
- Zero banned classes; zero raw palette colors; builds cleanly (`bun run build` if you need to verify —
  fix YOUR files only).
- Light AND dark mode both coherent (tokens do the work — verify you didn't hardcode).
- Mobile-first: single-column stacks at 375px, no horizontal scroll (tables scroll inside their own container).
- Return JSON: files_changed, summary, and any risks/notes for the reviewer.
