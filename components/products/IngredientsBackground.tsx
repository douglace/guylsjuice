"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/products";

interface IngredientsBackgroundProps {
  product: Product;
  className?: string;
}

export default function IngredientsBackground({
  product,
  className = "",
}: IngredientsBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Limit to 4 emojis on mobile for performance
  const visuals = isMobile
    ? product.ingredientVisuals.slice(0, 4)
    : product.ingredientVisuals;

  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Radial gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(circle at center, ${product.lightColor}, ${product.color}20 60%, transparent 100%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: product.color, opacity: 0.25 }}
      />

      {/* Floating emoji ingredients */}
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {visuals.map((ingredient, index) => (
            <motion.span
              key={`${product.id}-${index}`}
              className="absolute opacity-[0.15] select-none pointer-events-none"
              style={{
                left: `${ingredient.x}%`,
                top: `${ingredient.y}%`,
                fontSize: `${ingredient.size}px`,
              }}
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [0, -20, 0] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      repeat: Infinity,
                      duration: 3 + ingredient.delay,
                      ease: "easeInOut",
                    }
              }
              aria-label={ingredient.label}
            >
              {ingredient.emoji}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
