"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [variant, setVariant] = useState({
    scale: 1,
    borderRadius: "50%",
    backgroundColor: "rgba(47,111,237,1)",
    border: "0px solid transparent",
  });

  useEffect(() => {
    const touchCheck = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(touchCheck);
    if (touchCheck) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const hoverEl = target.closest("[data-cursor]");
      const type = hoverEl ? hoverEl.getAttribute("data-cursor") : null;
      setCursorType(type);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    switch (cursorType) {
      case "link":
        setVariant({
          scale: 1.8,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.08)",
          border: "1.5px solid rgba(255,255,255,0.85)",
        });
        break;
      case "drag":
        setVariant({
          scale: 1,
          borderRadius: "6px",
          backgroundColor: "rgba(255,255,255,0.9)",
          border: "0px solid transparent",
        });
        break;
      case "view":
      case "play":
        setVariant({
          scale: 3,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.9)",
          border: "0px solid transparent",
        });
        break;
      default:
        setVariant({
          scale: 1,
          borderRadius: "50%",
          backgroundColor: "rgba(47,111,237,1)",
          border: "0px solid transparent",
        });
    }
  }, [cursorType]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        willChange: "transform",
      }}
    >
      <motion.div
        className="w-3 h-3 flex items-center justify-center text-[9px] font-bold uppercase tracking-wider"
        animate={variant}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.4 }}
        style={{ originX: "50%", originY: "50%" }}
      >
        {(cursorType === "view" || cursorType === "play" || cursorType === "drag") && (
          <span className="text-black text-[9px] font-extrabold tracking-widest">
            {cursorType === "drag" ? "DRAG" : cursorType === "play" ? "PLAY" : "VIEW"}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}