import React from "react";
import ProjectGrid from "@/components/ProjectGrid";

export const metadata = {
  title: "Case Studies | AG Dev",
  description: "Browse commercial and B2B case studies: Orbit Commerce OS, Rydex transport booking, and Aether Market streetwear bidding.",
};

export default function WorkPage() {
  return (
    <div className="pt-24 min-h-screen bg-[#FFFFFF]">
      {/* Centered filterable portfolio grids */}
      <ProjectGrid />
    </div>
  );
}
