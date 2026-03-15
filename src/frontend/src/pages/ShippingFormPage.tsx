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
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Package,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Variant_cancelled_pending_in_transit_delivered,
  Variant_cargo_freight_document_parcel,
  Variant_express_priority_standard,
} from "../backend.d";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCreateShippingOrder } from "../hooks/useQueries";

const COUNTRIES = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "UAE",
  "China",
  "India",
  "Brazil",
  "Australia",
  "Other",
];

function generateId() {
  return `TL-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

export default function ShippingFormPage() {
  const { mutateAsync: createOrder, isPending } = useCreateShippingOrder();
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [sender, setSender] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });
  const [receiver, setReceiver] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });
  const [shipment, setShipment] = useState({
    description: "",
    weight: "",
    quantity: "",
    deliveryType: "" as string,
    category: "" as string,
  });

  function updateSender(k: string, v: string) {
    setSender((p) => ({ ...p, [k]: v }));
  }
  function updateReceiver(k: string, v: string) {
    setReceiver((p) => ({ ...p, [k]: v }));
  }
  function updateShipment(k: string, v: string) {
    setShipment((p) => ({ ...p, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = generateId();
    try {
      await createOrder({
        id,
        status: Variant_cancelled_pending_in_transit_delivered.pending,
        owner: null as any,
        sender: { ...sender },
        receiver: { ...receiver, email: undefined },
        shipment: {
          description: shipment.description,
          weight: Number.parseFloat(shipment.weight),
          quantity: BigInt(shipment.quantity || "1"),
          deliveryType:
            shipment.deliveryType as Variant_express_priority_standard,
          category: shipment.category as Variant_cargo_freight_document_parcel,
        },
      });
      setOrderId(id);
      setSuccess(true);
    } catch {
      toast.error("Failed to create order. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div
          className="flex-1 flex items-center justify-center px-4"
          data-ocid="shipping_form.success_state"
        >
          <div
            className="max-w-md w-full rounded-2xl p-12 text-center border"
            style={{
              backgroundColor: "oklch(0.19 0.065 247)",
              borderColor: "oklch(0.82 0.11 75 / 0.4)",
              boxShadow: "0 0 40px oklch(0.82 0.11 75 / 0.1)",
            }}
          >
            <div
              className="inline-flex p-5 rounded-full mb-6"
              style={{ backgroundColor: "oklch(0.82 0.11 75 / 0.12)" }}
            >
              <CheckCircle2
                size={48}
                style={{ color: "oklch(0.82 0.11 75)" }}
              />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              Order Created!
            </h2>
            <p className="text-muted-foreground mb-4">
              Your shipping order has been submitted successfully.
            </p>
            <div
              className="rounded-lg p-4 border mb-8 font-mono text-sm"
              style={{
                backgroundColor: "oklch(0.16 0.055 248)",
                borderColor: "oklch(0.28 0.09 258)",
                color: "oklch(0.82 0.11 75)",
              }}
            >
              Order ID: <strong>{orderId}</strong>
            </div>
            <div className="flex gap-3 justify-center">
              <Link to="/dashboard">
                <Button
                  style={{
                    backgroundColor: "oklch(0.82 0.11 75)",
                    color: "oklch(0.13 0.04 248)",
                  }}
                  className="font-bold gap-2"
                >
                  View Dashboard <ArrowRight size={16} />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10"
                onClick={() => {
                  setSuccess(false);
                  setSender({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    city: "",
                    country: "",
                  });
                  setReceiver({
                    name: "",
                    phone: "",
                    address: "",
                    city: "",
                    country: "",
                  });
                  setShipment({
                    description: "",
                    weight: "",
                    quantity: "",
                    deliveryType: "",
                    category: "",
                  });
                }}
              >
                New Order
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div
              className="inline-flex p-3 rounded-xl mb-5"
              style={{ backgroundColor: "oklch(0.50 0.28 274 / 0.12)" }}
            >
              <Package size={32} style={{ color: "oklch(0.50 0.28 274)" }} />
            </div>
            <h1 className="text-4xl font-display font-extrabold text-foreground mb-3">
              Create Shipping Order
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to book your freight shipment
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sender Details */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "oklch(0.19 0.065 247)",
                borderColor: "oklch(0.50 0.28 274 / 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "oklch(0.50 0.28 274 / 0.15)" }}
                >
                  <User size={18} style={{ color: "oklch(0.50 0.28 274)" }} />
                </div>
                <h2 className="text-lg font-display font-bold text-foreground">
                  Sender Details
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Full Name *
                  </Label>
                  <Input
                    value={sender.name}
                    onChange={(e) => updateSender("name", e.target.value)}
                    required
                    placeholder="John Doe"
                    data-ocid="shipping_form.sender_name_input"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Phone Number *
                  </Label>
                  <Input
                    value={sender.phone}
                    onChange={(e) => updateSender("phone", e.target.value)}
                    required
                    placeholder="+234 000 0000 000"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">Email</Label>
                  <Input
                    type="email"
                    value={sender.email}
                    onChange={(e) => updateSender("email", e.target.value)}
                    placeholder="sender@email.com"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Address *
                  </Label>
                  <Input
                    value={sender.address}
                    onChange={(e) => updateSender("address", e.target.value)}
                    required
                    placeholder="123 Shipping Lane"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">City *</Label>
                  <Input
                    value={sender.city}
                    onChange={(e) => updateSender("city", e.target.value)}
                    required
                    placeholder="Lagos"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Country *
                  </Label>
                  <Select
                    onValueChange={(v) => updateSender("country", v)}
                    required
                  >
                    <SelectTrigger className="bg-muted border-border focus:border-secondary h-10">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ backgroundColor: "oklch(0.19 0.065 247)" }}
                    >
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "oklch(0.19 0.065 247)",
                borderColor: "oklch(0.82 0.11 75 / 0.3)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "oklch(0.82 0.11 75 / 0.12)" }}
                >
                  <User size={18} style={{ color: "oklch(0.82 0.11 75)" }} />
                </div>
                <h2 className="text-lg font-display font-bold text-foreground">
                  Receiver Details
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Receiver Name *
                  </Label>
                  <Input
                    value={receiver.name}
                    onChange={(e) => updateReceiver("name", e.target.value)}
                    required
                    placeholder="Jane Smith"
                    data-ocid="shipping_form.receiver_name_input"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Receiver Phone *
                  </Label>
                  <Input
                    value={receiver.phone}
                    onChange={(e) => updateReceiver("phone", e.target.value)}
                    required
                    placeholder="+1 000 000 0000"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm text-foreground/80">
                    Receiver Address *
                  </Label>
                  <Input
                    value={receiver.address}
                    onChange={(e) => updateReceiver("address", e.target.value)}
                    required
                    placeholder="456 Delivery Ave"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Destination City *
                  </Label>
                  <Input
                    value={receiver.city}
                    onChange={(e) => updateReceiver("city", e.target.value)}
                    required
                    placeholder="New York"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Destination Country *
                  </Label>
                  <Select
                    onValueChange={(v) => updateReceiver("country", v)}
                    required
                  >
                    <SelectTrigger className="bg-muted border-border focus:border-secondary h-10">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ backgroundColor: "oklch(0.19 0.065 247)" }}
                    >
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "oklch(0.19 0.065 247)",
                borderColor: "oklch(0.28 0.09 258)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "oklch(0.50 0.28 274 / 0.15)" }}
                >
                  <Send size={18} style={{ color: "oklch(0.50 0.28 274)" }} />
                </div>
                <h2 className="text-lg font-display font-bold text-foreground">
                  Shipment Details
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm text-foreground/80">
                    Package Description *
                  </Label>
                  <Textarea
                    value={shipment.description}
                    onChange={(e) =>
                      updateShipment("description", e.target.value)
                    }
                    required
                    placeholder="Describe the package contents..."
                    data-ocid="shipping_form.description_input"
                    className="bg-muted border-border focus:border-secondary min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Weight (kg) *
                  </Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={shipment.weight}
                    onChange={(e) => updateShipment("weight", e.target.value)}
                    required
                    placeholder="5.0"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Quantity *
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    step="1"
                    value={shipment.quantity}
                    onChange={(e) => updateShipment("quantity", e.target.value)}
                    required
                    placeholder="1"
                    className="bg-muted border-border focus:border-secondary h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Delivery Type *
                  </Label>
                  <Select
                    onValueChange={(v) => updateShipment("deliveryType", v)}
                    required
                  >
                    <SelectTrigger className="bg-muted border-border focus:border-secondary h-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ backgroundColor: "oklch(0.19 0.065 247)" }}
                    >
                      <SelectItem
                        value={Variant_express_priority_standard.standard}
                      >
                        Standard
                      </SelectItem>
                      <SelectItem
                        value={Variant_express_priority_standard.express}
                      >
                        Express
                      </SelectItem>
                      <SelectItem
                        value={Variant_express_priority_standard.priority}
                      >
                        Priority
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-foreground/80">
                    Shipment Category *
                  </Label>
                  <Select
                    onValueChange={(v) => updateShipment("category", v)}
                    required
                  >
                    <SelectTrigger className="bg-muted border-border focus:border-secondary h-10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent
                      style={{ backgroundColor: "oklch(0.19 0.065 247)" }}
                    >
                      <SelectItem
                        value={Variant_cargo_freight_document_parcel.document_}
                      >
                        Document
                      </SelectItem>
                      <SelectItem
                        value={Variant_cargo_freight_document_parcel.parcel}
                      >
                        Parcel
                      </SelectItem>
                      <SelectItem
                        value={Variant_cargo_freight_document_parcel.cargo}
                      >
                        Cargo
                      </SelectItem>
                      <SelectItem
                        value={Variant_cargo_freight_document_parcel.freight}
                      >
                        Freight
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              data-ocid="shipping_form.submit_button"
              className="w-full h-14 font-bold text-base tracking-widest gap-3"
              style={{
                backgroundColor: "oklch(0.82 0.11 75)",
                color: "oklch(0.13 0.04 248)",
              }}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Package size={20} />
              )}
              CREATE SHIPPING ORDER
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
