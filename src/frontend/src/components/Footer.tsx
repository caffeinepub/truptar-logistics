import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Truck } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="overflow-hidden">
      {/* Colorful top gradient band */}
      <div
        className="py-10 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.5 0.28 274) 0%, oklch(0.6 0.22 250) 40%, oklch(0.75 0.18 195) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="font-display font-extrabold text-2xl text-white tracking-tight">
              TRUPTAR LOGISTICS
            </p>
            <p className="text-white/70 text-sm mt-1">
              Smart Freight &amp; Delivery — Powered by JUVENTUS SOPS
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/shipping-form"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105"
              style={{
                backgroundColor: "oklch(0.12 0.04 248)",
                color: "oklch(0.82 0.11 75)",
              }}
            >
              Ship Now
            </Link>
            <Link
              to="/track-order"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border border-white/30 text-white hover:bg-white/10 transition-all"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div
        className="py-14 px-4"
        style={{ backgroundColor: "oklch(0.13 0.04 248)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* About Truptar */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: "oklch(0.5 0.28 274 / 0.15)" }}
                >
                  <Truck size={20} style={{ color: "oklch(0.5 0.28 274)" }} />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-foreground">
                    TRUPTAR LOGISTICS
                  </p>
                  <p className="text-xs text-muted-foreground">
                    A Division of JUVENTUS SOPS
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                Fast, secure and intelligent freight and delivery systems across
                cities and borders. Connecting businesses and individuals
                worldwide.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:support@truptar.com"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={13} style={{ color: "oklch(0.75 0.18 195)" }} />
                  support@truptar.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={13} style={{ color: "oklch(0.82 0.11 75)" }} />
                  +1 (234) 567-8900
                </a>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin size={13} style={{ color: "oklch(0.65 0.22 340)" }} />
                  Global Operations Center
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className="text-xs font-bold tracking-widest mb-5"
                style={{ color: "oklch(0.75 0.18 195)" }}
              >
                QUICK LINKS
              </h4>
              <nav className="flex flex-col gap-2.5">
                <Link
                  to="/shipping-form"
                  data-ocid="footer.shipnow.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.75 0.18 195)" }}
                  />
                  Ship Now
                </Link>
                <Link
                  to="/track-order"
                  data-ocid="footer.track.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.75 0.18 195)" }}
                  />
                  Track Shipment
                </Link>
                <Link
                  to="/freight-services"
                  data-ocid="footer.services.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.75 0.18 195)" }}
                  />
                  Services
                </Link>
                <Link
                  to="/support"
                  data-ocid="footer.support.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.75 0.18 195)" }}
                  />
                  Support
                </Link>
                <Link
                  to="/features"
                  data-ocid="footer.features.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.75 0.18 195)" }}
                  />
                  Features
                </Link>
              </nav>
            </div>

            {/* Company Info */}
            <div>
              <h4
                className="text-xs font-bold tracking-widest mb-5"
                style={{ color: "oklch(0.82 0.11 75)" }}
              >
                COMPANY INFO
              </h4>
              <nav className="flex flex-col gap-2.5">
                <Link
                  to="/about"
                  data-ocid="footer.about.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.82 0.11 75)" }}
                  />
                  About Truptar Logistics
                </Link>
                <a
                  href="/careers"
                  data-ocid="footer.careers.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.82 0.11 75)" }}
                  />
                  Careers
                </a>
                <a
                  href="/support"
                  data-ocid="footer.contact.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.82 0.11 75)" }}
                  />
                  Contact
                </a>
                <Link
                  to="/admin"
                  data-ocid="footer.admin.link"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.82 0.11 75)" }}
                  />
                  Staff Portal
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: "oklch(0.24 0.07 252)" }}
          >
            <p className="text-xs text-muted-foreground">
              © {year}{" "}
              <span style={{ color: "oklch(0.82 0.11 75)" }}>
                TRUPTAR LOGISTICS
              </span>
              . Powered by JUVENTUS SOPS.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                className="underline hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
