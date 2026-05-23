import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import { X, ArrowRight, Home, LayoutGrid, Mail } from "lucide-react";

interface VisionPageProps {
  onClose: () => void;
  onGoHome: () => void;
  onGoWork: () => void;
  onGoContact: () => void;
}

const principles = [
  {
    n: "01",
    title: "Le silence avant le bruit",
    body: "Un design fort commence par une intention claire. Avant chaque pixel, je cherche le mot juste, l'émotion exacte, la raison d'être.",
    accent: "#7492F7",
  },
  {
    n: "02",
    title: "La forme suit le sens",
    body: "Aucune décision esthétique n'est gratuite. Chaque courbe, chaque grille, chaque choix typographique sert une histoire et une fonction.",
    accent: "#F97316",
  },
  {
    n: "03",
    title: "Mouvement, pas décoration",
    body: "L'animation guide le regard et donne un rythme. Elle n'est jamais là pour impressionner — toujours pour clarifier.",
    accent: "#E1E1E1",
  },
  {
    n: "04",
    title: "Soustraire jusqu'à l'essentiel",
    body: "Le luxe d'une marque se mesure à ce qu'elle ose retirer. Mon travail est un exercice constant de réduction.",
    accent: "#7492F7",
  },
  {
    n: "05",
    title: "Une marque, un système vivant",
    body: "Je conçois des identités qui évoluent, respirent et s'adaptent à tous les contextes — sans jamais perdre leur centre.",
    accent: "#F97316",
  },
];

export const VisionPage = ({ onClose, onGoHome, onGoWork, onGoContact }: VisionPageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  // Cursor-following gradient
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { damping: 30, stiffness: 150 });
  const smy = useSpring(my, { damping: 30, stiffness: 150 });
  const bgGradient = useMotionTemplate`radial-gradient(circle at ${smx}% ${smy}%, rgba(116,146,247,0.15) 0%, rgba(5,5,5,0) 50%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      ref={containerRef}
      onMouseMove={handleMove}
      data-lenis-prevent
      className="fixed inset-0 z-[60] bg-[#050505] text-[#e1e1e1] overflow-y-auto overflow-x-hidden overscroll-contain"
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: bgGradient }} />

      {/* Header */}
      <div className="sticky top-0 left-0 w-full px-6 md:px-8 py-6 flex justify-between items-center z-50 mix-blend-difference">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400">
          Vision — Manifeste 2026
        </span>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
          data-cursor-sticky
        >
          Fermer <X size={16} />
        </button>
      </div>

      {/* Intro */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-8 container mx-auto relative">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-500 mb-8"
        >
          (Cinq principes pour faire mieux)
        </motion.span>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="font-bold tracking-tighter leading-[0.85] uppercase"
        >
          <span className="block text-[18vw] md:text-[14vw] text-[#e1e1e1]">Vision</span>
          <span className="block text-[8vw] md:text-[5vw] italic font-serif text-[#7492F7] -mt-4">
            ma manière de voir.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 max-w-xl text-base md:text-lg text-neutral-400 font-light leading-relaxed"
        >
          Ce que je crois sur le design, le mouvement, la marque, et l'attention.
          Un manifeste évolutif — qui se précise à mesure que je travaille.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-6 md:left-8 flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-neutral-700" />
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-mono">
            Défiler pour entrer
          </span>
        </motion.div>
      </section>

      {/* Marquee */}
      <motion.div
        style={{ x: marqueeX }}
        className="flex gap-12 py-12 whitespace-nowrap text-[14vw] md:text-[10vw] font-bold tracking-tighter uppercase text-neutral-900 select-none"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i}>Concevoir · Réduire · Préciser · </span>
        ))}
      </motion.div>

      {/* Principles */}
      <section className="px-6 md:px-8 container mx-auto py-20 md:py-32">
        <div className="flex flex-col gap-24 md:gap-40">
          {principles.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 ${
                i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"
              }`}
            >
              <div className="md:col-span-4 flex md:flex-col items-baseline md:items-start gap-4 md:gap-2">
                <span
                  className="text-7xl md:text-9xl font-bold tracking-tighter leading-none"
                  style={{ color: p.accent }}
                >
                  {p.n}
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono">
                  Principe
                </span>
              </div>
              <div className="md:col-span-8 md:pt-8">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                  {p.title}
                </h3>
                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-xl">
                  {p.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 md:px-8 container mx-auto py-24 md:py-40 border-t border-neutral-900">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight max-w-4xl"
        >
          <span className="text-[#7492F7] font-serif italic">«</span> Le bon design
          ne crie pas. Il donne envie d'écouter.{" "}
          <span className="text-[#7492F7] font-serif italic">»</span>
        </motion.blockquote>
        <span className="block mt-8 text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono">
          — Atnan, carnet d'atelier
        </span>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-8 container mx-auto pb-24 md:pb-32 border-t border-neutral-900 pt-16 md:pt-24">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-10 leading-[0.95]">
          On continue ?
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={onGoHome}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#e1e1e1] text-[#050505] uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
            data-cursor-sticky
          >
            <Home size={14} /> Accueil
          </button>
          <button
            onClick={onGoWork}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-neutral-700 text-[#e1e1e1] uppercase tracking-widest text-xs font-bold hover:border-white transition-colors"
            data-cursor-sticky
          >
            <LayoutGrid size={14} /> Voir les travaux
          </button>
          <button
            onClick={onGoContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-neutral-700 text-[#e1e1e1] uppercase tracking-widest text-xs font-bold hover:border-white transition-colors"
            data-cursor-sticky
          >
            <Mail size={14} /> Me contacter <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </motion.div>
  );
};
