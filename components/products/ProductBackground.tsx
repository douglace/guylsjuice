"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/products";

interface ProductBackgroundProps {
  product: Product;
  className?: string;
}

export default function ProductBackground({
  product,
  className = "",
}: ProductBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visuals = isMobile
    ? product.ingredientVisuals.slice(0, 4)
    : product.ingredientVisuals;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse at 30% 50%, ${product.lightColor} 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, ${product.color}25 0%, transparent 50%), linear-gradient(135deg, ${product.lightColor}80 0%, white 50%, ${product.lightColor}40 100%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* Organic blurred shapes */}
      <motion.div
        className="absolute w-[50%] h-[50%] rounded-full blur-3xl"
        style={{ top: "10%", left: "-5%" }}
        animate={{
          backgroundColor: `${product.color}30`,
          x: prefersReducedMotion ? 0 : [0, 20, 0],
          y: prefersReducedMotion ? 0 : [0, -15, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[40%] h-[40%] rounded-full blur-3xl"
        style={{ bottom: "5%", right: "-5%" }}
        animate={{
          backgroundColor: `${product.lightColor}`,
          x: prefersReducedMotion ? 0 : [0, -15, 0],
          y: prefersReducedMotion ? 0 : [0, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full blur-3xl"
        style={{ backgroundColor: product.color, opacity: 0.15 }}
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
              className="absolute opacity-[0.12] select-none pointer-events-none"
              style={{
                left: `${ingredient.x}%`,
                top: `${ingredient.y}%`,
                fontSize: `${ingredient.size}px`,
              }}
              animate={
                prefersReducedMotion ? {} : { y: [0, -20, 0] }
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
