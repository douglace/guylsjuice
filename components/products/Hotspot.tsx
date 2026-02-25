"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hotspotPulse } from "@/lib/animations";

export interface HotspotData {
  id: string;
  emoji: string;
  label: string;
  benefit: string;
}

interface HotspotProps {
  data: HotspotData;
  isActive: boolean;
  onClick: () => void;
  productColor: string;
}

const benefitsMap: Record<string, string> = {
  Ananas: "Riche en bromélaïne, favorise la digestion et réduit l'inflammation",
  Gingembre: "Stimule le métabolisme et renforce le système immunitaire",
  Concombre: "Hydratant naturel, riche en vitamines K et C",
  "Pomme fruit": "Source de fibres et d'antioxydants pour une énergie durable",
  Céleri: "Détoxifiant naturel, riche en minéraux essentiels",
  Citron: "Vitamine C concentrée, alcalinisant et purifiant",
  Carottes: "Bêta-carotène pour une peau éclatante et une bonne vision",
  Pastèque: "Hydratation maximale et lycopène antioxydant",
  Betterave: "Booste l'endurance et purifie le sang naturellement",
  Curcuma: "Anti-inflammatoire puissant et antioxydant",
};

export function getHotspotsForProduct(ingredients: string[]): HotspotData[] {
  const emojiMap: Record<string, string> = {
    Ananas: "🍍",
    Gingembre: "🫚",
    Concombre: "🥒",
    "Pomme fruit": "🍏",
    Céleri: "🥬",
    Citron: "🍋",
    Carottes: "🥕",
    Pastèque: "🍉",
    Betterave: "🫐",
    Curcuma: "🟡",
  };

  return ingredients.map((ingredient) => ({
    id: ingredient.toLowerCase().replace(/\s+/g, "-"),
    emoji: emojiMap[ingredient] ?? "🌿",
    label: ingredient,
    benefit: benefitsMap[ingredient] ?? "Ingrédient naturel aux multiples bienfaits",
  }));
}

/* Desktop: pulsing point with tooltip */
export function HotspotDesktop({
  data,
  productColor,
}: {
  data: HotspotData;
  productColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-flex items-center gap-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        variants={hotspotPulse}
        animate="idle"
        className="w-3 h-3 rounded-full cursor-pointer"
        style={{ backgroundColor: productColor }}
      />
      <span className="text-sm font-medium text-foreground/80">
        {data.emoji} {data.label}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute left-0 top-full mt-2 z-30 w-64 bg-white/80 backdrop-blur-xl border border-white/40 rounded-xl p-3 shadow-lg"
          >
            <p className="text-xs font-semibold mb-1" style={{ color: productColor }}>
              {data.emoji} {data.label}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {data.benefit}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Mobile: pill that expands on tap */
export function HotspotMobile({
  data,
  isActive,
  onClick,
  productColor,
}: HotspotProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap"
        style={{
          borderColor: isActive ? productColor : "rgba(0,0,0,0.1)",
          backgroundColor: isActive ? `${productColor}15` : "rgba(255,255,255,0.7)",
          color: isActive ? productColor : undefined,
        }}
      >
        <span>{data.emoji}</span>
        <span>{data.label}</span>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-muted-foreground leading-relaxed pt-2 px-1">
              {data.benefit}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
