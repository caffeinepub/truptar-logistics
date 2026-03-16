import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import {
  Bell,
  Briefcase,
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  Loader2,
  LogIn,
  LogOut,
  Package,
  RefreshCw,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ShippingOrder } from "../backend.d";
import { Variant_cancelled_pending_in_transit_delivered } from "../backend.d";
import { StatusBadge } from "../components/StatusBadge";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAllOrders, useUpdateOrderStatus } from "../hooks/useQueries";

type AdminTab =
  | "dashboard"
  | "orders"
  | "payments"
  | "users"
  | "tracking"
  | "notifications"
  | "service-requests";

const TAB_CONFIG: {
  id: AdminTab;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: Package },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "users", label: "Users", icon: Users },
  { id: "tracking", label: "Tracking Control", icon: Truck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "service-requests", label: "Service Requests", icon: Briefcase },
];

function StatCard({
  label,
  value,
  color,
  gradient,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  gradient?: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className="rounded-2xl p-6 border flex items-center gap-4 transition-all hover:-translate-y-1"
      style={{
        background:
          gradient ??
          "linear-gradient(135deg, oklch(0.19 0.065 247) 0%, oklch(0.22 0.09 260) 100%)",
        borderColor: `${color}66`,
        boxShadow: `0 4px 20px ${color}22`,
      }}
    >
      <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}25` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-display font-bold" style={{ color }}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function TrackingRow({
  order,
  onUpdate,
  isUpdating,
}: {
  order: ShippingOrder;
  onUpdate: (
    orderId: string,
    status: Variant_cancelled_pending_in_transit_delivered,
  ) => void;
  isUpdating: boolean;
}) {
  return (
    <div
      className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{
        backgroundColor: "oklch(0.19 0.065 247)",
        borderColor: "oklch(0.28 0.09 258)",
      }}
      data-ocid="admin.tracking.row"
    >
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-foreground/70 truncate">
          {order.id}
        </p>
        <p className="text-sm font-semibold text-foreground mt-0.5">
          {order.sender.name} → {order.receiver.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {order.sender.city} → {order.receiver.city}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge status={order.status as string} />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={isUpdating}
          onClick={() =>
            onUpdate(
              order.id,
              Variant_cancelled_pending_in_transit_delivered.pending,
            )
          }
          className="text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/10 text-xs h-7 px-3"
          data-ocid="admin.tracking.processing_button"
        >
          Processing
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={isUpdating}
          onClick={() =>
            onUpdate(
              order.id,
              Variant_cancelled_pending_in_transit_delivered.in_transit,
            )
          }
          className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10 text-xs h-7 px-3"
          data-ocid="admin.tracking.in_transit_button"
        >
          In Transit
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={isUpdating}
          onClick={() =>
            onUpdate(
              order.id,
              Variant_cancelled_pending_in_transit_delivered.delivered,
            )
          }
          className="text-green-400 border-green-500/30 hover:bg-green-500/10 text-xs h-7 px-3"
          data-ocid="admin.tracking.delivered_button"
        >
          Delivered
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={isUpdating}
          onClick={() =>
            onUpdate(
              order.id,
              Variant_cancelled_pending_in_transit_delivered.cancelled,
            )
          }
          className="text-red-400 border-red-500/30 hover:bg-red-500/10 text-xs h-7 px-3"
          data-ocid="admin.tracking.cancel_button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const {
    data: orders = [],
    isLoading: ordersLoading,
    refetch,
  } = useAllOrders();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  const stats = {
    total: orders.length,
    processing: orders.filter((o) => (o.status as string) === "pending").length,
    inTransit: orders.filter((o) => (o.status as string) === "in_transit")
      .length,
    delivered: orders.filter((o) => (o.status as string) === "delivered")
      .length,
  };

  async function handleStatusUpdate(
    orderId: string,
    status: Variant_cancelled_pending_in_transit_delivered,
  ) {
    try {
      await updateStatus({ orderId, status });
      const label =
        status === Variant_cancelled_pending_in_transit_delivered.pending
          ? "Processing"
          : status === Variant_cancelled_pending_in_transit_delivered.in_transit
            ? "In Transit"
            : status ===
                Variant_cancelled_pending_in_transit_delivered.delivered
              ? "Delivered"
              : "Cancelled";
      toast.success(`Order status updated to ${label}`);
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  }

  // Not logged in — show auth gate
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.10 0.04 248) 0%, oklch(0.14 0.07 260) 100%)",
        }}
      >
        <div
          className="w-full max-w-md rounded-2xl border p-10 text-center"
          style={{
            backgroundColor: "oklch(0.17 0.055 248)",
            borderColor: "oklch(0.50 0.28 274 / 0.3)",
            boxShadow: "0 0 60px oklch(0.50 0.28 274 / 0.12)",
          }}
          data-ocid="admin.login.panel"
        >
          <div
            className="inline-flex p-4 rounded-2xl mb-6"
            style={{ backgroundColor: "oklch(0.50 0.28 274 / 0.12)" }}
          >
            <LogIn size={36} style={{ color: "oklch(0.50 0.28 274)" }} />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            Admin Access Required
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sign in with Internet Identity to access the Truptar Logistics admin
            panel.
          </p>
          <Button
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full h-12 font-bold text-base gap-2"
            style={{
              backgroundColor: "oklch(0.82 0.11 75)",
              color: "oklch(0.13 0.04 248)",
            }}
            data-ocid="admin.login.primary_button"
          >
            {isLoggingIn ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <LogIn size={18} />
            )}
            {isLoggingIn ? "Authenticating..." : "Login with Internet Identity"}
          </Button>
          <div className="mt-6">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "oklch(0.12 0.04 248)" }}
    >
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 border-r min-h-screen"
        style={{
          backgroundColor: "oklch(0.14 0.045 248)",
          borderColor: "oklch(0.24 0.07 252)",
        }}
      >
        <div
          className="p-6 border-b"
          style={{ borderColor: "oklch(0.24 0.07 252)" }}
        >
          <Link to="/">
            <img
              src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
              alt="Truptar Logistics"
              className="h-10 w-auto"
            />
          </Link>
          <p
            className="text-xs font-bold mt-3 tracking-widest"
            style={{ color: "oklch(0.50 0.28 274)" }}
          >
            ADMIN PANEL
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {TAB_CONFIG.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-ocid={`admin.${tab.id}.tab`}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeTab === tab.id
                    ? "oklch(0.50 0.28 274 / 0.15)"
                    : "transparent",
                color:
                  activeTab === tab.id
                    ? "oklch(0.50 0.28 274)"
                    : "oklch(0.65 0.04 248)",
                borderLeft:
                  activeTab === tab.id
                    ? "3px solid oklch(0.50 0.28 274)"
                    : "3px solid transparent",
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div
          className="p-4 border-t"
          style={{ borderColor: "oklch(0.24 0.07 252)" }}
        >
          {identity && (
            <p className="text-xs text-muted-foreground px-4 mb-2 truncate">
              {identity.getPrincipal().toString().substring(0, 20)}...
            </p>
          )}
          <button
            type="button"
            onClick={() => clear()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            data-ocid="admin.logout_button"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile topbar */}
        <div
          className="md:hidden flex items-center justify-between px-4 h-14 border-b sticky top-0 z-10"
          style={{
            backgroundColor: "oklch(0.14 0.045 248)",
            borderColor: "oklch(0.24 0.07 252)",
          }}
        >
          <span
            className="font-display font-bold text-sm"
            style={{ color: "oklch(0.50 0.28 274)" }}
          >
            ADMIN PANEL
          </span>
          <div className="flex gap-1 overflow-x-auto">
            {TAB_CONFIG.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="p-2 rounded-lg"
                data-ocid={`admin.mobile.${tab.id}.tab`}
                style={{
                  color:
                    activeTab === tab.id
                      ? "oklch(0.50 0.28 274)"
                      : "oklch(0.5 0.04 248)",
                  backgroundColor:
                    activeTab === tab.id
                      ? "oklch(0.50 0.28 274 / 0.12)"
                      : "transparent",
                }}
              >
                <tab.icon size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {TAB_CONFIG.find((t) => t.id === activeTab)?.label}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Manage your logistics operations
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="gap-2 border-border text-muted-foreground hover:text-foreground"
              data-ocid="admin.refresh_button"
            >
              <RefreshCw size={14} /> Refresh
            </Button>
          </div>

          {/* ── Dashboard ── */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Total Orders"
                  value={stats.total}
                  color="oklch(0.50 0.28 274)"
                  gradient="linear-gradient(135deg, oklch(0.18 0.08 274) 0%, oklch(0.22 0.1 270) 100%)"
                  icon={Package}
                />
                <StatCard
                  label="Processing"
                  value={stats.processing}
                  color="oklch(0.82 0.11 75)"
                  gradient="linear-gradient(135deg, oklch(0.17 0.06 60) 0%, oklch(0.21 0.09 65) 100%)"
                  icon={RefreshCw}
                />
                <StatCard
                  label="In Transit"
                  value={stats.inTransit}
                  color="oklch(0.75 0.18 195)"
                  gradient="linear-gradient(135deg, oklch(0.17 0.07 195) 0%, oklch(0.21 0.1 200) 100%)"
                  icon={Truck}
                />
                <StatCard
                  label="Delivered"
                  value={stats.delivered}
                  color="oklch(0.65 0.22 160)"
                  gradient="linear-gradient(135deg, oklch(0.17 0.08 160) 0%, oklch(0.21 0.1 155) 100%)"
                  icon={CheckCircle2}
                />
              </div>

              {ordersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.dashboard.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "oklch(0.28 0.09 258)" }}
                >
                  <div
                    className="px-6 py-4 border-b"
                    style={{
                      backgroundColor: "oklch(0.16 0.055 248)",
                      borderColor: "oklch(0.28 0.09 258)",
                    }}
                  >
                    <h2 className="font-display font-semibold text-foreground">
                      Recent Orders
                    </h2>
                  </div>
                  <Table>
                    <TableHeader
                      style={{ backgroundColor: "oklch(0.16 0.055 248)" }}
                    >
                      <TableRow style={{ borderColor: "oklch(0.28 0.09 258)" }}>
                        <TableHead className="text-muted-foreground">
                          Order ID
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Sender
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Receiver
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Status
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Type
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 10).map((order, i) => (
                        <TableRow
                          key={order.id}
                          data-ocid={`admin.orders.row.${i + 1}`}
                          style={{
                            backgroundColor: "oklch(0.19 0.065 247)",
                            borderColor: "oklch(0.24 0.07 252)",
                          }}
                        >
                          <TableCell className="font-mono text-xs text-foreground/80">
                            {order.id}
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {order.sender.name}
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {order.receiver.name}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={order.status as string} />
                          </TableCell>
                          <TableCell className="text-xs capitalize text-muted-foreground">
                            {order.shipment.deliveryType}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {orders.length === 0 && (
                    <div
                      className="py-12 text-center text-muted-foreground"
                      data-ocid="admin.orders.empty_state"
                    >
                      <Package size={36} className="mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No orders yet</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Orders ── */}
          {activeTab === "orders" && (
            <div>
              {ordersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.orders.loading_state"
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-2xl border overflow-hidden"
                  style={{ borderColor: "oklch(0.28 0.09 258)" }}
                  data-ocid="admin.orders.table"
                >
                  <Table>
                    <TableHeader
                      style={{ backgroundColor: "oklch(0.16 0.055 248)" }}
                    >
                      <TableRow style={{ borderColor: "oklch(0.28 0.09 258)" }}>
                        <TableHead className="text-muted-foreground">
                          Order ID
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Sender
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Receiver
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Status
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Delivery Type
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Route
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => (
                        <TableRow
                          key={order.id}
                          data-ocid={`admin.orders.row.${i + 1}`}
                          style={{
                            backgroundColor: "oklch(0.19 0.065 247)",
                            borderColor: "oklch(0.24 0.07 252)",
                          }}
                        >
                          <TableCell className="font-mono text-xs text-foreground/80">
                            {order.id}
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {order.sender.name}
                          </TableCell>
                          <TableCell className="text-sm text-foreground">
                            {order.receiver.name}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={order.status as string} />
                          </TableCell>
                          <TableCell className="text-xs capitalize text-muted-foreground">
                            {order.shipment.deliveryType}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {order.sender.city} → {order.receiver.city}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {orders.length === 0 && (
                    <div
                      className="py-16 text-center text-muted-foreground"
                      data-ocid="admin.all_orders.empty_state"
                    >
                      <Package size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="font-semibold mb-1">No orders found</p>
                      <p className="text-sm">
                        Orders placed by users will appear here
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ── Tracking Control ── */}
          {activeTab === "tracking" && (
            <div className="space-y-4">
              <div
                className="rounded-xl border p-4 mb-6"
                style={{
                  backgroundColor: "oklch(0.50 0.28 274 / 0.06)",
                  borderColor: "oklch(0.50 0.28 274 / 0.25)",
                }}
              >
                <p className="text-sm text-foreground/80">
                  <span
                    className="font-bold"
                    style={{ color: "oklch(0.50 0.28 274)" }}
                  >
                    Tracking Control:
                  </span>{" "}
                  Use the buttons on each order to update its status. Changes
                  are reflected immediately in the user dashboard and tracking
                  page.
                </p>
              </div>

              {ordersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="admin.tracking.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div
                  className="rounded-xl border p-16 text-center"
                  style={{
                    backgroundColor: "oklch(0.19 0.065 247)",
                    borderColor: "oklch(0.28 0.09 258)",
                  }}
                  data-ocid="admin.tracking.empty_state"
                >
                  <Truck
                    size={48}
                    style={{
                      color: "oklch(0.50 0.28 274 / 0.3)",
                      margin: "0 auto 16px",
                    }}
                  />
                  <p className="font-semibold text-foreground mb-1">
                    No active orders
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Orders from users will appear here for tracking updates
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <TrackingRow
                      key={order.id}
                      order={order}
                      onUpdate={handleStatusUpdate}
                      isUpdating={isUpdating}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Payments ── */}
          {activeTab === "payments" && (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{
                backgroundColor: "oklch(0.19 0.065 247)",
                borderColor: "oklch(0.28 0.09 258)",
              }}
            >
              <CreditCard
                size={48}
                style={{
                  color: "oklch(0.50 0.28 274 / 0.4)",
                  margin: "0 auto 16px",
                }}
              />
              <p className="font-display font-semibold text-foreground mb-2">
                Payments Management
              </p>
              <p className="text-sm text-muted-foreground">
                Payment confirmation and history — coming soon.
              </p>
            </div>
          )}

          {/* ── Users ── */}
          {activeTab === "users" && (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{
                backgroundColor: "oklch(0.19 0.065 247)",
                borderColor: "oklch(0.28 0.09 258)",
              }}
            >
              <Users
                size={48}
                style={{
                  color: "oklch(0.50 0.28 274 / 0.4)",
                  margin: "0 auto 16px",
                }}
              />
              <p className="font-display font-semibold text-foreground mb-2">
                User Management
              </p>
              <p className="text-sm text-muted-foreground">
                View and manage registered users — coming soon.
              </p>
            </div>
          )}

          {/* ── Notifications ── */}
          {activeTab === "notifications" && (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{
                backgroundColor: "oklch(0.19 0.065 247)",
                borderColor: "oklch(0.28 0.09 258)",
              }}
            >
              <Bell
                size={48}
                style={{
                  color: "oklch(0.50 0.28 274 / 0.4)",
                  margin: "0 auto 16px",
                }}
              />
              <p className="font-display font-semibold text-foreground mb-2">
                Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Customer notification history and settings — coming soon.
              </p>
            </div>
          )}

          {/* ── Service Requests ── */}
          {activeTab === "service-requests" && (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{
                backgroundColor: "oklch(0.19 0.065 247)",
                borderColor: "oklch(0.28 0.09 258)",
              }}
            >
              <Briefcase
                size={48}
                style={{
                  color: "oklch(0.50 0.28 274 / 0.4)",
                  margin: "0 auto 16px",
                }}
              />
              <p className="font-display font-semibold text-foreground mb-2">
                Service Requests
              </p>
              <p className="text-sm text-muted-foreground">
                View all user-submitted service requests — coming soon.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
