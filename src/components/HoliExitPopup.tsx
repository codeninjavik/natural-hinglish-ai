import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const HoliExitPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let triggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) {
        triggered = true;
        setShow(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const scrollToPricing = () => {
    setShow(false);
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-card border border-border rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            <div className="text-4xl mb-4">😮🔥</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Arre Ruko! Holi Gift Chhut Raha Hai
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Limited Time – Holi Exclusive <strong className="text-primary">50% OFF</strong> sirf aaj ke liye!
            </p>
            <Button variant="hero" size="lg" className="w-full rounded-full" onClick={scrollToPricing}>
              <Gift className="w-5 h-5" />
              Abhi 50% Holi Gift Le Lo!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoliExitPopup;
