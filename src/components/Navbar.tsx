import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Zap, ZapOff } from "lucide-react";
import myraLogo from "@/assets/myra-logo.png.asset.json";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface NavbarProps {
  onStartChat: () => void;
}

const Navbar = ({ onStartChat }: NavbarProps) => {
  const { reduced, toggle } = useReducedMotion();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img
            src={myraLogo.url}
            alt="MYRA"
            className="h-12 md:h-14 w-auto opacity-95 hover:opacity-100 transition-opacity invert dark:invert-0 drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
          />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="rounded-full"
            aria-label={reduced ? "Enable animations" : "Reduce motion"}
            aria-pressed={reduced}
            title={reduced ? "Motion reduced — click to enable animations" : "Reduce motion"}
          >
            {reduced ? <ZapOff className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
          </Button>
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
