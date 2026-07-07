import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import myraLogo from "@/assets/myra-logo.png.asset.json";

interface NavbarProps {
  onStartChat: () => void;
}

const Navbar = ({ onStartChat }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img
            src={myraLogo.url}
            alt="MYRA"
            className="h-12 md:h-14 w-auto dark:invert-0 invert opacity-90 hover:opacity-100 transition-opacity"
          />
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
