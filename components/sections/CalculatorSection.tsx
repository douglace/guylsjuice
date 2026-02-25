"use client";

import { motion } from "framer-motion";
import CalculatorFlow from "@/components/calculator/CalculatorFlow";
import SectionHeading from "@/components/shared/SectionHeading";
import DynamicBackground from "@/components/shared/DynamicBackground";

export default function CalculatorSection() {
  return (
    <section
      id="calculator"
      className="snap-section-flexible relative py-20 sm:py-28 overflow-hidden"
    >
      <DynamicBackground color="#f97316" lightColor="#dcfce7" variant="organic" intensity={0.12} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
        <SectionHeading
          label="Trouvez votre jus"
          title="Calculateur de Cure"
          subtitle="Répondez à 5 questions rapides et découvrez le jus et la cure idéals pour vous."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-6 sm:p-10 shadow-lg"
        >
          <CalculatorFlow />
        </motion.div>
      </div>
    </section>
  );
}
