"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "./Container";
import { ArrowRight, ShoppingCart, Calendar, BarChart3, Box, CheckCircle2 } from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<any>;
  details: string[];
  conversionMetric: string;
}

export default function Services() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Storefronts & Product Pages",
      shortDesc: "High-performance ecommerce interfaces engineered to increase add-to-cart rates.",
      icon: ShoppingCart,
      conversionMetric: "+22% AOV uplift average",
      details: [
        "Lightweight next/image and thumbnail lazy loading.",
        "Smooth AnimatePresence variant selections.",
        "Satisfaction-driven cart fly animations to limit abandonment.",
        "Seamless Stripe Payment Element integrations."
      ]
    },
    {
      id: 2,
      title: "Booking & Reservation Flows",
      shortDesc: "Multi-vehicle booking modules and calendar reservation matrices with real-time surge pricing.",
      icon: Calendar,
      conversionMetric: "Sub-15s booking funnel",
      details: [
        "Dynamic ride matching vectors mapping vehicles on-the-fly.",
        "Interactive time-block grid arrays avoiding calendar overlap.",
        "Surge-fee calculation slides linked to traffic APIs.",
        "Tactile vehicle selector swipers with spring physics."
      ]
    },
    {
      id: 3,
      title: "Admin & Analytics Dashboards",
      shortDesc: "Sub-second B2B analytics decks designed for complex DTC DTC brand aggregates.",
      icon: BarChart3,
      conversionMetric: "Rendering 1M+ points under 1s",
      details: [
        "Memoized query selectors minimizing browser layout shifts.",
        "Glassmorphic analytics widgets representing global shop metrics.",
        "Instant split-testing toggle controllers to sync configurations.",
        "Tabular transaction auditing tables with CSV exporting."
      ]
    },
    {
      id: 4,
      title: "Design Systems & Code Libraries",
      shortDesc: "Clean, responsive component libraries optimized for speed and scale.",
      icon: Box,
      conversionMetric: "95+ mobile Lighthouse score",
      details: [
        "Tailwind CSS v4 variable structure for instant styling themes.",
        "Strict TypeScript type structures for booking and checkout operations.",
        "Custom GSAP + Framer Motion reusable timeline frameworks.",
        "Fully accessible, keyboard-navigable dialogs and menus."
      ]
    }
  ];

  const handleCardClick = (id: number) => {
    setExpandedCard((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="services"
      className="w-full bg-[#FFFFFF] py-24 md:py-32 relative border-t border-[#E5E5E7]"
    >
      <Container className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-[#E5E5E7] pb-10">
          <span className="text-[10px] text-orbit font-extrabold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orbit rounded-full" />
            Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] tracking-tight uppercase">
            WHAT I BUILD FOR YOU
          </h2>
        </div>

        {/* Expanded Accordion Service Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {services.map((service) => {
            const Icon = service.icon;
            const isOpen = expandedCard === service.id;

            return (
              <motion.div
                layout
                key={service.id}
                onClick={() => handleCardClick(service.id)}
                className={`border border-[#E5E5E7] rounded-3xl p-6 cursor-pointer select-none transition-all duration-350 ${
                  isOpen
                    ? "bg-white border-[#111111]/10 shadow-lg"
                    : "bg-[#F7F7F8] hover:bg-white hover:border-[#111111]/10 shadow-sm"
                }`}
                data-cursor="link"
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              >
                {/* Top Row: Icon & Metric */}
                <motion.div layout="position" className="flex justify-between items-start">
                  <div className="p-3.5 rounded-2xl bg-white border border-[#E5E5E7] text-[#111111]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider animate-pulse">
                    {service.conversionMetric}
                  </span>
                </motion.div>

                {/* Title & Short Description */}
                <motion.div layout="position" className="mt-6 flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#111111] uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#5B5B60] leading-relaxed font-medium">
                    {service.shortDesc}
                  </p>
                </motion.div>

                {/* Animated expandable content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden mt-6 pt-6 border-t border-[#E5E5E7]"
                    >
                      <span className="text-[9px] text-[#5B5B60] font-extrabold uppercase tracking-widest block mb-4">
                        Service Deliverables
                      </span>
                      <ul className="flex flex-col gap-3">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5B5B60] font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-orbit shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Card footer indicator */}
                <motion.div layout="position" className="mt-6 flex justify-between items-center text-[10px] text-[#5B5B60] font-bold uppercase tracking-widest">
                  <span>{isOpen ? "Click to Close" : "Click to Expand"}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4.5 h-4.5 text-[#5B5B60]" />
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
