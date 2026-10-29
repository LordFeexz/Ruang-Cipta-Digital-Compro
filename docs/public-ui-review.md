# RCD public website UI implementation

The approved reference is the supplied RCD Public Website Template.html.
Its direction takes precedence over the older light-first DESIGN.md.
No AGENTS.md was present in this repository or its parent directories.

## Routes and changed presentation

| Reference view | Public URL (both id and en) |
| --- | --- |
| Home | /{lang} (existing) |
| Products | /{lang}/products |
| Role Mate | /{lang}/career-mate (existing URL retained) |
| Digitool | /{lang}/digitool (existing) |
| Packages | /{lang}/packages |
| About | /{lang}/about |
| Contact | /{lang}/contact |
| Transaction finish (subsequently requested; noindex retained) | /{lang}/transaction/finish |

Changed existing files:

- src/pages/[lang]/index.astro
- src/pages/[lang]/career-mate.astro
- src/pages/[lang]/digitool.astro
- src/layouts/BaseLayout.astro: optional public chrome and body class only.
  Existing callers default to the original layout.
- Later explicitly requested follow-up: src/pages/[lang]/transaction/finish.astro,
  TransactionFinishPage.svelte and StatusIcon.svelte now use the same public
  layout, dark surfaces, typography, borders and product CTA styling.

Added presentation files:

- src/layouts/PublicLayout.astro and src/styles/public.css.
- The four new public route files listed above.
- src/lib/components/public/: header, footer, featured card, product catalog,
  product introduction, labeled illustrations, section label, command launcher,
  clipboard feedback, package entry/detail dialog, fallback empty state, and a
  presentation adapter.
- public/brand/: the five unique embedded identity assets, extracted byte for
  byte and deduplicated. The SVGs retain their geometry and colors, including
  Digitool's semicircular pouch.
- Minimal missing shadcn-svelte components and tests/public-ui.mjs.

## Functional baseline and scope audit

Before changing the UI, inspection found:

- The three marketing pages are prerendered Astro pages. getContent(lang) reads
  the existing local src/content/id.ts and en.ts. getStaticPaths, LANGS, and the
  localized route convention are unchanged.
- No marketing-page API requests, server loaders/actions, forms, validation,
  pagination, caches, filters, package catalog, or package dialog existed.
- Existing links included #products, localized home/product links, mailto
  actions from PUBLIC_CONTACT_EMAIL, and product CTAs from
  PUBLIC_CAREER_MATE_URL / PUBLIC_DIGITOOL_URL. Home product-card fallbacks
  included https://apply-mate.site and https://dgtool.my.id.
- The root URL redirects to the default language and remains unchanged.
- The only fetch in the repository is the existing Midtrans notification
  integration in src/pages/api/midtrans/notify.ts. It was not changed or called.
  Transaction helpers, URL parameters, status handling, and CTA destinations
  remain untouched. The finish page presentation was subsequently included at
  the user's explicit request.
- No analytics event handlers were present in the affected marketing UI.

After implementation:

- Product membership, descriptions, value propositions, feature details and
  feature lists remain sourced from existing local content. The new adapter
  changes the public display name Career Mate to Role Mate without changing
  its slug, product configuration, transaction integration, or stored content.
- Public CTAs deliberately use the explicitly approved https://role-mate.com/id,
  https://dgtool.my.id, and mailto:hello@rcd.my.id. These are the user-authorized
  public brand/link corrections; integration URLs and contracts did not change.
- Existing #products links remain usable. New page navigation uses real Astro
  routes, not the reference's hash router.
- Category filters are local presentation state over the existing two
  applications and traffic-tracker. The user supplied its npm URL after the
  initial implementation; its description and links were verified using the
  official npm registry README. There is no runtime API or persistence added.
- The BaseLayout preserves canonical URLs, hreflang, metadata generation, and
  structured-data serialization. The subsequently requested public favicon now
  uses the exact extracted RCD logo instead of the starter favicon. All three
  existing pages pass the same SEO title, description, keywords, and OpenGraph
  values as before.
- No API/backend/auth/database/payment/upload/storage/admin logic, content data,
  product configuration, lockfile, package manifest, or global CSS were changed.
  No production data was queried and nothing was published.

## Components, styling and accessibility

The installed Astro/Svelte/Tailwind/shadcn-svelte stack is retained.
Existing **Button** is reused without changing its variants or defaults.
Minimal **Card**, **Badge**, **Separator**, **Input**, **Dialog**, and **Command**
components were added using the official
[Vega shadcn-svelte registry](https://shadcn-svelte.com/docs/registry).
Their imports use the existing $lib aliases, cn, Tailwind variants, and Lucide.
No dependencies were installed or upgraded.

Command's input composes Input instead of adding an InputGroup dependency.
Command's list includes the viewport required by the installed Bits UI version,
preserving selection and combobox ARIA relationships. Dialog owns focus trapping
and Escape handling; closing restores focus to the header or home trigger.
Search, arrow keys, Enter, Ctrl/Cmd+K, and visible controls are supported.
Copy email awaits the clipboard operation, with a polite success/failure status.

All layout and illustration styling uses Tailwind utilities. The sole scoped
CSS addition is .rcd-public semantic token values, also applied to portaled
public dialog content. There are **no custom artwork/effect CSS exceptions**.
Global tokens and existing shared component defaults are untouched, preserving
the appearance of screens outside the public redesign. Existing reduced-motion
rules also cover the new UI.

## Package content and remaining limitations

- Traffic-tracker is now listed on Packages and in the All/Packages product
  filters, with a reusable shadcn Dialog for installation information, verified
  feature summaries, and npm/repository links. The initial missing-content
  limitation is resolved by the npm link supplied by the user.
- Source: the official [npm README](https://www.npmjs.com/package/traffic-tracker?activeTab=readme)
  and [npm registry metadata](https://registry.npmjs.org/traffic-tracker), read on
  2026-10-30. The repository link comes from that metadata. No version number or
  download statistics are hardcoded. Traffic-tracker is not installed or
  initialized on this website, and no tracking endpoint or database was added.
- The repository's Digitool content describes tool discovery, comparison and
  evaluation. Those details are retained rather than introducing unverified
  checkout/download/affiliate behavior. The approved catalog artwork is
  explicitly labeled as an illustration, not an application screenshot.
- Existing SEO still uses Career Mate branding, as required by the instruction
  to preserve existing metadata. The visible product branding is Role Mate.
- Existing localized URL contracts remain available; new editorial copy follows
  the approved Indonesian reference, while existing localized product content
  continues to be selected by getContent(lang).
- The finish component already selected success directly instead of consuming
  the status helper. Its existing status selection, description bindings,
  product CTA URLs/fallbacks, and confetti activation are preserved. The new
  client-loading fallback is presentational only. No payment processing or
  transaction rules were introduced.

## Validation

The repository has no lint script or pre-existing test suite.
The initial bun run astro check passed with zero errors/warnings and one
existing unused-import hint in src/pages/index.astro. That hint is unchanged.

Final results:

- bun run build: passed; all localized public and existing transaction pages
  prerender successfully.
- bun run astro check: zero errors, zero warnings; the original unused-import
  hint remains.
- svelte-check --workspace . --output human: zero errors and zero warnings,
  using an existing local tool without adding a project dependency.
- git diff --check: passed.
- Browser suite: 16 public URLs, 80 route/width combinations at 320, 375, 390,
  768 and 1440px, direct reloads, and 16 internal link destinations passed.
  Zero browser runtime errors and zero API requests.
- Final focused browser checks passed after the dialog focus/landscape polish:
  all category states, useful empty states/reset, visible trigger, search and
  no-results state, Up/Down/Enter, Ctrl/Cmd+K, Escape and close button, focus trap
  and restoration to either trigger, active navigation, clipboard success and
  failure feedback, reduced motion, and visible dialog controls at 320×568 and
  812×375.
- Follow-up checks passed for traffic-tracker's All/Packages membership,
  installation/details dialog, npm/repository URLs, close/Escape focus
  restoration and mobile sizing. The dialog initially focuses its heading to
  keep long content at the top. Public favicon links use the original RCD PNG.
- Transaction finish was visually checked at 375 and 1440px and included in all
  five responsive widths. Header/footer, status icon, card and CTA presentation
  now follow the public theme. Original CTA definitions were compared
  byte-for-byte, and existing status/copy bindings and confetti activation were
  confirmed unchanged.
- Desktop/mobile screenshots captured for every public view at 375 and 1440px,
  plus command palette screenshots. Art and text remain separate and proportional.
  Screenshots are in /tmp/rcd-public-ui (not committed to the application).
- All five extracted asset hashes match the reference. Existing SEO metadata
  inputs remain identical. Public favicon links were updated separately at the
  user's request; existing non-public layout favicon behavior is preserved.
- Measured contrast: primary button text 4.80:1, muted body text 8.16:1 or better
  on public surfaces, and accent links on the tinted panel 9.54:1.
- Protected-path audit: no changes to API, transaction/payment logic, content/config,
  global CSS, existing Button, dependency manifest, or lockfile.

Development filter incident:

- Reproduced the user's unresponsive category filters on localhost:4321.
  Vite returned 504 Outdated Optimize Dep for a catalog dependency, leaving that
  Svelte island unhydrated. Production builds passed the filter checks.
- Reloaded/restarted the repository's local development server and verified
  all four filters against that server. Applications showed Role Mate/Digitool,
  Packages showed traffic-tracker, Experiments showed its empty state, and All
  showed all three. No project configuration contents were changed.

To rerun the browser regression check, start the local preview with
“bun run preview --host 127.0.0.1 --port 4322”, then use an available Playwright:

    PUBLIC_UI_ORIGIN=http://127.0.0.1:4322 \
    PLAYWRIGHT_MODULE=/absolute/path/to/playwright/index.mjs \
    CHROMIUM_PATH=/absolute/path/to/chromium \
    node tests/public-ui.mjs

Optional module/executable paths avoid adding dependencies to this project.
The test only permits a localhost origin and blocks outbound requests. Clipboard
permission outcomes are simulated solely in the test browser. No API responses
or product data are mocked.
