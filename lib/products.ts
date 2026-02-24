export interface IngredientVisual {
  emoji: string;
  label: string;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export interface Product {
  id: string;
  name: string;
  ingredients: string[];
  color: string;
  lightColor: string;
  darkColor: string;
  ingredientVisuals: IngredientVisual[];
  prices: { size: string; price: number }[];
  description: string;
}

export const products: Product[] = [
  {
    id: "tangavis",
    name: "TanGavis",
    ingredients: ["Ananas", "Gingembre"],
    color: "#f59e0b",
    lightColor: "#fef3c7",
    darkColor: "#92400e",
    ingredientVisuals: [
      { emoji: "🍍", label: "Ananas", x: 10, y: 20, size: 48, delay: 0 },
      { emoji: "🫚", label: "Gingembre", x: 80, y: 60, size: 40, delay: 0.5 },
      { emoji: "🍍", label: "Ananas", x: 25, y: 75, size: 36, delay: 1.0 },
      { emoji: "🫚", label: "Gingembre", x: 70, y: 15, size: 32, delay: 1.5 },
    ],
    prices: [
      { size: "0.5L", price: 1000 },
      { size: "1L", price: 1800 },
      { size: "1.5L", price: 2500 },
    ],
    description: "Un mélange tropical énergisant d'ananas et de gingembre.",
  },
  {
    id: "detox-skinny",
    name: "Détox Skinny",
    ingredients: ["Concombre", "Pomme fruit", "Céleri", "Citron", "Gingembre"],
    color: "#84cc16",
    lightColor: "#ecfccb",
    darkColor: "#3f6212",
    ingredientVisuals: [
      { emoji: "🥒", label: "Concombre", x: 8, y: 25, size: 44, delay: 0 },
      { emoji: "🍏", label: "Pomme", x: 85, y: 15, size: 40, delay: 0.3 },
      { emoji: "🥬", label: "Céleri", x: 15, y: 70, size: 38, delay: 0.6 },
      { emoji: "🍋", label: "Citron", x: 75, y: 65, size: 42, delay: 0.9 },
      { emoji: "🫚", label: "Gingembre", x: 50, y: 85, size: 34, delay: 1.2 },
    ],
    prices: [
      { size: "0.5L", price: 1000 },
      { size: "1L", price: 1800 },
      { size: "1.5L", price: 2500 },
    ],
    description:
      "Le cocktail minceur par excellence : frais, léger et détoxifiant.",
  },
  {
    id: "skin-glow",
    name: "Skin Glow",
    ingredients: ["Carottes", "Pastèque", "Gingembre"],
    color: "#f97316",
    lightColor: "#ffedd5",
    darkColor: "#9a3412",
    ingredientVisuals: [
      { emoji: "🥕", label: "Carottes", x: 12, y: 30, size: 46, delay: 0 },
      { emoji: "🍉", label: "Pastèque", x: 82, y: 20, size: 44, delay: 0.4 },
      { emoji: "🫚", label: "Gingembre", x: 20, y: 75, size: 36, delay: 0.8 },
      { emoji: "🥕", label: "Carottes", x: 75, y: 70, size: 38, delay: 1.2 },
    ],
    prices: [
      { size: "0.5L", price: 1000 },
      { size: "1L", price: 1800 },
      { size: "1.5L", price: 2500 },
    ],
    description: "Pour une peau éclatante grâce aux carottes et à la pastèque.",
  },
  {
    id: "red-boost",
    name: "Red Boost",
    ingredients: ["Betterave", "Citron", "Ananas"],
    color: "#dc2626",
    lightColor: "#fee2e2",
    darkColor: "#991b1b",
    ingredientVisuals: [
      { emoji: "🍋", label: "Citron", x: 10, y: 25, size: 42, delay: 0 },
      { emoji: "🍍", label: "Ananas", x: 80, y: 20, size: 46, delay: 0.5 },
      { emoji: "🍋", label: "Citron", x: 20, y: 72, size: 36, delay: 1.0 },
      { emoji: "🍍", label: "Ananas", x: 75, y: 68, size: 38, delay: 1.5 },
    ],
    prices: [
      { size: "0.5L", price: 1000 },
      { size: "1L", price: 1800 },
      { size: "1.5L", price: 2500 },
    ],
    description:
      "Un boost d'énergie naturel avec la puissance de la betterave.",
  },
  {
    id: "green-energy",
    name: "Green Energy",
    ingredients: ["Pomme fruit", "Ananas", "Céleri", "Gingembre"],
    color: "#22c55e",
    lightColor: "#dcfce7",
    darkColor: "#166534",
    ingredientVisuals: [
      { emoji: "🍏", label: "Pomme", x: 8, y: 20, size: 44, delay: 0 },
      { emoji: "🍍", label: "Ananas", x: 85, y: 25, size: 42, delay: 0.4 },
      { emoji: "🥬", label: "Céleri", x: 18, y: 72, size: 38, delay: 0.8 },
      { emoji: "🫚", label: "Gingembre", x: 78, y: 68, size: 36, delay: 1.2 },
    ],
    prices: [
      { size: "0.5L", price: 1000 },
      { size: "1L", price: 1800 },
      { size: "1.5L", price: 2500 },
    ],
    description: "L'énergie verte pour booster votre journée naturellement.",
  },
  {
    id: "shots-detox",
    name: "Shots Détox",
    ingredients: ["Gingembre", "Citron", "Curcuma"],
    color: "#15803d",
    lightColor: "#dcfce7",
    darkColor: "#14532d",
    ingredientVisuals: [],
    prices: [{ size: "Douzaine", price: 8000 }],
    description:
      "Des shots concentrés pour une détox express. Vendus par douzaine.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
