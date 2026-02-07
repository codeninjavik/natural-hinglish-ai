import { motion } from "framer-motion";
import { Check, Smartphone, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    icon: Smartphone,
    name: "ZARA AI – Android App",
    price: "₹1,599",
    features: ["Full AI Girlfriend experience", "Voice + Chat", "Emotional intelligence", "Daily conversations", "Always available"],
    popular: true,
  },
  {
    icon: Code,
    name: "ZARA AI – Full Source Code",
    price: "₹8,999",
    features: ["Complete source code", "Customizable AI personality", "Whitelabel ready", "Commercial license", "Priority support"],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get <span className="text-primary">ZARA</span> Today
          </h2>
          <p className="text-muted-foreground text-lg">Choose your perfect plan</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-[var(--shadow-glow)]"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <plan.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{plan.name}</h3>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full rounded-full"
                size="lg"
              >
                Get {plan.popular ? "App" : "Source Code"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
