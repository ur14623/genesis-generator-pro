import { useState } from "react";
import { Download, Eye, MapPin, TrendingUp, Users, Package, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/StatsCard";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Kebeles = () => {
  const kebeles = [
    { id: "02-Bole", farmers: 450, quotaUsed: 180, quotaTotal: 200, coverage: 93, status: "high" },
    { id: "03-Gule", farmers: 380, quotaUsed: 160, quotaTotal: 180, coverage: 92, status: "high" },
    { id: "04-Arada", farmers: 320, quotaUsed: 120, quotaTotal: 150, coverage: 88, status: "medium" },
    { id: "05-Kolfe", farmers: 100, quotaUsed: 50, quotaTotal: 70, coverage: 80, status: "low" },
    { id: "06-Saris", farmers: 150, quotaUsed: 40, quotaTotal: 60, coverage: 85, status: "medium" },
  ];

  const inventory = [
    { product: "UREA", total: 500, allocated: 400, available: 100, status: "high" },
    { product: "DAP", total: 400, allocated: 350, available: 50, status: "medium" },
    { product: "NPS", total: 300, allocated: 250, available: 50, status: "medium" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high":
        return <Badge className="bg-green-500">🟢</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">🟡</Badge>;
      case "low":
        return <Badge className="bg-red-500">🔴</Badge>;
      default:
        return <Badge>-</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Woreda Management Portal</h1>
          <p className="text-muted-foreground mt-1">🏛️ Woreda: Bole Woreda | 📅 Today: 25 December 2024</p>
        </div>
      </div>

      {/* Woreda Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Kebeles"
          value="5"
          icon={MapPin}
          variant="default"
        />
        <StatsCard
          title="Total Farmers"
          value="2,500"
          icon={Users}
          variant="default"
        />
        <StatsCard
          title="Fertilizer Distributed"
          value="1,250Q"
          icon={Package}
          variant="success"
        />
        <StatsCard
          title="Quota Usage"
          value="85%"
          icon={Target}
          variant="default"
          trend={{ value: "85%", isPositive: true }}
        />
      </div>

      {/* Kebele Performance */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">🏠 Kebele Performance</h2>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kebele</TableHead>
                <TableHead>Farmers</TableHead>
                <TableHead>Quota Used</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kebeles.map((kebele) => (
                <TableRow key={kebele.id}>
                  <TableCell className="font-medium">{kebele.id}</TableCell>
                  <TableCell>{kebele.farmers}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{kebele.quotaUsed}/{kebele.quotaTotal}Q</div>
                      <Progress value={(kebele.quotaUsed / kebele.quotaTotal) * 100} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{kebele.coverage}%</TableCell>
                  <TableCell>{getStatusBadge(kebele.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Woreda Inventory Status */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">📦 Woreda Inventory Status</h2>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Total Stock</TableHead>
                <TableHead>Allocated</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.product}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.total}Q</TableCell>
                  <TableCell>{item.allocated}Q</TableCell>
                  <TableCell>{item.available}Q</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">🚀 Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="h-auto py-6 flex-col gap-2">
            <Package className="h-6 w-6" />
            <span>Receive Stock</span>
          </Button>
          <Button className="h-auto py-6 flex-col gap-2">
            <Target className="h-6 w-6" />
            <span>Assign Quota</span>
          </Button>
          <Button className="h-auto py-6 flex-col gap-2">
            <TrendingUp className="h-6 w-6" />
            <span>Reports</span>
          </Button>
          <Button className="h-auto py-6 flex-col gap-2">
            <MapPin className="h-6 w-6" />
            <span>View Map</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Kebeles;
