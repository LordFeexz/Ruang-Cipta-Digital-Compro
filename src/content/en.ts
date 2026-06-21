import type { SiteContent } from './types';

export const en: SiteContent = {
  nav: {
    products: "Products",
    careerMate: "Career Mate",
    digiTool: "DigiTool",
    about: "About",
    contact: "Contact",
  },
  home: {
    hero: {
      headline: "Create a better digital future through products that solve real problems.",
      subheadline: "Ruang Cipta Digital builds technology products that empower individuals and organizations to make smarter decisions in careers, productivity, and digital transformation.",
      cta1: "Explore Products",
      cta2: "Contact Us",
    },
    problem: {
      title: "The Digital Fragmentation",
      description: [
        "In today's fast-paced economy, individuals and enterprises face massive friction:",
        "Information overload with zero actionable intelligence",
        "Fragmented tools that destroy productivity",
        "Inefficient talent and career discovery processes",
        "A lack of cohesive ecosystems to scale digital initiatives"
      ]
    },
    intro: {
      title: "Pioneering the Next Generation of Digital Ecosystems",
      description: [
        "Ruang Cipta Digital isn't just a software company. We are an innovation engine actively building interconnected platforms that solve complex, real-world inefficiencies.",
        "From AI-driven career intelligence to enterprise-grade productivity marketplaces, our products empower millions of users to make data-backed decisions.",
        "We combine deep market insight with state-of-the-art engineering to deliver scalable solutions that define category standards."
      ]
    },
    vision: "Building digital products that help people make better decisions and unlock opportunities through technology.",
    mission: [
      {
        title: "Accessibility",
        description: "Make digital solutions accessible.",
        icon: "Unlock"
      },
      {
        title: "Empowerment",
        description: "Help people take action through information.",
        icon: "Zap"
      },
      {
        title: "Innovation",
        description: "Build practical technology products.",
        icon: "Lightbulb"
      },
      {
        title: "Sustainability",
        description: "Create products with long-term impact.",
        icon: "Leaf"
      }
    ],
    products: [
      {
        name: "Career Mate",
        description: "AI-powered career platform.",
        valueProp: "Helping you discover better career opportunities.",
        cta: "Try Career Mate",
        link: import.meta.env.PUBLIC_CAREER_MATE_URL || "https://apply-mate.site"
      },
      {
        name: "DigiTool",
        description: "Marketplace and discovery platform for digital tools.",
        valueProp: "Simplifying tool discovery.",
        cta: "Explore DigiTool",
        link: import.meta.env.PUBLIC_DIGITOOL_URL || "https://dgtool.my.id"
      }
    ],
    whyWeExist: {
      title: "Why We Exist",
      description: [
        "Millions of people make important decisions every day without access to the right information, tools, or guidance.",
        "We build products that bridge this gap."
      ]
    },
    impact: [
      { label: "Total Platform Users", value: 250000, suffix: "+" },
      { label: "Data Points Processed", value: 5, suffix: "M+" },
      { label: "Active Digital Products", value: 2, suffix: "" },
      { label: "Enterprise Partners", value: 120, suffix: "+" }
    ],
    showcase: {
      title: "Our Product Ecosystem",
      features: ["Smart Recommendation Engine", "Data-Driven Insights", "Seamless Integration"]
    },
    contact: {
      title: "Let's build something meaningful together.",
      button1: "Partnership",
      button2: "Contact Us"
    }
  },
  careerMate: {
    hero: {
      headline: "Helping people discover better career opportunities.",
      subheadline: "Career Mate uses data and AI to help job seekers identify opportunities worth pursuing.",
      cta1: "Try Career Mate",
      cta2: "Learn More",
      metrics: [
        { label: "Jobs Indexed", value: 100000, suffix: "+" },
        { label: "AI Recommendations Generated", value: 500000, suffix: "+" }
      ]
    },
    problem: {
      title: "The Problem",
      description: [
        "Job seekers face:",
        "Information overload",
        "Low-quality listings",
        "Unclear salary expectations",
        "Inefficient job search"
      ]
    },
    market: {
      title: "Market Opportunity",
      description: [
        "Growing workforce",
        "Increasing demand for career intelligence",
        "AI adoption"
      ]
    },
    solution: [
      { title: "Data Collection", description: "Collect job data." },
      { title: "AI Analysis", description: "Analyze candidate fit." },
      { title: "Job Insights", description: "Provide deep insights." },
      { title: "Personalized Recommendations", description: "Tailored job matches." }
    ],
    demo: {
      title: "Product Demo",
      features: ["Job Board", "AI Recommendations", "Career Insights", "Smart Filtering"]
    },
    traction: [
      { label: "Jobs Indexed", value: 100000, suffix: "+" },
      { label: "Recommendations Generated", value: 500000, suffix: "+" },
      { label: "Growth Metrics", value: 20, suffix: "%" }
    ],
    businessModel: [
      { title: "Premium Features" },
      { title: "Partnerships" },
      { title: "Recruitment Services" },
      { title: "Future Enterprise Solutions" }
    ],
    advantage: [
      { feature: "AI recommendations", product: "Yes", traditional: "No" },
      { feature: "Career intelligence", product: "Deep", traditional: "Limited" },
      { feature: "Opportunity scoring", product: "Yes", traditional: "No" }
    ],
    roadmap: [
      { phase: "Phase 1", title: "Job Intelligence" },
      { phase: "Phase 2", title: "AI Career Assistant" },
      { phase: "Phase 3", title: "Skills Intelligence" },
      { phase: "Phase 4", title: "Talent Ecosystem" }
    ],
    futureVision: "Career Mate becomes the intelligence layer between talent and opportunity.",
    cta: {
      title: "Ready to elevate your career?",
      button1: "Try Career Mate"
    }
  },
  digitool: {
    hero: {
      headline: "Helping people discover the right digital tools faster.",
      subheadline: "DigiTool simplifies tool discovery for professionals, businesses, and digital creators.",
      cta1: "Explore DigiTool",
      cta2: "Learn More",
      metrics: [
        { label: "Tools Listed", value: 5000, suffix: "+" },
        { label: "Categories", value: 50, suffix: "+" }
      ]
    },
    problem: {
      title: "The Problem",
      description: [
        "Tool overload",
        "Decision fatigue",
        "Poor discovery",
        "Fragmented information"
      ]
    },
    market: {
      title: "Market Opportunity",
      description: [
        "SaaS market growth",
        "AI tools",
        "Creator economy",
        "Digital transformation"
      ]
    },
    solution: [
      { title: "Discover", description: "Find the right tools." },
      { title: "Compare", description: "Compare features and pricing." },
      { title: "Evaluate", description: "Read reviews." },
      { title: "Adopt", description: "Start using." }
    ],
    demo: {
      title: "Product Demo",
      features: ["Tool Directory", "Categories", "Comparisons", "Reviews", "Recommendations"]
    },
    traction: [
      { label: "Tools Listed", value: 5000, suffix: "+" },
      { label: "Categories", value: 50, suffix: "+" },
      { label: "Monthly Visitors", value: 100000, suffix: "+" },
      { label: "Partner Tools", value: 200, suffix: "+" }
    ],
    businessModel: [
      { title: "Featured Listings" },
      { title: "Sponsorship" },
      { title: "Premium Analytics" },
      { title: "Enterprise Discovery" }
    ],
    advantage: [
      { feature: "AI Recommendations", product: "Yes", traditional: "No" },
      { feature: "Workflow Matching", product: "Yes", traditional: "No" },
      { feature: "Deep Comparisons", product: "Yes", traditional: "Limited" }
    ],
    roadmap: [
      { phase: "Phase 1", title: "Tool Discovery" },
      { phase: "Phase 2", title: "AI Recommendations" },
      { phase: "Phase 3", title: "Workflow Matching" },
      { phase: "Phase 4", title: "Digital Operating System" }
    ],
    futureVision: "DigiTool becoming the intelligence layer connecting people and software.",
    cta: {
      title: "Find the best digital tools for you.",
      button1: "Explore DigiTool"
    }
  },
  seo: {
    home: {
      title: "Ruang Cipta Digital | Innovation Ecosystem",
      description: "Ruang Cipta Digital builds technology products that empower individuals and organizations in career and digital transformation.",
      keywords: ["digital innovation", "startup", "Career Mate", "DigiTool"]
    },
    careerMate: {
      title: "Career Mate | AI Career Assistant",
      description: "Discover better career opportunities with Career Mate.",
      keywords: ["career", "AI", "jobs", "resume"]
    },
    digitool: {
      title: "DigiTool | Digital Tool Discovery",
      description: "Find the best digital tools with DigiTool.",
      keywords: ["SaaS", "digital tools", "software", "AI tools"]
    }
  },
  footer: {
    copyright: "© 2026 Ruang Cipta Digital. All rights reserved."
  },
  transactionFinish: {
    pageTitle: "Transaction Status | Ruang Cipta Digital",
    title: {
      success: "Payment Completed Successfully",
      pending: "Payment Pending",
      failed: "Payment Not Completed"
    },
    description: {
      success: "Your payment has been received and is currently being processed.",
      pending: "We are waiting for payment confirmation from the payment provider. Your transaction will automatically update once payment is confirmed.",
      failed: "Unfortunately your transaction could not be completed. Please try again or contact support."
    },
    orderInfo: {
      orderId: "Order ID",
      status: "Transaction Status",
      product: "Product",
      time: "Transaction Time"
    },
    cta: {
      backToProduct: "Back to Product",
      tryAgain: "Try Again",
      checkLater: "Check Transaction Later",
      backToHome: "Back to Home"
    },
    fallbackMessage: "Thank you for your transaction."
  }
};
