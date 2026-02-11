import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: {
          name: name || "Anonymous",
          email: email || "no-reply@zaraai.com",
          message: `⭐ Rating: ${rating}/5\n\n${feedback}`,
          type: "feedback",
        },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Feedback send failed:", err);
      toast({ title: "Error", description: "Failed to send feedback. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

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

      <main className="pt-24 pb-16 container mx-auto px-6 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your <span className="text-primary">Feedback</span></h1>
          <p className="text-muted-foreground text-lg">Help us make ZARA even better 🩷</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-primary/20 bg-card p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold mb-2">Thank you for your feedback!</h3>
            <p className="text-muted-foreground">ZARA appreciates it ❤️</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8 space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block text-center">Rate your experience</label>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} className="transition-transform hover:scale-110">
                    <Star className={`w-8 h-8 transition-colors ${star <= (hover || rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Name (optional)</label>
              <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Email (optional)</label>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground" />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Your feedback</label>
              <textarea placeholder="Tell us what you think about ZARA..." required rows={5} value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground resize-none" />
            </div>

            <Button type="submit" variant="hero" className="w-full rounded-full" size="lg" disabled={rating === 0 || sending}>
              <Send className="w-4 h-4" /> {sending ? "Sending..." : "Submit Feedback"}
            </Button>
          </motion.form>
        )}
      </main>
    </div>
  );
};

export default Feedback;
