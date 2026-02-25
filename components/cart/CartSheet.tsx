"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, MessageCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";

export default function CartSheet() {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    setCartOpen,
    totalItems,
    totalPrice,
    generateCartWhatsAppURL,
  } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Panel — bottom on mobile, right on desktop */}
          <motion.div
            initial={{ y: "100%", x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%", x: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] lg:top-0 lg:bottom-0 lg:left-auto lg:right-0 lg:w-[420px] lg:max-h-none bg-white/90 backdrop-blur-2xl border-t lg:border-t-0 lg:border-l border-white/30 rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-brand-orange" />
                <h2 className="font-heading text-xl font-bold">
                  Panier ({totalItems})
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {state.items.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">
                  Votre panier est vide
                </p>
              ) : (
                state.items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex items-center gap-3 bg-white/70 rounded-xl p-3 border border-border/30"
                  >
                    {/* Color dot */}
                    <div
                      className="w-10 h-10 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {item.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.size} —{" "}
                        {item.price.toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label="Réduire la quantité"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="p-5 border-t border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-brand-green">
                    {totalPrice.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>

                <Button
                  asChild
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full shadow-whatsapp"
                  size="lg"
                >
                  <a
                    href={generateCartWhatsAppURL()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Commander tout via WhatsApp
                  </a>
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-sm text-muted-foreground hover:text-red-500 transition-colors py-2"
                >
                  Vider le panier
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
