import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import { projects, type Project } from "./projectsData";

interface WorkProps {
  onProjectSelect: (project: Project) => void;
}

export const Work = ({ onProjectSelect }: WorkProps) => {
  return (
    <section id="work" className="py-24 md:py-32 bg-[#050505] relative z-10">
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 flex items-end justify-between border-b border-neutral-800 pb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-[#e1e1e1]">
            PROJETS
          </h2>
          <span className="hidden md:block text-neutral-500 font-mono text-sm">
            ({String(projects.length).padStart(2, "0")})
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onProjectSelect(project)}
              className={`group text-left ${i === 0 ? "md:col-span-2" : ""}`}
              data-cursor-text="Voir"
            >
              <div className="relative overflow-hidden rounded-sm bg-neutral-900 aspect-[4/3] mb-5">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-105 ${
                    project.slug === "photographie-sportive"
                      ? "grayscale"
                      : ""
                  }`}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-medium text-[#e1e1e1] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-1 font-light">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs uppercase tracking-widest text-neutral-500 font-mono hidden sm:inline">
                    {project.category} — {project.year}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-[#e1e1e1] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};