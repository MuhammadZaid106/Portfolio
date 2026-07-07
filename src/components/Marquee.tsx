"use client";

import React from "react";

export default function Marquee() {
  const row1 = [
    "Next.js 14",
    "GSAP",
    "Framer Motion",
    "Tailwind CSS",
    "Stripe Commerce",
    "React Three Fiber",
    "TypeScript",
    "Shopify Headless",
    "Dynamic Booking",
    "Vercel Edge",
  ];

  const row2 = [
    "Sub-Second Page Speed",
    "High Conversion Checkout",
    "Tactile Booking Flows",
    "Data-Rich Dashboards",
    "Revenue-Generating UI",
    "SEO Optimized",
    "Micro-Interactions",
    "Fluid Page Transitions",
    "Web3 Payments",
    "B2B Operations OS",
  ];

  // Double elements to ensure seamless loop
  const doubleRow1 = [...row1, ...row1, ...row1, ...row1];
  const doubleRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="w-full bg-[#F7F7F8] py-12 border-y border-[#E5E5E7] overflow-hidden select-none">
      <div className="flex flex-col gap-6 w-full marquee-pause">
        {/* Row 1: Tech Stack (Scrolling Left) */}
        <div className="w-full overflow-hidden relative">
          <div className="animate-marquee-left flex gap-12 whitespace-nowrap items-center py-2">
            {doubleRow1.map((tech, index) => (
              <div key={`r1-${index}`} className="flex items-center gap-3">
                <span className="text-[#5B5B60] font-bold text-xs uppercase tracking-widest">✦</span>
                <span className="text-[#111111] font-extrabold text-sm md:text-base uppercase tracking-widest hover:text-orbit transition-colors duration-350">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Competencies (Scrolling Right) */}
        <div className="w-full overflow-hidden relative">
          <div className="animate-marquee-right flex gap-12 whitespace-nowrap items-center py-2">
            {doubleRow2.map((item, index) => (
              <div key={`r2-${index}`} className="flex items-center gap-3">
                <span className="text-aether font-bold text-xs uppercase tracking-widest">✦</span>
                <span className="text-[#5B5B60] font-bold text-sm md:text-base uppercase tracking-wider hover:text-[#111111] transition-colors duration-350">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
