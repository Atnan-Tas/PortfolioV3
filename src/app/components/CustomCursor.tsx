import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

export const CustomCursor = () => {
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [variant, setVariant] = useState<"default" | "text" | "button" | "sticky">("default");
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const x = useSpring(mouseX, { damping: 30, stiffness: 800 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 800 });

  const trailX = useSpring(mouseX, { damping: 40, stiffness: 250, mass: 1.2 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 250, mass: 1.2 });

  useEffect(() => {
    // Disable on touch / small screens
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const text = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
      const sticky = target.closest("[data-cursor-sticky]");
      const isLink =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button");

      if (text) {
        setCursorText(text);
        setVariant("text");
        setIsHovering(true);
      } else if (sticky) {
        setCursorText("");
        setVariant("sticky");
        setIsHovering(true);
      } else if (isLink) {
        setCursorText("");
        setVariant("button");
        setIsHovering(true);
      } else {
        setCursorText("");
        setVariant("default");
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const sizes = {
    default: { width: 12, height: 12 },
    text: { width: 100, height: 100 },
    button: { width: 50, height: 50 },
    sticky: { width: 50, height: 50 },
  };
  const currentSize = sizes[variant];

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] bg-white mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 4 : 8,
          height: isHovering ? 4 : 8,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99] bg-white mix-blend-difference flex items-center justify-center overflow-hidden"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: currentSize.width,
          height: currentSize.height,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
      >
        <AnimatePresence mode="wait">
          {cursorText && (
            <motion.span
              key={cursorText}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-black text-[10px] font-bold uppercase tracking-widest text-center leading-tight px-2 font-mono"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
