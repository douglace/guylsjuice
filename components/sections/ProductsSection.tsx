"use client";

import { useRef, useState, useCallback } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { products } from "@/lib/products";
import IngredientsBackground from "@/components/products/IngredientsBackground";
import ProductInfoPanel from "@/components/products/ProductInfoPanel";
import ScrollProgressDots from "@/components/products/ScrollProgressDots";
import ShotsDetoxCard from "@/components/products/ShotsDetoxCard";
import ProductBottleFallback from "@/components/bottles/ProductBottleFallback";
import SectionHeading from "@/components/shared/SectionHeading";

const bottleProducts = products.filter((p) => p.id !== "shots-detox");
const PRODUCT_COUNT = bottleProducts.length;

export default function ProductsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsVisible, setDotsVisible] = useState(false);

  const activeProduct = bottleProducts[activeIndex];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setDotsVisible(value > 0.01 && value < 0.99);

    const segmentSize = 1 / PRODUCT_COUNT;
    const newIndex = Math.min(
      Math.floor(value / segmentSize),
      PRODUCT_COUNT - 1
    );

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const scrollToProduct = useCallback((index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight =
      containerRef.current.scrollHeight - window.innerHeight;
    const segmentSize = 1 / PRODUCT_COUNT;
    const targetProgress = segmentSize * index + segmentSize / 2;
    const targetScrollTop = containerTop + containerHeight * targetProgress;

    window.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* Scroll container - 500vh gives 100vh per product */}
      <div
        ref={containerRef}
        id="products"
        style={{ height: `${PRODUCT_COUNT * 100}vh` }}
        className="relative"
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Immersive background */}
          <IngredientsBackground product={activeProduct} />

          {/* Content - scrollable on mobile to avoid BottomNav overlap */}
          <div className="relative z-10 h-full flex flex-col overflow-y-auto">
            {/* Section heading */}
            <div className="pt-16 sm:pt-24 pb-2 sm:pb-4 px-4 sm:px-6">
              <SectionHeading
                label="Nos créations"
                title="Nos Jus Détox"
                subtitle="Chaque jus est une combinaison unique d'ingrédients naturels pour votre bien-être."
              />
            </div>

            {/* Main content grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 max-w-6xl mx-auto w-full px-4 sm:px-6 pb-24 lg:pb-8">
              {/* Bottle - left on desktop, top on mobile */}
              <div className="flex items-center justify-center h-[200px] sm:h-[300px] lg:h-[550px]">
                <ProductBottleFallback product={activeProduct} />
              </div>

              {/* Product info - right on desktop, bottom on mobile */}
              <div className="flex items-center">
                <ProductInfoPanel product={activeProduct} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress dots */}
      <ScrollProgressDots
        products={bottleProducts}
        activeIndex={activeIndex}
        onDotClick={scrollToProduct}
        visible={dotsVisible}
      />

      {/* Shots Détox card - outside the sticky section */}
      <ShotsDetoxCard />
    </>
  );
}
