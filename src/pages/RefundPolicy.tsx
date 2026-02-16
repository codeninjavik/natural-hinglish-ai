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
        {/* Important Notice */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-5 mb-8">
          <p className="text-destructive font-semibold text-base">⚠️ Important Notice:</p>
          <p className="text-foreground mt-2 text-sm">ZARA AI App buy karne se pahle yeh policy dhyan se padh lein. <strong>Ek baar payment hone ke baad paisa wapis / refund nahi hoga.</strong> Yeh ek digital product hai jo turant deliver hota hai, isliye koi bhi refund ya cancellation applicable nahi hai.</p>
        </div>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
          <p><strong>Effective Date:</strong> {new Date().getFullYear()}</p>

          <h2 className="text-lg font-semibold text-foreground">1. No Refund Policy</h2>
          <p>ZARA AI Girlfriend App aur Source Code ki sabhi purchases <strong>final hain</strong>. Yeh ek digital product hai jo instantly deliver hota hai, isliye <strong>kisi bhi condition mein refund ya paisa wapis nahi kiya jayega</strong>.</p>

          <h2 className="text-lg font-semibold text-foreground">2. No Cancellation</h2>
          <p>Yeh ek one-time purchase hai (subscription nahi hai), isliye cancellation ka koi option nahi hai. Payment karne ke baad order cancel nahi hoga aur <strong>refund applicable nahi hai</strong>.</p>

          <h2 className="text-lg font-semibold text-foreground">3. Duplicate Payment</h2>
          <p>Agar galti se duplicate payment ho gayi hai, toh humse contact karein. Duplicate payment verify hone ke baad extra amount wapis kiya ja sakta hai.</p>

          <h2 className="text-lg font-semibold text-foreground">4. Contact Us</h2>
          <p>Koi bhi query ho toh humse contact karein: <strong>support@zaraai.com</strong> ya Telegram: <strong>@zaraaimobile</strong></p>
        </div>
      </motion.div>
    </main>
  </div>
);

export default RefundPolicy;
