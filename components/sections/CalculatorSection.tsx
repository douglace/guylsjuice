"use client";

import { motion } from "framer-motion";
import { Beaker } from "lucide-react";
import CalculatorFlow from "@/components/calculator/CalculatorFlow";
import SectionHeading from "@/components/shared/SectionHeading";

export default function CalculatorSection() {
  return (
    <section
      id="calculator"
      className="py-24 sm:py-32 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-100/40 rounded-full blur-3xl" />
      </div>

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
          className="bg-gradient-to-b from-green-50 to-white rounded-3xl p-6 sm:p-10 border border-green-100 shadow-md"
        >
          <CalculatorFlow />
        </motion.div>
      </div>
    </section>
  );
}
