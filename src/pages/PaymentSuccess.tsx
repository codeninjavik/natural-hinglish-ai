import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("payment_id") || "N/A";
  const amount = searchParams.get("amount") || "1599";
  const product = searchParams.get("product") || "Zara AI";
  const buyer = searchParams.get("buyer") || "";
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleTelegramNotify = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-telegram", {
        body: {
          paymentId,
          productName: product,
          amount,
          buyerInfo: buyer || "Website User",
        },
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      console.error("Telegram notification failed:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-2xl font-bold mb-2">Payment Successful! 🎉</h1>
        <p className="text-muted-foreground mb-8">Thank you for your purchase</p>

        {/* Details */}
        <div className="space-y-4 mb-8 text-left">
          <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/50">
            <span className="text-sm text-muted-foreground">Product</span>
            <span className="font-semibold text-sm">{product}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/50">
            <span className="text-sm text-muted-foreground">Amount Paid</span>
            <span className="font-semibold text-sm">₹{amount}</span>
          </div>
          <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/50">
            <span className="text-sm text-muted-foreground">Payment ID</span>
            <span className="font-mono text-xs break-all">{paymentId}</span>
          </div>
        </div>

        {/* Telegram Button */}
        <Button
          variant="hero"
          className="w-full rounded-full mb-4"
          size="lg"
          onClick={handleTelegramNotify}
          disabled={sent || sending}
        >
          <Send className="w-4 h-4 mr-2" />
          {sent ? "Notification Sent ✅" : sending ? "Sending..." : "Contact on Telegram"}
        </Button>

        {sent && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground mb-4"
          >
            We've been notified! We'll reach out to you shortly.
          </motion.p>
        )}

        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
