"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { generateOrderMessage, generateWhatsAppURL } from "@/lib/whatsapp";

export default function ShotsDetoxCard() {
  const shotsProduct = products.find((p) => p.id === "shots-detox");
  if (!shotsProduct) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-md mx-auto px-4 sm:px-6 py-16"
    >
      <div
        className="rounded-2xl p-6 text-center border-2 shadow-lg"
        style={{
          borderColor: shotsProduct.color,
          background: `linear-gradient(135deg, ${shotsProduct.color}10, ${shotsProduct.color}05)`,
        }}
      >
        <h3 className="text-xl font-bold text-brand-green-dark mb-2">
          {shotsProduct.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">
          {shotsProduct.description}
        </p>
        <p className="text-2xl font-bold text-brand-green mb-4">
          {shotsProduct.prices[0].price.toLocaleString("fr-FR")}
          <span className="text-sm font-normal ml-1">
            FCFA / {shotsProduct.prices[0].size}
          </span>
        </p>
        <Button
          asChild
          size="sm"
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-whatsapp"
        >
          <a
            href={generateWhatsAppURL(
              generateOrderMessage(
                shotsProduct.name,
                shotsProduct.prices[0].size,
                shotsProduct.prices[0].price
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
    </motion.div>
  );
}
