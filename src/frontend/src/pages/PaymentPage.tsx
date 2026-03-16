import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Banknote,
  CheckCircle2,
  CreditCard,
  Hash,
  Smartphone,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type PaymentMethod = "bank" | "crypto" | "card" | "mobile";

interface PendingOrder {
  orderNumber: string;
  [key: string]: any;
}

const METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { id: "bank", label: "Bank Transfer", icon: <Banknote size={20} /> },
  { id: "crypto", label: "Crypto Wallet", icon: <Wallet size={20} /> },
  { id: "card", label: "Card Payment", icon: <CreditCard size={20} /> },
  { id: "mobile", label: "Mobile Money", icon: <Smartphone size={20} /> },
];

function DetailBlock({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div
      className="rounded-xl p-5 space-y-3"
      style={{
        backgroundColor: "oklch(0.16 0.06 248)",
        border: "1px solid oklch(0.28 0.09 258)",
      }}
    >
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4"
        >
          <span
            className="text-xs font-semibold uppercase tracking-wider w-36 shrink-0"
            style={{ color: "oklch(0.60 0.08 248)" }}
          >
            {r.label}
          </span>
          <span className="font-mono text-sm text-foreground select-all">
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function PaymentDetails({ method }: { method: PaymentMethod }) {
  if (method === "bank") {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground/80 mb-3">
          Transfer to the account below:
        </p>
        <DetailBlock
          rows={[
            { label: "Bank Name", value: "First Bank Nigeria" },
            { label: "Account Name", value: "JUVENTUS SOPS LTD" },
            { label: "Account Number", value: "3012345678" },
          ]}
        />
      </div>
    );
  }
  if (method === "crypto") {
    return (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground/80 mb-3">
          Send crypto to the address below:
        </p>
        <DetailBlock
          rows={[
            {
              label: "Wallet Address",
              value: "0x742d35Cc6634C0532925a3b8D4C9D5F3b2E1a8f9",
            },
            { label: "Accepted", value: "USDT / BTC" },
          ]}
        />
        <p className="text-xs text-muted-foreground">
          ⚠️ Double-check the address before sending. Crypto transactions are
          irreversible.
        </p>
      </div>
    );
  }
  if (method === "card") {
    return (
      <div
        className="rounded-xl p-5 text-sm"
        style={{
          backgroundColor: "oklch(0.16 0.06 248)",
          border: "1px solid oklch(0.28 0.09 258)",
        }}
      >
        <p className="text-foreground">
          Card payment processing is available. Use the secure payment link sent
          to your email after order creation.
        </p>
        <p className="text-muted-foreground mt-2 text-xs">
          Contact support if you did not receive the payment link.
        </p>
      </div>
    );
  }
  // mobile
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-foreground/80 mb-3">
        Send payment via Mobile Money:
      </p>
      <DetailBlock
        rows={[
          { label: "Phone", value: "+234 800 TRUPTAR" },
          { label: "Network", value: "MTN / Airtel / Glo" },
        ]}
      />
    </div>
  );
}

export default function PaymentPage() {
  const [order, setOrder] = useState<PendingOrder | null>(null);
  const [method, setMethod] = useState<PaymentMethod>("bank");
  const [answered, setAnswered] = useState<"yes" | "no" | null>(null);
  const [reference, setReference] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem("truptar_pending_order");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();
    if (!reference.trim()) return;
    setSubmitted(true);
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="payment.page"
    >
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div
              className="inline-flex p-3 rounded-xl mb-4"
              style={{ backgroundColor: "oklch(0.50 0.28 274 / 0.12)" }}
            >
              <Banknote size={28} style={{ color: "oklch(0.50 0.28 274)" }} />
            </div>
            <h1 className="text-3xl font-display font-extrabold text-foreground mb-2">
              Complete Your Logistics Payment
            </h1>
            {order && (
              <div
                className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "oklch(0.82 0.11 75 / 0.1)",
                  border: "1px solid oklch(0.82 0.11 75 / 0.3)",
                }}
              >
                <Hash size={14} style={{ color: "oklch(0.82 0.11 75)" }} />
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: "oklch(0.82 0.11 75)" }}
                >
                  {order.orderNumber}
                </span>
              </div>
            )}
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              data-ocid="payment.success_state"
              className="rounded-2xl p-10 text-center border"
              style={{
                backgroundColor: "oklch(0.19 0.065 247)",
                borderColor: "oklch(0.82 0.11 75 / 0.4)",
                boxShadow: "0 0 50px oklch(0.82 0.11 75 / 0.1)",
              }}
            >
              <div
                className="inline-flex p-5 rounded-full mb-5"
                style={{ backgroundColor: "oklch(0.82 0.11 75 / 0.12)" }}
              >
                <CheckCircle2
                  size={48}
                  style={{ color: "oklch(0.82 0.11 75)" }}
                />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                Payment Submitted!
              </h2>
              <p className="text-muted-foreground mb-2">
                Your payment has been submitted for verification.
              </p>
              <p
                className="font-semibold mb-6"
                style={{ color: "oklch(0.82 0.11 75)" }}
              >
                Your order{" "}
                <span className="font-mono">{order?.orderNumber}</span> is now
                being activated.
              </p>
              <Link to="/dashboard">
                <Button
                  className="gap-2 font-bold"
                  style={{
                    backgroundColor: "oklch(0.50 0.28 274)",
                    color: "white",
                  }}
                >
                  Go to Dashboard <ArrowRight size={16} />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Payment Method Selector */}
              <div
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "oklch(0.19 0.065 247)",
                  borderColor: "oklch(0.28 0.09 258)",
                }}
              >
                <h2 className="font-display font-bold text-foreground mb-4">
                  Select Payment Method
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      data-ocid={`payment.${m.id === "bank" ? "bank_transfer" : m.id === "crypto" ? "crypto" : m.id === "card" ? "card" : "mobile_money"}_tab`}
                      onClick={() => {
                        setMethod(m.id);
                        setAnswered(null);
                      }}
                      className="flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200 border cursor-pointer"
                      style={{
                        backgroundColor:
                          method === m.id
                            ? "oklch(0.50 0.28 274 / 0.15)"
                            : "oklch(0.16 0.06 248)",
                        borderColor:
                          method === m.id
                            ? "oklch(0.50 0.28 274)"
                            : "oklch(0.28 0.09 258)",
                        color:
                          method === m.id
                            ? "oklch(0.80 0.15 274)"
                            : "oklch(0.65 0.05 248)",
                      }}
                    >
                      {m.icon}
                      <span className="text-xs font-semibold text-center leading-tight">
                        {m.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <motion.div
                key={method}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "oklch(0.19 0.065 247)",
                  borderColor: "oklch(0.28 0.09 258)",
                }}
              >
                <h2 className="font-display font-bold text-foreground mb-4">
                  Payment Instructions
                </h2>
                <PaymentDetails method={method} />
              </motion.div>

              {/* Payment Confirmation Question */}
              <div
                className="rounded-2xl p-6 border"
                style={{
                  backgroundColor: "oklch(0.19 0.065 247)",
                  borderColor: "oklch(0.50 0.28 274 / 0.35)",
                }}
              >
                <h2 className="font-display font-bold text-foreground mb-5 text-center">
                  Have you completed your payment?
                </h2>
                <div className="flex gap-4 justify-center">
                  <Button
                    data-ocid="payment.yes_button"
                    onClick={() => setAnswered("yes")}
                    className="w-28 h-12 font-bold text-base"
                    style={{
                      backgroundColor:
                        answered === "yes"
                          ? "oklch(0.82 0.11 75)"
                          : "oklch(0.82 0.11 75 / 0.15)",
                      color:
                        answered === "yes"
                          ? "oklch(0.13 0.04 248)"
                          : "oklch(0.82 0.11 75)",
                      border: "1px solid oklch(0.82 0.11 75 / 0.5)",
                    }}
                  >
                    YES
                  </Button>
                  <Button
                    data-ocid="payment.no_button"
                    onClick={() => setAnswered("no")}
                    className="w-28 h-12 font-bold text-base"
                    style={{
                      backgroundColor:
                        answered === "no"
                          ? "oklch(0.55 0.22 25)"
                          : "oklch(0.55 0.22 25 / 0.12)",
                      color:
                        answered === "no" ? "white" : "oklch(0.75 0.15 25)",
                      border: "1px solid oklch(0.55 0.22 25 / 0.5)",
                    }}
                  >
                    NO
                  </Button>
                </div>

                {/* Conditional Responses */}
                <AnimatePresence mode="wait">
                  {answered === "no" && (
                    <motion.div
                      key="no"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-5 overflow-hidden"
                    >
                      <div
                        className="rounded-xl p-4 flex items-start gap-3"
                        style={{
                          backgroundColor: "oklch(0.82 0.11 75 / 0.08)",
                          border: "1px solid oklch(0.82 0.11 75 / 0.35)",
                        }}
                      >
                        <AlertTriangle
                          size={18}
                          className="shrink-0 mt-0.5"
                          style={{ color: "oklch(0.82 0.11 75)" }}
                        />
                        <p
                          className="text-sm"
                          style={{ color: "oklch(0.82 0.11 75)" }}
                        >
                          Please complete your payment to activate your shipment
                          order.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {answered === "yes" && (
                    <motion.div
                      key="yes"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden"
                    >
                      <form onSubmit={handleConfirm} className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm text-foreground/80">
                            Payment Reference *
                          </Label>
                          <Input
                            data-ocid="payment.reference_input"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            required
                            placeholder="Enter payment reference number"
                            className="bg-muted border-border focus:border-secondary h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm text-foreground/80">
                            Upload Payment Proof (optional)
                          </Label>
                          <label
                            data-ocid="payment.upload_button"
                            className="rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-colors block"
                            style={{ borderColor: "oklch(0.28 0.09 258)" }}
                          >
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              onChange={(e) =>
                                setProofFile(e.target.files?.[0] ?? null)
                              }
                            />
                            <span
                              className="text-sm"
                              style={{ color: "oklch(0.65 0.08 248)" }}
                            >
                              {proofFile ? (
                                <span style={{ color: "oklch(0.82 0.11 75)" }}>
                                  ✓ {proofFile.name}
                                </span>
                              ) : (
                                <span>
                                  Click to upload screenshot or PDF receipt
                                </span>
                              )}
                            </span>
                          </label>
                        </div>
                        <Button
                          type="submit"
                          data-ocid="payment.confirm_button"
                          disabled={!reference.trim()}
                          className="w-full h-12 font-bold tracking-wider gap-2"
                          style={{
                            backgroundColor: "oklch(0.50 0.28 274)",
                            color: "white",
                          }}
                        >
                          <CheckCircle2 size={18} />
                          Confirm Payment
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
