"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { generateContactMessage, generateWhatsAppURL } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useScrollContainer } from "@/components/shared/ScrollContainerContext";

const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "Nos Jus", href: "#product-tangavis" },
  { label: "Cures", href: "#cures" },
  { label: "Quiz", href: "#calculator" },
  { label: "Avis", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useScrollContainer();

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      setScrolled(container.scrollTop > 50);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { root: container, threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [containerRef]);

  const scrollTo = useCallback(
    (href: string) => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 hidden lg:block transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-white/30"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
        <Logo />

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const section = link.href.replace("#", "");
            const active = activeSection === section;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  active
                    ? "text-brand-green bg-brand-green/5"
                    : scrolled
                      ? "text-foreground/70 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="headerIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand-green rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <a
          href={generateWhatsAppURL(generateContactMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:bg-[#20bd5a] transition-colors shadow-whatsapp"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </motion.header>
  );
}
