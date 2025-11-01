import { Users, Package, Truck, AlertCircle, TrendingUp, Activity } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Farmers",
      value: "1,248",
      icon: Users,
      trend: { value: "12% from last month", isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Current Stock",
      value: "850 Qt",
      icon: Package,
      trend: { value: "Low stock warning", isPositive: false },
      variant: "warning" as const,
    },
    {
      title: "Today's Distributions",
      value: "42",
      icon: Truck,
      trend: { value: "8% from yesterday", isPositive: true },
      variant: "default" as const,
    },
    {
      title: "Pending Tasks",
      value: "15",
      icon: AlertCircle,
      variant: "danger" as const,
    },
  ];

  const recentActivities = [
    { id: 1, farmer: "Abebe Kebede", action: "Distributed 2 Qt UREA", time: "10 mins ago", status: "completed" },
    { id: 2, farmer: "Tigist Haile", action: "Registered new farmer", time: "25 mins ago", status: "completed" },
    { id: 3, farmer: "Yohannes Tadesse", action: "Quota allocation pending", time: "1 hour ago", status: "pending" },
    { id: 4, farmer: "Marta Gebre", action: "Distributed 1.5 Qt DAP", time: "2 hours ago", status: "completed" },
  ];

  const lowStockItems = [
    { product: "UREA", batch: "BCH-001", quantity: "45 Qt", expiry: "Dec 2024", status: "low" },
    { product: "DAP", batch: "BCH-003", quantity: "12 Qt", expiry: "Jan 2025", status: "critical" },
    { product: "NPK", batch: "BCH-005", quantity: "78 Qt", expiry: "Mar 2025", status: "low" },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Reports
          </Button>
          <Button>
            <Truck className="h-4 w-4 mr-2" />
            New Distribution
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-heading">Recent Activity</h2>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between pb-4 border-b border-border last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.farmer}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <Badge variant={activity.status === "completed" ? "default" : "outline"}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-heading">Low Stock Alert</h2>
            <AlertCircle className="h-5 w-5 text-warning" />
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.batch} className="flex items-start justify-between pb-4 border-b border-border last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{item.product}</p>
                    <Badge variant={item.status === "critical" ? "destructive" : "outline"}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Batch: {item.batch}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity} | Exp: {item.expiry}</p>
                </div>
                <Button size="sm" variant="outline">
                  Restock
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
