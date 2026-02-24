"use client";

import { useState, useEffect } from "react";
import { Home, GlassWater, Sparkles, HelpCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "hero", label: "Accueil", icon: Home },
  { key: "products", label: "Jus", icon: GlassWater },
  { key: "cures", label: "Cures", icon: Sparkles },
  { key: "calculator", label: "Quiz", icon: HelpCircle },
  { key: "contact", label: "Contact", icon: Phone },
] as const;

export default function BottomNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((t) => t.key);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/80 backdrop-blur-xl border-t border-green-100/50">
      <div
        className="flex items-center justify-around h-16"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => scrollTo(tab.key)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 relative"
            >
              {isActive && (
                <motion.span
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand-green rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={cn(
                  "transition-colors",
                  isActive && "bg-brand-green/8 rounded-xl p-1.5"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-brand-green" : "text-gray-400"
                  )}
                />
              </motion.div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-brand-green" : "text-gray-400"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
