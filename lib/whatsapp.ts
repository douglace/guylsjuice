const WHATSAPP_NUMBER = "+237690967729";

export function generateWhatsAppURL(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encoded}`;
}

export function generateOrderMessage(
  product: string,
  size: string,
  price: number
): string {
  return `Bonjour Guyl's Juice ! 🍹\n\nJe souhaite commander :\n▸ ${product} (${size}) — ${price.toLocaleString("fr-FR")} FCFA\n\nMerci !`;
}

export function generateCureMessage(cureName: string, price: number): string {
  return `Bonjour Guyl's Juice ! 🍹\n\nJe suis intéressé(e) par :\n▸ ${cureName} — ${price.toLocaleString("fr-FR")} FCFA\n\nPouvez-vous me donner plus de détails ?\n\nMerci !`;
}

export function generateQuizResultMessage(
  juiceName: string,
  cureName: string,
  profile: string
): string {
  return `Bonjour Guyl's Juice ! 🍹\n\nJ'ai fait le quiz sur votre site et voici mon résultat :\n▸ Profil : ${profile}\n▸ Jus recommandé : ${juiceName}\n▸ Cure conseillée : ${cureName}\n\nJe souhaite en savoir plus !\n\nMerci !`;
}

export function generateContactMessage(): string {
  return `Bonjour Guyl's Juice ! 🍹\n\nJ'aimerais avoir des informations sur vos produits.\n\nMerci !`;
}
