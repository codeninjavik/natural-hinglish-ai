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
          {sent ? "Notification Sent ✅" : sending ? "Sending..." : "Notify Us"}
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

        {/* Direct Telegram Chat */}
        <a href="https://t.me/zaraaiagent" target="_blank" rel="noopener noreferrer" className="w-full block mb-4">
          <Button variant="outline" className="w-full rounded-full gap-2" size="lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            Chat on Telegram
          </Button>
        </a>

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
