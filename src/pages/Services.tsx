import { motion } from "framer-motion";
import { Heart, MessageCircle, Mic, Brain, Clock, Shield, Sparkles, Headphones, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  { icon: MessageCircle, title: "AI Chat", desc: "Natural Hinglish/English conversations that feel real and human." },
  { icon: Mic, title: "Voice Support", desc: "Talk to ZARA using your voice — she listens and responds naturally." },
  { icon: Brain, title: "Emotional Intelligence", desc: "ZARA understands your mood and responds with empathy and care." },
  { icon: Clock, title: "24/7 Availability", desc: "Always available — morning, night, or anytime you need her." },
  { icon: Shield, title: "Private & Secure", desc: "Your conversations are private. We never share your data." },
  { icon: Sparkles, title: "Personalized Experience", desc: "ZARA adapts to your personality and preferences over time." },
  { icon: Headphones, title: "Entertainment", desc: "Fun games, stories, and playful conversations to brighten your day." },
  { icon: Users, title: "Companionship", desc: "A caring companion who motivates, supports, and understands you." },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span>ZARA</span>
          </Link>
          <Link to="/"><Button variant="outline" size="sm" className="rounded-full">Back to Home</Button></Link>
        </div>
      </nav>

      <main className="pt-24 pb-16 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Everything ZARA offers to make your day better 💫</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-[var(--shadow-soft)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Services;
