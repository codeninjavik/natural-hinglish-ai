import { motion } from "framer-motion";
import { Headphones, Globe, Heart, Brain } from "lucide-react";

const values = [
  { icon: Headphones, title: "24/7 Human-Like AI Conversations", color: "hsl(340 75% 55%)" },
  { icon: Globe, title: "Multilingual Companion", color: "hsl(200 80% 55%)" },
  { icon: Heart, title: "Understands Your Emotions & Mood", color: "hsl(30 90% 55%)" },
  { icon: Brain, title: "AI That Remembers YOU", color: "hsl(280 60% 55%)" },
];

const HoliEmotionalSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gulal swoosh background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-[hsl(340_75%_55%)] blur-[100px]" />
        <div className="absolute bottom-10 right-[10%] w-64 h-64 rounded-full bg-[hsl(50_90%_60%)] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[hsl(200_80%_55%)] blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Emotional text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-2xl md:text-3xl font-display leading-relaxed text-foreground">
            "Holi me hum rangon se khelte hain…
            <br />
            <span className="text-primary font-bold">Zara AI</span> se zindagi smart banti hai."
          </p>
        </motion.div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 30px -5px ${v.color}` }}
              className="bg-card border border-border rounded-2xl p-6 text-center cursor-default transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${v.color}20` }}
              >
                <v.icon className="w-7 h-7" style={{ color: v.color }} />
              </div>
              <p className="font-semibold text-sm text-foreground">{v.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoliEmotionalSection;
