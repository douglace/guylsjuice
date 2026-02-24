import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import CuresSection from "@/components/sections/CuresSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import IngredientsSection from "@/components/sections/IngredientsSection";
import ContactSection from "@/components/sections/ContactSection";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        <CuresSection />
        <CalculatorSection />
        <TestimonialsSection />
        <IngredientsSection />
        <ContactSection />
      </main>
      <BottomNav />
      <WhatsAppFAB />
    </>
  );
}
