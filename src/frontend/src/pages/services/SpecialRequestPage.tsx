import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function SpecialRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const existingReqs = JSON.parse(
      localStorage.getItem("truptar_service_requests") ?? "[]",
    );
    existingReqs.push({
      serviceType: "Special Request Logistics",
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem(
      "truptar_service_requests",
      JSON.stringify(existingReqs),
    );
    setSubmitted(true);
    toast.success(
      "Special request submitted! Our team will review and contact you within 24 hours.",
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-8">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: "oklch(0.55 0.18 215 / 0.12)" }}
          >
            <Star size={24} style={{ color: "oklch(0.68 0.16 215)" }} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Special Request Logistics
            </h1>
            <p className="text-sm text-muted-foreground">
              Custom solutions for unique logistics challenges
            </p>
          </div>
        </div>
        {submitted ? (
          <div
            className="rounded-xl border p-10 text-center"
            style={{
              backgroundColor: "oklch(0.18 0.05 225)",
              borderColor: "oklch(0.65 0.15 200 / 0.4)",
            }}
          >
            <p className="text-lg font-semibold text-foreground mb-2">
              Request Submitted!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Our team will review your special request and contact you within
              24 hours.
            </p>
            <Link to="/">
              <Button
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "oklch(0.14 0.04 225)",
                }}
              >
                Back to Home
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className="rounded-xl border p-6 sm:p-8"
            style={{
              backgroundColor: "oklch(0.18 0.05 225)",
              borderColor: "oklch(0.28 0.07 220)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Request Type / Description</Label>
                <Textarea
                  placeholder="Describe your special logistics need in detail..."
                  className="bg-muted border-border focus:border-secondary min-h-[100px]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pickup Location</Label>
                  <Input
                    placeholder="City or full address"
                    className="bg-muted border-border focus:border-secondary h-10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Delivery Location</Label>
                  <Input
                    placeholder="City or full address"
                    className="bg-muted border-border focus:border-secondary h-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Timeline / Deadline</Label>
                <Input
                  placeholder="e.g. Within 3 days, by June 15"
                  className="bg-muted border-border focus:border-secondary h-10"
                />
              </div>
              <div className="space-y-2">
                <Label>Additional Notes</Label>
                <Textarea
                  placeholder="Any other details, access requirements, special handling..."
                  className="bg-muted border-border focus:border-secondary min-h-[80px]"
                />
              </div>
              <Button
                type="submit"
                data-ocid="special.submit_button"
                className="w-full h-11 font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "oklch(0.14 0.04 225)",
                }}
              >
                Submit Special Request
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
