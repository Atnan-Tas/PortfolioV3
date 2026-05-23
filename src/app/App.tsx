import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { NoiseOverlay } from './components/NoiseOverlay';
import { ProjectDetail } from './components/ProjectDetail';
import { VisionPage } from './components/VisionPage';
import type { Project } from './components/projectsData';
import { ReactLenis, type LenisRef } from 'lenis/react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showVision, setShowVision] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  const scrollTo = (target: string | number) => {
    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -40, duration: 1.2 });
    } else if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  const handleGoHome = () => {
    setShowVision(false);
    setSelectedProject(null);
    requestAnimationFrame(() => scrollTo(0));
  };

  const handleGoSection = (selector: string) => {
    setShowVision(false);
    setSelectedProject(null);
    requestAnimationFrame(() => {
      setTimeout(() => scrollTo(selector), 50);
    });
  };

  return (
    <ReactLenis root ref={lenisRef}>
      <div className="bg-[#050505] min-h-screen text-[#e1e1e1] selection:bg-[#e1e1e1] selection:text-[#050505] md:cursor-none relative">
        <NoiseOverlay />
        <CustomCursor />

        <AnimatePresence mode="wait">
          {selectedProject ? (
            <ProjectDetail
              key={`project-${selectedProject.id}`}
              project={selectedProject}
              onBack={() => handleGoSection('#work')}
              onGoHome={handleGoHome}
              onGoWork={() => handleGoSection('#work')}
              onSelectProject={(p) => setSelectedProject(p)}
            />
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Navbar onNavigate={scrollTo} />
              <main>
                <Hero onNavigate={scrollTo} onOpenVision={() => setShowVision(true)} />
                <Work onProjectSelect={setSelectedProject} />
                <About />
                <Contact />
              </main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showVision && (
            <VisionPage
              onClose={() => setShowVision(false)}
              onGoHome={handleGoHome}
              onGoWork={() => handleGoSection('#work')}
              onGoContact={() => handleGoSection('#contact')}
            />
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}
