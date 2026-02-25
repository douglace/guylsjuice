"use client";

import { motion } from "framer-motion";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import {
  generateContextualOrderMessage,
  generateWhatsAppURL,
} from "@/lib/whatsapp";

interface StickyOrderBarProps {
  product: Product;
  selectedSize: number;
  onSizeChange: (index: number) => void;
  onAddToCart: () => void;
}

export default function StickyOrderBar({
  product,
  selectedSize,
  onSizeChange,
  onAddToCart,
}: StickyOrderBarProps) {
  const price = product.prices[selectedSize];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="absolute bottom-16 lg:bottom-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-xl border-t border-white/40"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 lg:py-4">
        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3
              className="font-heading text-xl font-bold"
              style={{ color: product.color }}
            >
              {product.name}
            </h3>
            <span className="text-lg font-bold">
              {price.price.toLocaleString("fr-FR")}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                FCFA
              </span>
            </span>
          </div>

          {/* Size pills */}
          <div className="flex items-center gap-2">
            {product.prices.map((p, i) => (
              <button
                key={p.size}
                onClick={() => onSizeChange(i)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor:
                    selectedSize === i ? product.color : "transparent",
                  color: selectedSize === i ? "white" : product.color,
                  border: `1.5px solid ${product.color}${selectedSize === i ? "" : "40"}`,
                }}
              >
                {p.size}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={onAddToCart}
              variant="outline"
              className="rounded-full font-semibold"
              style={{
                borderColor: product.color,
                color: product.color,
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Ajouter
            </Button>
            <Button
              asChild
              className="rounded-full font-bold text-white shadow-lg"
              style={{ backgroundColor: "#25D366" }}
            >
              <a
                href={generateWhatsAppURL(
                  generateContextualOrderMessage(
                    product.name,
                    price.size,
                    price.price,
                    product.name
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Commander
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-2 pb-[env(safe-area-inset-bottom)]">
          {/* Mini pills */}
          <div className="flex gap-1 flex-shrink-0">
            {product.prices.map((p, i) => (
              <button
                key={p.size}
                onClick={() => onSizeChange(i)}
                className="px-2 py-1 rounded-full text-xs font-medium transition-all"
                style={{
                  backgroundColor:
                    selectedSize === i ? product.color : "transparent",
                  color: selectedSize === i ? "white" : product.color,
                  border: `1px solid ${product.color}${selectedSize === i ? "" : "40"}`,
                }}
              >
                {p.size}
              </button>
            ))}
          </div>

          <span className="text-sm font-bold flex-shrink-0">
            {price.price.toLocaleString("fr-FR")}
            <span className="text-xs font-normal"> FCFA</span>
          </span>

          <div className="flex-1 flex gap-1.5 justify-end">
            <Button
              onClick={onAddToCart}
              size="sm"
              variant="outline"
              className="rounded-full text-xs"
              style={{ borderColor: product.color, color: product.color }}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "#25D366" }}
            >
              <a
                href={generateWhatsAppURL(
                  generateContextualOrderMessage(
                    product.name,
                    price.size,
                    price.price,
                    product.name
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-1 h-3.5 w-3.5" />
                Commander
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
