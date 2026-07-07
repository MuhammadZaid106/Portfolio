"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight, Activity, Award, Briefcase, Calendar, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Project, projects } from "@/lib/projects";
import ProductCardDemo from "./ProductCardDemo";
import Button from "./Button";
import { useCountUp } from "@/lib/useCountUp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface CaseStudyTemplateProps {
  project: Project;
}

function ResultStatItem({ value, label }: { value: string; label: string }) {
  // Parse numeric value from string (e.g. "+18.4%" -> 18, "-45%" -> 45)
  const numericVal = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const isPercent = value.includes("%");
  const isMult = value.includes("x");
  const isNeg = value.includes("-");
  const isPlus = value.includes("+");

  const { count, elementRef } = useCountUp(numericVal, 2.0);

  const formattedVal = `${isNeg ? "-" : ""}${isPlus ? "+" : ""}${count}${isPercent ? "%" : ""}${isMult ? "x" : ""}`;

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="border border-[#E5E5E7] bg-[#F7F7F8] hover:bg-white hover:shadow-md p-8 rounded-2xl flex flex-col justify-center text-center transition-all duration-300"
    >
      <span className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight font-mono">
        {formattedVal}
      </span>
      <span className="text-[10px] text-[#5B5B60] uppercase tracking-widest font-extrabold mt-3">
        {label}
      </span>
    </div>
  );
}

export default function CaseStudyTemplate({ project }: CaseStudyTemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  // Find next project
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Scroll reveal alternating rows
      const rows = featuresRef.current?.querySelectorAll(".feature-row");
      rows?.forEach((row) => {
        const img = row.querySelector(".feature-image-box");
        const text = row.querySelector(".feature-text-box");
        const isLeft = row.classList.contains("row-left");

        gsap.fromTo(
          img,
          { xPercent: isLeft ? -25 : 25, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "top 45%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          text,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  // Render hero banner mockup depending on project theme
  const renderHeroMockup = () => {
    switch (project.slug) {
      case "orbit-commerce":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-slate-950 flex flex-col justify-center items-center p-8 overflow-hidden">
            {/* Grid layout decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f607_1px,transparent_1px),linear-gradient(to_bottom,#3b82f607_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-2xl border border-blue-500/20 bg-black/90 p-8 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col gap-6 relative"
            >
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
                <span className="text-[10px] text-blue-400 font-extrabold tracking-widest uppercase">
                  Revenue Dashboard OS
                </span>
                <span className="text-xs text-zinc-500 font-mono">Live Session Data</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/50">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Daily Active</span>
                  <span className="text-xl font-bold text-white font-mono mt-1 block">45,820</span>
                </div>
                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/50">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Net Revenue</span>
                  <span className="text-xl font-bold text-white font-mono mt-1 block">$1.2M</span>
                </div>
                <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/50">
                  <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Load Metrics</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">0.32s</span>
                </div>
              </div>
              <div className="w-full h-24 bg-zinc-900/40 rounded-xl border border-zinc-800/30 flex items-end gap-1.5 p-4 overflow-hidden">
                {[30, 45, 60, 40, 55, 75, 90, 85, 100, 95, 110, 125, 115, 130].map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-blue-500/80 rounded-t-sm"
                    style={{ height: `${(val / 130) * 100}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        );
      case "rydex":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-zinc-950 flex flex-col justify-center items-center p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-xl border border-zinc-800 bg-black/90 p-6 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col gap-6"
            >
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
                <span className="text-[10px] text-zinc-300 font-extrabold tracking-widest uppercase">
                  Cinematic Ride Selector
                </span>
                <span className="text-xs text-zinc-500 font-mono">Surge Factor: x1.2</span>
              </div>
              <div className="flex flex-col gap-3">
                <div className="border border-zinc-800 bg-zinc-900/40 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold text-white">V1</div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Electric Bike</h4>
                      <p className="text-[10px] text-zinc-500 font-semibold">Range: 45 miles</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-white font-mono">$12.00</span>
                </div>
                <div className="border border-zinc-700 bg-zinc-800/20 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-750 flex items-center justify-center text-xs font-bold text-white">V2</div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cargo Container Truck</h4>
                      <p className="text-[10px] text-zinc-500 font-semibold">Volume capacity: 2.5 Tons</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-white font-mono">$240.00</span>
                </div>
              </div>
            </motion.div>
          </div>
        );
      case "aether-market":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-red-950 to-black flex flex-col justify-center items-center p-8 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 text-red-500/10 text-8xl font-black uppercase tracking-tighter leading-none pointer-events-none">
              SHOCKING<br />BEAUTY
            </div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-md border border-red-500/20 bg-black/90 p-8 rounded-3xl backdrop-blur-md shadow-2xl flex flex-col gap-6"
            >
              <div className="flex justify-between items-center border-b border-zinc-800/80 pb-3">
                <span className="text-[10px] text-red-500 font-extrabold tracking-widest uppercase">
                  Bidding Marketplace Deck
                </span>
                <span className="text-xs text-zinc-500 font-mono">Bids Refreshing</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {[
                  { user: "User_88a", bid: "$195.00", time: "2s ago" },
                  { user: "User_02b", bid: "$190.00", time: "12s ago" },
                  { user: "User_49c", bid: "$185.00", time: "44s ago" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-mono border-b border-zinc-800/40 pb-2">
                    <span className="text-zinc-400 font-semibold">{item.user}</span>
                    <span className="text-red-500 font-bold">{item.bid}</span>
                    <span className="text-zinc-600">{item.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-[#FFFFFF] relative overflow-hidden">
      
      {/* Case Study Hero */}
      <section className="relative w-full h-[70vh] md:h-[80vh] flex items-end overflow-hidden border-b border-[#E5E5E7]">
        
        {/* Background Visual Box */}
        <div className="absolute inset-0 z-0">
          {renderHeroMockup()}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Hero Meta Overlay (Foreground) */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pb-16">
          <div className="flex flex-col gap-6 max-w-4xl">
            {/* Tagline */}
            <span className="text-[10px] bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full font-bold uppercase tracking-widest w-max select-none">
              {project.category}
            </span>
            
            <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tight leading-none">
              {project.name}
            </h1>
            
            {/* Meta Row grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-zinc-800/80 pt-6 mt-4 select-none">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                  My Role
                </span>
                <span className="text-xs font-bold text-zinc-300">{project.role}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  Timeline
                </span>
                <span className="text-xs font-bold text-zinc-300">{project.year}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-zinc-500" />
                  Tech Stack
                </span>
                <span className="text-xs font-bold text-zinc-300 flex flex-wrap gap-1">
                  {project.stack.slice(0, 3).join(" · ")}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 justify-end">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-orbit transition-colors group"
                  data-cursor="link"
                >
                  Live Deployment
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Block */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-b border-[#E5E5E7] select-none">
        
        {/* Left Bio columns */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-[10px] text-orbit font-extrabold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orbit rounded-full" />
            Project Narrative
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight leading-snug">
            {project.tagline}
          </h2>
          <p className="text-sm md:text-base text-[#5B5B60] leading-relaxed font-semibold">
            {project.overview}
          </p>
        </div>

        {/* Right Challenges columns */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-3">
            <span className="text-[10px] text-red-500 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              The Bottleneck
            </span>
            <p className="text-xs md:text-sm text-[#5B5B60] leading-relaxed font-medium">
              {project.challenge}
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <span className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              The Resolution
            </span>
            <p className="text-xs md:text-sm text-[#5B5B60] leading-relaxed font-medium">
              {project.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Feature Breakdown Rows (Scroll triggered) */}
      <section ref={featuresRef} className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-24 border-b border-[#E5E5E7] select-none">
        
        <div className="flex flex-col gap-4 border-b border-[#E5E5E7] pb-6 mb-4">
          <span className="text-[10px] text-[#5B5B60] font-extrabold uppercase tracking-widest">
            Architecture Audit
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight">
            CORE INTEGRATIONS
          </h2>
        </div>

        {project.features.map((feature, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`feature-row grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                isLeft ? "row-left" : "row-right"
              }`}
            >
              {/* Feature Mockup Box */}
              <div
                className={`lg:col-span-6 feature-image-box ${
                  isLeft ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#E5E5E7] bg-[#F7F7F8] p-6 flex flex-col justify-center items-center shadow-sm">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:16px_16px]" />
                  {/* Decorative circle representing loading state */}
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#E5E5E7] animate-spin flex items-center justify-center opacity-65 text-[#5B5B60]">
                    {idx + 1}
                  </div>
                  <span className="text-[9px] text-[#5B5B60] font-mono mt-4">Module_Asset_Loaded_{idx + 1}</span>
                </div>
              </div>

              {/* Feature Text */}
              <div
                className={`lg:col-span-6 feature-text-box flex flex-col gap-4 ${
                  isLeft ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <span className="text-[9px] text-orbit font-extrabold tracking-widest uppercase">
                  Module 0{idx + 1}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-[#111111] uppercase tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-[#5B5B60] leading-relaxed font-semibold">
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Live Mini-Demo Module */}
      {project.demoProduct && (
        <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#E5E5E7]">
          <div className="flex flex-col gap-4 items-center text-center mb-12 select-none">
            <span className="text-[10px] text-orbit font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-orbit rounded-full animate-ping" />
              Live Interactive Prototype
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[#111111] uppercase tracking-tight">
              COMMERCE INTERFACE LAB
            </h2>
            <p className="text-xs md:text-sm text-[#5B5B60] max-w-md mt-1 font-medium">
              Try out this mini PDP module. Add variants, toggle the wishlist particle pop, and test the checkout fly event.
            </p>
          </div>

          <ProductCardDemo
            product={project.demoProduct}
            color={project.color}
            accentClass={project.accentClass}
          />
        </section>
      )}

      {/* Impact Results metrics */}
      <section className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-b border-[#E5E5E7] select-none">
        <div className="flex flex-col gap-4 border-b border-[#E5E5E7] pb-6 mb-12">
          <span className="text-[10px] text-[#5B5B60] font-extrabold uppercase tracking-widest">
            Audit Outcomes
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight">
            PERFORMANCE METRICS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {project.metrics.map((metric, idx) => (
            <ResultStatItem key={idx} value={metric.value} label={metric.label} />
          ))}
        </div>
      </section>

      {/* Next Project Footer */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-[#F7F7F8] flex flex-col items-center justify-center text-center border-t border-[#E5E5E7] select-none">
        
        {/* Next project backdrop preview */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <span className="text-[#111111] text-[10vw] font-black uppercase tracking-tighter select-none">
            {nextProject.name}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-xl">
          <span className="text-[9px] text-[#5B5B60] font-bold uppercase tracking-widest">
            Up Next
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] uppercase tracking-tight leading-none">
            {nextProject.name}
          </h2>
          <p className="text-xs text-[#5B5B60] leading-relaxed font-semibold max-w-sm">
            {nextProject.tagline}
          </p>

          <Link href={`/work/${nextProject.slug}`} className="mt-4 block" data-cursor="link">
            <Button className="bg-[#111111] text-white font-extrabold text-xs tracking-wider uppercase py-4 px-8 rounded-full flex items-center gap-2 group hover:shadow-[0_10px_25px_rgba(17,17,17,0.12)] transition-all border-transparent">
              Load Case Study
              <ChevronRight className="w-5.5 h-5.5 transition-transform group-hover:translate-x-0.5 duration-200" />
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
