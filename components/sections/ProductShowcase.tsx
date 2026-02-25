"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import ProductBackground from "@/components/products/ProductBackground";
import ProductBottle from "@/components/products/ProductBottle";
import StickyOrderBar from "@/components/products/StickyOrderBar";
import {
  HotspotDesktop,
  HotspotMobile,
  getHotspotsForProduct,
} from "@/components/products/Hotspot";
import { useCart } from "@/components/cart/CartContext";
import { Badge } from "@/components/ui/badge";
import { sectionEntry } from "@/lib/animations";

interface ProductShowcaseProps {
  product: Product;
  variant?: "default" | "shots";
}

export default function ProductShowcase({
  product,
  variant = "default",
}: ProductShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const { addItem } = useCart();

  const hotspots = getHotspotsForProduct(product.ingredients);

  const handleAddToCart = () => {
    const price = product.prices[selectedSize];
    addItem({
      productId: product.id,
      productName: product.name,
      size: price.size,
      price: price.price,
      color: product.color,
    });
  };

  return (
    <section
      id={`product-${product.id}`}
      ref={sectionRef}
      className="snap-section relative h-screen overflow-hidden"
    >
      {/* Background */}
      <ProductBackground product={product} className="z-0" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 pt-16 lg:pt-20 pb-20 lg:pb-24 flex flex-col">
          {variant === "shots" ? (
            /* Shots variant — centered layout */
            <motion.div
              variants={sectionEntry}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <Badge
                className="mb-4 text-xs"
                style={{
                  backgroundColor: `${product.color}20`,
                  color: product.color,
                  border: `1px solid ${product.color}40`,
                }}
              >
                Shots concentrés
              </Badge>
              <h2
                className="font-heading text-5xl lg:text-7xl font-bold mb-3 tracking-tight"
                style={{ color: product.color }}
              >
                {product.name}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-md">
                {product.description}
              </p>

              {/* Ingredients */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {hotspots.map((h) => (
                  <span
                    key={h.id}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 text-sm"
                  >
                    {h.emoji} {h.label}
                  </span>
                ))}
              </div>

              {/* Price */}
              <p className="text-3xl font-bold" style={{ color: product.color }}>
                {product.prices[0].price.toLocaleString("fr-FR")}
                <span className="text-base font-normal text-muted-foreground ml-1">
                  FCFA / {product.prices[0].size}
                </span>
              </p>
            </motion.div>
          ) : (
            /* Default variant — 2-column layout */
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
              {/* Left: Bottle + Hotspots (desktop) */}
              <motion.div
                variants={sectionEntry}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                <div className="h-[200px] sm:h-[280px] lg:h-[420px] w-full">
                  <ProductBottle product={product} />
                </div>

                {/* Mobile hotspot pills */}
                <div className="lg:hidden flex flex-wrap gap-2 justify-center">
                  {hotspots.map((h) => (
                    <HotspotMobile
                      key={h.id}
                      data={h}
                      isActive={activeHotspot === h.id}
                      onClick={() =>
                        setActiveHotspot(
                          activeHotspot === h.id ? null : h.id
                        )
                      }
                      productColor={product.color}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Right: Info */}
              <motion.div
                variants={sectionEntry}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col justify-center text-center lg:text-left"
              >
                <h2
                  className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold mb-2 lg:mb-4 tracking-tight"
                  style={{ color: product.color }}
                >
                  {product.name}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-4 lg:mb-6 max-w-md mx-auto lg:mx-0">
                  {product.description}
                </p>

                {/* Ingredient badges */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4 lg:mb-6">
                  {product.ingredients.map((ingredient) => (
                    <Badge
                      key={ingredient}
                      variant="secondary"
                      className="bg-white/60 backdrop-blur-sm border border-white/30"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>

                {/* Desktop hotspots */}
                <div className="hidden lg:flex flex-col gap-3 mb-4">
                  {hotspots.map((h) => (
                    <HotspotDesktop
                      key={h.id}
                      data={h}
                      productColor={product.color}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Sticky Order Bar */}
        <StickyOrderBar
          product={product}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
          onAddToCart={handleAddToCart}
        />
      </div>
    </section>
  );
}
