"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Product } from "@/lib/products";
import ProductBottleFallback from "@/components/bottles/ProductBottleFallback";
import { useScrollContainer } from "@/components/shared/ScrollContainerContext";

interface ProductBottleProps {
  product: Product;
}

export default function ProductBottle({ product }: ProductBottleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef ?? undefined,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className="relative w-full h-full flex items-center justify-center"
    >
      <ProductBottleFallback product={product} />
    </motion.div>
  );
}
