import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AG Dev | Commerce Engineer & B2B Dashboard Architect",
  description: "Specialist frontend developer building revenue-generating commerce storefronts, sub-second B2B analytics dashboards, and tactile vehicle booking engines using Next.js, GSAP, and Framer Motion.",
  keywords: [
    "Commerce Frontend Developer",
    "B2B Dashboard Developer",
    "Next.js Developer",
    "GSAP ScrollTrigger Developer",
    "Framer Motion Micro-interactions",
    "Booking Systems Engineer",
    "Tailwind CSS v4 Developer",
  ],
  authors: [{ name: "AG Dev" }],
  openGraph: {
    title: "AG Dev | Commerce Engineer & B2B Dashboard Architect",
    description: "Immersive portfolio showcasing revenue-focused interfaces: B2B dashboards, fleet booking engines, and streetlight streetwear storefronts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased custom-cursor-active"
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {/* Animated filmic grain/noise overlay */}
        <div className="noise-overlay" />
        
        {/* Custom cursor following pointer */}
        <CustomCursor />
        
        <SmoothScrollProvider>
          {/* Persistent sticky header navigation */}
          <Nav />
          
          {/* Main page content area */}
          <main className="flex-1 w-full">{children}</main>
          
          {/* Persistent page footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
