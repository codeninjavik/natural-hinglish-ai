"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  // split images into 4 columns
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) =>
    images.slice(colIndex * chunkSize, colIndex * chunkSize + chunkSize)
  );

  return (
    <div className={cn("relative block w-screen left-1/2 -translate-x-1/2 h-[600px] overflow-hidden", className)}>
      <div className="flex size-full items-center justify-center">
        <div className="w-[1720px] h-[1720px] shrink-0 scale-[0.4] sm:scale-75 lg:scale-100">

          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-8"
              >
                <GridLineVertical className="-left-4" offset="80px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="20px" />
                    <motion.img
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[970/700] rounded-lg object-cover ring ring-primary/20 hover:shadow-2xl"
                      width={970}
                      height={700}
                    />

                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({ className, offset }: { className?: string; offset?: string }) => (
  <div
    style={{
      "--offset": offset || "200px",
      "--width": "1px",
      "--fade-stop": "90%",
      maskComposite: "exclude",
    } as React.CSSProperties}
    className={cn(
      "absolute left-[calc(var(--offset)/2*-1)] h-[var(--width)] w-[calc(100%+var(--offset))]",
      "bg-[linear-gradient(to_right,hsl(var(--primary)/0.3),hsl(var(--primary)/0.3)_50%,transparent_0,transparent)]",
      "[background-size:10px_var(--width)]",
      className
    )}
  />
);

const GridLineVertical = ({ className, offset }: { className?: string; offset?: string }) => (
  <div
    style={{
      "--offset": offset || "150px",
      "--width": "1px",
      "--fade-stop": "90%",
    } as React.CSSProperties}
    className={cn(
      "absolute top-[calc(var(--offset)/2*-1)] w-[var(--width)] h-[calc(100%+var(--offset))]",
      "bg-[linear-gradient(to_bottom,hsl(var(--primary)/0.3),hsl(var(--primary)/0.3)_50%,transparent_0,transparent)]",
      "[background-size:var(--width)_10px]",
      className
    )}
  />
);
