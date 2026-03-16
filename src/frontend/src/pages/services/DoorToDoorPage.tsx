import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function DoorToDoorPage() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const existingReqs = JSON.parse(
      localStorage.getItem("truptar_service_requests") ?? "[]",
    );
    existingReqs.push({
      serviceType: "Door-to-Door Delivery",
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem(
      "truptar_service_requests",
      JSON.stringify(existingReqs),
    );
    setSubmitted(true);
    toast.success(
      "Door-to-door delivery booked! We will confirm your pickup shortly.",
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
            <MapPin size={24} style={{ color: "oklch(0.68 0.16 215)" }} />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Door-to-Door Delivery
            </h1>
            <p className="text-sm text-muted-foreground">
              Direct delivery from your door to the recipient
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
              Delivery Booked!
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Our team will confirm pickup time with you shortly.
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
                <Label>Pickup Full Address</Label>
                <Input
                  placeholder="Street, City, State, Country"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Delivery Full Address</Label>
                <Input
                  placeholder="Street, City, State, Country"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Package Type</Label>
                  <Select required>
                    <SelectTrigger
                      className="bg-muted border-border h-10"
                      data-ocid="d2d.package_type.select"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="parcel">Parcel</SelectItem>
                      <SelectItem value="box">Box</SelectItem>
                      <SelectItem value="fragile">Fragile Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 3"
                    className="bg-muted border-border focus:border-secondary h-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preferred Pickup Date</Label>
                <Input
                  type="date"
                  className="bg-muted border-border focus:border-secondary h-10"
                  required
                />
              </div>
              <Button
                type="submit"
                data-ocid="d2d.submit_button"
                className="w-full h-11 font-bold"
                style={{
                  backgroundColor: "oklch(0.72 0.19 42)",
                  color: "oklch(0.14 0.04 225)",
                }}
              >
                Book Delivery
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
