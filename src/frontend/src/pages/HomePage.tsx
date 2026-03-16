import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  Calculator,
  Clock,
  Construction,
  FileCheck,
  Globe,
  MapPin,
  Package,
  RefreshCw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { WORLD_COUNTRIES } from "../lib/countries";

type AppRoute =
  | "/"
  | "/freight-services"
  | "/shipping-form"
  | "/track-order"
  | "/services/warehousing"
  | "/services/corporate"
  | "/services/express-parcel"
  | "/services/ecommerce"
  | "/services/heavy-equipment"
  | "/services/customs"
  | "/services/door-to-door"
  | "/services/special-request";

const SERVICES: {
  icon: React.ElementType;
  label: string;
  href: AppRoute;
  desc: string;
  color: string;
  bg: string;
  glow: string;
}[] = [
  {
    icon: Truck,
    label: "Freight Services",
    href: "/freight-services",
    desc: "Local & international freight solutions",
    color: "oklch(0.5 0.28 274)",
    bg: "oklch(0.5 0.28 274 / 0.12)",
    glow: "oklch(0.5 0.28 274 / 0.25)",
  },
  {
    icon: Package,
    label: "Express Parcel Delivery",
    href: "/services/express-parcel",
    desc: "Fast and reliable parcel dispatch",
    color: "oklch(0.75 0.18 195)",
    bg: "oklch(0.75 0.18 195 / 0.12)",
    glow: "oklch(0.75 0.18 195 / 0.25)",
  },
  {
    icon: Warehouse,
    label: "Warehousing & Storage",
    href: "/services/warehousing",
    desc: "Secure, scalable storage facilities",
    color: "oklch(0.72 0.19 55)",
    bg: "oklch(0.72 0.19 55 / 0.12)",
    glow: "oklch(0.72 0.19 55 / 0.25)",
  },
  {
    icon: Globe,
    label: "International Cargo",
    href: "/freight-services",
    desc: "Worldwide cargo movement",
    color: "oklch(0.65 0.22 340)",
    bg: "oklch(0.65 0.22 340 / 0.12)",
    glow: "oklch(0.65 0.22 340 / 0.25)",
  },
  {
    icon: ShoppingCart,
    label: "E-commerce Fulfillment",
    href: "/services/ecommerce",
    desc: "End-to-end order fulfillment",
    color: "oklch(0.82 0.11 75)",
    bg: "oklch(0.82 0.11 75 / 0.12)",
    glow: "oklch(0.82 0.11 75 / 0.25)",
  },
  {
    icon: Building2,
    label: "Corporate Logistics",
    href: "/services/corporate",
    desc: "Tailored enterprise solutions",
    color: "oklch(0.5 0.28 274)",
    bg: "oklch(0.5 0.28 274 / 0.12)",
    glow: "oklch(0.5 0.28 274 / 0.25)",
  },
  {
    icon: Construction,
    label: "Heavy Equipment Transport",
    href: "/services/heavy-equipment",
    desc: "Safe heavy-load transportation",
    color: "oklch(0.75 0.18 195)",
    bg: "oklch(0.75 0.18 195 / 0.12)",
    glow: "oklch(0.75 0.18 195 / 0.25)",
  },
  {
    icon: FileCheck,
    label: "Customs Clearance",
    href: "/services/customs",
    desc: "Hassle-free customs handling",
    color: "oklch(0.72 0.19 55)",
    bg: "oklch(0.72 0.19 55 / 0.12)",
    glow: "oklch(0.72 0.19 55 / 0.25)",
  },
  {
    icon: MapPin,
    label: "Door-to-Door Delivery",
    href: "/services/door-to-door",
    desc: "Direct delivery to your doorstep",
    color: "oklch(0.65 0.22 340)",
    bg: "oklch(0.65 0.22 340 / 0.12)",
    glow: "oklch(0.65 0.22 340 / 0.25)",
  },
  {
    icon: Star,
    label: "Special Request Logistics",
    href: "/services/special-request",
    desc: "Custom logistics for unique needs",
    color: "oklch(0.82 0.11 75)",
    bg: "oklch(0.82 0.11 75 / 0.12)",
    glow: "oklch(0.82 0.11 75 / 0.25)",
  },
];

const STATS = [
  {
    label: "Countries Served",
    value: "42+",
    color: "oklch(0.5 0.28 274)",
    bg: "linear-gradient(135deg, oklch(0.18 0.07 260) 0%, oklch(0.22 0.1 270) 100%)",
    border: "oklch(0.5 0.28 274 / 0.4)",
  },
  {
    label: "Deliveries Completed",
    value: "150K+",
    color: "oklch(0.82 0.11 75)",
    bg: "linear-gradient(135deg, oklch(0.17 0.06 60) 0%, oklch(0.21 0.09 65) 100%)",
    border: "oklch(0.82 0.11 75 / 0.4)",
  },
  {
    label: "Corporate Partners",
    value: "800+",
    color: "oklch(0.75 0.18 195)",
    bg: "linear-gradient(135deg, oklch(0.17 0.07 195) 0%, oklch(0.21 0.1 200) 100%)",
    border: "oklch(0.75 0.18 195 / 0.4)",
  },
  {
    label: "On-Time Rate",
    value: "99.2%",
    color: "oklch(0.65 0.22 340)",
    bg: "linear-gradient(135deg, oklch(0.18 0.08 340) 0%, oklch(0.22 0.1 345) 100%)",
    border: "oklch(0.65 0.22 340 / 0.4)",
  },
];

const AUTOMATIONS = [
  {
    icon: Package,
    title: "Auto Order Numbering",
    desc: "Every order gets a unique TRUPTAR-LOG-XXXXXX ID instantly on submission",
    color: "oklch(0.5 0.28 274)",
  },
  {
    icon: RefreshCw,
    title: "Real-Time Status Updates",
    desc: "Status changes instantly notify customers via in-app alerts",
    color: "oklch(0.75 0.18 195)",
  },
  {
    icon: BarChart3,
    title: "Admin-User Live Sync",
    desc: "All orders appear in admin dashboard the moment they're placed",
    color: "oklch(0.72 0.19 55)",
  },
  {
    icon: Zap,
    title: "Payment Auto-Log",
    desc: "Payment references and proofs flagged for admin review instantly",
    color: "oklch(0.65 0.22 340)",
  },
  {
    icon: MapPin,
    title: "Tracking Timeline",
    desc: "5-stage tracking updates with automatic timestamp logging",
    color: "oklch(0.82 0.11 75)",
  },
  {
    icon: Bell,
    title: "Notification Center",
    desc: "In-app notification log for every shipment event, zero delay",
    color: "oklch(0.5 0.28 274)",
  },
  {
    icon: Globe,
    title: "Service Request Routing",
    desc: "Service requests auto-routed to admin Service Requests panel",
    color: "oklch(0.75 0.18 195)",
  },
  {
    icon: Shield,
    title: "Support Ticket System",
    desc: "Support tickets auto-logged with order reference linkage",
    color: "oklch(0.72 0.19 55)",
  },
];

function PriceCalculator() {
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [shipType, setShipType] = React.useState("standard");
  const [result, setResult] = React.useState<string | null>(null);

  function calculate() {
    const w = Number.parseFloat(weight) || 0;
    const rates: Record<string, { base: number; perKg: number }> = {
      standard: { base: 5, perKg: 2 },
      express: { base: 12, perKg: 4 },
      priority: { base: 25, perKg: 7 },
    };
    const rate = rates[shipType] || rates.standard;
    let cost = rate.base + rate.perKg * w;
    if (origin && destination && origin !== destination) cost *= 2.5;
    setResult(`$${cost.toFixed(2)} USD`);
  }

  return (
    <div
      className="rounded-2xl p-8 border"
      style={{
        backgroundColor: "oklch(0.19 0.065 247)",
        borderColor: "oklch(0.75 0.18 195 / 0.3)",
        boxShadow: "0 0 40px oklch(0.75 0.18 195 / 0.06)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div className="space-y-2">
          <label
            htmlFor="calc-origin"
            className="text-sm font-semibold"
            style={{ color: "oklch(0.75 0.18 195)" }}
          >
            Origin Country
          </label>
          <select
            id="calc-origin"
            data-ocid="calculator.origin_select"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full rounded-lg px-3 h-10 text-sm border outline-none focus:ring-2"
            style={{
              backgroundColor: "oklch(0.14 0.05 250)",
              borderColor: "oklch(0.30 0.09 258)",
              color: "oklch(0.90 0.02 248)",
            }}
          >
            <option value="">Select origin country</option>
            {WORLD_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="calc-destination"
            className="text-sm font-semibold"
            style={{ color: "oklch(0.75 0.18 195)" }}
          >
            Destination Country
          </label>
          <select
            id="calc-destination"
            data-ocid="calculator.destination_select"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded-lg px-3 h-10 text-sm border outline-none focus:ring-2"
            style={{
              backgroundColor: "oklch(0.14 0.05 250)",
              borderColor: "oklch(0.30 0.09 258)",
              color: "oklch(0.90 0.02 248)",
            }}
          >
            <option value="">Select destination country</option>
            {WORLD_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="calc-weight"
            className="text-sm font-semibold"
            style={{ color: "oklch(0.75 0.18 195)" }}
          >
            Weight (kg)
          </label>
          <input
            id="calc-weight"
            data-ocid="calculator.weight_input"
            type="number"
            min="0.1"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 5"
            className="w-full rounded-lg px-3 h-10 text-sm border outline-none focus:ring-2"
            style={{
              backgroundColor: "oklch(0.14 0.05 250)",
              borderColor: "oklch(0.30 0.09 258)",
              color: "oklch(0.90 0.02 248)",
            }}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="calc-type"
            className="text-sm font-semibold"
            style={{ color: "oklch(0.75 0.18 195)" }}
          >
            Shipment Type
          </label>
          <select
            id="calc-type"
            data-ocid="calculator.type_select"
            value={shipType}
            onChange={(e) => setShipType(e.target.value)}
            className="w-full rounded-lg px-3 h-10 text-sm border outline-none focus:ring-2"
            style={{
              backgroundColor: "oklch(0.14 0.05 250)",
              borderColor: "oklch(0.30 0.09 258)",
              color: "oklch(0.90 0.02 248)",
            }}
          >
            <option value="standard">Standard</option>
            <option value="express">Express</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      <button
        data-ocid="calculator.primary_button"
        type="button"
        onClick={calculate}
        className="w-full h-12 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.50 0.28 274), oklch(0.75 0.18 195))",
          color: "white",
        }}
      >
        Calculate Estimate
      </button>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-xl p-5 text-center border"
          style={{
            backgroundColor: "oklch(0.82 0.11 75 / 0.08)",
            borderColor: "oklch(0.82 0.11 75 / 0.4)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-1"
            style={{ color: "oklch(0.82 0.11 75 / 0.7)" }}
          >
            Estimated Cost
          </p>
          <p
            className="text-3xl font-display font-extrabold"
            style={{ color: "oklch(0.82 0.11 75)" }}
          >
            {result}
          </p>
          <p className="text-xs mt-2" style={{ color: "oklch(0.60 0.05 248)" }}>
            This is an estimate. Final cost may vary based on actual weight,
            dimensions, and route.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Live Activity Ticker */}
      <div
        className="overflow-hidden py-2.5 border-b"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.5 0.28 274 / 0.15) 0%, oklch(0.75 0.18 195 / 0.1) 50%, oklch(0.82 0.11 75 / 0.1) 100%)",
          borderColor: "oklch(0.5 0.28 274 / 0.3)",
          marginTop: "64px",
        }}
      >
        <div className="flex items-center gap-2 whitespace-nowrap animate-ticker">
          {[
            "🚚 TRUPTAR-LOG-928372 shipped to Lagos, Nigeria",
            "✅ Payment confirmed for TRUPTAR-LOG-445521",
            "📦 TRUPTAR-LOG-771234 Out for Delivery in Accra",
            "🌍 TRUPTAR-LOG-663901 cleared customs — In Transit to London",
            "🚀 TRUPTAR-LOG-112847 Express delivery dispatched from Nairobi",
            "🎉 TRUPTAR-LOG-559230 Successfully Delivered in Dubai",
          ].map((msg) => (
            <span
              key={msg}
              className="text-xs font-semibold px-6"
              style={{ color: "oklch(0.82 0.11 75)" }}
            >
              {msg}
              <span className="ml-6 opacity-30">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative pt-12 pb-24 px-4 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.5 0.28 274 / 0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, oklch(0.75 0.18 195 / 0.12) 0%, transparent 55%), radial-gradient(ellipse at 60% 80%, oklch(0.82 0.11 75 / 0.08) 0%, transparent 50%), linear-gradient(160deg, oklch(0.12 0.05 248) 0%, oklch(0.16 0.07 260) 60%, oklch(0.13 0.05 250) 100%)",
        }}
      >
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl animate-orb-float"
            style={{
              background: "oklch(0.5 0.28 274 / 0.15)",
              animationDelay: "0s",
            }}
          />
          <div
            className="absolute top-10 right-20 w-80 h-80 rounded-full blur-3xl animate-orb-float"
            style={{
              background: "oklch(0.75 0.18 195 / 0.1)",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute bottom-10 left-1/3 w-56 h-56 rounded-full blur-3xl animate-orb-float"
            style={{
              background: "oklch(0.82 0.11 75 / 0.08)",
              animationDelay: "4s",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left animate-slide-up">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border"
                style={{
                  backgroundColor: "oklch(0.5 0.28 274 / 0.12)",
                  borderColor: "oklch(0.5 0.28 274 / 0.4)",
                  color: "oklch(0.75 0.18 195)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "oklch(0.75 0.18 195)" }}
                />
                A Division of JUVENTUS SOPS
              </div>

              <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight mb-6">
                <span className="text-foreground">TRUPTAR</span>
                <br />
                <span className="shimmer-text">LOGISTICS</span>
              </h1>

              <p
                className="text-lg sm:text-xl font-semibold mb-4 font-display"
                style={{ color: "oklch(0.82 0.11 75)" }}
              >
                Smart Freight &amp; Delivery Solutions
              </p>
              <p className="max-w-xl text-base text-muted-foreground leading-relaxed mb-8">
                The transportation and freight division of JUVENTUS SOPS —
                simplifying local and international shipping through smart
                logistics technology.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <Link to="/shipping-form">
                  <Button
                    size="lg"
                    data-ocid="hero.primary_button"
                    className="h-13 px-8 font-bold text-base gap-2 transition-all hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.82 0.11 75), oklch(0.72 0.19 55))",
                      color: "oklch(0.12 0.04 248)",
                      boxShadow: "0 4px 20px oklch(0.82 0.11 75 / 0.4)",
                    }}
                  >
                    Ship Now <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/track-order">
                  <Button
                    size="lg"
                    variant="outline"
                    data-ocid="hero.secondary_button"
                    className="h-13 px-8 font-bold text-base transition-all hover:scale-105"
                    style={{
                      borderColor: "oklch(0.75 0.18 195 / 0.6)",
                      color: "oklch(0.75 0.18 195)",
                    }}
                  >
                    Track Order
                  </Button>
                </Link>
                <Link to="/freight-services">
                  <Button
                    size="lg"
                    variant="outline"
                    data-ocid="hero.button"
                    className="h-13 px-8 font-bold text-base transition-all hover:scale-105"
                    style={{
                      borderColor: "oklch(0.5 0.28 274 / 0.6)",
                      color: "oklch(0.5 0.28 274)",
                    }}
                  >
                    Our Services
                  </Button>
                </Link>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  { v: "42+ Countries", c: "oklch(0.75 0.18 195)" },
                  { v: "150K+ Deliveries", c: "oklch(0.82 0.11 75)" },
                  { v: "99.2% On-Time", c: "oklch(0.65 0.22 340)" },
                ].map((p) => (
                  <span
                    key={p.v}
                    className="px-4 py-2 rounded-full text-xs font-bold border"
                    style={{
                      borderColor: p.c,
                      color: p.c,
                      backgroundColor: "transparent",
                    }}
                  >
                    {p.v}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Hero graphic */}
            <div
              className="flex items-center justify-center animate-float"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative w-full max-w-lg">
                <div
                  className="absolute inset-0 rounded-2xl blur-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse, oklch(0.5 0.28 274 / 0.25) 0%, transparent 70%)",
                  }}
                />
                <img
                  src="/assets/generated/hero-truck-illustration.dim_1200x500.png"
                  alt="Truptar Logistics Fleet"
                  className="relative w-full rounded-2xl"
                  style={{
                    filter: "drop-shadow(0 0 30px oklch(0.5 0.28 274 / 0.4))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-12 px-4 border-y"
        style={{ borderColor: "oklch(0.24 0.07 252)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-6 text-center border transition-all hover:scale-105"
                style={{
                  background: s.bg,
                  borderColor: s.border,
                  boxShadow: `0 4px 20px ${s.border}`,
                }}
              >
                <p
                  className="text-3xl font-display font-extrabold mb-1"
                  style={{ color: s.color }}
                >
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest mb-3 text-teal">
              OUR SOLUTIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Core Logistics Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive logistics solutions for every shipping need — local,
              international, and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {SERVICES.map((svc, idx) => (
              <Link
                key={svc.label}
                to={svc.href}
                data-ocid={`services.item.${idx + 1}`}
              >
                <div
                  className="group h-full rounded-xl p-6 border cursor-pointer transition-all duration-300 hover:-translate-y-2"
                  style={{
                    backgroundColor: "oklch(0.19 0.065 247)",
                    borderColor: `${svc.color.replace(")", " / 0.3)")}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      svc.color;
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 8px 30px ${svc.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      svc.color.replace(")", " / 0.3)");
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "none";
                  }}
                >
                  <div
                    className="inline-flex p-3 rounded-lg mb-4"
                    style={{ backgroundColor: svc.bg }}
                  >
                    <svc.icon size={22} style={{ color: svc.color }} />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1.5">
                    {svc.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {svc.desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-xs font-semibold"
                    style={{ color: svc.color }}
                  >
                    Learn more <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section
        className="py-20 px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.16 0.07 260) 0%, oklch(0.13 0.05 250) 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="inline-flex p-3 rounded-xl mb-4"
              style={{ backgroundColor: "oklch(0.75 0.18 195 / 0.12)" }}
            >
              <Calculator size={28} style={{ color: "oklch(0.75 0.18 195)" }} />
            </div>
            <h2
              className="text-3xl font-display font-extrabold mb-3"
              style={{ color: "oklch(0.95 0.02 248)" }}
            >
              Shipping Price Calculator
            </h2>
            <p style={{ color: "oklch(0.70 0.05 248)" }}>
              Get an instant estimate for your shipment cost
            </p>
          </div>
          <PriceCalculator />
        </div>
      </section>

      {/* Automation Hub */}
      <section
        className="py-20 px-4 border-y"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.14 0.06 255) 0%, oklch(0.17 0.07 265) 50%, oklch(0.14 0.05 250) 100%)",
          borderColor: "oklch(0.24 0.07 252)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest mb-3 text-orange">
              AUTOMATION HUB
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Smart Automations Built In
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              All free features powering your logistics operations 24/7 — no
              extra cost, no manual steps needed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AUTOMATIONS.map((a) => (
              <div
                key={a.title}
                className="rounded-xl p-5 border transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: "oklch(0.19 0.065 247)",
                  borderColor: a.color.replace(")", " / 0.25)"),
                }}
              >
                <div
                  className="inline-flex p-2.5 rounded-lg mb-3"
                  style={{ backgroundColor: a.color.replace(")", " / 0.12)") }}
                >
                  <a.icon size={18} style={{ color: a.color }} />
                </div>
                <h4 className="font-display font-bold text-sm text-foreground mb-1.5">
                  {a.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Routes */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 text-purple">
              GLOBAL NETWORK
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Global Reach, Local Precision
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              42+ countries, active logistics routes across Africa, Europe, the
              Americas, and Asia.
            </p>
          </div>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              borderColor: "oklch(0.5 0.28 274 / 0.3)",
              boxShadow: "0 0 60px oklch(0.5 0.28 274 / 0.1)",
            }}
          >
            <img
              src="/assets/generated/world-routes-map.dim_900x450.png"
              alt="Global Logistics Routes"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="py-20 px-4 border-t"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.14 0.06 255) 0%, oklch(0.16 0.07 260) 100%)",
          borderColor: "oklch(0.24 0.07 252)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest mb-3 text-gold">
              WHY CHOOSE US
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Built for Modern Logistics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Insured",
                desc: "Every shipment is insured and tracked with enterprise-grade security throughout the entire journey.",
                grad: "linear-gradient(135deg, oklch(0.18 0.08 274) 0%, oklch(0.22 0.1 270) 100%)",
                border: "oklch(0.5 0.28 274 / 0.4)",
                color: "oklch(0.5 0.28 274)",
              },
              {
                icon: Clock,
                title: "Real-Time Tracking",
                desc: "Monitor your cargo live with precise tracking and instant notifications at every checkpoint.",
                grad: "linear-gradient(135deg, oklch(0.17 0.07 195) 0%, oklch(0.21 0.1 200) 100%)",
                border: "oklch(0.75 0.18 195 / 0.4)",
                color: "oklch(0.75 0.18 195)",
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                desc: "Data-driven logistics decisions powered by our intelligent routing and performance dashboard.",
                grad: "linear-gradient(135deg, oklch(0.18 0.07 65) 0%, oklch(0.22 0.09 60) 100%)",
                border: "oklch(0.82 0.11 75 / 0.4)",
                color: "oklch(0.82 0.11 75)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-8 border text-center transition-all hover:-translate-y-1"
                style={{
                  background: item.grad,
                  borderColor: item.border,
                  boxShadow: `0 4px 30px ${item.border}`,
                }}
              >
                <div
                  className="inline-flex p-4 rounded-xl mb-5"
                  style={{
                    backgroundColor: item.color.replace(")", " / 0.15)"),
                  }}
                >
                  <item.icon size={28} style={{ color: item.color }} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="rounded-2xl p-12 border"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.5 0.28 274 / 0.2) 0%, oklch(0.75 0.18 195 / 0.15) 50%, oklch(0.82 0.11 75 / 0.1) 100%)",
              borderColor: "oklch(0.5 0.28 274 / 0.5)",
              boxShadow: "0 0 80px oklch(0.5 0.28 274 / 0.15)",
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Ship with Confidence?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of businesses and individuals who trust Truptar
              Logistics for their shipping needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="h-12 px-8 font-bold transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.82 0.11 75), oklch(0.72 0.19 55))",
                    color: "oklch(0.12 0.04 248)",
                    boxShadow: "0 4px 20px oklch(0.82 0.11 75 / 0.4)",
                  }}
                  data-ocid="cta.primary_button"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/freight-services">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 font-bold transition-all hover:scale-105"
                  style={{
                    borderColor: "oklch(0.75 0.18 195 / 0.5)",
                    color: "oklch(0.75 0.18 195)",
                  }}
                  data-ocid="cta.secondary_button"
                >
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
