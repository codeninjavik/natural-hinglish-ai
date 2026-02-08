import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => (
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
        <h1 className="text-4xl font-bold mb-8">Terms of <span className="text-primary">Service</span></h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p><strong>Effective Date:</strong> {new Date().getFullYear()}</p>
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>By using ZARA AI products and services, you agree to these terms. If you do not agree, please do not use our services.</p>
          <h2 className="text-lg font-semibold text-foreground">2. Products & Services</h2>
          <p>ZARA AI provides an AI-powered chat companion application and related source code for purchase. All products are digital and delivered electronically.</p>
          <h2 className="text-lg font-semibold text-foreground">3. Payments</h2>
          <p>All payments are processed securely through Razorpay. Prices are listed in INR and are inclusive of applicable taxes.</p>
          <h2 className="text-lg font-semibold text-foreground">4. User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the service responsibly and ethically</li>
            <li>Do not attempt to misuse or reverse-engineer the AI</li>
            <li>Do not share purchased source code without a commercial license</li>
          </ul>
          <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
          <p>ZARA AI is provided "as-is." We are not responsible for any decisions made based on AI-generated content. ZARA is an AI assistant and not a substitute for professional advice.</p>
          <h2 className="text-lg font-semibold text-foreground">6. Intellectual Property</h2>
          <p>All content, design, and code remain the property of ZARA AI unless explicitly transferred through a commercial license purchase.</p>
          <h2 className="text-lg font-semibold text-foreground">7. Contact</h2>
          <p>For questions about these terms, contact <strong>support@zaraai.com</strong>.</p>
        </div>
      </motion.div>
    </main>
  </div>
);

export default TermsOfService;
