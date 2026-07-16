import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NoiseBackgroundProps {
  children: ReactNode;
  className?: string;
}

export const NoiseBackground = ({ children, className }: NoiseBackgroundProps) => {
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-fuchsia-500 to-accent" />
      {/* Noise SVG */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30 mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="myra-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#myra-noise)" />
      </svg>
      {/* Shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_2.5s_ease-in-out_infinite]" />
      <div className="relative z-10">{children}</div>
      <style>{`@keyframes shine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`}</style>
    </div>
  );
};
