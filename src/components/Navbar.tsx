import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

interface NavbarProps {
  onStartChat: () => void;
}

const Navbar = ({ onStartChat }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-logo text-2xl tracking-[0.15em] uppercase">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <span>ZARA</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="hero" size="sm" className="rounded-full" onClick={onStartChat}>
            Chat Now
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
