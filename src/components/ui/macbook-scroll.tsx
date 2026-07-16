"use client";
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MacbookScrollProps {
  src?: string;
  title?: ReactNode;
  badge?: ReactNode;
  showGradient?: boolean;
}

export const MacbookScroll = ({ src, title, badge, showGradient }: MacbookScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { reduced } = useReducedMotion();
  const disableScrollAnim = isMobile || reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Smoother scroll with spring damping to reduce jank
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const scaleX = useTransform(smooth, [0, 0.3], disableScrollAnim ? [1.5, 1.5] : [1.2, 1.5]);
  const scaleY = useTransform(smooth, [0, 0.3], disableScrollAnim ? [1.5, 1.5] : [0.6, 1.5]);
  const translate = useTransform(smooth, [0, 1], disableScrollAnim ? [0, 0] : [0, 1500]);
  const rotate = useTransform(smooth, [0.1, 0.12, 0.3], disableScrollAnim ? [0, 0, 0] : [-28, -28, 0]);
  const textTransform = useTransform(smooth, [0, 0.3], disableScrollAnim ? [0, 0] : [0, 100]);
  const textOpacity = useTransform(smooth, [0, 0.2], disableScrollAnim ? [1, 1] : [1, 0]);

  return (
    <div
      ref={ref}
      className={
        "flex flex-col items-center justify-start flex-shrink-0 [perspective:800px] transform " +
        (disableScrollAnim
          ? "min-h-0 py-12 scale-[0.55] sm:scale-75"
          : "min-h-[200vh] py-20 md:py-40 md:scale-100 scale-[0.6]")
      }
      style={{ willChange: disableScrollAnim ? "auto" : "transform" }}
    >

      <motion.h2
        style={{ translateY: textTransform, opacity: textOpacity }}
        className="text-3xl md:text-5xl font-bold mb-20 text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground"
      >
        {title || <>MYRA AI in your pocket. <br /> Anytime, anywhere.</>}
      </motion.h2>
      <Lid src={src} scaleX={scaleX} scaleY={scaleY} rotate={rotate} translate={translate} />
      {/* Base area */}
      <div className="h-[22rem] w-[32rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
        <div className="h-10 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-[#050505]" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full flex items-center justify-center">
            <Keypad />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-primary/20 to-transparent rounded-tr-3xl rounded-tl-3xl" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t dark:from-black from-white via-white dark:via-black to-transparent z-50" />
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{ boxShadow: "0px 2px 0px 2px hsl(var(--border)) inset" }}
          className="rounded-lg h-full w-full bg-[#010101] flex items-center justify-center"
        >
          <span className="font-logo tracking-[0.3em] text-primary text-2xl">MYRA</span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX,
          scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        <div className="absolute inset-0 bg-[#272729] rounded-lg" />
        {src && (
          <img
            src={src}
            alt="screen"
            className="object-cover object-left-top absolute rounded-lg inset-0 h-full w-full"
          />
        )}
      </motion.div>
    </div>
  );
};

const Trackpad = () => (
  <div
    className="w-[40%] mx-auto h-32 rounded-xl my-1"
    style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
  />
);

const SpeakerGrid = () => (
  <div
    className="flex px-[0.5px] gap-[2px] mt-2 h-40"
    style={{
      backgroundImage: "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
      backgroundSize: "3px 3px",
    }}
  />
);

const Keypad = () => (
  <div className="h-full rounded-md bg-[#050505] mx-1 p-1 w-full">
    {Array.from({ length: 5 }).map((_, r) => (
      <div key={r} className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
        {Array.from({ length: 14 }).map((_, c) => (
          <div key={c} className="h-6 flex-1 rounded-[3.5px] bg-[#0A090D]" style={{ boxShadow: "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset" }} />
        ))}
      </div>
    ))}
  </div>
);
