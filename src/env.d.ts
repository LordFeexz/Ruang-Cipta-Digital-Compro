/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_DOMAIN: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_CAREER_MATE_URL: string;
  readonly PUBLIC_DIGITOOL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
