import { motion } from "framer-motion";
import { Paintbrush } from "lucide-react";

const HoliFestiveBadge = () => {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ delay: 2, type: "spring" }}
      onClick={scrollToPricing}
      className="fixed bottom-24 right-4 z-50 flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
    >
      <Paintbrush className="w-3.5 h-3.5" />
      🎨 Holi Sale Live – 30% OFF
    </motion.button>
  );
};

export default HoliFestiveBadge;
