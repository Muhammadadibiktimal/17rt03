// CMS Data Engine using localStorage for RT 03 Portal

const DEFAULT_DATA = {
  announcements: [
    {
      id: "ann-1",
      title: "Gotong Royong & Kerja Bakti Kebersihan Lingkungan",
      date: "2026-08-16",
      category: "Kegiatan",
      badge: "Penting",
      content: "Dihimbau kepada seluruh warga RT 03 untuk hadir dalam kegiatan kerja bakti membersihkan lingkungan dan merapikan selokan persiapan menyambut HUT RI."
    },
    {
      id: "ann-2",
      title: "Jadwal Pelayanan Posyandu Balita & Lansia",
      date: "2026-08-20",
      category: "Kesehatan",
      badge: "Rutin",
      content: "Pelayanan Posyandu rutin bulan ini akan dilaksanakan di Pos Ronda RT 03 mulai pukul 08:00 WIB. Mohon membawa buku KIA."
    },
    {
      id: "ann-3",
      title: "Pembayaran Iuran Kas RT Bulan Agustus",
      date: "2026-08-01",
      category: "Keuangan",
      badge: "Info",
      content: "Pembayaran iuran bulanan warga dapat dilakukan melalui Bendahara RT (Bpk. Ahmad) atau via transfer ke QRIS resmi RT 03."
    }
  ],
  events: [
    {
      id: "event-17agustus",
      slug: "17-agustus",
      title: "Peringatan HUT RI ke-81 RT 03",
      date: "17 Agustus 2026",
      category: "Spesial Nasional",
      featured: true,
      badge: "Event Utama",
      image: "img/gallery/8.jpg",
      description: "Rangkaian acara semarak kemerdekaan 17 Agustus RT 03, dimeriahkan dengan berbagai lomba seru untuk anak-anak, remaja, ibu-ibu, dan bapak-bapak serta Malam Puncak Pentas Seni.",
      details: {
        theme: "GENERASI BARU RT 03 TERUS MAJU DAN BERSATU",
        location: "Lap. Serbaguna & Pos Ronda RT 03",
        time: "07:30 WIB - Selesai",
        competitions: [
          { category: "Anak-Anak", items: ["Makan Kerupuk", "Balap Karung Helm", "Masukkan Paku dalam Botol", "Lari Kelereng"] },
          { category: "Ibu-Ibu", items: ["Joget Balon Pasangan", "Estafet Tepung", "Memasak Nasi Goreng Kreasi"] },
          { category: "Bapak-Bapak", items: ["Turnamen Catur", "Lomba Domino/Gapsa", "Tarik Tambang Saling Tarik"] },
          { category: "Remaja", items: ["Mobile Legends Tournament", "E-Sport FIFA", "Pentas Seni Kreatif"] }
        ],
        panitia: [
          { role: "Penanggung Jawab", name: "Ketua RT 03 (Bpk. M. Adib)" },
          { role: "Ketua Panitia", name: "Rizky Pratama" },
          { role: "Sekretaris", name: "Siti Aminah" },
          { role: "Bendahara", name: "Bpk. Ahmad Sujianto" }
        ],
        gallery: [
          "img/gallery/8.jpg",
          "img/gallery/7.jpg",
          "img/gallery/11.jpg",
          "img/gallery/10.jpg",
          "img/gallery/9.jpg",
          "img/gallery/DSC_0251.JPG",
          "img/gallery/DSC_0192.JPG"
        ]
      }
    },
    {
      id: "event-posyandu",
      slug: "posyandu-rutin",
      title: "Posyandu Sehat Warga RT 03",
      date: "Setiap Bulan Tgl 20",
      category: "Kesehatan",
      featured: false,
      badge: "Rutin",
      image: "img/gallery/7.jpg",
      description: "Pemeriksaan kesehatan gratis balita, cek tekanan darah lansia, penimbangan, serta pembagian makanan tambahan (PMT).",
      details: {
        theme: "Masyarakat Sehat, RT 03 Sejahtera",
        location: "Posyandu Mawar RT 03",
        time: "08.00 - 11.30 WIB",
        competitions: [],
        panitia: [{ role: "Kader Posyandu", name: "Ibu-ibu PKK RT 03" }],
        gallery: ["img/gallery/7.jpg", "img/gallery/11.jpg"]
      }
    },
    {
      id: "event-siskamling",
      slug: "siskamling-ronda",
      title: "Siskamling & Ronda Malam Terpadu",
      date: "Setiap Malam",
      category: "Keamanan",
      featured: false,
      badge: "Rutin",
      image: "img/gallery/10.jpg",
      description: "Kegiatan ronda malam warga untuk menjaga keamanan, ketertiban, serta kenyamanan lingkungan RT 03 secara bergantian.",
      details: {
        theme: "Lingkungan Aman, Warga Tenang",
        location: "Pos Ronda Utama RT 03",
        time: "22.00 - 04.00 WIB",
        competitions: [],
        panitia: [{ role: "Koordinator Keamanan", name: "Pak Bambang" }],
        gallery: ["img/gallery/10.jpg"]
      }
    }
  ],
  pengurus: [
    { name: "M. Adib Iktimal", role: "Ketua RT 03", phone: "+62 812-3456-7890", avatar: "img/about/IMG-20240716-WA0004.jpg" },
    { name: "Budi Santoso", role: "Sekretaris RT", phone: "+62 813-9876-5432", avatar: "" },
    { name: "Ahmad Sujianto", role: "Bendahara RT", phone: "+62 815-1122-3344", avatar: "" },
    { name: "Rizky Pratama", role: "Ketua Karang Taruna", phone: "+62 878-5566-7788", avatar: "" }
  ]
};

// Initialize DB
function getCMSData() {
  const local = localStorage.getItem("RT03_CMS_DATA");
  if (!local) {
    localStorage.setItem("RT03_CMS_DATA", JSON.stringify(DEFAULT_DATA));
    return DEFAULT_DATA;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    return DEFAULT_DATA;
  }
}

function saveCMSData(data) {
  localStorage.setItem("RT03_CMS_DATA", JSON.stringify(data));
}

function resetCMSData() {
  localStorage.setItem("RT03_CMS_DATA", JSON.stringify(DEFAULT_DATA));
  return DEFAULT_DATA;
}
