"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";

interface ScrollProgressDotsProps {
  products: Product[];
  activeIndex: number;
  onDotClick: (index: number) => void;
  visible: boolean;
}

export default function ScrollProgressDots({
  products,
  activeIndex,
  onDotClick,
  visible,
}: ScrollProgressDotsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop - vertical dots on the right */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 items-center"
            aria-label="Product navigation"
          >
            {products.map((product, index) => {
              const isActive = index === activeIndex;
              const isHovered = hoveredIndex === index;

              return (
                <div key={product.id} className="relative flex items-center">
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-black/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
                      >
                        {product.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <motion.button
                    layout
                    aria-label={product.name}
                    onClick={() => onDotClick(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileTap={{ scale: 0.8 }}
                    animate={{
                      backgroundColor: isActive ? product.color : "#d1d5db",
                      width: 12,
                      height: isActive ? 32 : 12,
                      borderRadius: 9999,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`w-3 rounded-full cursor-pointer ${
                      isActive ? "" : "hover:bg-gray-400"
                    }`}
                    style={isActive ? { backgroundColor: product.color } : undefined}
                  />
                </div>
              );
            })}
          </motion.nav>

          {/* Mobile - horizontal dots at the bottom */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 gap-2 items-center bg-black/20 backdrop-blur-md rounded-full px-3 py-2"
            aria-label="Product navigation"
          >
            {products.map((product, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={product.id}
                  layout
                  aria-label={product.name}
                  onClick={() => onDotClick(index)}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    backgroundColor: isActive ? product.color : "rgba(255,255,255,0.4)",
                    width: isActive ? 24 : 10,
                    height: 10,
                    borderRadius: 9999,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="rounded-full cursor-pointer"
                  style={
                    isActive
                      ? { backgroundColor: product.color }
                      : { backgroundColor: "rgba(255,255,255,0.4)" }
                  }
                />
              );
            })}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
