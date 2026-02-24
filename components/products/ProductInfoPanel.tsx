"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { generateOrderMessage, generateWhatsAppURL } from "@/lib/whatsapp";

export default function ProductInfoPanel({ product }: { product: Product }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="flex flex-col justify-center text-center lg:text-left w-full"
      >
        {/* Product name */}
        <h2
          className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-3"
          style={{ color: product.color }}
        >
          {product.name}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-lg text-muted-foreground mb-2 sm:mb-4 max-w-md mx-auto lg:mx-0">
          {product.description}
        </p>

        {/* Ingredient badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start mb-2 sm:mb-4">
          {product.ingredients.map((ingredient) => (
            <Badge
              key={ingredient}
              variant="secondary"
              className="text-xs sm:text-sm"
              style={{ backgroundColor: `${product.color}15`, color: product.color }}
            >
              {ingredient}
            </Badge>
          ))}
        </div>

        {/* Prices */}
        <div className="flex gap-2 sm:gap-3 justify-center lg:justify-start mb-3 sm:mb-6">
          {product.prices.map((price) => (
            <div
              key={price.size}
              className="bg-white/60 backdrop-blur-md border rounded-2xl px-3 py-2 sm:px-4 sm:py-3"
            >
              <div className="text-[10px] sm:text-xs text-muted-foreground">
                {price.size}
              </div>
              <div
                className="text-base sm:text-xl font-bold"
                style={{ color: product.color }}
              >
                {price.price.toLocaleString("fr-FR")}
                <span className="text-[10px] sm:text-xs"> FCFA</span>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp button */}
        <div className="flex justify-center lg:justify-start">
          <Button
            asChild
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full px-6 sm:px-8 shadow-lg"
          >
            <a
              href={generateWhatsAppURL(
                generateOrderMessage(
                  product.name,
                  product.prices[0].size,
                  product.prices[0].price
                )
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Commander {product.name}
            </a>
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
