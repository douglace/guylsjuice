"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateContactMessage, generateWhatsAppURL } from "@/lib/whatsapp";
import { useScrollContainer } from "@/components/shared/ScrollContainerContext";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useScrollContainer();

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef ?? undefined,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <section
      id="hero"
      ref={ref}
      className="snap-section relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — organic radial gradient */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#2d6a4f_0%,_#1b4332_40%,_#0f2a1d_100%)]"
      />

      {/* Decorative circles parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Organic blob shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-10 w-64 h-64 opacity-[0.06] pointer-events-none"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="white"
            d="M42.7,-62.9C53.9,-54.7,60.5,-40.4,65.4,-25.7C70.3,-11,73.5,4.2,70.5,18.1C67.5,32,58.3,44.7,46.2,53.5C34.1,62.3,19.2,67.2,3.3,62.8C-12.6,58.4,-29.5,44.7,-42.5,30.7C-55.5,16.7,-64.5,2.4,-64.1,-12.4C-63.7,-27.2,-53.8,-42.5,-41.1,-50.5C-28.4,-58.5,-12.8,-59.2,1.5,-61.3C15.8,-63.4,31.5,-71.1,42.7,-62.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 left-10 w-48 h-48 opacity-[0.05] pointer-events-none"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="white"
            d="M39.5,-51.2C52.9,-45.7,66.8,-36.5,72.2,-23.6C77.6,-10.7,74.5,5.8,67.6,19.8C60.7,33.8,50,45.2,37.3,53.5C24.6,61.8,9.9,67,-5.5,64.4C-20.9,61.8,-37,51.4,-48.9,38.3C-60.8,25.2,-68.5,9.4,-67.3,-5.6C-66.1,-20.6,-56,-34.8,-43.5,-40.5C-31,-46.2,-16.1,-43.4,-1.5,-41.4C13.1,-39.4,26.1,-56.7,39.5,-51.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-3xl mx-auto"
      >
        {/* Logo - centered on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-6 lg:hidden"
        >
          <Image
            src="/logo.webp"
            alt="Guyl's Juice"
            width={160}
            height={57}
            priority
            className="drop-shadow-lg"
          />
        </motion.div>

        {/* Stylistic label above h1 */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-white/50 text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
        >
          100% naturel &middot; Douala &amp; Yaoundé
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2 tracking-tight">
            GUYL&apos;S{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Juice
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl sm:text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
        >
          Des jus détox 100% naturels pour purifier votre corps,
          booster votre énergie et révéler votre éclat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="bg-white/95 text-green-800 hover:bg-white font-bold rounded-full px-10 py-3 shadow-lg border border-white/20 backdrop-blur-sm"
            onClick={() =>
              document
                .getElementById("product-tangavis")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Découvrir nos jus
          </Button>
          <Button
            size="lg"
            asChild
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full px-10 py-3 shadow-whatsapp hover:shadow-[0_4px_24px_rgba(37,211,102,0.5)] transition-shadow"
          >
            <a
              href={generateWhatsAppURL(generateContactMessage())}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Commander
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
        >
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl text-white text-sm font-medium px-4 py-2 rounded-full border border-white/15">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Livraison Douala & Yaoundé
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — mouse scroll pattern */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
