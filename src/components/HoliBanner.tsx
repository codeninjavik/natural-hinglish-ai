import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Clock } from "lucide-react";
import { useHoliCountdown } from "@/hooks/useHoliCountdown";

const HoliBanner = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const timeLeft = useHoliCountdown();

  // Hide on scroll down, show on scroll up (mobile friendly)
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShowBanner(currentY < lastScrollY || currentY < 50);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          exit={{ y: -60 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[60] py-2 px-4"
          style={{
            background: "linear-gradient(90deg, hsl(30 90% 55%), hsl(340 75% 55%), hsl(280 60% 55%))",
          }}
        >
          <div className="container mx-auto flex items-center justify-center gap-3 text-white text-xs sm:text-sm font-medium flex-wrap">
            <Gift className="w-4 h-4 shrink-0 animate-bounce" />
            <span>🎉 Holi Dhamaka Offer – <strong>50% OFF</strong> Zara AI Lifetime Access!</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="font-mono tabular-nums">
                {timeLeft.days}d {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
            <button onClick={() => setVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoliBanner;
