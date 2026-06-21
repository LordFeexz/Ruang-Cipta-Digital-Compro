import type { LANG } from '../i18n';
import type { JsonLdObject, WithContext } from 'schema-dts';

export interface PageProps {
  title: string;
  description?: string;
  opengraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    tags?: string[];
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
    site?: string;
  };
  keywords?: string[];
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
    };
  };
  lang?: LANG | string;
  schemas?: WithContext<JsonLdObject | string>[];
}
