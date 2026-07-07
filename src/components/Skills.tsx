"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "./Container";
import {
  Code,
  Layers,
  ShoppingBag,
  Zap,
  Cpu,
  Monitor,
  Database,
  Shield,
  Layout,
  MousePointer,
  Compass,
  Shuffle
} from "lucide-react";

interface SkillItem {
  name: string;
  desc: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const skills: SkillItem[] = [
    { name: "Next.js 14/15", desc: "App Router & SSR storefronts", icon: Layers, color: "text-[#111111]" },
    { name: "GSAP / ScrollTrigger", desc: "Pinned immersive layouts", icon: Compass, color: "text-emerald-600" },
    { name: "Framer Motion", desc: "Tactile micro-animations", icon: Zap, color: "text-purple-600" },
    { name: "Tailwind CSS v4", desc: "Utility-first CSS tokens", icon: Layout, color: "text-cyan-600" },
    { name: "Stripe API", desc: "Engineered secure checkout funnels", icon: ShoppingBag, color: "text-indigo-600" },
    { name: "Three.js / R3F", desc: "Signature 3D web interactive hooks", icon: Shuffle, color: "text-blue-600" },
    { name: "TypeScript", desc: "Strict B2B dashboard type systems", icon: Shield, color: "text-sky-600" },
    { name: "REST / GraphQL", desc: "Fast data orchestration layers", icon: Cpu, color: "text-pink-600" },
    { name: "PostgreSQL / SQL", desc: "Data schema optimization for analytics", icon: Database, color: "text-orange-600" },
  ];

  const categories = [
    "E-COMMERCE STOREFRONTS",
    "B2B DASHBOARD SYSTEMS",
    "MULTI-VEHICLE BOOKING INTERFACES",
    "REVENUE OPTIMIZATION ARCHITECTURES",
    "HEADLESS COMMERCE ENGINE PLATFORMS"
  ];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Scroll-driven horizontal marquee shift
      gsap.fromTo(
        marqueeRef.current,
        { xPercent: 15 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="w-full bg-[#FFFFFF] py-24 md:py-32 relative overflow-hidden border-t border-[#E5E5E7]"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orbit/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="flex flex-col gap-16 md:gap-24">
        
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-[#E5E5E7] pb-10">
          <span className="text-[10px] text-orbit font-extrabold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orbit rounded-full" />
            Integrations
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight uppercase">
            TECHNOLOGY STACK
          </h2>
        </div>

        {/* 3D Rotating Tilt Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ perspective: 1200 }}
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                className="group border border-[#E5E5E7] bg-[#F7F7F8] p-6 rounded-2xl hover:bg-white hover:border-[#111111]/10 transition-all duration-300 flex items-start gap-5 cursor-default select-none"
                whileHover={{
                  rotateY: 12,
                  rotateX: -8,
                  z: 30,
                  scale: 1.03,
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.08)",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <div className={`p-3 rounded-xl bg-white border border-[#E5E5E7] ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-[#5B5B60] leading-relaxed font-medium">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Horizontal Scroll Banner (Mixed Direction 2026 Trend) */}
        <div className="w-full overflow-hidden border-y border-[#E5E5E7] py-8 mt-10 relative">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap gap-16 items-center text-[#111111]"
          >
            {categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-6 shrink-0">
                <span className="text-stroke-dark text-3xl md:text-5xl font-black uppercase tracking-tighter">
                  {cat}
                </span>
                <span className="text-orbit text-2xl">✦</span>
              </div>
            ))}
            {/* Repeat categories once to fill width on drift */}
            {categories.map((cat, i) => (
              <div key={`dup-${i}`} className="flex items-center gap-6 shrink-0">
                <span className="text-stroke-dark text-3xl md:text-5xl font-black uppercase tracking-tighter">
                  {cat}
                </span>
                <span className="text-orbit text-2xl">✦</span>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
