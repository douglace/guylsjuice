"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/products";
import { generateOrderMessage, generateWhatsAppURL } from "@/lib/whatsapp";
import { isWebGLAvailable } from "@/lib/webgl-detect";
import BottleCarouselFallback from "@/components/bottles/BottleCarouselFallback";
import SectionHeading from "@/components/shared/SectionHeading";

const BottleCarousel3D = lazy(
  () => import("@/components/bottles/BottleCarousel3D")
);

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasWebGL, setHasWebGL] = useState(false);
  const [mounted, setMounted] = useState(false);

  const bottleProducts = products.filter((p) => p.id !== "shots-detox");
  const shotsProduct = products.find((p) => p.id === "shots-detox");
  const active = bottleProducts[activeIndex];

  useEffect(() => {
    setMounted(true);
    setHasWebGL(isWebGLAvailable());
  }, []);

  return (
    <section id="products" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background dynamique */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: `linear-gradient(135deg, ${active.color}15 0%, ${active.color}08 50%, transparent 100%)`,
        }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute top-1/4 -right-20 w-80 h-80 rounded-full blur-3xl -z-10"
        animate={{ backgroundColor: `${active.color}20` }}
        transition={{ duration: 0.8 }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Nos créations"
          title="Nos Jus Détox"
          subtitle="Chaque jus est une combinaison unique d'ingrédients naturels pour votre bien-être."
        />

        {/* 3D / Fallback Carousel */}
        <div className="mb-8">
          {mounted ? (
            hasWebGL ? (
              <Suspense
                fallback={
                  <BottleCarouselFallback
                    activeIndex={activeIndex}
                    onSelect={setActiveIndex}
                  />
                }
              >
                <BottleCarousel3D
                  activeIndex={activeIndex}
                  onSelect={setActiveIndex}
                />
              </Suspense>
            ) : (
              <BottleCarouselFallback
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
              />
            )
          ) : (
            <div className="w-full h-[400px] flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-2" style={{ color: active.color }}>
            {active.name}
          </h3>
          <p className="text-muted-foreground mb-3">{active.description}</p>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {active.ingredients.map((ing) => (
              <Badge key={ing} variant="secondary" className="text-xs">
                {ing}
              </Badge>
            ))}
          </div>

          {/* Prices */}
          <div className="flex justify-center gap-3 mb-6">
            {active.prices.map((p) => (
              <div
                key={p.size}
                className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 text-center"
              >
                <p className="text-xs text-muted-foreground">{p.size}</p>
                <p className="text-lg font-bold text-brand-green">
                  {p.price.toLocaleString("fr-FR")}
                  <span className="text-xs font-normal ml-1">FCFA</span>
                </p>
              </div>
            ))}
          </div>

          <Button
            asChild
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full px-8 shadow-whatsapp"
          >
            <a
              href={generateWhatsAppURL(
                generateOrderMessage(
                  active.name,
                  active.prices[0].size,
                  active.prices[0].price
                )
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Commander {active.name}
            </a>
          </Button>
        </motion.div>

        {/* Shots Détox separate card */}
        {shotsProduct && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-md mx-auto"
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
        )}
      </div>
    </section>
  );
}
