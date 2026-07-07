"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project, projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Container from "./Container";
import { ArrowRight, ChevronLeft, ChevronRight, Activity, Percent, Clock, CreditCard } from "lucide-react";

export default function ProjectGrid() {
  const [filter, setFilter] = useState("All");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);

  const categories = ["All", "E-commerce", "Booking & Mobility", "B2B Dashboard"];

  const filteredProjects = projects.filter((project) => {
    if (filter === "All") return true;
    return project.category === filter;
  });

  // Calculate carousel bounds
  useEffect(() => {
    if (!carouselRef.current) return;
    const updateBounds = () => {
      const scrollWidth = carouselRef.current?.scrollWidth || 0;
      const clientWidth = carouselRef.current?.clientWidth || 0;
      setMaxScroll(scrollWidth - clientWidth);
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    
    // Check scroll initial
    const handleScroll = () => {
      if (carouselRef.current) {
        setCurrentScroll(carouselRef.current.scrollLeft);
      }
    };
    
    const el = carouselRef.current;
    el?.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateBounds);
      el?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = 340;
    const target =
      direction === "left"
        ? carouselRef.current.scrollLeft - amount
        : carouselRef.current.scrollLeft + amount;
        
    carouselRef.current.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  const highlightReels = [
    {
      title: "Checkout Flow OS",
      metric: "0.4s",
      metricLabel: "Payment Time",
      icon: CreditCard,
      desc: "One-click checkout overlay built with React hooks, handling automatic address parsing and card validation.",
      color: "border-blue-200 text-blue-600 bg-blue-50",
    },
    {
      title: "Surge Price Calculator",
      metric: "+32%",
      metricLabel: "Revenue Uplift",
      icon: Percent,
      desc: "GSAP-driven slider displaying dynamic booking surcharge vectors based on simulated traffic density.",
      color: "border-emerald-200 text-emerald-600 bg-emerald-50",
    },
    {
      title: "Real-time Auditing Grid",
      metric: "120ms",
      metricLabel: "Bids Sync Latency",
      icon: Activity,
      desc: "Streetwear marketplace bids table that leverages virtualized arrays to render updates at 60fps.",
      color: "border-red-200 text-red-600 bg-red-50",
    },
    {
      title: "Core Cache Pipeline",
      metric: "99/100",
      metricLabel: "Lighthouse Score",
      icon: Clock,
      desc: "Serverless image loading configuration using next/image with pre-warmed Edge CDNs.",
      color: "border-purple-200 text-purple-600 bg-purple-50",
    },
  ];

  return (
    <section id="work" className="w-full bg-[#FFFFFF] py-24 md:py-32 relative border-t border-[#E5E5E7]">
      <Container className="flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E5E7] pb-10">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] text-orbit font-extrabold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orbit rounded-full" />
              Selected Work
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight uppercase">
              COMMERCE CASE STUDIES
            </h2>
          </div>
          
          {/* Custom Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-[#F7F7F8] border border-[#E5E5E7] p-1.5 rounded-full select-none max-w-max">
            {categories.map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-full uppercase tracking-wider transition-colors duration-300 focus:outline-none ${
                    isActive ? "text-[#111111]" : "text-[#5B5B60] hover:text-[#111111]"
                  }`}
                  data-cursor="link"
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-white rounded-full z-0 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E5E5E7]"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </div>

        {/* Draggable Highlight Reel Section */}
        <div className="mt-20 border-t border-[#E5E5E7] pt-16 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] text-[#5B5B60] font-extrabold uppercase tracking-widest">
                Component Lab
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-[#111111] tracking-tight uppercase">
                COMMERCE MICRO-INTERFACES
              </h3>
            </div>
            
            {/* Scroll Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel("left")}
                disabled={currentScroll <= 5}
                className="w-9 h-9 rounded-full border border-[#E5E5E7] bg-white text-[#5B5B60] hover:text-[#111111] hover:border-[#111111] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-sm"
                data-cursor="link"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel("right")}
                disabled={currentScroll >= maxScroll - 5}
                className="w-9 h-9 rounded-full border border-[#E5E5E7] bg-white text-[#5B5B60] hover:text-[#111111] hover:border-[#111111] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors shadow-sm"
                data-cursor="link"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Draggable / Scroll Carousel */}
          <div
            ref={carouselRef}
            className="w-full flex gap-6 overflow-x-auto no-scrollbar py-4"
            data-cursor="drag"
          >
            {highlightReels.map((reel, index) => {
              const Icon = reel.icon;
              return (
                <div
                  key={index}
                  className="w-[280px] md:w-[320px] shrink-0 border border-[#E5E5E7] bg-[#F7F7F8] hover:bg-white hover:border-[#111111]/10 hover:shadow-md p-6 rounded-2xl transition-all duration-300 flex flex-col gap-4 flex-1 select-none"
                >
                  <div className="flex justify-between items-start">
                    <div className={`p-2.5 rounded-xl border ${reel.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-end text-right font-mono">
                      <span className="text-xl font-black text-[#111111]">{reel.metric}</span>
                      <span className="text-[8px] text-[#5B5B60] uppercase tracking-widest font-bold mt-0.5">{reel.metricLabel}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                      {reel.title}
                    </h4>
                    <p className="text-xs text-[#5B5B60] leading-relaxed font-medium">
                      {reel.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </Container>
    </section>
  );
}
