"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import { staggerContainer, fadeUp } from "@/lib/animations";

const ingredients = [
  { name: "Ananas", emoji: "🍍", color: "bg-yellow-100" },
  { name: "Gingembre", emoji: "🫚", color: "bg-amber-100" },
  { name: "Concombre", emoji: "🥒", color: "bg-green-100" },
  { name: "Pomme fruit", emoji: "🍏", color: "bg-lime-100" },
  { name: "Céleri", emoji: "🥬", color: "bg-emerald-100" },
  { name: "Citron", emoji: "🍋", color: "bg-yellow-100" },
  { name: "Carottes", emoji: "🥕", color: "bg-orange-100" },
  { name: "Pastèque", emoji: "🍉", color: "bg-red-100" },
  { name: "Betterave", emoji: "🫐", color: "bg-purple-100" },
  { name: "Curcuma", emoji: "🟡", color: "bg-yellow-100" },
];

export default function IngredientsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="ingredients"
      ref={ref}
      className="py-20 sm:py-28 relative overflow-hidden bg-white"
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
            <motion.div
              key={item.name}
              variants={fadeUp}
              whileHover={{ y: -5, scale: 1.05 }}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl ${item.color} transition-shadow hover:shadow-lg cursor-default`}
            >
              <span className="text-4xl">{item.emoji}</span>
              <span className="text-sm font-semibold text-foreground">
                {item.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
