// ============================================================
// KAPRELOVED — PRODUCTS DATABASE
// ============================================================
// - id: unik (format: KPL-001, KPL-002, dst)
// - images: array path foto ["images/kpl-001-1.jpg", "images/kpl-001-2.jpg"]
//           kosongkan array [] kalau belum ada foto
// - condition: "Like New" | "Very Good" | "Good"
// - status: "available" | "sold"
// - category: "Pakaian" | "Sepatu" | "Tas" | "Aksesoris" | "Lainnya"
// ============================================================

const WA_NUMBER = "6281373928863";

const products = [
  {
    id: "KPL-001",
    name: "Multicleaning Cleaning Brush",
    brand: "Multicleaning",
    category: "Lainnya",
    size: "-",
    condition: "Like New",
    price: 20000,
    originalPrice: 45000,
    description: "Cleaning brush serbaguna. Kondisi baru, belum pernah dipakai. Stock 5 pcs.",
    images: [
      "images/kpl-001-1.jpeg",
      "images/kpl-001-2.jpeg",
      "images/kpl-001-3.jpeg",
    ],
    status: "available",
  },
  {
    id: "KPL-002",
    name: "Tang Crimp",
    brand: "-",
    category: "Lainnya",
    size: "-",
    condition: "Like New",
    price: 25000,
    originalPrice: 50000,
    description: "Tang crimp kondisi baru. Fungsi normal, siap pakai.",
    images: [
      "images/kpl-002-1.jpeg",
      "images/kpl-002-2.jpeg",
    ],
    status: "available",
  },
  {
    id: "KPL-003",
    name: "New Balance",
    brand: "New Balance",
    category: "Sepatu",
    size: "-",
    condition: "Good",
    price: 400000,
    originalPrice: 400000,
    description: "New Balance kondisi good. Ada tanda pemakaian wajar. Foto asli tersedia.",
    images: [
      "images/kpl-003-1.jpeg",
      "images/kpl-003-2.jpeg",
      "images/kpl-003-3.jpeg",
    ],
    status: "available",
  },
  {
    id: "KPL-004",
    name: "Nike Blazer Mid 77",
    brand: "Nike",
    category: "Sepatu",
    size: "46",
    condition: "Like New",
    price: 700000,
    originalPrice: 700000,
    description: "Nike Blazer Mid 77 size 46. Kondisi like new, tidak ada box. Foto asli tersedia.",
    images: [
      "images/kpl-004-1.jpeg",
      "images/kpl-004-2.jpeg",
      
    ],
    status: "available",
  },
  {
    id: "KPL-006",
    name: "Nike Air Max 97",
    brand: "Nike",
    category: "Sepatu",
    size: "-",
    condition: "Very Good",
    price: 400000,
    originalPrice: 400000,
    description: "Nike Air Max 97. Foto asli tersedia.",
    images: [
      "images/KPL-006-1.jpeg",
      "images/KPL-006-2.jpeg",
      "images/KPL-006-3.jpeg",
    ],
    status: "available",
  },
  {
    id: "KPL-007",
    name: "Adidas Superstar",
    brand: "Adidas",
    category: "Sepatu",
    size: "-",
    condition: "Very Good",
    price: 400000,
    originalPrice: 400000,
    description: "Adidas Superstar kondisi 90%, jarang dipakai. Foto asli tersedia.",
    images: [
      "images/KPL-007-1.jpeg",
      "images/KPL-007-2.jpeg",
      "images/KPL-007-3.jpeg",
    ],
    status: "available",
  },
  {
    id: "KPL-008",
    name: "Adidas NMD",
    brand: "Adidas",
    category: "Sepatu",
    size: "-",
    condition: "Good",
    price: 350000,
    originalPrice: 350000,
    description: "Adidas NMD kondisi 85%. Catatan: boost yellowing. Foto asli tersedia.",
    images: [
      "images/KPL-008-1.jpeg",
      "images/KPL-008-2.jpeg",
      "images/KPL-008-3.jpeg",
    ],
    status: "available",
  },
  {
    id: "KPL-009",
    name: "MMA Glove Evolve",
    brand: "Evolve",
    category: "Aksesoris",
    size: "-",
    condition: "Like New",
    price: 100000,
    originalPrice: 300000,
    description: "MMA glove Evolve. Kondisi baru, belum pernah dipakai.",
    images: [
      "images/KPL-009-1.jpeg",
      "images/KPL-009-2.jpeg",
      "images/KPL-009-3.jpeg",
    ],
    status: "available",
  },
];

