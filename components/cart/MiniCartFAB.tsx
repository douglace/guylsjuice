"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";
import { badgeBounce } from "@/lib/animations";

export default function MiniCartFAB() {
  const { totalItems, toggleCart } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleCart}
          className="fixed bottom-20 right-4 lg:bottom-6 lg:right-20 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-brand-orange text-white shadow-lg hover:shadow-xl transition-shadow"
          aria-label={`Panier (${totalItems} articles)`}
        >
          <ShoppingCart className="h-6 w-6" />
          <motion.span
            key={totalItems}
            variants={badgeBounce}
            initial="initial"
            animate="bounce"
            className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold px-1"
          >
            {totalItems}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
