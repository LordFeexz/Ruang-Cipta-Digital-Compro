/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_DOMAIN: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_CAREER_MATE_URL: string;
  readonly PUBLIC_DIGITOOL_URL: string;
  /**
   * Iorion AI API origin. Optional — `src/pages/api/midtrans/notify.ts` prefers the
   * runtime `process.env.IORION_URL` and falls back to https://api.iorion.ai.
   */
  readonly PUBLIC_IORION_URL?: string;
  /** Iorion AI app origin (not the API one above) — used for the finish-screen CTA. */
  readonly PUBLIC_IORION_APP_URL?: string;
  /** NOTE: not declared in `.env`, so Vite inlines this as `undefined` at build time. */
  readonly PUBLIC_BLOG_PRESS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
