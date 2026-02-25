"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import GlassCard from "@/components/shared/GlassCard";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { useScrollContainer } from "@/components/shared/ScrollContainerContext";

const ingredients = [
  { name: "Ananas", emoji: "🍍", color: "#fef3c7", benefit: "Digestion" },
  { name: "Gingembre", emoji: "🫚", color: "#fde68a", benefit: "Anti-inflammatoire" },
  { name: "Concombre", emoji: "🥒", color: "#dcfce7", benefit: "Hydratation" },
  { name: "Pomme fruit", emoji: "🍏", color: "#ecfccb", benefit: "Antioxydant" },
  { name: "Céleri", emoji: "🥬", color: "#d1fae5", benefit: "Détoxifiant" },
  { name: "Citron", emoji: "🍋", color: "#fef9c3", benefit: "Vitamine C" },
  { name: "Carottes", emoji: "🥕", color: "#ffedd5", benefit: "Bêta-carotène" },
  { name: "Pastèque", emoji: "🍉", color: "#fee2e2", benefit: "Hydratation" },
  { name: "Betterave", emoji: "🫐", color: "#ede9fe", benefit: "Énergie" },
  { name: "Curcuma", emoji: "🟡", color: "#fef3c7", benefit: "Anti-oxydant" },
];

export default function IngredientsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef ?? undefined,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="ingredients"
      ref={ref}
      className="snap-section-flexible relative py-20 sm:py-28 overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute -top-20 -right-20 w-72 h-72 bg-green-100/50 rounded-full blur-3xl pointer-events-none"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <SectionHeading
          label="Nos ingrédients"
          title="100% Naturels"
          subtitle="Chaque jus est préparé avec des fruits et légumes frais, soigneusement sélectionnés."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6"
        >
          {ingredients.map((item) => (
            <GlassCard
              key={item.name}
              variants={fadeUp}
              className="flex flex-col items-center gap-2 !p-5 cursor-default"
              style={{ backgroundColor: `${item.color}99` }}
            >
              <span className="text-5xl">{item.emoji}</span>
              <span className="text-sm font-semibold text-foreground">
                {item.name}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {item.benefit}
              </span>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
