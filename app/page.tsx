"use client";

import { useRef } from "react";
import { products } from "@/lib/products";
import ScrollContainerContext from "@/components/shared/ScrollContainerContext";
import { CartProvider } from "@/components/cart/CartContext";
import CartSheet from "@/components/cart/CartSheet";
import MiniCartFAB from "@/components/cart/MiniCartFAB";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import HeroSection from "@/components/sections/HeroSection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import CuresSection from "@/components/sections/CuresSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import IngredientsSection from "@/components/sections/IngredientsSection";
import ContactSection from "@/components/sections/ContactSection";

const bottleProducts = products.filter((p) => p.id !== "shots-detox");
const shotsDetox = products.find((p) => p.id === "shots-detox")!;

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <CartProvider>
      <ScrollContainerContext.Provider value={mainRef}>
        <ScrollProgress />
        <Header />
        <main ref={mainRef} className="snap-container scrollbar-hide">
          <HeroSection />
          {bottleProducts.map((product) => (
            <ProductShowcase key={product.id} product={product} />
          ))}
          <ProductShowcase product={shotsDetox} variant="shots" />
          <CuresSection />
          <CalculatorSection />
          <TestimonialsSection />
          <IngredientsSection />
          <ContactSection />
        </main>
        <BottomNav />
        <WhatsAppFAB />
        <MiniCartFAB />
        <CartSheet />
      </ScrollContainerContext.Provider>
    </CartProvider>
  );
}
