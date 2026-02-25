"use client";

import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateContactMessage, generateWhatsAppURL } from "@/lib/whatsapp";
import SectionHeading from "@/components/shared/SectionHeading";
import Logo from "@/components/layout/Logo";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="snap-section-flexible relative py-20 sm:py-28 bg-gradient-to-b from-transparent to-green-50"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          label="Contact"
          title="Parlons-en !"
          subtitle="Commandez vos jus détox ou posez vos questions directement sur WhatsApp."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={fadeUp}>
            <Button
              size="lg"
              asChild
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full px-10 py-6 text-lg shadow-whatsapp"
            >
              <a
                href={generateWhatsAppURL(generateContactMessage())}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Discuter sur WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 mt-4"
          >
            <a
              href="https://instagram.com/guylsj23"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-foreground shadow-sm border border-white/30 hover:shadow-md transition-shadow"
            >
              <Instagram className="h-4 w-4 text-pink-500" />
              @guylsj23
            </a>
            <a
              href="https://facebook.com/DetoxJuiceByGuyls"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-white/60 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-foreground shadow-sm border border-white/30 hover:shadow-md transition-shadow"
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              Facebook
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-muted-foreground mt-2"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Douala & Yaoundé, Cameroun</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-green-100/60 pt-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Guyl&apos;s Juice. Tous droits réservés.
          </p>
        </div>
      </div>
    </section>
  );
}
