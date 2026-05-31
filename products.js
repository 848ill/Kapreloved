// ============================================================
// KAPRELOVED — PRODUCTS DATABASE
// ============================================================
// Cara isi:
// - id: unik, ga boleh sama (format: KPL-001, KPL-002, dst)
// - image: URL foto (Google Drive, Imgur, dll). Kalau belum ada, kosongin ""
// - condition: "Like New" | "Very Good" | "Good"
// - status: "available" | "sold"
// - category: "Pakaian" | "Sepatu" | "Tas" | "Aksesoris" | "Lainnya"
// - waNumber: nomor WA Sakha (format: 628xxxxxxxxxx)
// ============================================================

const WA_NUMBER = "6281373928863"; // <-- GANTI NOMOR WA SAKHA DI SINI

const products = [
  {
    id: "KPL-001",
    name: "Sepatu Nike Blazer Bekas",
    brand: "Brand",
    category: "Sepatu",
    size: "46",
    condition: "Good",
    price: 1500000,
    originalPrice: 700000,
    description: "Sepatu ini masih dalam keadaan bagus dan layak untuk dipakai",
    image: "",
    images: [
    "assets/pakaian1_1.jpg", // Foto ke-1 (sama dengan foto utama)
    "assets/pakaian1_2.jpg", // Foto ke-2 (tampak belakang/detail)
    "assets/pakaian1_3.jpg"  // Foto ke-3 (label ukuran/tag)
  ],
    status: "available",
  },
  {
    id: "KPL-002",
    name: "Nama Barang 2",
    brand: "Brand",
    category: "Sepatu",
    size: "42",
    condition: "Very Good",
    price: 200000,
    originalPrice: 600000,
    description: "Deskripsi barang. Kondisi, alasan jual, catatan penting. Jujur apa adanya.",
    image: "",
    images: [
    "assets/pakaian1_1.jpg", // Foto ke-1 (sama dengan foto utama)
    "assets/pakaian1_2.jpg", // Foto ke-2 (tampak belakang/detail)
    "assets/pakaian1_3.jpg"  // Foto ke-3 (label ukuran/tag)
  ],
    status: "available",
  },
  {
    id: "KPL-003",
    name: "Nama Barang 3",
    brand: "Brand",
    category: "Tas",
    size: "-",
    condition: "Good",
    price: 100000,
    originalPrice: 300000,
    description: "Deskripsi barang. Kondisi, alasan jual, catatan penting. Jujur apa adanya.",
    image: "",
    status: "sold",
  },
];
