import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Lightbox = ({ images, initialIndex, isOpen, onClose }: LightboxProps) => {
  const [index, setIndex] = React.useState(initialIndex);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      if (e.key === "ArrowRight") setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, images.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute top-8 right-8 z-50">
            <button
              onClick={onClose}
              className="p-2 text-white hover:text-neutral-400 transition-colors rounded-full border border-white/20 hover:border-white"
              data-cursor-sticky
            >
              <X size={24} />
            </button>
          </div>

          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
             <button onClick={handlePrev} className="pointer-events-auto p-4 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors" data-cursor-sticky>
                <ChevronLeft size={32} />
             </button>
             <button onClick={handleNext} className="pointer-events-auto p-4 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors" data-cursor-sticky>
                <ChevronRight size={32} />
             </button>
          </div>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index]}
              alt={`Gallery image ${index + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
            />
            <div className="text-center mt-4 text-sm text-neutral-500 font-mono">
                {index + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
