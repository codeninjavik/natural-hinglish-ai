import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-secondary/20">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-5 h-5 text-primary fill-primary" />
          <span className="font-display font-bold text-lg">ZARA</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Your AI companion who truly cares ❤️
        </p>
        <p className="text-xs text-muted-foreground/60 mt-4">
          © {new Date().getFullYear()} ZARA AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
