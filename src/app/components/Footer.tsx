import React from "react";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#050505] text-[#e1e1e1] py-12 border-t border-neutral-900">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Twitter"
              className="p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors"
              data-cursor-sticky
            >
              <Twitter size={16} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors"
              data-cursor-sticky
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors"
              data-cursor-sticky
            >
              <Linkedin size={16} />
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-xs text-neutral-600 font-mono uppercase tracking-wider">
            <p>&copy; 2026 Atnan Studio</p>
            <a href="#" className="hover:text-neutral-400" data-cursor-sticky>
              Confidentialité
            </a>
            <a href="#" className="hover:text-neutral-400" data-cursor-sticky>
              Mentions légales
            </a>
            <p>Paris, FR</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
