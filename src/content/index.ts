import { LANG } from '$lib/i18n';
import type { SiteContent } from './types';
import { en } from './en';
import { id } from './id';

export function getContent(lang: LANG | string): SiteContent {
  if (lang === LANG.EN) {
    return en;
  }
  return id;
}

export type { SiteContent } from './types';
