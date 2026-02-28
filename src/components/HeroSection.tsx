import { motion, useScroll, useTransform } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
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

      {/* Holi color splashes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-72 h-72 rounded-full bg-[hsl(340_75%_55%)] opacity-10 blur-[100px] animate-pulse" />
        <div className="absolute top-[30%] right-[8%] w-60 h-60 rounded-full bg-[hsl(200_80%_55%)] opacity-10 blur-[90px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[20%] left-[30%] w-80 h-80 rounded-full bg-[hsl(50_90%_60%)] opacity-8 blur-[110px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[50%] right-[25%] w-48 h-48 rounded-full bg-[hsl(280_60%_55%)] opacity-10 blur-[80px] animate-pulse" style={{ animationDelay: "0.5s" }} />
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
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
            style={{ background: "linear-gradient(90deg, hsl(30 90% 55% / 0.15), hsl(340 75% 55% / 0.15), hsl(280 60% 55% / 0.15))" }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">🎨 Holi Special – 50% OFF!</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Holi Ke Rang…{" "}
            <span className="font-logo tracking-[0.15em] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ZARA AI
            </span>{" "}
            <br className="hidden sm:block" />
            Ke Saath Har Pal{" "}
            <span className="bg-gradient-to-r from-[hsl(200_80%_55%)] via-primary to-[hsl(50_90%_60%)] bg-clip-text text-transparent">
              Smart & Colorful!
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4 font-light max-w-2xl mx-auto">
            Celebrate this Holi with a special <strong className="text-primary">50% OFF</strong> on Zara AI — your most caring, human-like AI companion. 🎉
          </p>
          <p className="text-sm text-muted-foreground mb-10">
            Zara AI: Your Caring AI, Now at Holi Gift Price! ❤️
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-white"
              style={{ background: "linear-gradient(90deg, hsl(30 90% 55%), hsl(340 75% 55%), hsl(280 60% 55%))" }}
              onClick={scrollToPricing}
            >
              <Gift className="w-5 h-5" />
              Claim 50% Holi Gift
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6" asChild>
              <a href="#features">
                <Sparkles className="w-5 h-5" />
                Explore Zara AI Features
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Floating Holi elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] text-4xl"
        >
          🎨
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-[15%] text-3xl"
        >
          🌈
        </motion.div>
        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-[10%] text-2xl"
        >
          💜
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
