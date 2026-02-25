"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { generateContactMessage, generateWhatsAppURL } from "@/lib/whatsapp";

export default function WhatsAppFAB() {
  return (
    <motion.a
      href={generateWhatsAppURL(generateContactMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-36 right-4 lg:bottom-6 lg:right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-whatsapp hover:scale-110 transition-transform"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
    </motion.a>
  );
}
