"use client";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

export const MacbookSection = () => {
  return (
    <section className="w-full overflow-hidden bg-background">
      <MacbookScroll
        title={
          <span>
            Experience <span className="font-logo tracking-[0.15em] text-primary">MYRA</span> like never before. <br /> Built for you.
          </span>
        }
        src="https://assets.aceternity.com/macbook.png"
        showGradient={false}
        badge={
          <span className="text-xs font-logo tracking-[0.3em] text-primary/70">MYRA</span>
        }
      />
    </section>
  );
};

export default MacbookSection;
