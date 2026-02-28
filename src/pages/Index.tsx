import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import HoliBanner from "@/components/HoliBanner";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import HoliEmotionalSection from "@/components/HoliEmotionalSection";
import PricingSection from "@/components/PricingSection";
import ChatDemo from "@/components/ChatDemo";
import Footer from "@/components/Footer";
import PartnerSection from "@/components/PartnerSection";
import HoliConfetti from "@/components/HoliConfetti";
import HoliExitPopup from "@/components/HoliExitPopup";
import HoliFestiveBadge from "@/components/HoliFestiveBadge";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <HoliBanner />
      <Navbar onStartChat={() => setChatOpen(true)} />
      <HeroSection onStartChat={() => setChatOpen(true)} />
      <FeaturesSection />
      <HoliEmotionalSection />
      <PricingSection />
      <PartnerSection />
      <Footer />

      {/* Holi effects */}
      <HoliConfetti />
      <HoliExitPopup />
      <HoliFestiveBadge />

      {/* Chat Demo */}
      <ChatDemo isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg animate-pulse-glow"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
