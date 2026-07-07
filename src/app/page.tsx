import React from "react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import ProjectGrid from "@/components/ProjectGrid";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* 3D and Pinned Title Hero Section */}
      <Hero />
      
      {/* Infinite scrolling technology strip */}
      <Marquee />
      
      {/* Bio and scroll-revealing pull-quote */}
      <About />
      
      {/* Project Showcase Cards and filter options */}
      <ProjectGrid />
      
      {/* 3D tilt stacks and horizontal scroll marquee */}
      <Skills />
      
      {/* Expandable service descriptions */}
      <Services />
      
      {/* Blur transition testimonial sliders */}
      <Testimonials />
      
      {/* Animated input labels contact form */}
      <Contact />
    </div>
  );
}
