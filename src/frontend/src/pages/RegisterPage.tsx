import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterUser } from "../hooks/useQueries";
import { WORLD_COUNTRIES } from "../lib/countries";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync: registerUser, isPending } = useRegisterUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);

  function update(key: string, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to Terms & Logistics Policy");
      return;
    }
    try {
      await registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        passwordHash: btoa(form.password),
      });
      toast.success("Account created successfully!");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 70% 20%, oklch(0.75 0.18 195 / 0.18) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, oklch(0.55 0.18 215 / 0.15) 0%, transparent 50%), linear-gradient(160deg, oklch(0.14 0.04 225) 0%, oklch(0.16 0.05 225) 100%)",
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 right-10 w-80 h-80 rounded-full blur-3xl animate-orb-float"
          style={{
            background: "oklch(0.75 0.18 195 / 0.1)",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl animate-orb-float"
          style={{
            background: "oklch(0.55 0.18 215 / 0.1)",
            animationDelay: "4s",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center pt-10 pb-4 px-4">
        <img
          src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
          alt="Truptar Logistics"
          className="h-14 w-auto mb-2"
        />
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
          style={{
            backgroundColor: "oklch(0.82 0.14 42 / 0.1)",
            borderColor: "oklch(0.82 0.14 42 / 0.3)",
            color: "oklch(0.72 0.19 42)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "oklch(0.72 0.19 42)" }}
          />
          Powered by JUVENTUS SOPS
        </div>
      </div>

      <div className="relative flex-1 flex items-start justify-center px-4 pb-12">
        <div
          className="w-full max-w-lg rounded-2xl p-8 border"
          style={{
            backgroundColor: "oklch(0.17 0.05 225 / 0.8)",
            backdropFilter: "blur(20px)",
            borderColor: "oklch(0.75 0.18 195 / 0.4)",
            boxShadow:
              "0 0 60px oklch(0.75 0.18 195 / 0.15), 0 20px 80px oklch(0 0 0 / 0.5)",
          }}
        >
          {/* Header */}
          <div
            className="rounded-xl p-5 mb-8"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.18 195 / 0.12) 0%, oklch(0.55 0.18 215 / 0.08) 100%)",
            }}
          >
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={18} />
              </Link>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Create Account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Join Truptar Logistics today
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/90 text-sm">Full Name</Label>
                <Input
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                  data-ocid="register.input"
                  className="bg-muted border-border focus:border-secondary h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/90 text-sm">
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  data-ocid="register.input"
                  className="bg-muted border-border focus:border-secondary h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/90 text-sm">
                  Phone Number
                </Label>
                <Input
                  placeholder="+234 000 0000 000"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  required
                  data-ocid="register.input"
                  className="bg-muted border-border focus:border-secondary h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/90 text-sm">Country</Label>
                <Select onValueChange={(v) => update("country", v)} required>
                  <SelectTrigger
                    data-ocid="register.select"
                    className="bg-muted border-border focus:border-secondary h-10"
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent
                    style={{ backgroundColor: "oklch(0.18 0.05 225)" }}
                  >
                    {WORLD_COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/90 text-sm">Password</Label>
                <Input
                  type="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  required
                  data-ocid="register.input"
                  className="bg-muted border-border focus:border-secondary h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/90 text-sm">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  required
                  data-ocid="register.input"
                  className="bg-muted border-border focus:border-secondary h-10"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(v) => setAgreed(!!v)}
                data-ocid="register.checkbox"
                className="mt-0.5 border-secondary data-[state=checked]:bg-secondary"
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="underline"
                  style={{ color: "oklch(0.72 0.19 42)" }}
                >
                  Terms &amp; Logistics Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              data-ocid="register.submit_button"
              className="w-full h-11 font-bold text-sm tracking-widest mt-2 transition-all hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.15 200), oklch(0.68 0.16 215))",
                color: "oklch(0.97 0.01 155)",
                boxShadow: "0 4px 20px oklch(0.75 0.18 195 / 0.35)",
              }}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              CREATE ACCOUNT
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium"
              style={{ color: "oklch(0.72 0.19 42)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
