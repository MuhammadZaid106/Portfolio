"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "./Button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Dynamically import the 3D Canvas to optimize load times and allow fallback
const HeroThreeCanvas = dynamic(() => import("./HeroThreeCanvas"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-80 h-80 rounded-full bg-orbit/10 blur-[100px] animate-pulse" />
      <div className="w-[450px] h-[450px] rounded-full bg-aether/5 blur-[120px] animate-pulse delay-1000" />
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // Pinned Hero Section Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
        },
      });

      // Background parallax & zoom
      tl.to(bgRef.current, { scale: 1.12, opacity: 0.15, ease: "none" }, 0);
      
      // 3D Canvas element drift
      tl.to(canvasContainerRef.current, { yPercent: -15, scale: 0.85, opacity: 0.1, ease: "none" }, 0);
      
      // Foreground fade out & upward drift
      tl.to(contentRef.current, { yPercent: -18, opacity: 0, ease: "none" }, 0);

      // Character skew-in reveal animation on load
      const chars = titleContainerRef.current?.querySelectorAll(".char");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 90,
            rotateX: -25,
            skewY: 5,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            skewY: 0,
            duration: 1.1,
            stagger: 0.02,
            ease: "power4.out",
            delay: 0.3,
          }
        );
      }
    },
    { scope: heroRef, dependencies: [prefersReducedMotion] }
  );

  const handleScrollToWork = () => {
    const workSection = document.getElementById("work");
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block char origin-bottom select-none">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100svh] bg-[#050508] flex items-start md:items-center justify-center overflow-hidden pt-24 pb-16 md:py-0"
    >
      {/* Background Parallax Grid Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800b_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_32px] pointer-events-none opacity-40 z-0"
      />

      {/* Floating Ambient Accent Spheres (Independent Drift) */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-orbit opacity-60 filter blur-xs"
            animate={{ y: [0, -30, 20, -15, 0], x: [0, 20, -15, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-12 w-4 h-4 rounded-full bg-aether opacity-50 filter blur-xs"
            animate={{ y: [0, 25, -35, 15, 0], x: [0, -15, 25, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Background 3D Canvas / Falling Back */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-40 md:opacity-55"
      >
        <div className="w-full h-full max-w-[650px] max-h-[650px] relative pointer-events-auto">
          {!prefersReducedMotion ? <HeroThreeCanvas /> : <HeroFallback />}
        </div>
      </div>

      {/* Foreground Hero Content */}
      <div
        ref={contentRef}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col items-center text-center mt-0 md:mt-12"
      >
        {/* Status Badge */}
        <div className="mb-6 overflow-hidden">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/80 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-zinc-300 backdrop-blur-md uppercase mt-4 md:mt-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            ✦ Available for Freelance · 12+ Projects Shipped
          </motion.div>
        </div>

        {/* Oversized Typography Title */}
        <div ref={titleContainerRef} className="flex flex-col gap-1.5 md:gap-4 select-none">
          <h1 className="text-[clamp(1.9rem,8vw,4.5rem)] sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9] text-white overflow-hidden whitespace-nowrap">
            {splitText("BUILDING REVENUE")}
          </h1>
          <h2 className="text-[clamp(1.9rem,8vw,4.5rem)] sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.9] text-stroke-light overflow-hidden py-1 whitespace-nowrap">
            {splitText("COMMERCE ENGINES")}
          </h2>
          <h3 className="text-[clamp(1.65rem,7vw,4rem)] sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.05em] leading-[0.9] text-zinc-400 overflow-hidden whitespace-nowrap">
            {splitText("FOR GLOBAL BRANDS")}
          </h3>
        </div>

        {/* Short Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 md:mt-8 text-sm md:text-base text-zinc-400 max-w-[20rem] sm:max-w-xl font-medium tracking-wide leading-relaxed px-1"
        >
          Engineering sub-second storefront architectures, scalable booking engines, and performance B2B transaction panels that scale client revenue.
        </motion.p>

        {/* CTA pair */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 md:mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Button
            className="bg-white text-black font-bold text-xs tracking-wider uppercase py-4 px-8 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:bg-zinc-100 hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2 group border-transparent"
            onClick={handleScrollToWork}
          >
            View Selected Work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
          </Button>

          <Button
            className="border-zinc-700 bg-zinc-950/20 text-white hover:border-white hover:bg-zinc-900/60"
            variant="secondary"
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book a Call
          </Button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold select-none">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-zinc-500" />
        </motion.div>
      </div>
    </section>
  );
}
