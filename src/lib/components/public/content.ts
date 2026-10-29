import type { SiteContent } from "../../../content/types";
import { getLocalizedPath } from "../../i18n";

export const contactEmail = "hello@rcd.my.id";

// Display copy approved in the reference. Product membership, descriptions,
// and getting-started steps continue to come from the existing content source.
const identities = [
  {
    sourceName: "Career Mate",
    name: "Role Mate",
    slug: "career-mate",
    logo: "/brand/role-mate-logo.png",
    mascot: "/brand/role-mate-mascot.svg",
    kind: "CAREER PLATFORM",
    website: "https://role-mate.com/id",
    headline: "Langkah berikutnya untuk karier Anda.",
    summary: "Temukan pekerjaan dan siapkan lamaran dengan tools dalam satu tempat.",
    cta: "Buka Role Mate",
    tags: ["Lowongan", "CV", "AI tools"],
  },
  {
    sourceName: "DigiTool",
    name: "Digitool",
    slug: "digitool",
    logo: "/brand/digitool-icon.ico",
    mascot: "/brand/digitool-mascot.svg",
    kind: "DIGITAL MARKETPLACE",
    website: "https://dgtool.my.id",
    headline: "Mulai lebih mudah. Berkarya lebih jauh.",
    summary: "Temukan alat digital yang sesuai untuk membantu pekerjaan sehari-hari.",
    cta: "Jelajahi Digitool",
    tags: ["Tools", "Kategori", "Resources"],
  },
];

export function getPublicProducts(content: SiteContent, lang: string) {
  return content.home.products.flatMap((product) => {
    const identity = identities.find((item) => item.sourceName === product.name);
    return identity ? [{
      ...identity,
      description: product.description,
      valueProp: product.valueProp,
      href: getLocalizedPath(lang, identity.slug),
    }] : [];
  });
}

export type PublicProduct = ReturnType<typeof getPublicProducts>[number];

// Verified against the official npm README supplied by the user.
// Presentation content only; this does not install or initialize tracking.
export const publicPackages = [
  {
    name: "traffic-tracker",
    description: "Package analitik lintas framework dengan pola adapter untuk menyimpan data traffic di database Anda sendiri.",
    npmUrl: "https://www.npmjs.com/package/traffic-tracker?activeTab=readme",
    repositoryUrl: "https://github.com/LordFeexz/traffic-tracker",
    installCommand: "npm install traffic-tracker",
    tags: ["npm", "Analytics", "Drizzle"],
    features: [
      { title: "Adapter database", description: "Adapter Drizzle ORM untuk PostgreSQL, MySQL, dan SQLite." },
      { title: "Integrasi framework", description: "Integrasi bawaan untuk Hono dan SvelteKit." },
      { title: "Pelacakan di browser", description: "Tracker dengan pengiriman batch, pengelolaan sesi, dan pelacakan waktu halaman terlihat." },
      { title: "Consent & ringkasan analitik", description: "Mode full atau anonymous, pengolahan IP, serta agregasi halaman, referrer, dan teknologi." },
    ],
  },
];

export type PublicPackage = typeof publicPackages[number];

export function publicDestinations(lang: string) {
  return [
    { label: "Beranda", href: getLocalizedPath(lang), keywords: ["home", "RCD"] },
    { label: "Produk & karya", href: getLocalizedPath(lang, "products"), keywords: ["aplikasi"] },
    { label: "Role Mate", href: getLocalizedPath(lang, "career-mate"), keywords: ["karier", "lowongan", "CV"] },
    { label: "Digitool", href: getLocalizedPath(lang, "digitool"), keywords: ["tools", "digital"] },
    { label: "Packages", href: getLocalizedPath(lang, "packages"), keywords: ["developer", "komponen", ...publicPackages.map((item) => item.name)] },
    { label: "Tentang kami", href: getLocalizedPath(lang, "about"), keywords: ["about", "perusahaan"] },
    { label: "Kontak", href: getLocalizedPath(lang, "contact"), keywords: ["email", "kolaborasi"] },
  ];
}
