import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const words = [
  { text: "TAS", className: "font-bold text-blue-500 font-sans tracking-tighter" },
  { text: "Graphiste", className: "font-serif italic text-orange-500 tracking-normal" },
  { text: "Communicant", className: "font-mono text-[#7492F7] tracking-tight uppercase" },
];

interface HeroProps {
  onNavigate?: (target: string | number) => void;
  onOpenVision?: () => void;
}

export const Hero = ({ onNavigate, onOpenVision }: HeroProps) => {
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    onNavigate?.(target);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const x = useMotionValue(0);
  const yMove = useMotionValue(0);
  const sx = useSpring(x, { damping: 50, stiffness: 300 });
  const sy = useSpring(yMove, { damping: 50, stiffness: 300 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-8deg", "8deg"]);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const currentWord = words[index].text;

    if (subIndex === currentWord.length + 1 && !reverse) {
      const t = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(t);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
      reverse ? 50 : 110
    );
    return () => clearTimeout(t);
  }, [subIndex, index, reverse]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    yMove.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    yMove.set(0);
  };

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#050505] text-[#e1e1e1] pt-28 pb-20"
    >
      <motion.div style={reduceMotion ? {} : { y, opacity }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,30,30,0.4)_0%,_rgba(5,5,5,1)_70%)]" />
      </motion.div>

      <div className="z-10 container mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left z-20 min-w-0 w-full">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9]"
          >
            Atnan
            <br />
            <span className="inline-flex items-baseline min-h-[1.1em]">
              <span className={`${words[index].className} inline-block`}>
                {words[index].text.substring(0, subIndex)}
              </span>
              <span className="animate-pulse ml-1 text-neutral-500">|</span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-base md:text-lg text-neutral-400 max-w-md mx-auto lg:mx-0 leading-relaxed font-light"
          >
            Conception d'expériences numériques immersives axées sur le mouvement,
            l'interaction et l'esthétique pure.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a
              href="#work"
              onClick={(e) => goTo(e, "#work")}
              className="px-7 py-3.5 rounded-full bg-[#e1e1e1] text-[#050505] uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
              data-cursor-sticky
            >
              Voir les travaux
            </a>
            <a
              href="#contact"
              onClick={(e) => goTo(e, "#contact")}
              className="px-7 py-3.5 rounded-full border border-neutral-700 text-[#e1e1e1] uppercase tracking-widest text-xs font-bold hover:border-white transition-colors"
              data-cursor-sticky
            >
              Me contacter
            </a>
          </motion.div>
        </div>

        <motion.div
          className="flex-shrink-0 w-full max-w-sm md:max-w-md lg:max-w-md"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1000 }}
        >
          <motion.button
            type="button"
            onClick={onOpenVision}
            style={reduceMotion ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full aspect-[3/4] rounded-sm overflow-hidden border border-white/5 bg-neutral-900 group text-left"
            data-cursor-text="Vision"
            aria-label="Ouvrir la page Vision"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1676099748858-6d4c18fa7c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Forme 3D abstraite"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-mono mb-2">
                  Manifeste
                </span>
                <span className="block text-2xl md:text-3xl font-bold tracking-tight text-white leading-none">
                  Vision
                </span>
              </div>
              <span className="text-xs uppercase tracking-widest text-neutral-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                Ouvrir →
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-6 md:left-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="h-[1px] w-12 bg-neutral-700" />
        <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-mono">Défiler</span>
      </motion.div>
    </section>
  );
};
