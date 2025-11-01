import { Users, Package, Truck, AlertCircle, TrendingUp, Activity, Target, Clock, CheckCircle2, UserPlus, Settings, Search, Calendar, MapPin } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const stats = [
    {
      title: "Total Farmers",
      value: "1,250",
      icon: Users,
      trend: { value: "+50 from last month", isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Active Distributions",
      value: "45",
      icon: Activity,
      trend: { value: "+12 today", isPositive: true },
      variant: "default" as const,
    },
    {
      title: "This Month",
      value: "450Q",
      icon: Package,
      trend: { value: "+45Q distributed", isPositive: true },
      variant: "default" as const,
    },
    {
      title: "Stock Level",
      value: "105Q",
      icon: AlertCircle,
      trend: { value: "35% remaining", isPositive: false },
      variant: "warning" as const,
    },
    {
      title: "Quota Used",
      value: "510Q",
      icon: Target,
      trend: { value: "85% utilized", isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Coverage Rate",
      value: "90%",
      icon: CheckCircle2,
      trend: { value: "+5% increase", isPositive: true },
      variant: "success" as const,
    },
    {
      title: "Avg. Time",
      value: "7 min",
      icon: Clock,
      trend: { value: "-1m faster", isPositive: true },
      variant: "default" as const,
    },
    {
      title: "Issues Today",
      value: "2",
      icon: AlertCircle,
      variant: "warning" as const,
    },
  ];

  const weeklyData = [
    { day: "Mon", UREA: 45, DAP: 30, NPS: 25 },
    { day: "Tue", UREA: 52, DAP: 35, NPS: 28 },
    { day: "Wed", UREA: 48, DAP: 32, NPS: 30 },
    { day: "Thu", UREA: 55, DAP: 38, NPS: 32 },
    { day: "Fri", UREA: 50, DAP: 36, NPS: 28 },
    { day: "Sat", UREA: 42, DAP: 28, NPS: 22 },
    { day: "Sun", UREA: 38, DAP: 25, NPS: 20 },
  ];

  const productDistribution = [
    { name: "UREA", value: 45, color: "hsl(var(--primary))" },
    { name: "DAP", value: 30, color: "hsl(var(--success))" },
    { name: "NPS", value: 25, color: "hsl(var(--warning))" },
  ];

  const recentActivities = [
    { id: 1, time: "14:30", farmer: "Abebe K.", product: "UREA", amount: "0.5Q", status: "completed" },
    { id: 2, time: "14:15", farmer: "Tigist M.", product: "DAP", amount: "0.5Q", status: "completed" },
    { id: 3, time: "13:45", farmer: "Samuel G.", product: "UREA", amount: "0.5Q", status: "completed" },
    { id: 4, time: "13:20", farmer: "Marta A.", product: "NPS", amount: "0.5Q", status: "completed" },
    { id: 5, time: "12:55", farmer: "John D.", product: "UREA", amount: "0.5Q", status: "completed" },
    { id: 6, time: "12:30", farmer: "Helen T.", product: "DAP", amount: "0.5Q", status: "progress" },
  ];

  const alerts = [
    { id: 1, message: "UREA stock below 50%", level: "critical" },
    { id: 2, message: "DAP expiry in 30 days", level: "warning" },
    { id: 3, message: "System normal", level: "success" },
  ];

  const inventory = [
    { product: "UREA", current: 45, total: 100, percentage: 45, status: "warning" },
    { product: "DAP", current: 35, total: 100, percentage: 35, status: "warning" },
    { product: "NPS", current: 25, total: 100, percentage: 25, status: "critical" },
  ];

  const staffActivity = [
    { name: "Maria", count: 18 },
    { name: "John", count: 15 },
    { name: "Sara", count: 12 },
    { name: "David", count: 10 },
  ];

  const quickActions = [
    { icon: Truck, label: "Start Distribution", path: "/distribution" },
    { icon: UserPlus, label: "Register Farmer", path: "/farmers" },
    { icon: Package, label: "Receive Stock", path: "/inventory" },
    { icon: Search, label: "View Inventory", path: "/inventory" },
    { icon: TrendingUp, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Dashboard Overview</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Today: {currentDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Kebele: 02-Bole</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div>
        <h2 className="text-xl font-semibold font-heading mb-4">🎯 Real-time Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>

      {/* Distribution Analytics */}
      <div>
        <h2 className="text-xl font-semibold font-heading mb-4">📊 Distribution Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold font-heading mb-4">Weekly Distribution Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Legend />
                <Bar dataKey="UREA" fill="hsl(var(--primary))" />
                <Bar dataKey="DAP" fill="hsl(var(--success))" />
                <Bar dataKey="NPS" fill="hsl(var(--warning))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">Product Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={productDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div>
        <h2 className="text-xl font-semibold font-heading mb-4">🔔 Recent Activity & Alerts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold font-heading">⚡ Today's Distribution</h3>
              <Badge variant="outline">{recentActivities.length} activities</Badge>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">{activity.time}</span>
                    {activity.status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <Clock className="h-4 w-4 text-warning" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{activity.farmer}</p>
                      <p className="text-xs text-muted-foreground">{activity.product} {activity.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="link" className="w-full mt-2">View all 45 activities...</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">⚠️ System Alerts</h3>
            <div className="space-y-3 mb-6">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`h-2 w-2 rounded-full mt-1.5 ${
                    alert.level === "critical" ? "bg-destructive" : 
                    alert.level === "warning" ? "bg-warning" : "bg-success"
                  }`} />
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold font-heading mb-4">👥 Staff Activity</h3>
            <div className="space-y-3">
              {staffActivity.map((staff) => (
                <div key={staff.name} className="flex items-center justify-between">
                  <span className="text-sm">{staff.name}</span>
                  <Badge variant="outline">{staff.count} farmers</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Inventory Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold font-heading mb-4">📦 Inventory Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {inventory.map((item) => (
            <div key={item.product} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.product}</span>
                <Badge variant={item.status === "critical" ? "destructive" : "outline"}>
                  {item.percentage}%
                </Badge>
              </div>
              <Progress value={item.percentage} className="h-2" />
              <p className="text-sm text-muted-foreground">{item.current}/{item.total}Q available</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next shipment: 15/01/2025</span>
            <Badge variant="outline">Reorder needed for UREA</Badge>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold font-heading mb-4">🚀 Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Button key={action.label} variant="outline" className="h-24 flex-col gap-2">
              <action.icon className="h-6 w-6" />
              <span className="text-xs text-center">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
