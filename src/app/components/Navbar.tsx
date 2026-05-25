import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import logoLight from "../../img/logo_atnan_light.svg";

const links = [
  { label: "Travaux", href: "#work" },
  { label: "À Propos", href: "#a-propos" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onNavigate?: (target: string | number) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (href === "#top") {
        onNavigate?.(0);
      } else {
        onNavigate?.(href);
      }
      setOpen(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full px-6 md:px-8 py-6 flex justify-between items-center z-40 mix-blend-difference text-white pointer-events-none"
      >
        <a
          href="#top"
          onClick={(e) => handleClick(e, "#top")}
          className="text-xl font-bold tracking-tighter uppercase pointer-events-auto flex items-center gap-3"
          data-cursor-sticky
        >
          <img 
            src={logoLight} 
            alt="Logo Atnan Tas" 
            className="h-5 w-auto" 
          />
          Atnan Tas
        </a>
        <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest pointer-events-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              className="hover:opacity-50 transition-opacity"
              data-cursor-sticky
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-xs uppercase font-bold pointer-events-auto flex items-center gap-2"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#050505] md:hidden flex flex-col items-center justify-center gap-10"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="text-4xl font-bold tracking-tight text-[#e1e1e1] hover:text-white"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};