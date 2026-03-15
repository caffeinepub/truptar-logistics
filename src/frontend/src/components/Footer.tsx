import { Truck } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="border-t py-10"
      style={{
        backgroundColor: "oklch(0.13 0.04 248)",
        borderColor: "oklch(0.24 0.07 252)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "oklch(0.50 0.28 274 / 0.15)" }}
            >
              <Truck size={20} style={{ color: "oklch(0.50 0.28 274)" }} />
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

          {/* Links */}
          <nav className="flex items-center gap-6 text-xs text-muted-foreground">
            <a
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="hover:text-foreground transition-colors"
            >
              Contact Support
            </a>
          </nav>

          {/* Caffeine */}
          <p className="text-xs text-muted-foreground">
            © {year}. Built with ❤️ using{" "}
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
    </footer>
  );
}
