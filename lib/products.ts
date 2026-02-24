export interface Product {
  id: string;
  name: string;
  ingredients: string[];
  color: string;
  prices: { size: string; price: number }[];
  description: string;
}

export const products: Product[] = [
  {
    id: "tangavis",
    name: "TanGavis",
    ingredients: ["Ananas", "Gingembre"],
    color: "#f59e0b",
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
    prices: [{ size: "Douzaine", price: 8000 }],
    description:
      "Des shots concentrés pour une détox express. Vendus par douzaine.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
