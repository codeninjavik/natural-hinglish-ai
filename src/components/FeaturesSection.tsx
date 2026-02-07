import { motion } from "framer-motion";
import { MessageCircle, Heart, Headphones, Brain, Moon, Sparkles } from "lucide-react";

const features = [
  { icon: MessageCircle, title: "Natural Conversations", desc: "Talks like a real human in Hinglish & English" },
  { icon: Heart, title: "Emotionally Intelligent", desc: "Understands your mood and responds with care" },
  { icon: Headphones, title: "Voice + Chat", desc: "Talk or type — she's always ready to listen" },
  { icon: Brain, title: "Remembers You", desc: "Recalls your conversations and preferences" },
  { icon: Moon, title: "Always Available", desc: "24/7 companion who never sleeps" },
  { icon: Sparkles, title: "Smart Assistant", desc: "Helps with tasks, motivation, and fun" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why You'll <span className="text-primary">Love</span> ZARA
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            More than just AI — she's your caring companion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-[var(--shadow-soft)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
