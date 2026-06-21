export interface NavContent {
  products: string;
  careerMate: string;
  digiTool: string;
  about: string;
  contact: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  cta1: string;
  cta2: string;
}

export interface PitchContent {
  title: string;
  description: string[];
}

export interface MissionCard {
  title: string;
  description: string;
  icon: string;
}

export interface ProductCardContent {
  name: string;
  description: string;
  valueProp: string;
  cta: string;
  link: string;
}

export interface MetricData {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface TimelineStep {
  title: string;
  description: string;
}

export interface FeatureDemo {
  title: string;
  features: string[];
}

export interface BusinessModelCard {
  title: string;
}

export interface ComparisonRow {
  feature: string;
  product: string;
  traditional: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
}

export interface CTASectionContent {
  title: string;
  button1: string;
  button2?: string;
}

export interface HomeContent {
  hero: HeroContent;
  problem: PitchContent;
  intro: PitchContent;
  vision: string;
  mission: MissionCard[];
  products: ProductCardContent[];
  whyWeExist: PitchContent;
  impact: MetricData[];
  showcase: FeatureDemo;
  contact: CTASectionContent;
}

export interface CareerMateContent {
  hero: HeroContent & { metrics: MetricData[] };
  problem: PitchContent;
  market: PitchContent;
  solution: TimelineStep[];
  demo: FeatureDemo;
  traction: MetricData[];
  businessModel: BusinessModelCard[];
  advantage: ComparisonRow[];
  roadmap: RoadmapPhase[];
  futureVision: string;
  cta: CTASectionContent;
}

export interface DigiToolContent {
  hero: HeroContent & { metrics: MetricData[] };
  problem: PitchContent;
  market: PitchContent;
  solution: TimelineStep[];
  demo: FeatureDemo;
  traction: MetricData[];
  businessModel: BusinessModelCard[];
  advantage: ComparisonRow[];
  roadmap: RoadmapPhase[];
  futureVision: string;
  cta: CTASectionContent;
}

export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
}

export interface FooterContent {
  copyright: string;
}

export interface TransactionFinishContent {
  pageTitle: string;
  title: { success: string; pending: string; failed: string };
  description: { success: string; pending: string; failed: string };
  orderInfo: { orderId: string; status: string; product: string; time: string };
  cta: { backToProduct: string; tryAgain: string; checkLater: string; backToHome: string };
  fallbackMessage: string;
}

export interface SiteContent {
  nav: NavContent;
  home: HomeContent;
  careerMate: CareerMateContent;
  digitool: DigiToolContent;
  seo: {
    home: SEOContent;
    careerMate: SEOContent;
    digitool: SEOContent;
  };
  footer: FooterContent;
  transactionFinish: TransactionFinishContent;
}
