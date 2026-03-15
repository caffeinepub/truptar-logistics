import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, Truck, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: "oklch(0.13 0.045 248 / 0.95)",
        backdropFilter: "blur(12px)",
        borderColor: "oklch(0.28 0.09 258)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
              alt="Truptar Logistics"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80 hover:text-gold transition-colors"
              style={{ "--tw-text-opacity": "1" } as React.CSSProperties}
            >
              Home
            </Link>
            <Link
              to="/freight-services"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              to="/freight-services"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Freight
            </Link>
            <Link
              to="/shipping-form"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Track Order
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                Login
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:opacity-90 font-semibold"
              >
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "oklch(0.14 0.05 248)",
            borderColor: "oklch(0.28 0.09 258)",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/freight-services"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/freight-services"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setOpen(false)}
            >
              Freight
            </Link>
            <Link
              to="/shipping-form"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setOpen(false)}
            >
              Track Order
            </Link>
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-secondary text-secondary"
                >
                  Login
                </Button>
              </Link>
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
