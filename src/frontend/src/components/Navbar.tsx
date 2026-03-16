import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Bell, Loader2, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: "oklch(0.14 0.04 225 / 0.95)",
        backdropFilter: "blur(12px)",
        borderColor: "oklch(0.28 0.07 220)",
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
              className="text-sm font-medium transition-colors"
              style={{ color: "oklch(0.68 0.16 215)" }}
              data-ocid="nav.home.link"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-colors"
              style={{ color: "oklch(0.72 0.19 42)" }}
              data-ocid="nav.dashboard.link"
            >
              Dashboard
            </Link>
            <Link
              to="/freight-services"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-ocid="nav.services.link"
            >
              Services
            </Link>
            <Link
              to="/track-order"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-ocid="nav.track.link"
            >
              Track Order
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-ocid="nav.about.link"
            >
              About
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              data-ocid="nav.features.link"
            >
              Features
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative p-2"
                    data-ocid="nav.notifications.button"
                  >
                    <Bell size={16} className="text-foreground/70" />
                    <span
                      className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full"
                      style={{ backgroundColor: "oklch(0.72 0.19 42)" }}
                    />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => clear()}
                  className="border-red-500/40 text-red-400 hover:bg-red-500/10 gap-1.5"
                  data-ocid="nav.logout.button"
                >
                  <LogOut size={14} /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    style={{
                      borderColor: "oklch(0.68 0.16 215 / 0.5)",
                      color: "oklch(0.68 0.16 215)",
                    }}
                    data-ocid="nav.login_page.button"
                  >
                    Login
                  </Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() => login()}
                  disabled={isLoggingIn}
                  className="font-bold gap-1.5"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.72 0.19 42), oklch(0.78 0.17 55))",
                    color: "oklch(0.14 0.04 225)",
                  }}
                  data-ocid="nav.identity_login.button"
                >
                  {isLoggingIn ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <LogIn size={14} />
                  )}
                  Connect
                </Button>
              </>
            )}
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
            backgroundColor: "oklch(0.16 0.05 225)",
            borderColor: "oklch(0.28 0.07 220)",
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-sm font-semibold"
              style={{ color: "oklch(0.68 0.16 215)" }}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-sm font-semibold"
              style={{ color: "oklch(0.72 0.19 42)" }}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/freight-services"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/track-order"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setOpen(false)}
            >
              Track Order
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setOpen(false)}
            >
              Features
            </Link>
            <div className="flex gap-3 pt-2">
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    clear();
                    setOpen(false);
                  }}
                  className="border-red-500/40 text-red-400"
                >
                  <LogOut size={14} /> Logout
                </Button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button
                      variant="outline"
                      size="sm"
                      style={{
                        borderColor: "oklch(0.68 0.16 215 / 0.5)",
                        color: "oklch(0.68 0.16 215)",
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => {
                      login();
                      setOpen(false);
                    }}
                    disabled={isLoggingIn}
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.19 42), oklch(0.78 0.17 55))",
                      color: "oklch(0.14 0.04 225)",
                    }}
                  >
                    Connect
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
