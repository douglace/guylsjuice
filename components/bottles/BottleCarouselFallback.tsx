"use client";

import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/products";

interface BottleCarouselFallbackProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function BottleCarouselFallback({
  activeIndex,
  onSelect,
}: BottleCarouselFallbackProps) {
  const [direction, setDirection] = useState(0);
  const bottleProducts = products.filter((p) => p.id !== "shots-detox");
  const count = bottleProducts.length;

  const next = () => {
    setDirection(1);
    onSelect(activeIndex === count - 1 ? 0 : activeIndex + 1);
  };

  const prev = () => {
    setDirection(-1);
    onSelect(activeIndex === 0 ? count - 1 : activeIndex - 1);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };

  const active = bottleProducts[activeIndex];

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Bottle visual */}
      <div className="relative w-full max-w-xs h-80 flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active.id}
            custom={direction}
            initial={{ x: direction > 0 ? 200 : -200, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: direction > 0 ? -200 : 200, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            {/* CSS Bottle */}
            <div className="relative">
              {/* Cap */}
              <div
                className="w-8 h-4 mx-auto rounded-t-lg"
                style={{ backgroundColor: "#16a34a" }}
              />
              {/* Neck */}
              <div
                className="w-10 h-8 mx-auto rounded-t"
                style={{
                  background: `linear-gradient(to bottom, ${active.color}dd, ${active.color})`,
                }}
              />
              {/* Body */}
              <div
                className="w-28 h-48 mx-auto rounded-b-2xl rounded-t-lg relative overflow-hidden shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${active.color}cc, ${active.color})`,
                }}
              >
                {/* Liquid effect */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-3/4 opacity-30"
                  style={{
                    background: `linear-gradient(to top, ${active.color}, transparent)`,
                  }}
                />
                {/* Label */}
                <div className="absolute inset-x-2 top-1/4 bottom-1/4 bg-white/90 rounded-lg flex items-center justify-center p-2">
                  <div className="text-center">
                    <p
                      className="text-xs font-bold"
                      style={{ color: active.color }}
                    >
                      GUYL&apos;S
                    </p>
                    <p className="text-[10px] font-semibold text-gray-700 mt-0.5">
                      {active.name}
                    </p>
                  </div>
                </div>
                {/* Shine */}
                <div className="absolute top-0 left-2 w-4 h-full bg-white/20 rounded-full blur-sm" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-brand-green/10 hover:bg-brand-green/20 text-brand-green transition-all"
          aria-label="Jus précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {bottleProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                onSelect(i);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 h-2.5 bg-brand-green"
                  : "w-2.5 h-2.5 bg-brand-green/20 hover:bg-brand-green/40"
              }`}
              aria-label={`Jus ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-brand-green/10 hover:bg-brand-green/20 text-brand-green transition-all"
          aria-label="Jus suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
