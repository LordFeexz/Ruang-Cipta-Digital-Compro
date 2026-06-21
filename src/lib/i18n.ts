export enum LANG {
  EN = "en",
  ID = "id",
}

export const LANGS = Object.values(LANG);
export const DEFAULT_LANG = LANG.ID;

export function getLocalizedPath(lang: LANG | string, path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  if (!cleanPath) {
    return `/${lang}`;
  }
  return `/${lang}/${cleanPath}`;
}
