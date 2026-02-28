import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
}

const COLORS = [
  "hsl(340 75% 55%)", // pink
  "hsl(200 80% 55%)", // blue
  "hsl(50 90% 60%)",  // yellow
  "hsl(280 60% 55%)", // violet
  "hsl(30 90% 55%)",  // orange
  "hsl(150 60% 50%)", // green
];

const HoliConfetti = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled && particles.length === 0) {
      const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 6 + 4,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 3,
      }));
      setParticles(newParticles);
      // Clean up after animation
      setTimeout(() => setParticles([]), 6000);
    }
  }, [scrolled]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};

export default HoliConfetti;
