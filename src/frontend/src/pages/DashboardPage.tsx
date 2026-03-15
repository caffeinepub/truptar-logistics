import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  RefreshCw,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Variant_cancelled_pending_in_transit_delivered } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCallerProfile,
  useMyOrders,
  useSaveProfile,
} from "../hooks/useQueries";

type Tab = "overview" | "orders" | "profile";

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  }
> = {
  [Variant_cancelled_pending_in_transit_delivered.pending]: {
    label: "Pending",
    color: "oklch(0.82 0.11 75)",
    icon: Clock,
  },
  [Variant_cancelled_pending_in_transit_delivered.in_transit]: {
    label: "In Transit",
    color: "oklch(0.50 0.28 274)",
    icon: Truck,
  },
  [Variant_cancelled_pending_in_transit_delivered.delivered]: {
    label: "Delivered",
    color: "oklch(0.65 0.15 160)",
    icon: CheckCircle2,
  },
  [Variant_cancelled_pending_in_transit_delivered.cancelled]: {
    label: "Cancelled",
    color: "oklch(0.55 0.22 25)",
    icon: XCircle,
  },
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { data: orders = [], isLoading: ordersLoading } = useMyOrders();
  const { data: profile } = useCallerProfile();
  const { mutateAsync: saveProfile, isPending: savingProfile } =
    useSaveProfile();
  const { clear: logout, identity } = useInternetIdentity();

  const [profileForm, setProfileForm] = useState({
    name: profile?.name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    country: profile?.country ?? "",
  });

  const statusCounts = {
    total: orders.length,
    pending: orders.filter(
      (o) =>
        o.status === Variant_cancelled_pending_in_transit_delivered.pending,
    ).length,
    inTransit: orders.filter(
      (o) =>
        o.status === Variant_cancelled_pending_in_transit_delivered.in_transit,
    ).length,
    delivered: orders.filter(
      (o) =>
        o.status === Variant_cancelled_pending_in_transit_delivered.delivered,
    ).length,
  };

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    try {
      await saveProfile({
        ...profileForm,
        passwordHash: profile?.passwordHash ?? "",
      });
      toast.success("Profile updated!");
    } catch {
      toast.error("Failed to save profile.");
    }
  }

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  const sidebarItems: {
    id: Tab;
    icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
    label: string;
  }[] = [
    { id: "overview", icon: LayoutDashboard, label: "Overview" },
    { id: "orders", icon: Package, label: "My Orders" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 border-r min-h-screen"
        style={{
          backgroundColor: "oklch(0.14 0.045 248)",
          borderColor: "oklch(0.24 0.07 252)",
        }}
      >
        {/* Logo area */}
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
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              data-ocid={`dashboard.${item.id === "orders" ? "orders" : item.id}_tab`}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeTab === item.id
                    ? "oklch(0.50 0.28 274 / 0.15)"
                    : "transparent",
                color:
                  activeTab === item.id
                    ? "oklch(0.50 0.28 274)"
                    : "oklch(0.65 0.04 248)",
                borderLeft:
                  activeTab === item.id
                    ? "3px solid oklch(0.50 0.28 274)"
                    : "3px solid transparent",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + logout */}
        <div
          className="p-4 border-t"
          style={{ borderColor: "oklch(0.24 0.07 252)" }}
        >
          {identity && (
            <p className="text-xs text-muted-foreground px-4 mb-3 truncate">
              {identity.getPrincipal().toString().substring(0, 18)}...
            </p>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <LogOut size={18} />
            Logout
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
          <img
            src="/assets/generated/truptar-logo-transparent.dim_600x180.png"
            alt="Truptar"
            className="h-8 w-auto"
          />
          <div className="flex gap-1">
            {sidebarItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="p-2 rounded-lg"
                style={{
                  color:
                    activeTab === item.id
                      ? "oklch(0.50 0.28 274)"
                      : "oklch(0.65 0.04 248)",
                }}
              >
                <item.icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground mb-1">
                  Welcome back{profile?.name ? `, ${profile.name}` : ""}!
                </h1>
                <p className="text-muted-foreground">
                  Here's an overview of your logistics activity.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Orders",
                    value: statusCounts.total,
                    icon: Package,
                    color: "oklch(0.50 0.28 274)",
                  },
                  {
                    label: "Pending",
                    value: statusCounts.pending,
                    icon: Clock,
                    color: "oklch(0.82 0.11 75)",
                  },
                  {
                    label: "In Transit",
                    value: statusCounts.inTransit,
                    icon: Truck,
                    color: "oklch(0.55 0.18 210)",
                  },
                  {
                    label: "Delivered",
                    value: statusCounts.delivered,
                    icon: CheckCircle2,
                    color: "oklch(0.65 0.15 160)",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-5 border"
                    style={{
                      backgroundColor: "oklch(0.19 0.065 247)",
                      borderColor: "oklch(0.28 0.09 258)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                      <stat.icon size={16} style={{ color: stat.color }} />
                    </div>
                    <p className="text-3xl font-display font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div
                className="rounded-xl p-6 border"
                style={{
                  backgroundColor: "oklch(0.19 0.065 247)",
                  borderColor: "oklch(0.50 0.28 274 / 0.3)",
                }}
              >
                <h2 className="font-display font-bold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Link to="/shipping-form">
                    <Button
                      className="gap-2"
                      style={{
                        backgroundColor: "oklch(0.82 0.11 75)",
                        color: "oklch(0.13 0.04 248)",
                      }}
                    >
                      <Plus size={16} /> New Shipment
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="gap-2 border-secondary text-secondary hover:bg-secondary/10"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package size={16} /> View Orders
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 border-border text-muted-foreground hover:text-foreground"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User size={16} /> Edit Profile
                  </Button>
                </div>
              </div>

              {/* Recent orders */}
              {orders.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-bold text-foreground">
                      Recent Orders
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-medium flex items-center gap-1"
                      style={{ color: "oklch(0.50 0.28 274)" }}
                    >
                      View all <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order, i) => {
                      const sc =
                        STATUS_CONFIG[order.status as string] ??
                        STATUS_CONFIG.pending;
                      return (
                        <div
                          key={order.id}
                          className="flex items-center gap-4 rounded-xl p-4 border"
                          style={{
                            backgroundColor: "oklch(0.19 0.065 247)",
                            borderColor: "oklch(0.28 0.09 258)",
                          }}
                          data-ocid={`dashboard.orders.row.${i + 1}`}
                        >
                          <div
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: `${sc.color}1a` }}
                          >
                            <sc.icon size={16} style={{ color: sc.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {order.id}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.sender.city} → {order.receiver.city}
                            </p>
                          </div>
                          <span
                            className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                            style={{
                              backgroundColor: `${sc.color}1a`,
                              color: sc.color,
                            }}
                          >
                            {sc.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-display font-bold text-foreground">
                    My Orders
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {orders.length} shipment{orders.length !== 1 ? "s" : ""}{" "}
                    found
                  </p>
                </div>
                <Link to="/shipping-form">
                  <Button
                    className="gap-2"
                    style={{
                      backgroundColor: "oklch(0.82 0.11 75)",
                      color: "oklch(0.13 0.04 248)",
                    }}
                  >
                    <Plus size={16} /> New Order
                  </Button>
                </Link>
              </div>

              {ordersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="dashboard.orders.loading_state"
                >
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div
                  className="rounded-xl p-16 border text-center"
                  style={{
                    backgroundColor: "oklch(0.19 0.065 247)",
                    borderColor: "oklch(0.28 0.09 258)",
                  }}
                  data-ocid="dashboard.orders.empty_state"
                >
                  <Package
                    size={48}
                    style={{
                      color: "oklch(0.50 0.28 274 / 0.4)",
                      margin: "0 auto 16px",
                    }}
                  />
                  <p className="font-display font-semibold text-foreground mb-2">
                    No orders yet
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Create your first shipping order to get started.
                  </p>
                  <Link to="/shipping-form">
                    <Button
                      style={{
                        backgroundColor: "oklch(0.82 0.11 75)",
                        color: "oklch(0.13 0.04 248)",
                      }}
                      className="gap-2"
                    >
                      <Plus size={16} /> Create Order
                    </Button>
                  </Link>
                </div>
              ) : (
                <div
                  className="rounded-xl border overflow-hidden"
                  style={{ borderColor: "oklch(0.28 0.09 258)" }}
                  data-ocid="dashboard.orders.table"
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
                          Status
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          From → To
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Type
                        </TableHead>
                        <TableHead className="text-muted-foreground">
                          Category
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, i) => {
                        const sc =
                          STATUS_CONFIG[order.status as string] ??
                          STATUS_CONFIG.pending;
                        return (
                          <TableRow
                            key={order.id}
                            data-ocid={`dashboard.orders.row.${i + 1}`}
                            style={{
                              backgroundColor: "oklch(0.19 0.065 247)",
                              borderColor: "oklch(0.24 0.07 252)",
                            }}
                          >
                            <TableCell className="font-mono text-xs text-foreground/80">
                              {order.id}
                            </TableCell>
                            <TableCell>
                              <span
                                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                                style={{
                                  backgroundColor: `${sc.color}1a`,
                                  color: sc.color,
                                }}
                              >
                                {sc.label}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-foreground/80">
                              {order.sender.city} → {order.receiver.city}
                            </TableCell>
                            <TableCell className="text-sm capitalize text-foreground/70">
                              {order.shipment.deliveryType}
                            </TableCell>
                            <TableCell className="text-sm capitalize text-foreground/70">
                              {order.shipment.category}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  My Profile
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your account details
                </p>
              </div>

              <div
                className="rounded-xl p-8 border max-w-2xl"
                style={{
                  backgroundColor: "oklch(0.19 0.065 247)",
                  borderColor: "oklch(0.28 0.09 258)",
                }}
              >
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-foreground/80">
                        Full Name
                      </Label>
                      <Input
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                        placeholder="John Doe"
                        data-ocid="dashboard.profile_tab"
                        className="bg-muted border-border focus:border-secondary h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-foreground/80">
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        placeholder="you@email.com"
                        className="bg-muted border-border focus:border-secondary h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-foreground/80">
                        Phone
                      </Label>
                      <Input
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+234 000 0000 000"
                        className="bg-muted border-border focus:border-secondary h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-foreground/80">
                        Country
                      </Label>
                      <Input
                        value={profileForm.country}
                        onChange={(e) =>
                          setProfileForm((p) => ({
                            ...p,
                            country: e.target.value,
                          }))
                        }
                        placeholder="Nigeria"
                        className="bg-muted border-border focus:border-secondary h-10"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={savingProfile}
                    data-ocid="dashboard.profile_tab"
                    className="gap-2"
                    style={{
                      backgroundColor: "oklch(0.82 0.11 75)",
                      color: "oklch(0.13 0.04 248)",
                    }}
                  >
                    {savingProfile ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : null}
                    Save Changes
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
