import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Truck } from "lucide-react";
import { useState } from "react";
import { SiGoogle, SiWhatsapp } from "react-icons/si";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/dashboard" });
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 30%, oklch(0.5 0.28 274 / 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, oklch(0.75 0.18 195 / 0.15) 0%, transparent 50%), linear-gradient(160deg, oklch(0.11 0.045 248) 0%, oklch(0.16 0.065 258) 100%)",
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-16 left-8 w-72 h-72 rounded-full blur-3xl animate-orb-float"
          style={{ background: "oklch(0.5 0.28 274 / 0.12)" }}
        />
        <div
          className="absolute bottom-16 right-8 w-64 h-64 rounded-full blur-3xl animate-orb-float"
          style={{
            background: "oklch(0.75 0.18 195 / 0.1)",
            animationDelay: "3s",
          }}
        />
      </div>

      {/* Top */}
      <div className="relative flex flex-col items-center pt-12 pb-6 px-4">
        <img
          src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
          alt="Truptar Logistics"
          className="h-16 w-auto mb-3"
        />
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
          style={{
            backgroundColor: "oklch(0.82 0.11 75 / 0.1)",
            borderColor: "oklch(0.82 0.11 75 / 0.3)",
            color: "oklch(0.82 0.11 75)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "oklch(0.82 0.11 75)" }}
          />
          Powered by JUVENTUS SOPS
        </div>
      </div>

      {/* Card */}
      <div className="relative flex-1 flex items-start justify-center px-4 pb-12">
        <div
          className="w-full max-w-md rounded-2xl p-8 border"
          style={{
            backgroundColor: "oklch(0.17 0.06 250 / 0.8)",
            backdropFilter: "blur(20px)",
            borderColor: "oklch(0.5 0.28 274 / 0.5)",
            boxShadow:
              "0 0 60px oklch(0.5 0.28 274 / 0.2), 0 20px 80px oklch(0 0 0 / 0.5)",
          }}
        >
          {/* Header with gradient */}
          <div
            className="text-center mb-8 rounded-xl p-6 -mx-2"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.5 0.28 274 / 0.15) 0%, oklch(0.75 0.18 195 / 0.1) 100%)",
            }}
          >
            <div
              className="inline-flex p-3 rounded-xl mb-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.5 0.28 274), oklch(0.75 0.18 195))",
                boxShadow: "0 4px 20px oklch(0.5 0.28 274 / 0.4)",
              }}
            >
              <Truck size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Welcome to Truptar
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to manage your shipments
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-foreground/90 text-sm font-medium"
              >
                Email / Phone
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="login.input"
                className="bg-muted border-border focus:border-secondary focus:ring-secondary h-11"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-foreground/90 text-sm font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-ocid="login.input"
                  className="bg-muted border-border focus:border-secondary focus:ring-secondary h-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              data-ocid="login.submit_button"
              className="w-full h-11 font-bold text-sm tracking-wide transition-all hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.82 0.11 75), oklch(0.72 0.19 55))",
                color: "oklch(0.13 0.04 248)",
                boxShadow: "0 4px 20px oklch(0.82 0.11 75 / 0.35)",
              }}
            >
              LOGIN
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "oklch(0.28 0.09 258)" }}
            />
            <span className="text-xs text-muted-foreground">
              or continue with
            </span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "oklch(0.28 0.09 258)" }}
            />
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              data-ocid="login.google_button"
              className="w-full h-11 border-secondary/50 text-foreground hover:bg-secondary/10 gap-3"
            >
              <SiGoogle size={16} style={{ color: "oklch(0.5 0.28 274)" }} />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              data-ocid="login.whatsapp_button"
              className="w-full h-11 border-secondary/50 text-foreground hover:bg-secondary/10 gap-3"
            >
              <SiWhatsapp size={16} style={{ color: "oklch(0.65 0.22 160)" }} />
              Continue with WhatsApp
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <Link
              to="/register"
              data-ocid="login.register_link"
              className="font-medium transition-colors"
              style={{ color: "oklch(0.82 0.11 75)" }}
            >
              Create Account
            </Link>
            <span className="text-muted-foreground">·</span>
            <a
              href="/forgot-password"
              data-ocid="login.forgot_link"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="relative text-center py-6 px-4 border-t"
        style={{ borderColor: "oklch(0.24 0.07 252)" }}
      >
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <a
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <span>·</span>
          <a href="/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <span>·</span>
          <a
            href="/support"
            className="hover:text-foreground transition-colors"
          >
            Contact Support
          </a>
        </div>
      </footer>
    </div>
  );
}
