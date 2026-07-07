export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  color: string;
  textColor: string;
  bgClass: string;
  borderClass: string;
  accentClass: string;
  stack: string[];
  url: string;
  role: string;
  year: string;
  overview: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  features: { title: string; desc: string; mediaUrl?: string }[];
  demoProduct?: {
    name: string;
    price: string;
    comparePrice?: string;
    description: string;
    images: string[];
    variants: string[];
    specs: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "orbit-commerce",
    name: "Orbit Commerce",
    tagline: "Premium ecommerce OS for growth teams",
    category: "B2B Dashboard",
    color: "#2F6FED",
    textColor: "text-blue-400",
    bgClass: "bg-blue-950/20",
    borderClass: "border-blue-500/30",
    accentClass: "from-blue-600 to-indigo-600",
    stack: ["Next.js", "Tailwind", "Framer Motion", "Recharts", "Stripe API"],
    url: "https://eccomerce-store-orbit.vercel.app/",
    role: "Lead Frontend Engineer",
    year: "2025",
    overview: "Orbit Commerce is a comprehensive B2B dashboard and operating system designed for modern direct-to-consumer brand aggregates. It enables teams to monitor global stores, run instant marketing splits, and sync complex inventory from a unified glassmorphic administration pane.",
    challenge: "Managing multi-store analytics widgets in real-time caused excessive layout shifts and poor dashboard responsiveness on tablet screens. The customer needed a sub-second load time dashboard representing millions of transaction points.",
    solution: "Built a fully memoized Next.js dynamic routing matrix coupled with visual data charts optimized using light SVG overlays. Implemented instant client-side query caching to ensure dashboard widgets load immediately when jumping between stores.",
    metrics: [
      { label: "Dashboard Load Speed", value: "-45%" },
      { label: "Conversion Lift", value: "+18.4%" },
      { label: "Client Retargeting", value: "3.2x" }
    ],
    features: [
      {
        title: "Dynamic Revenue Widget",
        desc: "Interactive glassmorphic charts showing sales peaks, conversion paths, and average order value across multiple regions."
      },
      {
        title: "Instant Storefront Splitting",
        desc: "Deploy frontend designs or checkout themes instantly across specific domains to test user conversion."
      },
      {
        title: "Granular Analytics Deck",
        desc: "Full tabular audits of customer sessions, transaction statuses, and automatic refund flows with custom filter parameters."
      }
    ],
    demoProduct: {
      name: "Orbit Pro Terminal Controller",
      price: "$299.00",
      comparePrice: "$399.00",
      description: "Tactile console to control, monitor, and deploy headless e-commerce store instances with physical visual status alerts.",
      images: [
        "/images/orbit-1.jpg",
        "/images/orbit-2.jpg"
      ],
      variants: ["Navy Core", "Midnight Chrome", "Polar White"],
      specs: ["OLED Display Status Bar", "Bluetooth 5.2 Low Latency", "12-hour Rechargeable Battery"]
    }
  },
  {
    slug: "rydex",
    name: "Rydex",
    tagline: "Book any vehicle — bikes to trucks — on one platform",
    category: "Booking & Mobility",
    color: "#FFFFFF",
    textColor: "text-zinc-300",
    bgClass: "bg-zinc-900/40",
    borderClass: "border-zinc-700/50",
    accentClass: "from-zinc-200 to-zinc-400",
    stack: ["Next.js", "GSAP", "Mapbox-style UI", "Framer Motion", "Lenis"],
    url: "https://book-ride-safely.vercel.app/",
    role: "Lead Booking Interface Architect",
    year: "2024",
    overview: "Rydex is a cinematic, highly-responsive vehicle booking application. It provides users a seamless, real-time map interface to book anything from electric scooters to cargo shipping trucks, optimizing passenger scheduling, pricing, and routes.",
    challenge: "Synchronizing multi-stage interactive booking components (vehicle type selection, driver search, dynamic price calculation) on mobile browsers without interrupting the interactive vector maps background.",
    solution: "Engineered a state-synchronization layer using lightweight React context, and combined it with GSAP timeline animators for UI overlays. Pinned screens slide out of viewport gracefully, keeping the map visible and responsive.",
    metrics: [
      { label: "Booking Time-To-Complete", value: "14s" },
      { label: "User Interaction Rating", value: "4.95" },
      { label: "Mobile Bounce Rate", value: "-22%" }
    ],
    features: [
      {
        title: "Cinematic Hero Map",
        desc: "Live interactive map displaying real-time vehicle vectors flowing dynamically in response to scroll positions."
      },
      {
        title: "Multi-Vehicle Selector",
        desc: "A tactile vehicle selector letting users swipe and compare sizes, ranges, and pricing tiers dynamically."
      },
      {
        title: "Dynamic Price Engine",
        desc: "Visual pricing charts displaying current surge rates and estimated arrival times calculated on-the-fly."
      }
    ],
    demoProduct: {
      name: "Rydex Smart Tracker Mount",
      price: "$79.00",
      description: "Heavy-duty smart mount for bikes, cars, or trucks. Displays speed, route directions, and updates battery telemetry directly.",
      images: [
        "/images/rydex-1.jpg",
        "/images/rydex-2.jpg"
      ],
      variants: ["Matte Black", "Brushed Titanium"],
      specs: ["IP68 Weatherproof Protection", "Integrated NFC Authentication", "Dual Magnetic Lock Hook"]
    }
  },
  {
    slug: "aether-market",
    name: "Aether Market",
    tagline: "Bold streetwear marketplace, 2,400+ brands",
    category: "E-commerce",
    color: "#E4231D",
    textColor: "text-red-500",
    bgClass: "bg-red-950/20",
    borderClass: "border-red-500/30",
    accentClass: "from-red-600 to-orange-600",
    stack: ["Next.js", "GSAP SplitText", "Framer Motion", "Tailwind CSS", "WebGL"],
    url: "https://aethermart.vercel.app/",
    role: "Creative Frontend Director",
    year: "2025",
    overview: "Aether Market is a high-energy streetwear and limited sneaker marketplace. Built for rapid product drops, it utilizes kinetic typographic grids, custom audio cues, and heavy image optimization to handle thousands of concurrent bids.",
    challenge: "Drop events create massive bursts of concurrent users, where standard page lists would cause heavy reflows and break visual rhythm due to mismatched asset loading times.",
    solution: "Used NextJS static pre-generation with progressive client hydration. Styled with CSS custom clip-paths and Framer Motion shared-layout morphing to transition from the drop grid directly into product details without reflows.",
    metrics: [
      { label: "Checkout Completion", value: "98.7%" },
      { label: "Active Bid Refresh", value: "120ms" },
      { label: "Page Speed Score", value: "98/100" }
    ],
    features: [
      {
        title: "Kinetic Typography Hero",
        desc: "Oversized, interactive headlines that scroll-stretch and overlap with drop photos."
      },
      {
        title: "Streetwear Bidding",
        desc: "Fluid bidding selectors enabling customers to set bid heights and see real-time price trends immediately."
      },
      {
        title: "Dynamic Drop Calendar",
        desc: "A stylized schedule grid where users can pre-authorize bids for upcoming high-demand product drops."
      }
    ],
    demoProduct: {
      name: "Aether 'SHOCK' Cyber Vest",
      price: "$185.00",
      comparePrice: "$240.00",
      description: "Limited drop tactical streetwear vest featuring custom tech buckles, water-resistant fabrics, and storage pockets.",
      images: [
        "/images/aether-1.jpg",
        "/images/aether-2.jpg"
      ],
      variants: ["Cyber Black", "Toxic Lime", "Ravage Red"],
      specs: ["High-durability Ballistic Nylon", "Waterproof YKK Zippers", "Adjustable Side Straps"]
    }
  }
];
