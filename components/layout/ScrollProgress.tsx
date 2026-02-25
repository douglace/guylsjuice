"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useScrollContainer } from "@/components/shared/ScrollContainerContext";

export default function ScrollProgress() {
  const containerRef = useScrollContainer();
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const max = scrollHeight - clientHeight;
      if (max > 0) {
        progress.set(scrollTop / max);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, progress]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-brand-green origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}
