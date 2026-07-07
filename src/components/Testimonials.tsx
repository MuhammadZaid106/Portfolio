"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "./Container";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "AG Dev transformed our slow headless store into a sub-second sales machine. Our checkout completion rate jumped by 18% in the first week. Every micro-interaction is butter.",
      author: "Marcus Vance",
      role: "VP of Product",
      company: "Orbit Commerce Ltd",
      metric: "+18.4% Checkout Conv"
    },
    {
      id: 2,
      quote: "Our previous fleet booking app struggled with real-time vector map rendering on mobile. AG Dev rewrote the frontend stack using custom GSAP timeline chains. Flawless execution.",
      author: "Sarah Jenkins",
      role: "Head of Mobility",
      company: "Rydex Dispatch",
      metric: "Sub-15s Booking Speed"
    },
    {
      id: 3,
      quote: "The streetwear sneaker drop was a major traffic test. The bid tables and progress grids handled 10,000 requests per minute with absolutely zero reflows. Incredible performance.",
      author: "Keith 'Aether' Chen",
      role: "Creative Director",
      company: "Aether Market streetwear",
      metric: "99/100 Lighthouse Performance"
    }
  ];

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section className="w-full bg-[#FFFFFF] py-24 md:py-32 relative overflow-hidden border-t border-[#E5E5E7] select-none">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orbit/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="max-w-4xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Star header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex gap-1 text-orbit">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-[10px] text-[#5B5B60] uppercase tracking-widest font-extrabold">
            Client Testimonials
          </span>
        </div>

        {/* Carousel slide area */}
        <motion.div
          className="relative min-h-[220px] md:min-h-[180px] flex items-center justify-center cursor-grab active:cursor-grabbing text-center px-4"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          data-cursor="drag"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col gap-6 max-w-3xl"
            >
              {/* Blur-to-sharp quote text */}
              <p className="text-lg md:text-2xl text-[#111111] font-semibold leading-relaxed tracking-tight">
                "{testimonials[current].quote}"
              </p>

              {/* Author metadata */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-2">
                <span className="text-sm font-extrabold text-[#111111] uppercase tracking-wider">
                  {testimonials[current].author}
                </span>
                <span className="hidden md:inline text-[#E5E5E7]">|</span>
                <span className="text-xs text-[#5B5B60] font-semibold uppercase tracking-widest">
                  {testimonials[current].role}, {testimonials[current].company}
                </span>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {testimonials[current].metric}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Controls and Dot indicators */}
        <div className="flex items-center justify-between border-t border-[#E5E5E7] pt-6 px-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-[#E5E5E7] bg-white text-[#5B5B60] hover:text-[#111111] hover:border-[#111111] flex items-center justify-center transition-colors shadow-sm"
            data-cursor="link"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === idx ? "w-8 bg-[#111111]" : "w-2 bg-[#E5E5E7]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-[#E5E5E7] bg-white text-[#5B5B60] hover:text-[#111111] hover:border-[#111111] flex items-center justify-center transition-colors shadow-sm"
            data-cursor="link"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </Container>
    </section>
  );
}
