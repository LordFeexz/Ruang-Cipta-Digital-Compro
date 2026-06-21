import type { SiteContent } from './types';

export const id: SiteContent = {
  nav: {
    products: "Produk",
    careerMate: "Career Mate",
    digiTool: "DigiTool",
    about: "Tentang Kami",
    contact: "Kontak",
  },
  home: {
    hero: {
      headline: "Menciptakan masa depan digital yang lebih baik melalui produk yang memecahkan masalah nyata.",
      subheadline: "Ruang Cipta Digital membangun produk teknologi yang memberdayakan individu dan organisasi untuk membuat keputusan yang lebih cerdas dalam karier, produktivitas, dan transformasi digital.",
      cta1: "Jelajahi Produk",
      cta2: "Hubungi Kami",
    },
    problem: {
      title: "Fragmentasi Digital",
      description: [
        "Di ekonomi yang serba cepat ini, individu dan perusahaan menghadapi hambatan besar:",
        "Informasi berlebihan tanpa intelijen yang dapat ditindaklanjuti",
        "Alat yang terfragmentasi sehingga menghancurkan produktivitas",
        "Proses penemuan bakat dan karier yang tidak efisien",
        "Kurangnya ekosistem kohesif untuk menskalakan inisiatif digital"
      ]
    },
    intro: {
      title: "Memelopori Ekosistem Digital Generasi Berikutnya",
      description: [
        "Ruang Cipta Digital bukan sekadar perusahaan perangkat lunak. Kami adalah mesin inovasi yang secara aktif membangun platform yang saling terhubung untuk memecahkan inefisiensi dunia nyata.",
        "Mulai dari intelijen karier berbasis AI hingga pasar produktivitas tingkat perusahaan, produk kami memberdayakan jutaan pengguna untuk membuat keputusan berbasis data.",
        "Kami memadukan wawasan pasar mendalam dengan rekayasa teknologi mutakhir untuk menghadirkan solusi yang dapat diskalakan dan menetapkan standar industri."
      ]
    },
    vision: "Membangun produk digital yang membantu orang membuat keputusan yang lebih baik dan membuka peluang melalui teknologi.",
    mission: [
      {
        title: "Aksesibilitas",
        description: "Membuat solusi digital dapat diakses oleh semua orang.",
        icon: "Unlock"
      },
      {
        title: "Pemberdayaan",
        description: "Membantu orang mengambil tindakan melalui informasi.",
        icon: "Zap"
      },
      {
        title: "Inovasi",
        description: "Membangun produk teknologi praktis.",
        icon: "Lightbulb"
      },
      {
        title: "Keberlanjutan",
        description: "Menciptakan produk dengan dampak jangka panjang.",
        icon: "Leaf"
      }
    ],
    products: [
      {
        name: "Career Mate",
        description: "Platform karier berbasis AI.",
        valueProp: "Membantu Anda menemukan peluang karier yang lebih baik.",
        cta: "Coba Career Mate",
        link: import.meta.env.PUBLIC_CAREER_MATE_URL || "https://apply-mate.site"
      },
      {
        name: "DigiTool",
        description: "Platform penemuan alat digital.",
        valueProp: "Menyederhanakan penemuan alat digital yang tepat.",
        cta: "Jelajahi DigiTool",
        link: import.meta.env.PUBLIC_DIGITOOL_URL || "https://dgtool.my.id"
      }
    ],
    whyWeExist: {
      title: "Mengapa Kami Ada",
      description: [
        "Jutaan orang membuat keputusan penting setiap hari tanpa akses ke informasi, alat, atau panduan yang tepat.",
        "Kami membangun produk yang menjembatani kesenjangan ini."
      ]
    },
    impact: [
      { label: "Total Pengguna Platform", value: 250000, suffix: "+" },
      { label: "Titik Data Diproses", value: 5, suffix: "M+" },
      { label: "Produk Digital Aktif", value: 2, suffix: "" },
      { label: "Mitra Perusahaan", value: 120, suffix: "+" }
    ],
    showcase: {
      title: "Ekosistem Produk Kami",
      features: ["Sistem Rekomendasi Cerdas", "Wawasan Berbasis Data", "Integrasi Mulus"]
    },
    contact: {
      title: "Mari bangun sesuatu yang bermakna bersama.",
      button1: "Kemitraan",
      button2: "Hubungi Kami"
    }
  },
  careerMate: {
    hero: {
      headline: "Membantu orang menemukan peluang karier yang lebih baik.",
      subheadline: "Career Mate menggunakan data dan AI untuk membantu pencari kerja mengidentifikasi peluang yang layak dikejar.",
      cta1: "Coba Career Mate",
      cta2: "Pelajari Lebih Lanjut",
      metrics: [
        { label: "Pekerjaan Diindeks", value: 100000, suffix: "+" },
        { label: "Rekomendasi AI", value: 500000, suffix: "+" }
      ]
    },
    problem: {
      title: "Masalah",
      description: [
        "Pencari kerja menghadapi tantangan dalam:",
        "Informasi yang berlebihan",
        "Daftar pekerjaan berkualitas rendah",
        "Ekspektasi gaji yang tidak jelas",
        "Pencarian kerja yang tidak efisien"
      ]
    },
    market: {
      title: "Peluang Pasar",
      description: [
        "Tenaga kerja yang terus berkembang",
        "Meningkatnya permintaan untuk kecerdasan karier",
        "Adopsi AI yang meluas"
      ]
    },
    solution: [
      { title: "Pengumpulan Data", description: "Mengumpulkan data lowongan kerja." },
      { title: "Analisis AI", description: "Menganalisis kecocokan kandidat dengan pekerjaan." },
      { title: "Wawasan Pekerjaan", description: "Memberikan informasi mendalam tentang pekerjaan." },
      { title: "Rekomendasi Personal", description: "Rekomendasi pekerjaan yang disesuaikan." }
    ],
    demo: {
      title: "Demo Produk",
      features: ["Papan Pekerjaan", "Rekomendasi AI", "Wawasan Karier", "Penyaringan Cerdas"]
    },
    traction: [
      { label: "Pekerjaan Diindeks", value: 100000, suffix: "+" },
      { label: "Rekomendasi Dihasilkan", value: 500000, suffix: "+" },
      { label: "Pertumbuhan Bulanan", value: 20, suffix: "%" }
    ],
    businessModel: [
      { title: "Fitur Premium" },
      { title: "Kemitraan" },
      { title: "Layanan Rekrutmen" },
      { title: "Solusi Perusahaan Masa Depan" }
    ],
    advantage: [
      { feature: "Rekomendasi AI", product: "Ya", traditional: "Tidak" },
      { feature: "Kecerdasan Karier", product: "Mendalam", traditional: "Terbatas" },
      { feature: "Penilaian Peluang", product: "Ya", traditional: "Tidak" }
    ],
    roadmap: [
      { phase: "Fase 1", title: "Kecerdasan Pekerjaan" },
      { phase: "Fase 2", title: "Asisten Karier AI" },
      { phase: "Fase 3", title: "Kecerdasan Keterampilan" },
      { phase: "Fase 4", title: "Ekosistem Bakat" }
    ],
    futureVision: "Career Mate akan menjadi lapisan kecerdasan antara bakat dan peluang.",
    cta: {
      title: "Siap meningkatkan karier Anda?",
      button1: "Coba Career Mate"
    }
  },
  digitool: {
    hero: {
      headline: "Membantu orang menemukan alat digital yang tepat dengan lebih cepat.",
      subheadline: "DigiTool menyederhanakan penemuan alat untuk profesional, bisnis, dan pembuat konten digital.",
      cta1: "Jelajahi DigiTool",
      cta2: "Pelajari Lebih Lanjut",
      metrics: [
        { label: "Alat Terdaftar", value: 5000, suffix: "+" },
        { label: "Kategori", value: 50, suffix: "+" }
      ]
    },
    problem: {
      title: "Masalah",
      description: [
        "Terlalu banyak alat (Tool overload)",
        "Kelelahan mengambil keputusan",
        "Penemuan yang buruk",
        "Informasi yang terfragmentasi"
      ]
    },
    market: {
      title: "Peluang Pasar",
      description: [
        "Pertumbuhan pasar SaaS",
        "Pertumbuhan alat AI",
        "Ekonomi kreator",
        "Transformasi digital"
      ]
    },
    solution: [
      { title: "Temukan", description: "Cari alat yang tepat." },
      { title: "Bandingkan", description: "Bandingkan fitur dan harga." },
      { title: "Evaluasi", description: "Baca ulasan." },
      { title: "Adopsi", description: "Mulai gunakan alat." }
    ],
    demo: {
      title: "Demo Produk",
      features: ["Direktori Alat", "Kategori", "Perbandingan", "Ulasan", "Rekomendasi"]
    },
    traction: [
      { label: "Alat Terdaftar", value: 5000, suffix: "+" },
      { label: "Kategori", value: 50, suffix: "+" },
      { label: "Pengunjung Bulanan", value: 100000, suffix: "+" },
      { label: "Alat Mitra", value: 200, suffix: "+" }
    ],
    businessModel: [
      { title: "Daftar Unggulan" },
      { title: "Sponsor" },
      { title: "Analitik Premium" },
      { title: "Penemuan Perusahaan" }
    ],
    advantage: [
      { feature: "Rekomendasi AI", product: "Ya", traditional: "Tidak" },
      { feature: "Pencocokan Alur Kerja", product: "Ya", traditional: "Tidak" },
      { feature: "Perbandingan Mendalam", product: "Ya", traditional: "Terbatas" }
    ],
    roadmap: [
      { phase: "Fase 1", title: "Penemuan Alat" },
      { phase: "Fase 2", title: "Rekomendasi AI" },
      { phase: "Fase 3", title: "Pencocokan Alur Kerja" },
      { phase: "Fase 4", title: "Sistem Operasi Digital" }
    ],
    futureVision: "DigiTool menjadi lapisan kecerdasan yang menghubungkan orang dan perangkat lunak.",
    cta: {
      title: "Temukan alat digital terbaik untuk Anda.",
      button1: "Jelajahi DigiTool"
    }
  },
  seo: {
    home: {
      title: "Ruang Cipta Digital | Ekosistem Inovasi",
      description: "Ruang Cipta Digital membangun produk teknologi yang memberdayakan individu dan organisasi dalam karier dan transformasi digital.",
      keywords: ["inovasi digital", "startup", "Career Mate", "DigiTool"]
    },
    careerMate: {
      title: "Career Mate | Asisten Karier AI",
      description: "Temukan peluang karier yang lebih baik dengan Career Mate.",
      keywords: ["karier", "AI", "lowongan kerja", "resume"]
    },
    digitool: {
      title: "DigiTool | Platform Penemuan Alat Digital",
      description: "Temukan alat digital terbaik dengan DigiTool.",
      keywords: ["SaaS", "alat digital", "software", "AI tools"]
    }
  },
  footer: {
    copyright: "© 2026 Ruang Cipta Digital. Hak cipta dilindungi undang-undang."
  },
  transactionFinish: {
    pageTitle: "Status Transaksi | Ruang Cipta Digital",
    title: {
      success: "Pembayaran Berhasil Diselesaikan",
      pending: "Pembayaran Tertunda",
      failed: "Pembayaran Tidak Selesai"
    },
    description: {
      success: "Pembayaran Anda telah diterima dan saat ini sedang diproses.",
      pending: "Kami sedang menunggu konfirmasi pembayaran dari penyedia pembayaran. Transaksi Anda akan otomatis diperbarui setelah pembayaran dikonfirmasi.",
      failed: "Sayangnya transaksi Anda tidak dapat diselesaikan. Silakan coba lagi atau hubungi dukungan."
    },
    orderInfo: {
      orderId: "ID Pesanan",
      status: "Status Transaksi",
      product: "Produk",
      time: "Waktu Transaksi"
    },
    cta: {
      backToProduct: "Kembali ke Produk",
      tryAgain: "Coba Lagi",
      checkLater: "Periksa Transaksi Nanti",
      backToHome: "Kembali ke Beranda"
    },
    fallbackMessage: "Terima kasih atas transaksi Anda."
  }
};
