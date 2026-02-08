import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RefundPolicy = () => (
  <div className="min-h-screen bg-background">
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
          <Heart className="w-6 h-6 text-primary fill-primary" /><span>ZARA</span>
        </Link>
        <Link to="/"><Button variant="outline" size="sm" className="rounded-full">Back to Home</Button></Link>
      </div>
    </nav>
    <main className="pt-24 pb-16 container mx-auto px-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-8">Refund & Cancellation <span className="text-primary">Policy</span></h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p><strong>Effective Date:</strong> {new Date().getFullYear()}</p>
          <h2 className="text-lg font-semibold text-foreground">1. Digital Products</h2>
          <p>All purchases of the ZARA AI Girlfriend App and Source Code are final. Since these are digital products delivered instantly, we generally do not offer refunds.</p>
          <h2 className="text-lg font-semibold text-foreground">2. Eligibility for Refund</h2>
          <p>Refunds may be considered within 7 days of purchase if:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The product was not delivered or is non-functional</li>
            <li>There is a major defect that cannot be resolved</li>
            <li>Duplicate payment was charged</li>
          </ul>
          <h2 className="text-lg font-semibold text-foreground">3. How to Request</h2>
          <p>Email us at <strong>support@zaraai.com</strong> with your order details and reason for refund. We will respond within 5-7 business days.</p>
          <h2 className="text-lg font-semibold text-foreground">4. Refund Processing</h2>
          <p>Approved refunds will be processed to the original payment method within 7-10 business days.</p>
          <h2 className="text-lg font-semibold text-foreground">5. Cancellation</h2>
          <p>Since our products are one-time purchases (not subscriptions), cancellation does not apply. If you have any concerns, please reach out to our support team.</p>
        </div>
      </motion.div>
    </main>
  </div>
);

export default RefundPolicy;
