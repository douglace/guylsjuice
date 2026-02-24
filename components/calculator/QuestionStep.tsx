"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/lib/calculator";

interface QuestionStepProps {
  question: QuizQuestion;
  onAnswer: (scores: Record<string, number>) => void;
  direction: number;
}

export default function QuestionStep({
  question,
  onAnswer,
  direction,
}: QuestionStepProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <h3 className="text-xl font-bold text-center mb-6">
          {question.question}
        </h3>

        <div className="grid gap-3">
          {question.options.map((option) => (
            <motion.button
              key={option.label}
              onClick={() => onAnswer(option.scores)}
              className="w-full text-left px-5 py-4 rounded-xl border-2 border-green-100 bg-white hover:border-brand-green hover:bg-green-50 transition-all text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
