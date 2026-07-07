"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { useCountUp } from "@/lib/useCountUp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "./Container";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function StatItem({ value, suffix, label }: StatItemProps) {
  const { count, elementRef } = useCountUp(value, 1.8);
  
  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="border border-[#E5E5E7] bg-[#F7F7F8] p-6 rounded-2xl flex flex-col justify-center transition-all duration-300 hover:bg-white hover:shadow-md hover:border-[#111111]/10"
    >
      <span className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight flex items-baseline gap-1">
        {count}
        <span className="text-orbit text-2xl font-bold">{suffix}</span>
      </span>
      <span className="text-xs text-[#5B5B60] uppercase tracking-widest font-semibold mt-2">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textTriggerRef = useRef<HTMLDivElement>(null);

  const quote = "I engineer revenue-focused interfaces. Every pixel is budgeted for conversion, every transition is optimized for speed, and every interaction is designed to close the transaction.";
  const words = quote.split(" ");

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      // Scroll-triggered word reveal
      const wordSpans = textTriggerRef.current?.querySelectorAll(".about-word");
      if (wordSpans && wordSpans.length > 0) {
        gsap.fromTo(
          wordSpans,
          {
            opacity: 0.15,
            filter: "blur(3px)",
            y: 5,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: 0.05,
            scrollTrigger: {
              trigger: textTriggerRef.current,
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full bg-[#FFFFFF] py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-orbit/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-aether/3 blur-[150px] rounded-full pointer-events-none" />

      <Container className="flex flex-col gap-16 md:gap-24">
        {/* Two-Column Intro & Stat Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Short Bio */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[10px] text-orbit font-extrabold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-orbit rounded-full" />
              Who I Am
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight">
              COMMERCE ENGINEER & PRODUCT INTEGRATOR
            </h3>
            <p className="text-sm md:text-base text-[#5B5B60] leading-relaxed font-medium">
              I specialize in bridging the gap between brand identity and raw revenue. By replacing standard, heavy React templates with custom, lightweight Next.js pipelines, I build commerce interfaces that feel instantaneous to the customer.
            </p>
            <p className="text-sm text-[#5B5B60] leading-relaxed">
              Based at the intersection of B2B analytics and high-end streetwear marketplaces, my code focuses on core performance, tactile micro-interactions, and flawless transitions.
            </p>
          </div>

          {/* Right Column: Stat Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6 w-full">
            <StatItem value={12} suffix="+" label="Revenue Storefronts" />
            <StatItem value={24} suffix="%" label="Average Conversion Lift" />
            <StatItem value={45} suffix="%" label="Load Time Reduction" />
            <StatItem value={60} suffix="M+" label="Transaction Volume ($)" />
          </div>
        </div>

        {/* Word Reveal Pull-Quote */}
        <div
          ref={textTriggerRef}
          className="border-t border-[#E5E5E7] pt-16 md:pt-24 flex flex-col gap-6"
        >
          <span className="text-[10px] text-[#5B5B60] font-extrabold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#5B5B60] rounded-full" />
            Core Philosophy
          </span>
          <p className="text-2xl md:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight leading-snug max-w-5xl flex flex-wrap gap-x-3 gap-y-1.5 md:gap-y-3">
            {words.map((word, index) => (
              <span
                key={index}
                className="inline-block about-word origin-left"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </Container>
    </section>
  );
}
