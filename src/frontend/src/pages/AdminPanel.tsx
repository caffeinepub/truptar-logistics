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
import { useEffect, useState } from "react";
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

const SKY = "oklch(0.68 0.16 215)";
const ORANGE = "oklch(0.72 0.19 42)";
const LIGHT_BLUE = "oklch(0.75 0.15 200)";
const BG_CARD = "oklch(0.18 0.05 225)";
const BG_DARK = "oklch(0.14 0.04 225)";
const BG_SIDEBAR = "oklch(0.16 0.05 225)";
const BORDER = "oklch(0.28 0.07 220)";

type OrderStatus =
  | "Processing"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered";

const STATUS_SEQUENCE: OrderStatus[] = [
  "Processing",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

type ServiceRequest = {
  serviceType: string;
  submittedAt: string;
  [key: string]: string | boolean | number;
};

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
          `linear-gradient(135deg, ${BG_CARD} 0%, oklch(0.22 0.06 225) 100%)`,
        borderColor: `${color}55`,
        boxShadow: `0 4px 20px ${color}22`,
      }}
    >
      <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}22` }}>
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
  localStatus,
  onUpdate,
  isUpdating,
}: {
  order: ShippingOrder;
  localStatus?: OrderStatus;
  onUpdate: (
    orderId: string,
    backendStatus: Variant_cancelled_pending_in_transit_delivered,
    localStatus: OrderStatus,
  ) => void;
  isUpdating: boolean;
}) {
  const currentLocal = localStatus ?? "Processing";

  const statusColor: Record<OrderStatus, string> = {
    Processing: "oklch(0.78 0.17 55)",
    "In Transit": SKY,
    "Out for Delivery": ORANGE,
    Delivered: LIGHT_BLUE,
  };

  const backendMap: Record<
    OrderStatus,
    Variant_cancelled_pending_in_transit_delivered
  > = {
    Processing: Variant_cancelled_pending_in_transit_delivered.pending,
    "In Transit": Variant_cancelled_pending_in_transit_delivered.in_transit,
    "Out for Delivery":
      Variant_cancelled_pending_in_transit_delivered.in_transit,
    Delivered: Variant_cancelled_pending_in_transit_delivered.delivered,
  };

  return (
    <div
      className="rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center gap-4"
      style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
      data-ocid="admin.tracking.row"
    >
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-foreground/70 truncate">
          {order.id}
        </p>
        <p className="text-sm font-semibold mt-0.5" style={{ color: SKY }}>
          {order.sender.name} → {order.receiver.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {order.sender.city} → {order.receiver.city}
        </p>
      </div>
      <div
        className="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
        style={{
          backgroundColor: `${statusColor[currentLocal]}22`,
          color: statusColor[currentLocal],
        }}
      >
        {currentLocal}
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUS_SEQUENCE.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={currentLocal === s ? "default" : "outline"}
            disabled={isUpdating}
            onClick={() => onUpdate(order.id, backendMap[s], s)}
            className="text-xs h-7 px-3"
            style={{
              backgroundColor:
                currentLocal === s ? `${statusColor[s]}33` : "transparent",
              borderColor: `${statusColor[s]}55`,
              color: statusColor[s],
            }}
            data-ocid={`admin.tracking.${s.replace(/ /g, "_").toLowerCase()}_button`}
          >
            {s}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { login, clear, identity, loginStatus } = useInternetIdentity();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [localStatuses, setLocalStatuses] = useState<
    Record<string, OrderStatus>
  >(() => {
    try {
      return JSON.parse(localStorage.getItem("truptar_order_statuses") ?? "{}");
    } catch {
      return {};
    }
  });
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const {
    data: orders = [],
    isLoading: ordersLoading,
    refetch,
  } = useAllOrders();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  useEffect(() => {
    if (activeTab === "service-requests") {
      try {
        const reqs = JSON.parse(
          localStorage.getItem("truptar_service_requests") ?? "[]",
        );
        setServiceRequests(reqs);
      } catch {
        setServiceRequests([]);
      }
    }
  }, [activeTab]);

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
    backendStatus: Variant_cancelled_pending_in_transit_delivered,
    localStatus: OrderStatus,
  ) {
    try {
      await updateStatus({ orderId, status: backendStatus });
      const updated = { ...localStatuses, [orderId]: localStatus };
      setLocalStatuses(updated);
      localStorage.setItem("truptar_order_statuses", JSON.stringify(updated));
      toast.success(`Order status updated to "${localStatus}"`);
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  }

  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.11 0.04 225) 0%, oklch(0.16 0.06 215) 100%)",
        }}
      >
        <div
          className="w-full max-w-md rounded-2xl border p-10 text-center"
          style={{
            backgroundColor: "oklch(0.17 0.05 225)",
            borderColor: `${SKY}44`,
            boxShadow: `0 0 60px ${SKY}18`,
          }}
          data-ocid="admin.login.panel"
        >
          <div
            className="inline-flex p-4 rounded-2xl mb-6"
            style={{ backgroundColor: `${SKY}18` }}
          >
            <LogIn size={36} style={{ color: SKY }} />
          </div>
          <h1
            className="text-2xl font-display font-bold mb-2"
            style={{ color: SKY }}
          >
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
              background: `linear-gradient(135deg, ${ORANGE}, oklch(0.78 0.17 55))`,
              color: BG_DARK,
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
    <div className="min-h-screen flex" style={{ backgroundColor: BG_DARK }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 border-r min-h-screen"
        style={{ backgroundColor: BG_SIDEBAR, borderColor: BORDER }}
      >
        <div className="p-6 border-b" style={{ borderColor: BORDER }}>
          <Link to="/">
            <img
              src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
              alt="Truptar Logistics"
              className="h-10 w-auto"
            />
          </Link>
          <p
            className="text-xs font-bold mt-3 tracking-widest"
            style={{ color: ORANGE }}
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
                  activeTab === tab.id ? `${SKY}18` : "transparent",
                color: activeTab === tab.id ? SKY : "oklch(0.60 0.05 225)",
                borderLeft:
                  activeTab === tab.id
                    ? `3px solid ${SKY}`
                    : "3px solid transparent",
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: BORDER }}>
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
          style={{ backgroundColor: BG_SIDEBAR, borderColor: BORDER }}
        >
          <span
            className="font-display font-bold text-sm"
            style={{ color: ORANGE }}
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
                  color: activeTab === tab.id ? SKY : "oklch(0.5 0.04 225)",
                  backgroundColor:
                    activeTab === tab.id ? `${SKY}18` : "transparent",
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
              <h1
                className="text-3xl font-display font-bold"
                style={{ color: SKY }}
              >
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
              className="gap-2"
              style={{ borderColor: `${SKY}44`, color: SKY }}
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
                  color={SKY}
                  gradient={`linear-gradient(135deg, ${BG_CARD} 0%, oklch(0.20 0.07 220) 100%)`}
                  icon={Package}
                />
                <StatCard
                  label="Processing"
                  value={stats.processing}
                  color={ORANGE}
                  gradient={`linear-gradient(135deg, ${BG_CARD} 0%, oklch(0.20 0.05 225) 100%)`}
                  icon={RefreshCw}
                />
                <StatCard
                  label="In Transit"
                  value={stats.inTransit}
                  color={LIGHT_BLUE}
                  gradient={`linear-gradient(135deg, ${BG_CARD} 0%, oklch(0.20 0.05 225) 100%)`}
                  icon={Truck}
                />
                <StatCard
                  label="Delivered"
                  value={stats.delivered}
                  color="oklch(0.78 0.17 55)"
                  gradient={`linear-gradient(135deg, ${BG_CARD} 0%, oklch(0.20 0.05 225) 100%)`}
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
                  style={{ borderColor: BORDER }}
                >
                  <div
                    className="px-6 py-4 border-b"
                    style={{ backgroundColor: BG_SIDEBAR, borderColor: BORDER }}
                  >
                    <h2
                      className="font-display font-semibold"
                      style={{ color: SKY }}
                    >
                      Recent Orders
                    </h2>
                  </div>
                  <Table>
                    <TableHeader style={{ backgroundColor: BG_SIDEBAR }}>
                      <TableRow style={{ borderColor: BORDER }}>
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
                          Admin Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 10).map((order, i) => (
                        <TableRow
                          key={order.id}
                          data-ocid={`admin.orders.row.${i + 1}`}
                          style={{
                            backgroundColor: BG_CARD,
                            borderColor: BORDER,
                          }}
                        >
                          <TableCell
                            className="font-mono text-xs"
                            style={{ color: SKY }}
                          >
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
                          <TableCell>
                            {localStatuses[order.id] ? (
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: `${ORANGE}22`,
                                  color: ORANGE,
                                }}
                              >
                                {localStatuses[order.id]}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                —
                              </span>
                            )}
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
                  style={{ borderColor: BORDER }}
                  data-ocid="admin.orders.table"
                >
                  <Table>
                    <TableHeader style={{ backgroundColor: BG_SIDEBAR }}>
                      <TableRow style={{ borderColor: BORDER }}>
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
                          Admin Status
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
                            backgroundColor: BG_CARD,
                            borderColor: BORDER,
                          }}
                        >
                          <TableCell
                            className="font-mono text-xs"
                            style={{ color: SKY }}
                          >
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
                          <TableCell>
                            {localStatuses[order.id] ? (
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor: `${ORANGE}22`,
                                  color: ORANGE,
                                }}
                              >
                                {localStatuses[order.id]}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Not set
                              </span>
                            )}
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
                      <p className="font-semibold mb-1" style={{ color: SKY }}>
                        No orders found
                      </p>
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
                  backgroundColor: `${SKY}0a`,
                  borderColor: `${SKY}33`,
                }}
              >
                <p className="text-sm text-foreground/80">
                  <span className="font-bold" style={{ color: ORANGE }}>
                    Tracking Control:
                  </span>{" "}
                  Click the status buttons on each order to update its delivery
                  status. Changes are saved instantly and reflected in the
                  customer dashboard in real time.
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
                  style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
                  data-ocid="admin.tracking.empty_state"
                >
                  <Truck
                    size={48}
                    style={{ color: `${SKY}55`, margin: "0 auto 16px" }}
                  />
                  <p className="font-semibold mb-1" style={{ color: SKY }}>
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
                      localStatus={localStatuses[order.id]}
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
              style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
            >
              <CreditCard
                size={48}
                style={{ color: `${SKY}66`, margin: "0 auto 16px" }}
              />
              <p
                className="font-display font-semibold mb-2"
                style={{ color: SKY }}
              >
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
              style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
            >
              <Users
                size={48}
                style={{ color: `${ORANGE}66`, margin: "0 auto 16px" }}
              />
              <p
                className="font-display font-semibold mb-2"
                style={{ color: ORANGE }}
              >
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
              style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
            >
              <Bell
                size={48}
                style={{ color: `${LIGHT_BLUE}66`, margin: "0 auto 16px" }}
              />
              <p
                className="font-display font-semibold mb-2"
                style={{ color: LIGHT_BLUE }}
              >
                Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Customer notification history and settings — coming soon.
              </p>
            </div>
          )}

          {/* ── Service Requests ── */}
          {activeTab === "service-requests" && (
            <div className="space-y-6">
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: `${ORANGE}0a`,
                  borderColor: `${ORANGE}33`,
                }}
              >
                <p className="text-sm" style={{ color: ORANGE }}>
                  <span className="font-bold">Service Requests</span> — All
                  service requests submitted by users appear here. These include
                  Warehousing, Express Parcel, E-commerce, Corporate Logistics,
                  Heavy Equipment, Customs Clearance, Door-to-Door, and Special
                  Requests.
                </p>
              </div>

              {serviceRequests.length === 0 ? (
                <div
                  className="rounded-xl border p-16 text-center"
                  style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
                  data-ocid="admin.service_requests.empty_state"
                >
                  <Briefcase
                    size={48}
                    style={{ color: `${ORANGE}55`, margin: "0 auto 16px" }}
                  />
                  <p className="font-semibold mb-1" style={{ color: ORANGE }}>
                    No service requests yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    When users submit service request forms, they will appear
                    here.
                  </p>
                </div>
              ) : (
                <div
                  className="space-y-4"
                  data-ocid="admin.service_requests.list"
                >
                  {serviceRequests.map((req, i) => (
                    <div
                      key={`${req.submittedAt}-${i}`}
                      className="rounded-xl border p-5"
                      style={{ backgroundColor: BG_CARD, borderColor: BORDER }}
                      data-ocid={`admin.service_requests.item.${i + 1}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: `${ORANGE}22`,
                              color: ORANGE,
                            }}
                          >
                            {req.serviceType}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground flex-shrink-0">
                          {new Date(req.submittedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.entries(req)
                          .filter(
                            ([k]) => k !== "serviceType" && k !== "submittedAt",
                          )
                          .map(([key, val]) => (
                            <div key={key}>
                              <p
                                className="text-xs font-medium mb-0.5"
                                style={{ color: SKY }}
                              >
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (s) => s.toUpperCase())}
                              </p>
                              <p className="text-sm text-foreground/90">
                                {String(val)}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
