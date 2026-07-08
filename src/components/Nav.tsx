"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Button from "./Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartAnimate, setCartAnimate] = useState(false);
  
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  // Monitor scroll direction and position
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Register scrolltrigger direction detection
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        const scrollY = self.scroll();
        if (scrollY > 50) {
          setIsShrunk(true);
        } else {
          setIsShrunk(false);
        }
        
        // Auto-hide navigation on scrolling down, show on scroll up
        if (scrollY > 150) {
          if (self.direction === 1) {
            gsap.to(navRef.current, { y: "-100%", duration: 0.3, ease: "power2.inOut" });
          } else {
            gsap.to(navRef.current, { y: "0%", duration: 0.3, ease: "power2.out" });
          }
        } else {
          gsap.to(navRef.current, { y: "0%", duration: 0.3, ease: "power2.out" });
        }
        
        lastScrollY.current = scrollY;
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Listen to custom cart events
  useEffect(() => {
    const handleAddToCart = (e: Event) => {
      const customEvent = e as CustomEvent<{ count: number }>;
      setCartCount((prev) => prev + (customEvent.detail?.count || 1));
      setCartAnimate(true);
    };

    window.addEventListener("add-to-cart", handleAddToCart);
    return () => {
      window.removeEventListener("add-to-cart", handleAddToCart);
    };
  }, []);

  // Reset cart animation after it finishes
  useEffect(() => {
    if (cartAnimate) {
      const timer = setTimeout(() => setCartAnimate(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartAnimate]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Work", href: pathname === "/" ? "#work" : "/#work" },
    { name: "Services", href: pathname === "/" ? "#services" : "/#services" },
    { name: "Skills", href: pathname === "/" ? "#skills" : "/#skills" },
    { name: "Contact", href: pathname === "/" ? "#contact" : "/#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const headerClass = isShrunk
    ? "py-3 bg-white/85 backdrop-blur-lg border-b border-[#E5E5E7] shadow-sm"
    : "py-6 bg-transparent border-b border-transparent";

  const logoTextClass = isShrunk
    ? "text-[#111111] group-hover:text-orbit"
    : "text-white group-hover:text-orbit";

  const linkTextClass = isShrunk
    ? "text-[#5B5B60] hover:text-[#111111]"
    : "text-zinc-400 hover:text-white";

  const cartIconClass = isShrunk
    ? "text-[#5B5B60] hover:text-[#111111]"
    : "text-zinc-300 hover:text-white";

  const mobileToggleClass = isShrunk
    ? "text-[#5B5B60] hover:text-[#111111]"
    : "text-zinc-300 hover:text-white";

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${headerClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-3 items-center">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group z-50 justify-self-start"
            data-cursor="link"
          >
            <span className={`text-xl font-bold uppercase tracking-widest transition-colors duration-300 ${logoTextClass}`}>
              Z.N
            </span>
            <span className={`text-[10px] border px-2 py-0.5 rounded-full tracking-wider uppercase font-semibold transition-colors duration-300 ${
              isShrunk ? "bg-[#F7F7F8] text-[#5B5B60] border-[#E5E5E7]" : "bg-zinc-800 text-zinc-400 border-zinc-700"
            }`}>
              Dev
            </span>
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap ${linkTextClass}`}
                data-cursor="link"
                onClick={() => handleLinkClick(link.href)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: Cart + CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 md:gap-4 justify-self-end">
            {/* Cart Widget */}
            <div
              className={`relative p-2 transition-colors duration-200 ${cartIconClass}`}
              data-cursor="link"
            >
              <motion.div
                animate={
                  cartAnimate
                    ? {
                        scale: [1, 1.3, 0.85, 1.15, 0.95, 1],
                        rotate: [0, -15, 15, -10, 10, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
              >
                <ShoppingBag className="w-5 h-5" id="nav-cart-icon" />
              </motion.div>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className={`absolute -top-1 -right-1 bg-orbit text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border ${
                      isShrunk ? "border-white" : "border-[#050508]"
                    }`}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Let's Build CTA (Desktop) */}
            <div className="hidden md:block">
              <Button
                className={`text-xs tracking-wider uppercase py-2.5 px-5 rounded-full transition-all border-transparent ${
                  isShrunk
                    ? "bg-[#111111] text-white hover:bg-black"
                    : "bg-white text-black hover:bg-zinc-100"
                }`}
                onClick={() => handleLinkClick("#contact")}
              >
                Let's Build Something
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 transition-colors focus:outline-none z-50 ${mobileToggleClass}`}
              data-cursor="link"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-30 flex flex-col justify-between p-8 pt-28 md:hidden text-[#111111]"
          >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-40" />

            <div className="flex flex-col gap-6 relative z-10">
              <span className="text-[10px] text-[#5B5B60] font-bold uppercase tracking-widest border-b border-[#E5E5E7] pb-2">
                Navigation
              </span>
              <motion.div
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                  },
                }}
                className="flex flex-col gap-4"
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={{
                      closed: { x: -20, opacity: 0 },
                      open: { x: 0, opacity: 1 },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className="text-4xl font-bold tracking-tight text-[#111111] hover:text-orbit transition-colors flex items-center gap-2 group"
                    >
                      {link.name}
                      <ArrowRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="relative z-10 flex flex-col gap-4 border-t border-[#E5E5E7] pt-6">
              <div className="flex justify-between items-center text-xs text-[#5B5B60] uppercase tracking-widest">
                <span>Connect</span>
                <span>© 2026 AG Dev</span>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://eccomerce-store-orbit.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#5B5B60] hover:text-[#111111]"
                >
                  Orbit
                </a>
                <a
                  href="https://book-ride-safely.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#5B5B60] hover:text-[#111111]"
                >
                  Rydex
                </a>
                <a
                  href="https://aethermart.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#5B5B60] hover:text-[#111111]"
                >
                  Aether
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
