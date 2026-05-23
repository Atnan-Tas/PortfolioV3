import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const services = [
  "Direction artistique",
  "Identité visuelle & Branding",
  "Design d'interface (UI/UX)",
  "Stratégie de communication",
];

const timeline = [
  { year: "2027...", label: "Bac+5 Direction Artistique Communication 360°" },
  { year: "2025 - 2026", label: "Würth France - Chargé de communication interne" },
  { year: "2025", label: "B-Hive Group - Chargé de communication" },
  { year: "2024", label: "Teradelis (Agence) - Chargé de communication" },
  { year: "2025", label: "Diplôme BAC+3 BUT Métiers Multimédia Internet - Montbéliard" },
  { year: "2024", label: "Conservatoire Henri Dutilleux Belfort - Chargé de communication" },
];

export const About = () => {
  return (
    <section
      id="a-propos"
      className="py-24 md:py-32 bg-[#050505] text-[#e1e1e1] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
        <span className="text-[20vw] font-bold uppercase whitespace-nowrap leading-none">
          Créatif
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-4">
            <span className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-8 md:sticky md:top-32 font-mono">
              À Propos
            </span>
          </div>

          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row gap-8 mb-12 items-start"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0 border border-neutral-800">
                <ImageWithFallback
                  src="/src/img/IMG_8942.jpg"
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
                  Bonjour, je suis Atnan.
                </h2>
                <p className="text-neutral-400 font-light text-base md:text-lg leading-relaxed">
                  Graphiste et communicant basé à Strasbourg, je conçois des identités
                  visuelles et des expériences numériques pour vous.
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl md:text-3xl leading-snug font-light mb-12 text-neutral-200"
            >
              Mon travail explore la frontière entre design graphique, mouvement et
              récit de marque. Chaque projet est l'occasion de créer un dialogue
              cohérent entre une intention et sa forme.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-neutral-400">
              <div>
                <h4 className="text-white text-sm font-bold mb-6 uppercase tracking-widest">
                  Services
                </h4>
                <ul className="space-y-1 font-light">
                  {services.map((s) => (
                    <li key={s} className="border-b border-neutral-800 py-3">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold mb-6 uppercase tracking-widest">
                  Parcours
                </h4>
                <ul className="space-y-1 font-light">
                  {timeline.map((t) => (
                    <li
                      key={t.year}
                      className="border-b border-neutral-800 py-3 flex justify-between gap-4"
                    >
                      <span>{t.label}</span>
                      <span className="font-mono text-xs text-neutral-500 shrink-0">
                        {t.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
