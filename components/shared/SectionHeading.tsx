"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      <span className="text-brand-green font-semibold tracking-[0.2em] uppercase text-sm mb-2 block">
        {label}
      </span>
      <span className="block w-8 h-0.5 bg-brand-green/40 mx-auto my-3 rounded-full" />
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
