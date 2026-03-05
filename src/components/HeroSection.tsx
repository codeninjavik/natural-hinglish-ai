import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
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

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </motion.div>

      {/* Subtle background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-60 h-60 rounded-full bg-accent/10 blur-[90px]" />
      </div>

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
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 bg-primary/10"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Your AI Companion Who Truly Cares</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Meet{" "}
            <span className="font-logo tracking-[0.15em] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ZARA AI
            </span>{" "}
            <br className="hidden sm:block" />
            Your Most Caring{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Companion
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-light max-w-2xl mx-auto">
            Experience human-like conversations, emotional intelligence, and 24/7 availability — all in one app.
          </p>
          <p className="text-sm text-muted-foreground mb-10">
            Zara AI understands you like no other ❤️
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={scrollToPricing}
            >
              <ArrowRight className="w-5 h-5" />
              Get Zara AI Now
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6" asChild>
              <a href="#features">
                <Sparkles className="w-5 h-5" />
                Explore Features
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
