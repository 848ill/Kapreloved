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
];