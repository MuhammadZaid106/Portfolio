"use client";

import React, { useState, useRef } from "react";
import { Heart, ShoppingBag, Check, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductCardDemoProps {
  product: {
    name: string;
    price: string;
    comparePrice?: string;
    description: string;
    variants: string[];
    specs: string[];
  };
  color: string; // Brand color
  accentClass: string;
}

export default function ProductCardDemo({ product, color, accentClass }: ProductCardDemoProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistParticles, setWishlistParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [cartState, setCartState] = useState<"idle" | "loading" | "success">("idle");
  
  // Ref for the product image for calculating coordinates
  const imageRef = useRef<HTMLDivElement>(null);
  const [flyingItem, setFlyingItem] = useState<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
  } | null>(null);

  // Custom wishlist click particle explosion
  const handleWishlistClick = (e: React.MouseEvent) => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      // Spawn 8 flying particles
      const newParticles = Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 2 * Math.PI) / 8;
        const radius = 30 + Math.random() * 20;
        return {
          id: Date.now() + i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        };
      });
      setWishlistParticles(newParticles);
      setTimeout(() => setWishlistParticles([]), 800);
    }
  };

  const handleAddToCart = () => {
    if (cartState !== "idle") return;

    setCartState("loading");

    // Phase 1: Simulation loader
    setTimeout(() => {
      setCartState("success");

      // Phase 2: Launch flying thumbnail
      const imageEl = imageRef.current;
      const cartIconEl = document.getElementById("nav-cart-icon");

      if (imageEl && cartIconEl) {
        const imgBounds = imageEl.getBoundingClientRect();
        const cartBounds = cartIconEl.getBoundingClientRect();

        // Calculate absolute start and end coordinates relative to viewport
        setFlyingItem({
          x: imgBounds.left + imgBounds.width / 2 - 25,
          y: imgBounds.top + imgBounds.height / 2 - 25,
          targetX: cartBounds.left + cartBounds.width / 2 - 25,
          targetY: cartBounds.top + cartBounds.height / 2 - 25,
        });
      } else {
        // Fallback: Dispatch event directly if elements not found
        window.dispatchEvent(new CustomEvent("add-to-cart", { detail: { count: 1 } }));
        setTimeout(() => setCartState("idle"), 1500);
      }
    }, 1200);
  };

  const handleFlyingComplete = () => {
    setFlyingItem(null);
    // Dispatch event to trigger Nav shake & update badge count
    window.dispatchEvent(new CustomEvent("add-to-cart", { detail: { count: 1 } }));
    
    // Reset add-to-cart button back to idle after delay
    setTimeout(() => {
      setCartState("idle");
    }, 1200);
  };

  // Mock CSS-based product image matching the color theme
  const getProductDesign = () => {
    switch (product.variants.indexOf(selectedVariant)) {
      case 1:
        return "from-zinc-900 to-zinc-750 border-zinc-700";
      case 2:
        return "from-slate-100 to-zinc-200 border-white/20 text-zinc-900";
      default:
        return `from-zinc-950 to-neutral-900 border-zinc-800`;
    }
  };

  return (
    <div className="border border-dark-border bg-dark-surface/50 rounded-3xl p-6 md:p-8 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto relative select-none">
      
      {/* Visual Product Box (Left Columns) */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div
          ref={imageRef}
          className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-gradient-to-br from-zinc-950 to-neutral-900 flex items-center justify-center p-8 group"
          data-cursor="view"
        >
          {/* Heart Wishlist overlay */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleWishlistClick}
              className="relative w-10 h-10 rounded-full bg-black/40 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white transition-colors focus:outline-none"
            >
              <motion.div
                animate={isWishlisted ? { scale: [1, 1.4, 0.9, 1.1, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Heart
                  className={`w-4.5 h-4.5 transition-colors ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-400"
                  }`}
                />
              </motion.div>

              {/* Heart burst particles */}
              {wishlistParticles.map((particle) => (
                <motion.span
                  key={particle.id}
                  className="absolute w-1.5 h-1.5 rounded-full bg-red-500"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    opacity: 0,
                    scale: 0.2,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ))}
            </button>
          </div>

          {/* Interactive Zoom-on-Hover Image Overlay */}
          <motion.div
            className={`w-40 h-40 rounded-3xl bg-gradient-to-br ${getProductDesign()} border shadow-2xl flex flex-col justify-between p-4`}
            whileHover={{ scale: 1.08, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[7px] font-bold uppercase tracking-widest opacity-60">
                Exclusive Drop
              </span>
              <span className="text-[8px] font-mono opacity-80">v1.02</span>
            </div>
            {/* Mesh pattern logo */}
            <div className="w-10 h-10 rounded-full border border-current/10 flex items-center justify-center self-center opacity-70">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-center block">
              {selectedVariant}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Product Information Details (Right Columns) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Active Mini-Demo
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-black text-white">{product.price}</span>
            {product.comparePrice && (
              <span className="text-sm text-zinc-500 line-through font-semibold">
                {product.comparePrice}
              </span>
            )}
          </div>
        </div>

        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
          {product.description}
        </p>

        {/* Variant selector */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
            Select Edition
          </span>
          <div className="flex flex-wrap gap-2.5">
            {product.variants.map((v) => {
              const isSelected = selectedVariant === v;
              return (
                <button
                  key={v}
                  onClick={() => setSelectedVariant(v)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-lg border tracking-wider transition-colors duration-300 ${
                    isSelected
                      ? "text-black border-transparent"
                      : "text-zinc-400 border-zinc-800 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="activeVariantBackground"
                      className="absolute inset-0 bg-white rounded-lg z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{v}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add-to-cart Micro-Interaction button */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={cartState !== "idle"}
            className={`w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 overflow-hidden border transition-all duration-300 ${
              cartState === "success"
                ? "bg-emerald-500 text-white border-transparent"
                : cartState === "loading"
                ? "bg-zinc-900 text-zinc-500 border-zinc-800"
                : `bg-white text-black border-transparent hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]`
            }`}
            data-cursor="link"
          >
            <AnimatePresence mode="wait">
              {cartState === "idle" && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="flex items-center gap-2"
                >
                  Add to Cart
                </motion.span>
              )}
              {cartState === "loading" && (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="flex items-center gap-2"
                >
                  <RotateCw className="w-4 h-4 animate-spin text-zinc-400" />
                  Encrypting Checkout...
                </motion.span>
              )}
              {cartState === "success" && (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Successfully Added
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Floating flying thumbnail animation */}
      <AnimatePresence>
        {flyingItem && (
          <motion.div
            className={`fixed w-12 h-12 rounded-xl bg-gradient-to-br ${getProductDesign()} border border-zinc-800 z-50 shadow-2xl flex items-center justify-center text-[8px] font-bold uppercase tracking-wider`}
            initial={{
              left: flyingItem.x,
              top: flyingItem.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              left: [flyingItem.x, (flyingItem.x + flyingItem.targetX) / 2, flyingItem.targetX],
              top: [flyingItem.y, Math.min(flyingItem.y, flyingItem.targetY) - 120, flyingItem.targetY],
              scale: [1, 0.7, 0.15],
              opacity: [1, 0.9, 0],
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1],
            }}
            onAnimationComplete={handleFlyingComplete}
          >
            <ShoppingBag className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
