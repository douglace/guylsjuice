"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

type Variant = "light" | "dark" | "colored";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "color"> {
  variant?: Variant;
  color?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

const variantStyles: Record<Variant, string> = {
  light:
    "bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg",
  dark: "bg-black/30 backdrop-blur-xl border border-white/10 text-white shadow-lg",
  colored: "backdrop-blur-xl border border-white/30 shadow-lg",
};

export default function GlassCard({
  variant = "light",
  color,
  hover = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("rounded-2xl p-6", variantStyles[variant], className)}
      style={
        variant === "colored" && color
          ? { backgroundColor: `${color}20` }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
