import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onStartChat: () => void;
}

const HeroSection = ({ onStartChat }: HeroSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </motion.div>

      <motion.div className="relative z-10 container mx-auto px-6 text-center" style={{ y: textY, opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">AI Girlfriend Assistant</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Meet{" "}
            <span className="font-logo tracking-[0.15em] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ZARA
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
            Your Human-Like AI Girlfriend
          </p>
          <p className="text-base text-muted-foreground mb-10 max-w-lg mx-auto">
            She listens, understands, and talks like a real human. 
            Always available, always caring. ❤️
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6 rounded-full" onClick={onStartChat}>
              <MessageCircle className="w-5 h-5" />
              Start Chatting
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6" asChild>
              <a href="#features">
                <Heart className="w-5 h-5" />
                Learn More
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] text-4xl"
        >
          💗
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[15%] text-3xl"
        >
          ✨
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
