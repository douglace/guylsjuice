"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { staggerContainer, fadeUp, cardHover } from "@/lib/animations";
import testimonials from "@/data/testimonials.json";

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  city: string;
}

const avatarColors = [
  ["#16a34a", "#059669"],
  ["#0891b2", "#0e7490"],
  ["#7c3aed", "#6d28d9"],
  ["#db2777", "#be185d"],
  ["#ea580c", "#c2410c"],
  ["#ca8a04", "#a16207"],
];

function getAvatarGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
}

function TestimonialCard({
  item,
  className = "",
}: {
  item: Testimonial;
  className?: string;
}) {
  const [from, to] = getAvatarGradient(item.name);

  return (
    <div
      className={`group relative bg-white border border-green-100/40 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity">
        <Quote className="h-16 w-16 text-brand-green" />
      </div>

      {/* Stars */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < item.rating
                ? "fill-amber-500 text-amber-500"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm text-foreground/80 leading-relaxed mb-6 min-h-[60px]">
        &ldquo;{item.text}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-green-100/40">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
          style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        >
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.city}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoplay, next]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) next();
    else if (info.offset.x > 50) prev();
  };

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-green-50/50 relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <SectionHeading
          label="Avis clients"
          title="Ils ont adopté Guyl's Juice"
          subtitle="Découvrez les témoignages de nos clients satisfaits."
        />

        {/* Desktop: Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:grid lg:grid-cols-3 gap-8"
        >
          {testimonials.map((item: Testimonial) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              whileHover={cardHover}
            >
              <TestimonialCard item={item} className="h-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <div
            className="overflow-hidden"
            onPointerEnter={() => setAutoplay(false)}
            onPointerLeave={() => setAutoplay(true)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{
                  x: direction > 0 ? 300 : -300,
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{
                  x: direction > 0 ? -300 : 300,
                  opacity: 0,
                  scale: 0.9,
                }}
                transition={{ type: "spring", damping: 28, stiffness: 220 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                className="cursor-grab active:cursor-grabbing"
              >
                <TestimonialCard item={testimonials[current]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              onClick={() => {
                setAutoplay(false);
                prev();
              }}
              className="p-2 rounded-full bg-brand-green/10 hover:bg-brand-green/20 text-brand-green transition-all"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_: Testimonial, i: number) => (
                <button
                  key={i}
                  onClick={() => {
                    setAutoplay(false);
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 h-2.5 bg-brand-green"
                      : "w-2.5 h-2.5 bg-brand-green/20 hover:bg-brand-green/40"
                  }`}
                  aria-label={`Avis ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setAutoplay(false);
                next();
              }}
              className="p-2 rounded-full bg-brand-green/10 hover:bg-brand-green/20 text-brand-green transition-all"
              aria-label="Avis suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
