"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, ArrowRight } from "lucide-react";
import Button from "./Button";
import Container from "./Container";

interface FormFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
}

function FormField({ label, type, id, value, onChange }: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  return (
    <div className="relative w-full flex flex-col gap-1 mt-6">
      {/* Floating Label */}
      <motion.label
        htmlFor={id}
        animate={{
          y: isFloating ? -24 : 0,
          scale: isFloating ? 0.82 : 1,
          color: isFloating ? "#2F6FED" : "#5B5B60",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-0 top-3.5 text-xs md:text-sm font-semibold uppercase tracking-wider origin-left pointer-events-none select-none"
      >
        {label}
      </motion.label>

      {/* Input / Textarea */}
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={3}
          className="w-full bg-transparent border-b border-[#E5E5E7] pt-3 pb-2 text-sm text-[#111111] font-medium outline-none resize-none min-h-[80px]"
          required
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-b border-[#E5E5E7] pt-3 pb-2 text-sm text-[#111111] font-medium outline-none"
          required
        />
      )}

      {/* Animated underline draw-in */}
      <svg className="absolute bottom-0 left-0 w-full h-[2px] pointer-events-none overflow-visible">
        <motion.path
          d="M 0 1 L 800 1"
          stroke="#2F6FED"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isFocused ? 1 : 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#FFFFFF] py-24 md:py-32 relative overflow-hidden border-t border-[#E5E5E7]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-orbit/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-aether/5 blur-[130px] rounded-full pointer-events-none" />

      <Container className="flex flex-col gap-16 md:gap-24 relative z-10">
        
        {/* Kinetic Title banner */}
        <div className="flex flex-col gap-2 md:gap-4 select-none border-b border-[#E5E5E7] pb-12">
          <span className="text-[10px] text-orbit font-extrabold uppercase tracking-widest flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-orbit rounded-full" />
            Launch Project
          </span>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-[#111111]">
            LET'S BUILD YOUR
          </h2>
          <h3 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-stroke py-1">
            NEXT STOREFRONT
          </h3>
        </div>

        {/* Two columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h4 className="text-xl font-extrabold text-[#111111] uppercase tracking-tight">
              CONNECT FOR COMMISSION
            </h4>
            <p className="text-xs md:text-sm text-[#5B5B60] leading-relaxed font-semibold">
              Have an upcoming product drop, booking system launch, or B2B analytics dashboard overhaul? Let's discuss performance goals, styling libraries, and conversion metrics.
            </p>
            
            <div className="flex flex-col gap-3 mt-4">
              <span className="text-[10px] text-[#5B5B60] font-extrabold uppercase tracking-widest">
                Direct Channels
              </span>
              <a
                href="mailto:hello@example.com"
                className="text-sm font-bold text-[#111111] hover:text-orbit transition-colors flex items-center gap-2 group w-max"
              >
                hello@example.com
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
              </a>
              <span className="text-xs text-[#5B5B60] font-medium">
                Availability: Q3/Q4 2026 Commission Contracts
              </span>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 w-full border border-[#E5E5E7] bg-[#F7F7F8] p-8 md:p-10 rounded-3xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <FormField
                label="Your Name"
                type="text"
                id="contact-name"
                value={name}
                onChange={setName}
              />
              
              <FormField
                label="Email Address"
                type="email"
                id="contact-email"
                value={email}
                onChange={setEmail}
              />
              
              <FormField
                label="Project Narrative / Scope"
                type="textarea"
                id="contact-message"
                value={message}
                onChange={setMessage}
              />

              <div className="mt-4">
                <Button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 border-transparent ${
                    submitted
                      ? "bg-emerald-500 text-white"
                      : "bg-[#111111] text-white hover:bg-black hover:shadow-[0_10px_25px_rgba(17,17,17,0.12)]"
                  }`}
                >
                  {submitted ? (
                    "Transmission Dispatched"
                  ) : (
                    <>
                      Transmit Inquiry
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

        </div>

      </Container>
    </section>
  );
}
