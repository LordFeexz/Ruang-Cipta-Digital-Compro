export interface ProductConfig {
  slug: string;
  name: string;
  website: string;
  description: {
    en: string;
    id: string;
  };
  welcomeMessage: {
    en: string;
    id: string;
  };
  ctaLabel: {
    en: string;
    id: string;
  };
}

export const PRODUCTS: Record<string, ProductConfig> = {
  "career-mate": {
    slug: "career-mate",
    name: "Career Mate",
    website: import.meta.env.PUBLIC_CAREER_MATE_URL || "https://apply-mate.site",
    description: {
      en: "AI-powered career intelligence platform.",
      id: "Platform intelijen karier berbasis AI.",
    },
    welcomeMessage: {
      en: "You now have access to premium career intelligence tools.",
      id: "Anda sekarang memiliki akses ke alat intelijen karier premium.",
    },
    ctaLabel: {
      en: "Go to Career Mate",
      id: "Buka Career Mate",
    },
  },
  "digitool": {
    slug: "digitool",
    name: "DigiTool",
    website: import.meta.env.PUBLIC_DIGITOOL_URL || "https://dgtool.my.id",
    description: {
      en: "Digital tool discovery and marketplace platform.",
      id: "Platform penemuan dan pasar alat digital.",
    },
    welcomeMessage: {
      en: "You now have access to premium discovery features.",
      id: "Anda sekarang memiliki akses ke fitur penemuan premium.",
    },
    ctaLabel: {
      en: "Go to DigiTool",
      id: "Buka DigiTool",
    },
  },
};

export function getProductConfig(slug: string): ProductConfig | undefined {
  return PRODUCTS[slug];
}
