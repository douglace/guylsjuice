"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";

export default function ProductBottleFallback({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 22, stiffness: 180 }}
          className="flex flex-col items-center"
        >
          {/* Floating idle animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Glow behind bottle */}
            <motion.div
              className="absolute -inset-8 rounded-full blur-2xl opacity-30"
              animate={{ backgroundColor: product.color }}
              transition={{ duration: 0.6 }}
            />

            {/* Cap */}
            <div className="relative z-10">
              <div
                className="w-7 h-3 sm:w-10 sm:h-5 mx-auto rounded-t-lg shadow-md"
                style={{ backgroundColor: "#16a34a" }}
              >
                {/* Cap highlight */}
                <div className="absolute top-0.5 left-1 sm:left-1.5 w-1.5 sm:w-2 h-2 sm:h-3 bg-white/25 rounded-full blur-[1px]" />
              </div>

              {/* Neck */}
              <motion.div
                className="w-8 h-6 sm:w-12 sm:h-10 mx-auto rounded-t-sm"
                animate={{
                  background: `linear-gradient(135deg, ${product.color}ee, ${product.color}cc)`,
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Neck shine */}
                <div className="absolute top-0 left-1 w-1.5 sm:w-2 h-full bg-white/20 rounded-full blur-[1px]" />
              </motion.div>

              {/* Body */}
              <motion.div
                className="w-24 h-40 sm:w-40 sm:h-72 mx-auto rounded-b-3xl rounded-t-xl relative overflow-hidden"
                animate={{
                  background: `linear-gradient(145deg, ${product.color}dd, ${product.color}f0, ${product.color}cc)`,
                  boxShadow: `0 25px 50px -12px ${product.color}40, 0 12px 24px -8px ${product.color}30, inset 0 -4px 12px ${product.color}20`,
                }}
                transition={{ duration: 0.6 }}
              >
                {/* Liquid wave effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-4/5"
                  animate={{
                    background: `linear-gradient(to top, ${product.color}, ${product.color}80, transparent)`,
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Animated liquid wave line */}
                <motion.div
                  className="absolute left-0 right-0 h-[2px] opacity-20"
                  style={{ top: "22%" }}
                  animate={{
                    background: `linear-gradient(90deg, transparent, white, transparent)`,
                    x: [-20, 20, -20],
                  }}
                  transition={{
                    x: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    background: { duration: 0.6 },
                  }}
                />

                {/* Label */}
                <div className="absolute inset-x-2 sm:inset-x-4 top-[28%] bottom-[28%] bg-white/92 rounded-lg sm:rounded-xl flex flex-col items-center justify-center shadow-sm backdrop-blur-[1px]">
                  {/* Label border decoration */}
                  <div
                    className="absolute inset-[2px] sm:inset-[3px] rounded-md sm:rounded-lg border opacity-20"
                    style={{ borderColor: product.color }}
                  />

                  <p
                    className="text-[10px] sm:text-lg font-extrabold tracking-widest"
                    style={{ color: "#14532d" }}
                  >
                    GUYL&apos;S
                  </p>
                  <div
                    className="w-5 sm:w-8 h-[1px] my-0.5 sm:my-1 opacity-40"
                    style={{ backgroundColor: product.color }}
                  />
                  <motion.p
                    className="text-[8px] sm:text-sm font-bold tracking-wide"
                    animate={{ color: product.color }}
                    transition={{ duration: 0.6 }}
                  >
                    {product.name}
                  </motion.p>
                  <p className="text-[7px] sm:text-[9px] text-gray-400 mt-0.5 tracking-wider hidden sm:block">
                    JUS DETOX
                  </p>
                </div>

                {/* Glass shine - main */}
                <div className="absolute top-0 left-2 sm:left-3 w-3 sm:w-5 h-full bg-gradient-to-b from-white/30 via-white/15 to-transparent rounded-full blur-[2px]" />

                {/* Glass shine - secondary */}
                <div className="absolute top-4 right-3 sm:right-5 w-1.5 sm:w-2 h-10 sm:h-16 bg-white/15 rounded-full blur-sm" />

                {/* Bottom reflection */}
                <div className="absolute bottom-0 left-0 right-0 h-5 sm:h-8 bg-gradient-to-t from-black/10 to-transparent rounded-b-3xl" />
              </motion.div>

              {/* Shadow under bottle */}
              <motion.div
                className="w-20 sm:w-28 h-3 sm:h-4 mx-auto rounded-full blur-md mt-1 sm:mt-2"
                animate={{
                  backgroundColor: `${product.color}25`,
                }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
