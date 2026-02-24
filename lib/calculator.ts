export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; scores: Record<string, number> }[];
}

export type Profile =
  | "weight_loss"
  | "skin"
  | "energy"
  | "detox"
  | "immunity";

export const profileLabels: Record<Profile, string> = {
  weight_loss: "Perte de poids",
  skin: "Éclat de la peau",
  energy: "Énergie & Vitalité",
  detox: "Détox Profonde",
  immunity: "Immunité",
};

export const profileRecommendations: Record<
  Profile,
  { juiceId: string; cureId: string }
> = {
  weight_loss: { juiceId: "detox-skinny", cureId: "cure-5" },
  skin: { juiceId: "skin-glow", cureId: "cure-5" },
  energy: { juiceId: "green-energy", cureId: "cure-3" },
  detox: { juiceId: "detox-skinny", cureId: "cure-7" },
  immunity: { juiceId: "red-boost", cureId: "cure-7" },
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    question: "Quel est votre objectif principal ?",
    options: [
      {
        label: "Perdre du poids",
        scores: { weight_loss: 3, detox: 1 },
      },
      {
        label: "Avoir une belle peau",
        scores: { skin: 3, detox: 1 },
      },
      {
        label: "Booster mon énergie",
        scores: { energy: 3, immunity: 1 },
      },
      {
        label: "Détoxifier mon corps",
        scores: { detox: 3, weight_loss: 1 },
      },
    ],
  },
  {
    id: "lifestyle",
    question: "Comment décririez-vous votre mode de vie ?",
    options: [
      {
        label: "Sédentaire (bureau)",
        scores: { weight_loss: 2, detox: 2 },
      },
      {
        label: "Modérément actif",
        scores: { energy: 1, skin: 1 },
      },
      {
        label: "Très actif / Sportif",
        scores: { energy: 3, immunity: 1 },
      },
      {
        label: "Stressé et fatigué",
        scores: { detox: 2, energy: 2 },
      },
    ],
  },
  {
    id: "diet",
    question: "Comment mangez-vous au quotidien ?",
    options: [
      {
        label: "Beaucoup de fast-food",
        scores: { detox: 3, weight_loss: 2 },
      },
      {
        label: "Équilibré mais pas toujours",
        scores: { immunity: 1, energy: 1 },
      },
      {
        label: "Végétarien / Sain",
        scores: { skin: 2, energy: 1 },
      },
      {
        label: "Je saute souvent des repas",
        scores: { energy: 2, immunity: 2 },
      },
    ],
  },
  {
    id: "concern",
    question: "Qu'est-ce qui vous préoccupe le plus ?",
    options: [
      {
        label: "Mon poids",
        scores: { weight_loss: 3 },
      },
      {
        label: "Ma peau (acné, teint terne)",
        scores: { skin: 3 },
      },
      {
        label: "Ma fatigue chronique",
        scores: { energy: 3 },
      },
      {
        label: "Je tombe souvent malade",
        scores: { immunity: 3 },
      },
    ],
  },
  {
    id: "preference",
    question: "Quel type de saveur préférez-vous ?",
    options: [
      {
        label: "Fruité et doux",
        scores: { skin: 1, energy: 1 },
      },
      {
        label: "Frais et léger",
        scores: { weight_loss: 1, detox: 1 },
      },
      {
        label: "Piquant / Gingembre",
        scores: { immunity: 1, energy: 1 },
      },
      {
        label: "Peu importe, le résultat compte",
        scores: { detox: 1, weight_loss: 1 },
      },
    ],
  },
];

export function calculateProfile(
  answers: Record<string, number>[]
): Profile {
  const totals: Record<string, number> = {
    weight_loss: 0,
    skin: 0,
    energy: 0,
    detox: 0,
    immunity: 0,
  };

  for (const scores of answers) {
    for (const [key, value] of Object.entries(scores)) {
      totals[key] = (totals[key] || 0) + value;
    }
  }

  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0] as Profile;
}
