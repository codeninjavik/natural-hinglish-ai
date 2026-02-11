import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Smartphone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const plan = {
  icon: Smartphone,
  name: "ZARA AI – Android App",
  price: "₹1,599",
  features: [
    "Full AI Girlfriend experience",
    "Voice + Chat support",
    "Emotional intelligence",
    "Facebook post & multiple voice",
    "Behavior prompt support",
    "Calling & WhatsApp calling",
    "App-to-app opening",
    "24/7 availability",
    "Daily conversations",
  ],
};

const PricingSection = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { amount: 1599, product_name: "Zara AI" },
      });
      if (error) throw error;

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "ZARA AI",
        description: "ZARA AI – Android App",
        order_id: data.order_id,
        handler: async (response: any) => {
          // Send telegram notification
          await supabase.functions.invoke("send-telegram", {
            body: {
              paymentId: response.razorpay_payment_id,
              productName: "Zara AI",
              amount: "1599",
              buyerInfo: "Website User",
            },
          });
          // Redirect to success page
          window.location.href = `/payment-success?payment_id=${response.razorpay_payment_id}&amount=1599&product=Zara+AI`;
        },
        theme: { color: "#e91e8c" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast({ title: "Error", description: "Payment initialization failed. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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
            Get <span className="text-primary font-logo tracking-[0.15em]">ZARA</span> Today
          </h2>
          <p className="text-muted-foreground text-lg">Choose your perfect plan</p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-8 border border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-[var(--shadow-glow)]"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
              Most Popular
            </div>
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
              variant="hero"
              className="w-full rounded-full"
              size="lg"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : "Get App"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
