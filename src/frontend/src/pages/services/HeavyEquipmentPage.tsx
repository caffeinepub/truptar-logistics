import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Construction } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function HeavyEquipmentPage() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success(
      "Heavy equipment transport request submitted. Our specialist team will contact you.",
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
            style={{ backgroundColor: "oklch(0.50 0.28 274 / 0.12)" }}
          >
            <Construction size={24} style={{ color: "oklch(0.50 0.28 274)" }} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Heavy Equipment Transport
            </h1>
            <p className="text-sm text-muted-foreground">
              Safe transportation for heavy-load cargo
            </p>
          </div>
        </div>
        {submitted ? (
          <div
            className="rounded-xl border p-10 text-center"
            style={{
              backgroundColor: "oklch(0.19 0.065 247)",
              borderColor: "oklch(0.65 0.15 160 / 0.4)",
            }}
          >
            <p className="text-lg font-semibold text-foreground mb-2">
              Request Submitted!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Our heavy transport specialist will contact you shortly.
            </p>
            <Link to="/">
              <Button
                style={{
                  backgroundColor: "oklch(0.82 0.11 75)",
                  color: "oklch(0.13 0.04 248)",
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
              backgroundColor: "oklch(0.19 0.065 247)",
              borderColor: "oklch(0.28 0.09 258)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label>Equipment Type</Label>
                <Input
                  placeholder="e.g. Excavator, Generator, Industrial Machine"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Weight (tons)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 15"
                    className="bg-muted border-border focus:border-secondary h-10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dimensions (L x W x H)</Label>
                  <Input
                    placeholder="e.g. 10m x 3m x 4m"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Pickup Location</Label>
                <Input
                  placeholder="Full address or city"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Delivery Location</Label>
                <Input
                  placeholder="Full address or city"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Special Requirements</Label>
                <Textarea
                  placeholder="Any special handling, permits, or escort requirements..."
                  className="bg-muted border-border focus:border-secondary min-h-[80px]"
                />
              </div>
              <Button
                type="submit"
                data-ocid="heavy.submit_button"
                className="w-full h-11 font-bold"
                style={{
                  backgroundColor: "oklch(0.82 0.11 75)",
                  color: "oklch(0.13 0.04 248)",
                }}
              >
                Request Transport
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
