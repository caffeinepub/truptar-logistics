import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Clock,
  Construction,
  FileCheck,
  Globe,
  MapPin,
  Package,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Warehouse,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const SERVICES = [
  {
    icon: Truck,
    label: "Freight Services",
    href: "/freight-services",
    desc: "Local & international freight solutions",
  },
  {
    icon: Package,
    label: "Express Parcel Delivery",
    href: "/shipping-form",
    desc: "Fast and reliable parcel dispatch",
  },
  {
    icon: Warehouse,
    label: "Warehousing & Storage",
    href: "/freight-services",
    desc: "Secure, scalable storage facilities",
  },
  {
    icon: Globe,
    label: "International Cargo Shipping",
    href: "/freight-services",
    desc: "Worldwide cargo movement",
  },
  {
    icon: ShoppingCart,
    label: "E-commerce Fulfillment",
    href: "/freight-services",
    desc: "End-to-end order fulfillment",
  },
  {
    icon: Building2,
    label: "Corporate Logistics",
    href: "/freight-services",
    desc: "Tailored enterprise solutions",
  },
  {
    icon: Construction,
    label: "Heavy Equipment Transport",
    href: "/freight-services",
    desc: "Safe heavy-load transportation",
  },
  {
    icon: FileCheck,
    label: "Customs Clearance",
    href: "/freight-services",
    desc: "Hassle-free customs handling",
  },
  {
    icon: MapPin,
    label: "Door-to-Door Delivery",
    href: "/shipping-form",
    desc: "Direct delivery to your doorstep",
  },
  {
    icon: Star,
    label: "Special Request Logistics",
    href: "/freight-services",
    desc: "Custom logistics for unique needs",
  },
];

const STATS = [
  { label: "Countries Served", value: "42+" },
  { label: "Deliveries Completed", value: "150K+" },
  { label: "Corporate Partners", value: "800+" },
  { label: "On-Time Rate", value: "99.2%" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-28 pb-24 px-4 overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.13 0.05 248) 0%, oklch(0.16 0.07 260) 40%, oklch(0.14 0.06 250) 100%)",
        }}
      >
        {/* Background mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl"
            style={{ background: "oklch(0.50 0.28 274 / 0.12)" }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl"
            style={{ background: "oklch(0.82 0.11 75 / 0.07)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border"
            style={{
              backgroundColor: "oklch(0.50 0.28 274 / 0.1)",
              borderColor: "oklch(0.50 0.28 274 / 0.3)",
              color: "oklch(0.50 0.28 274)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: "oklch(0.50 0.28 274)" }}
            />
            A Division of JUVENTUS SOPS
          </div>

          <h1
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-foreground"
            style={{ textShadow: "0 0 60px oklch(0.50 0.28 274 / 0.3)" }}
          >
            TRUPTAR
            <br />
            <span style={{ color: "oklch(0.82 0.11 75)" }}>LOGISTICS</span>
          </h1>

          <p
            className="text-lg sm:text-xl font-semibold mb-4 font-display"
            style={{ color: "oklch(0.82 0.11 75)" }}
          >
            Smart Freight &amp; Delivery Solutions Powered by JUVENTUS SOPS
          </p>

          <p className="max-w-2xl mx-auto text-base text-muted-foreground leading-relaxed mb-10">
            Truptar Logistics is the transportation and freight division of
            JUVENTUS SOPS, built to simplify local and international shipping
            through smart logistics technology. We provide secure delivery,
            freight handling, cargo management, and real-time shipment tracking
            for businesses and individuals worldwide.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/shipping-form">
              <Button
                size="lg"
                data-ocid="hero.ship_now_button"
                className="h-13 px-8 font-bold text-base gap-2"
                style={{
                  backgroundColor: "oklch(0.82 0.11 75)",
                  color: "oklch(0.13 0.04 248)",
                }}
              >
                Ship Now <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/shipping-form">
              <Button
                size="lg"
                variant="outline"
                data-ocid="hero.track_order_button"
                className="h-13 px-8 font-bold text-base border-secondary text-secondary hover:bg-secondary/10"
              >
                Track Order
              </Button>
            </Link>
            <Link to="/freight-services">
              <Button
                size="lg"
                variant="outline"
                data-ocid="hero.request_service_button"
                className="h-13 px-8 font-bold text-base border-secondary text-secondary hover:bg-secondary/10"
              >
                Request Logistics Service
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-10 border-y"
        style={{
          backgroundColor: "oklch(0.15 0.055 250)",
          borderColor: "oklch(0.24 0.07 252)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-3xl font-display font-bold"
                  style={{ color: "oklch(0.82 0.11 75)" }}
                >
                  {s.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest mb-3"
              style={{ color: "oklch(0.50 0.28 274)" }}
            >
              OUR SOLUTIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Core Services
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
                to={svc.href as "/" | "/freight-services" | "/shipping-form"}
                data-ocid={`services.item.${idx + 1}`}
              >
                <div
                  className="group h-full rounded-xl p-6 border cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: "oklch(0.19 0.065 247)",
                    borderColor: "oklch(0.28 0.09 258)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "oklch(0.50 0.28 274 / 0.6)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 0 20px oklch(0.50 0.28 274 / 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "oklch(0.28 0.09 258)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "none";
                  }}
                >
                  <div
                    className="inline-flex p-3 rounded-lg mb-4"
                    style={{ backgroundColor: "oklch(0.50 0.28 274 / 0.12)" }}
                  >
                    <svc.icon
                      size={22}
                      style={{ color: "oklch(0.50 0.28 274)" }}
                    />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1.5">
                    {svc.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {svc.desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-xs font-semibold"
                    style={{ color: "oklch(0.82 0.11 75)" }}
                  >
                    Learn more <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section
        className="py-20 px-4 border-t"
        style={{
          backgroundColor: "oklch(0.15 0.055 250)",
          borderColor: "oklch(0.24 0.07 252)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest mb-3"
              style={{ color: "oklch(0.50 0.28 274)" }}
            >
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
                title: "Secure &amp; Insured",
                desc: "Every shipment is insured and tracked with enterprise-grade security throughout the entire journey.",
              },
              {
                icon: Clock,
                title: "Real-Time Tracking",
                desc: "Monitor your cargo live with precise GPS tracking and instant notifications at every checkpoint.",
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                desc: "Data-driven logistics decisions powered by our intelligent routing and performance dashboard.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-8 border text-center"
                style={{
                  backgroundColor: "oklch(0.19 0.065 247)",
                  borderColor: "oklch(0.28 0.09 258)",
                }}
              >
                <div
                  className="inline-flex p-4 rounded-xl mb-5"
                  style={{ backgroundColor: "oklch(0.82 0.11 75 / 0.1)" }}
                >
                  <item.icon
                    size={28}
                    style={{ color: "oklch(0.82 0.11 75)" }}
                  />
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
                "linear-gradient(135deg, oklch(0.50 0.28 274 / 0.15) 0%, oklch(0.82 0.11 75 / 0.08) 100%)",
              borderColor: "oklch(0.50 0.28 274 / 0.4)",
              boxShadow: "0 0 60px oklch(0.50 0.28 274 / 0.12)",
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
                  className="h-12 px-8 font-bold"
                  style={{
                    backgroundColor: "oklch(0.82 0.11 75)",
                    color: "oklch(0.13 0.04 248)",
                  }}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/freight-services">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 font-bold border-secondary text-secondary hover:bg-secondary/10"
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
