"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Custom UI Mockups for each project to feel premium and interactive
  const renderCardMockup = () => {
    switch (project.slug) {
      case "orbit-commerce":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-blue-950/60 p-6 flex flex-col justify-between overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:10px_10px]" />
            {/* Top row: Dashboard stats */}
            <div className="flex justify-between items-center relative z-10">
              <span className="text-[9px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                System Live
              </span>
              <span className="text-xs text-zinc-400 font-semibold font-mono">
                Store ID: #889-ORB
              </span>
            </div>
            {/* Center: Graph & Revenue Widget */}
            <div className="relative z-10 flex flex-col gap-2 my-auto">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Gross Income</span>
              <span className="text-3xl font-black text-white font-mono tracking-tight">$145,280<span className="text-xs text-emerald-400 font-semibold ml-1.5">+18%</span></span>
              {/* Mini Sparkline Chart */}
              <div className="w-full h-12 flex items-end gap-1 mt-2">
                {[40, 55, 45, 60, 75, 50, 70, 90, 85, 95].map((val, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-blue-500/70 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ delay: 0.1 * i, duration: 0.8 }}
                  />
                ))}
              </div>
            </div>
            {/* Bottom Row: Transaction Log */}
            <div className="flex justify-between items-center text-[10px] text-zinc-500 relative z-10 border-t border-zinc-800/60 pt-2 font-mono">
              <span>Checkout Success Rate</span>
              <span className="text-emerald-400 font-bold">99.8%</span>
            </div>
          </div>
        );
      case "rydex":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-neutral-900/60 p-6 flex flex-col justify-between overflow-hidden">
            {/* Cinematic Map Backdrop (Vector Grid) */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]" />
            {/* Map Roads lines in CSS */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-zinc-800/40 rotate-12" />
            <div className="absolute top-0 left-1/3 w-[2px] h-full bg-zinc-800/40 -rotate-45" />
            {/* Top row: Veh Tier */}
            <div className="flex justify-between items-center relative z-10">
              <span className="text-[9px] bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Booking Map v4.2
              </span>
              <span className="text-xs text-zinc-400 font-semibold font-mono">
                5 Active Vehicles
              </span>
            </div>
            {/* Center: Selected Ride Ticket */}
            <div className="relative z-10 flex flex-col gap-2 my-auto max-w-[200px] border border-zinc-800 bg-black/80 p-4 rounded-xl backdrop-blur-md">
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Cargo Truck Tier</span>
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-black text-white">$185.00</span>
                <span className="text-[9px] text-zinc-400 font-mono">Est: 14 mins</span>
              </div>
              {/* Route Indicator */}
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="flex-1 h-[1px] border-t border-dashed border-zinc-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-orbit" />
              </div>
            </div>
            {/* Bottom Row */}
            <div className="flex justify-between items-center text-[10px] text-zinc-500 relative z-10 border-t border-zinc-800/60 pt-2 font-mono">
              <span>Driver Dispatching Queue</span>
              <span className="text-white font-bold">Active</span>
            </div>
          </div>
        );
      case "aether-market":
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-red-950/60 p-6 flex flex-col justify-between overflow-hidden">
            {/* Kinetic Streetwear Hero Backdrop */}
            <div className="absolute top-6 left-6 text-red-500/20 text-5xl font-black uppercase tracking-tighter leading-none select-none">
              SHOCKING<br />BEAUTY
            </div>
            {/* Top row */}
            <div className="flex justify-between items-center relative z-10">
              <span className="text-[9px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Drop: Cyber Vest
              </span>
              <span className="text-xs text-zinc-400 font-semibold font-mono">
                Bid Pool: $98k
              </span>
            </div>
            {/* Center: Live Bidding Module */}
            <div className="relative z-10 flex flex-col gap-1.5 my-auto max-w-[170px] border border-red-950/50 bg-black/90 p-4 rounded-xl self-end">
              <span className="text-[9px] text-red-500 uppercase tracking-widest font-black">DROP EXCLUSIVE</span>
              <span className="text-xl font-extrabold text-white font-mono">$185.00</span>
              <div className="h-1 bg-red-950 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="h-full bg-red-500"
                  animate={{ width: ["15%", "85%", "45%", "85%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
              </div>
              <span className="text-[8px] text-zinc-500 uppercase tracking-wider text-right font-semibold">9.5k Bids Placed</span>
            </div>
            {/* Bottom Row */}
            <div className="flex justify-between items-center text-[10px] text-zinc-500 relative z-10 border-t border-zinc-800/60 pt-2 font-mono">
              <span>Checkout Drop Timer</span>
              <span className="text-red-500 font-bold">02:14:45</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="view"
      >
        {/* Core Card Image/Mockup Box */}
        <motion.div
          className="relative aspect-video rounded-3xl overflow-hidden border border-[#E5E5E7] bg-[#F7F7F8]"
          animate={{
            borderColor: isHovered ? project.color : "#E5E5E7",
            boxShadow: isHovered
              ? "0 20px 40px -15px rgba(0, 0, 0, 0.12)"
              : "0 4px 12px -5px rgba(0, 0, 0, 0.05)",
          }}
          transition={{ duration: 0.35 }}
        >
          {/* Card Mockup content */}
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderCardMockup()}
          </motion.div>

          {/* Dark Overlay Gradient on bottom third */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-85 z-10 pointer-events-none" />

          {/* Project basic meta on image bottom */}
          <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end pointer-events-none">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
                {project.category}
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                {project.name}
              </h3>
            </div>
            
            {/* Sliding Arrow icon on hover */}
            <motion.div
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center pointer-events-auto"
              animate={{
                x: isHovered ? 0 : 15,
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text descriptions below the card */}
        <div className="mt-4 px-2 flex flex-col gap-2">
          <p className="text-[#5B5B60] text-sm font-medium leading-relaxed max-w-sm">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[9px] bg-[#F7F7F8] text-[#5B5B60] border border-[#E5E5E7] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
