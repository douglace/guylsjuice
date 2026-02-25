"use client";

import { motion } from "framer-motion";
import { Leaf, MessageCircle, Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cures } from "@/lib/cures";
import { generateCureMessage, generateWhatsAppURL } from "@/lib/whatsapp";
import SectionHeading from "@/components/shared/SectionHeading";
import DynamicBackground from "@/components/shared/DynamicBackground";
import GlassCard from "@/components/shared/GlassCard";
import { staggerContainer, fadeUp, cardHover } from "@/lib/animations";

export default function CuresSection() {
  return (
    <section
      id="cures"
      className="snap-section-flexible relative py-20 sm:py-28 overflow-hidden"
    >
      <DynamicBackground color="#16a34a" lightColor="#dcfce7" variant="organic" intensity={0.15} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <SectionHeading
          label="Programmes"
          title="Nos Cures Détox"
          subtitle="Choisissez le programme adapté à vos objectifs. Chaque cure est livrée avec un planning jour par jour."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {cures.map((cure) => (
            <GlassCard
              key={cure.id}
              variants={fadeUp}
              whileHover={cardHover}
              className={`relative ${
                cure.popular
                  ? "ring-2 ring-brand-green/30"
                  : ""
              }`}
            >
              {cure.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-green to-emerald-500 text-white px-3 py-1 shadow-lg">
                  <Star className="h-3 w-3 mr-1" />
                  Populaire
                </Badge>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-50/80 backdrop-blur-sm rounded-full px-5 py-2.5 mb-4">
                  <Leaf className="h-4 w-4 text-brand-green" />
                  <span className="text-sm font-semibold text-brand-green">
                    {cure.duration}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold">{cure.name}</h3>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Jus inclus
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cure.juices.map((juice) => (
                    <Badge
                      key={juice}
                      variant="secondary"
                      className="text-xs bg-white/50 backdrop-blur-sm"
                    >
                      {juice}
                    </Badge>
                  ))}
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {cure.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <Check className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="text-center mb-4">
                <p className="text-3xl font-extrabold text-brand-green">
                  {cure.price.toLocaleString("fr-FR")}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    FCFA
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">/cure</p>
              </div>

              <Button
                asChild
                className={`w-full rounded-full font-bold ${
                  cure.popular
                    ? "bg-brand-green hover:bg-brand-green-dark text-white"
                    : "bg-white/50 backdrop-blur-sm text-brand-green hover:bg-white/70 border border-brand-green/20"
                }`}
              >
                <a
                  href={generateWhatsAppURL(
                    generateCureMessage(cure.name, cure.price)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Commander
                </a>
              </Button>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
