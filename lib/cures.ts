export interface Cure {
  id: string;
  name: string;
  duration: string;
  juices: string[];
  benefits: string[];
  price: number;
  popular?: boolean;
}

export const cures: Cure[] = [
  {
    id: "cure-3",
    name: "Cure 3 Jours",
    duration: "3 jours",
    juices: ["Détox Skinny", "Green Energy", "TanGavis"],
    benefits: [
      "Élimination des toxines",
      "Regain d'énergie",
      "Digestion améliorée",
    ],
    price: 15000,
  },
  {
    id: "cure-5",
    name: "Cure 5 Jours",
    duration: "5 jours",
    juices: ["Détox Skinny", "Green Energy", "TanGavis", "Red Boost", "Skin Glow"],
    benefits: [
      "Perte de poids visible",
      "Peau plus claire",
      "Énergie décuplée",
      "Meilleur sommeil",
    ],
    price: 25000,
    popular: true,
  },
  {
    id: "cure-7",
    name: "Cure 7 Jours",
    duration: "7 jours",
    juices: [
      "Détox Skinny",
      "Green Energy",
      "TanGavis",
      "Red Boost",
      "Skin Glow",
      "Shots Détox",
    ],
    benefits: [
      "Transformation complète",
      "Système immunitaire renforcé",
      "Silhouette affinée",
      "Teint lumineux",
      "Vitalité retrouvée",
    ],
    price: 35000,
  },
];
