import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
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
        <h1 className="text-4xl font-bold mb-8">Privacy <span className="text-primary">Policy</span></h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p><strong>Effective Date:</strong> {new Date().getFullYear()}</p>
          <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name and email address (when you contact us)</li>
            <li>Chat conversations with ZARA AI (for improving experience)</li>
            <li>Payment information (processed securely via Razorpay)</li>
            <li>Device and usage data</li>
          </ul>
          <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To provide and improve our AI services</li>
            <li>To process payments and deliver products</li>
            <li>To respond to your inquiries</li>
            <li>To send important updates (with your consent)</li>
          </ul>
          <h2 className="text-lg font-semibold text-foreground">3. Data Security</h2>
          <p>We implement industry-standard security measures. Your payment data is handled by Razorpay and we never store card details.</p>
          <h2 className="text-lg font-semibold text-foreground">4. Third-Party Services</h2>
          <p>We use Razorpay for payments and AI services for chat functionality. These services have their own privacy policies.</p>
          <h2 className="text-lg font-semibold text-foreground">5. Your Rights</h2>
          <p>You may request deletion of your data at any time by emailing <strong>support@zaraai.com</strong>.</p>
          <h2 className="text-lg font-semibold text-foreground">6. Contact</h2>
          <p>For privacy concerns, contact us at <strong>support@zaraai.com</strong>.</p>
        </div>
      </motion.div>
    </main>
  </div>
);

export default PrivacyPolicy;
