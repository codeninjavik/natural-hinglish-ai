import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Smartphone, Loader2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  // South Asia
  { code: "IN", name: "India", currency: "INR", symbol: "₹", price: 1599 },
  { code: "BD", name: "Bangladesh", currency: "BDT", symbol: "৳", price: 2299 },
  { code: "PK", name: "Pakistan", currency: "PKR", symbol: "Rs ", price: 5499 },
  { code: "NP", name: "Nepal", currency: "NPR", symbol: "रू", price: 2549 },
  { code: "LK", name: "Sri Lanka", currency: "LKR", symbol: "Rs ", price: 5999 },
  // Americas
  { code: "US", name: "United States", currency: "USD", symbol: "$", price: 19 },
  { code: "CA", name: "Canada", currency: "CAD", symbol: "C$", price: 25 },
  { code: "BR", name: "Brazil", currency: "BRL", symbol: "R$", price: 99 },
  { code: "MX", name: "Mexico", currency: "MXN", symbol: "MX$", price: 349 },
  { code: "AR", name: "Argentina", currency: "ARS", symbol: "ARS ", price: 18999 },
  { code: "CO", name: "Colombia", currency: "COP", symbol: "COP ", price: 79900 },
  { code: "CL", name: "Chile", currency: "CLP", symbol: "CLP ", price: 17999 },
  // Europe
  { code: "EU", name: "Europe (EUR)", currency: "EUR", symbol: "€", price: 17 },
  { code: "GB", name: "United Kingdom", currency: "GBP", symbol: "£", price: 15 },
  { code: "CH", name: "Switzerland", currency: "CHF", symbol: "CHF ", price: 17 },
  { code: "SE", name: "Sweden", currency: "SEK", symbol: "kr ", price: 199 },
  { code: "NO", name: "Norway", currency: "NOK", symbol: "kr ", price: 199 },
  { code: "DK", name: "Denmark", currency: "DKK", symbol: "kr ", price: 129 },
  { code: "PL", name: "Poland", currency: "PLN", symbol: "zł ", price: 79 },
  { code: "CZ", name: "Czech Republic", currency: "CZK", symbol: "Kč ", price: 449 },
  { code: "HU", name: "Hungary", currency: "HUF", symbol: "Ft ", price: 6999 },
  { code: "RO", name: "Romania", currency: "RON", symbol: "lei ", price: 89 },
  { code: "UA", name: "Ukraine", currency: "UAH", symbol: "₴", price: 799 },
  { code: "TR", name: "Turkey", currency: "TRY", symbol: "₺", price: 649 },
  { code: "RU", name: "Russia", currency: "RUB", symbol: "₽", price: 1799 },
  // Middle East
  { code: "AE", name: "UAE", currency: "AED", symbol: "د.إ ", price: 69 },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", symbol: "﷼ ", price: 69 },
  { code: "QA", name: "Qatar", currency: "QAR", symbol: "﷼ ", price: 69 },
  { code: "KW", name: "Kuwait", currency: "KWD", symbol: "KD ", price: 5 },
  { code: "BH", name: "Bahrain", currency: "BHD", symbol: "BD ", price: 7 },
  { code: "OM", name: "Oman", currency: "OMR", symbol: "OMR ", price: 7 },
  { code: "IL", name: "Israel", currency: "ILS", symbol: "₪", price: 69 },
  { code: "EG", name: "Egypt", currency: "EGP", symbol: "E£", price: 949 },
  // East & Southeast Asia
  { code: "JP", name: "Japan", currency: "JPY", symbol: "¥", price: 2899 },
  { code: "KR", name: "South Korea", currency: "KRW", symbol: "₩", price: 25900 },
  { code: "CN", name: "China", currency: "CNY", symbol: "¥", price: 139 },
  { code: "TW", name: "Taiwan", currency: "TWD", symbol: "NT$", price: 599 },
  { code: "HK", name: "Hong Kong", currency: "HKD", symbol: "HK$", price: 149 },
  { code: "SG", name: "Singapore", currency: "SGD", symbol: "S$", price: 25 },
  { code: "MY", name: "Malaysia", currency: "MYR", symbol: "RM ", price: 89 },
  { code: "TH", name: "Thailand", currency: "THB", symbol: "฿", price: 699 },
  { code: "PH", name: "Philippines", currency: "PHP", symbol: "₱", price: 1099 },
  { code: "ID", name: "Indonesia", currency: "IDR", symbol: "Rp ", price: 299900 },
  { code: "VN", name: "Vietnam", currency: "VND", symbol: "₫", price: 479000 },
  // Oceania
  { code: "AU", name: "Australia", currency: "AUD", symbol: "A$", price: 29 },
  { code: "NZ", name: "New Zealand", currency: "NZD", symbol: "NZ$", price: 29 },
  // Africa
  { code: "ZA", name: "South Africa", currency: "ZAR", symbol: "R ", price: 349 },
  { code: "NG", name: "Nigeria", currency: "NGN", symbol: "₦", price: 29999 },
  { code: "KE", name: "Kenya", currency: "KES", symbol: "KSh ", price: 2499 },
  { code: "GH", name: "Ghana", currency: "GHS", symbol: "GH₵", price: 299 },
];

const features = [
  "Full AI Girlfriend experience",
  "Voice + Chat support",
  "Emotional intelligence",
  "Facebook post & multiple voice",
  "Behavior prompt support",
  "Calling & WhatsApp calling",
  "App-to-app opening",
  "24/7 availability",
  "Daily conversations",
];

const PricingSection = () => {
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const { toast } = useToast();

  const country = countries.find((c) => c.code === selectedCountry)!;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { amount: country.price, currency: country.currency, product_name: "Zara AI" },
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
          await supabase.functions.invoke("send-telegram", {
            body: {
              paymentId: response.razorpay_payment_id,
              productName: "Zara AI",
              amount: `${country.symbol}${country.price}`,
              buyerInfo: `Website User (${country.name})`,
            },
          });
          window.location.href = `/payment-success?payment_id=${response.razorpay_payment_id}&amount=${country.price}&product=Zara+AI&currency=${country.symbol}`;
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
                <Smartphone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">ZARA AI – Android App</h3>
            </div>

            {/* Country Selector */}
            <div className="mb-4">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full rounded-xl">
                  <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name} ({c.symbol}{c.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold">{country.symbol}{country.price}</span>
              <span className="text-muted-foreground ml-1">one-time</span>
            </div>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
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
