import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const slideIn = (direction: "left" | "right" = "left"): Variants => ({
  hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
});

export const cardHover = {
  y: -4,
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

export const sectionEntry: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const bottleFloat: Variants = {
  idle: {
    y: [0, -12, 0],
    transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
  },
};

export const glassHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const hotspotPulse: Variants = {
  idle: {
    scale: [1, 1.3, 1],
    opacity: [0.7, 1, 0.7],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  },
};

export const badgeBounce: Variants = {
  initial: { scale: 1 },
  bounce: {
    scale: [1, 1.3, 0.9, 1.1, 1],
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
