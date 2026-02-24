"use client";

import { motion } from "framer-motion";
import { MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/calculator";
import { profileLabels, profileRecommendations } from "@/lib/calculator";
import { products } from "@/lib/products";
import { cures } from "@/lib/cures";
import {
  generateQuizResultMessage,
  generateWhatsAppURL,
} from "@/lib/whatsapp";

interface ResultScreenProps {
  profile: Profile;
  onReset: () => void;
}

export default function ResultScreen({ profile, onReset }: ResultScreenProps) {
  const rec = profileRecommendations[profile];
  const juice = products.find((p) => p.id === rec.juiceId);
  const cure = cures.find((c) => c.id === rec.cureId);

  if (!juice || !cure) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-2 mb-4">
        <Sparkles className="h-4 w-4 text-brand-green" />
        <span className="text-sm font-semibold text-brand-green">
          Votre résultat
        </span>
      </div>

      <h3 className="text-2xl font-bold mb-2">
        Profil :{" "}
        <span className="text-brand-green">{profileLabels[profile]}</span>
      </h3>

      <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
        Basé sur vos réponses, voici notre recommandation personnalisée.
      </p>

      {/* Recommendations */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
        {/* Juice recommendation */}
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: juice.color }}
          >
            {juice.name.charAt(0)}
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Jus recommandé
          </p>
          <p className="font-bold text-lg" style={{ color: juice.color }}>
            {juice.name}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {juice.ingredients.join(", ")}
          </p>
        </div>

        {/* Cure recommendation */}
        <div className="bg-white rounded-2xl p-5 border border-border shadow-sm">
          <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-brand-green text-white font-bold text-lg">
            {cure.duration.charAt(0)}
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Cure conseillée
          </p>
          <p className="font-bold text-lg text-brand-green">{cure.name}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {cure.price.toLocaleString("fr-FR")} FCFA
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          asChild
          size="lg"
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full px-8 shadow-whatsapp"
        >
          <a
            href={generateWhatsAppURL(
              generateQuizResultMessage(
                juice.name,
                cure.name,
                profileLabels[profile]
              )
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Commander sur WhatsApp
          </a>
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onReset}
          className="rounded-full"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Refaire le quiz
        </Button>
      </div>
    </motion.div>
  );
}
