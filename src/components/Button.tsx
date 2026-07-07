"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  isMagnetic?: boolean;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  isMagnetic = true,
  className = "",
  type = "button",
  disabled = false,
  ...props
}: ButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !isMagnetic || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const mouseX = e.clientX - (rect.left + rect.width / 2);
    const mouseY = e.clientY - (rect.top + rect.height / 2);
    const maxPull = 20;
    x.set((mouseX / (rect.width / 2)) * maxPull);
    y.set((mouseY / (rect.height / 2)) * maxPull);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseStyle =
    "relative inline-flex items-center justify-center font-bold text-xs tracking-wider uppercase select-none outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-orbit focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "border border-[#E5E5E7] bg-transparent text-[#111111] hover:border-[#111111] hover:bg-[#F7F7F8]";
      case "ghost":
        return "bg-transparent text-[#5B5B60] hover:text-[#111111] hover:bg-[#F7F7F8]/80";
      case "primary":
      default:
        return "bg-[#111111] text-white hover:bg-black hover:shadow-[0_10px_25px_rgba(17,17,17,0.12)]";
    }
  };

  return (
    <motion.div
      ref={wrapperRef}
      className="inline-flex rounded-full"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      data-cursor="link"
    >
      <button
        type={type}
        disabled={disabled}
        className={twMerge(
          baseStyle,
          getVariantStyles(),
          "py-4 px-8 rounded-full",
          className
        )}
        {...props}
      >
        {variant !== "ghost" && (
          <motion.span
            className="absolute inset-0 rounded-full bg-current opacity-0 pointer-events-none"
            animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 0.03 : 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    </motion.div>
  );
}