import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Home, LayoutGrid } from "lucide-react";
import { Lightbox } from "./Lightbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Project } from "./projectsData";
import { projects } from "./projectsData";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onGoHome: () => void;
  onGoWork: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectDetail = ({
  project,
  onBack,
  onGoHome,
  onGoWork,
  onSelectProject,
}: ProjectDetailProps) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const currentIdx = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [project.id]);

  const allImages = [project.image, ...project.gallery];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#050505] text-[#e1e1e1] pb-20 relative z-50"
    >
      <Lightbox
        images={allImages}
        initialIndex={Math.max(0, lightboxIndex)}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
      />

      <div className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-40 mix-blend-difference pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-3 text-xs md:text-sm font-bold uppercase tracking-widest hover:text-neutral-500 transition-colors group"
          data-cursor-sticky
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Retour
        </button>
        <div className="text-xs md:text-sm font-mono text-neutral-500">
          PROJET {String(project.id).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </div>
      </div>

      <div className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-4 leading-[0.95]"
          >
            {project.title}
          </motion.h1>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 text-xs md:text-sm font-mono text-neutral-300"
          >
            <span className="border border-neutral-700 px-3 py-1 rounded-full">{project.category}</span>
            <span className="border border-neutral-700 px-3 py-1 rounded-full">{project.year}</span>
            <span className="border border-neutral-700 px-3 py-1 rounded-full">{project.client}</span>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-24 md:mb-32">
          <div className="md:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 md:sticky md:top-32">
              Contexte
            </h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl md:text-3xl font-light leading-relaxed text-neutral-200 mb-10">
              {project.context}
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10 text-sm">
              <div>
                <span className="text-neutral-500 font-mono uppercase tracking-widest text-xs block mb-2">
                  Client
                </span>
                <span className="text-neutral-200">{project.client}</span>
              </div>
              <div>
                <span className="text-neutral-500 font-mono uppercase tracking-widest text-xs block mb-2">
                  Rôle
                </span>
                <span className="text-neutral-200">{project.role}</span>
              </div>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors"
                data-cursor-sticky
              >
                Voir le site en direct <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>

        {project.category === "Photographie" ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
            {project.gallery.map((img, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: (idx % 6) * 0.06, duration: 0.6 }}
                onClick={() => setLightboxIndex(idx + 1)}
                className="relative group overflow-hidden rounded-sm w-full mb-4 md:mb-6 break-inside-avoid bg-neutral-950"
                data-cursor-text="Agrandir"
              >
                <ImageWithFallback
                  src={img}
                  alt={`${project.title} — photo ${idx + 1}`}
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {project.gallery.map((img, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.08, duration: 0.6 }}
                onClick={() => setLightboxIndex(idx + 1)}
                className={`relative group overflow-hidden rounded-sm ${
                  idx % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                }`}
                data-cursor-text="Agrandir"
              >
                <ImageWithFallback
                  src={img}
                  alt={`${project.title} — visuel ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.button>
            ))}
          </div>
        )}

        <div className="mt-32 md:mt-40 border-t border-neutral-900 pt-16 md:pt-20">
          <span className="block text-neutral-500 text-xs uppercase tracking-widest mb-2 font-mono">
            Projet suivant
          </span>
          <button
            onClick={() => onSelectProject(nextProject)}
            className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 group text-left"
            data-cursor-text="Suivant"
          >
            <h4 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight group-hover:text-neutral-400 transition-colors">
              {nextProject.title}
            </h4>
            <ArrowUpRight className="w-10 h-10 md:w-16 md:h-16 text-neutral-700 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2" />
          </button>

          <div className="mt-16 flex flex-col sm:flex-row flex-wrap gap-4">
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
              <LayoutGrid size={14} /> Tous les projets
            </button>
            <button
              onClick={() => onSelectProject(nextProject)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-neutral-700 text-[#e1e1e1] uppercase tracking-widest text-xs font-bold hover:border-white transition-colors"
              data-cursor-sticky
            >
              Projet suivant <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
