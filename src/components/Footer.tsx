import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-primary fill-primary" />
              <span className="font-display font-bold text-lg">ZARA</span>
            </div>
            <p className="text-sm text-muted-foreground">Your AI companion who truly cares ❤️</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Services</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/feedback" className="hover:text-foreground transition-colors">Feedback</Link></li>
            </ul>
          </div>

          {/* Legal / Razorpay Policies */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} ZARA AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
