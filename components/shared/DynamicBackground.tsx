"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DynamicBackgroundProps {
  color: string;
  lightColor?: string;
  variant?: "radial" | "gradient" | "organic";
  intensity?: number;
  animate?: boolean;
  className?: string;
}

export default function DynamicBackground({
  color,
  lightColor,
  variant = "organic",
  intensity = 0.3,
  animate = true,
  className,
}: DynamicBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;

  const light = lightColor ?? `${color}30`;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none -z-10",
        className
      )}
    >
      {variant === "radial" && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${light}, ${color}${Math.round(intensity * 255).toString(16).padStart(2, "0")} 60%, transparent 100%)`,
          }}
        />
      )}

      {variant === "gradient" && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${light}, ${color}${Math.round(intensity * 255).toString(16).padStart(2, "0")} 50%, transparent 100%)`,
          }}
        />
      )}

      {variant === "organic" && (
        <>
          <motion.div
            className="absolute w-[60%] h-[60%] rounded-full blur-3xl"
            style={{
              backgroundColor: color,
              opacity: intensity * 0.5,
              top: "10%",
              left: "-10%",
            }}
            animate={
              shouldAnimate
                ? { x: [0, 30, 0], y: [0, -20, 0] }
                : undefined
            }
            transition={
              shouldAnimate
                ? { repeat: Infinity, duration: 12, ease: "easeInOut" }
                : undefined
            }
          />
          <motion.div
            className="absolute w-[45%] h-[45%] rounded-full blur-3xl"
            style={{
              backgroundColor: light,
              opacity: intensity * 0.6,
              bottom: "5%",
              right: "-5%",
            }}
            animate={
              shouldAnimate
                ? { x: [0, -20, 0], y: [0, 15, 0] }
                : undefined
            }
            transition={
              shouldAnimate
                ? { repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }
                : undefined
            }
          />
          <motion.div
            className="absolute w-[30%] h-[30%] rounded-full blur-3xl"
            style={{
              backgroundColor: color,
              opacity: intensity * 0.3,
              top: "40%",
              right: "20%",
            }}
            animate={
              shouldAnimate
                ? { x: [0, 15, 0], y: [0, 25, 0] }
                : undefined
            }
            transition={
              shouldAnimate
                ? { repeat: Infinity, duration: 14, ease: "easeInOut", delay: 4 }
                : undefined
            }
          />
        </>
      )}
    </div>
  );
}
