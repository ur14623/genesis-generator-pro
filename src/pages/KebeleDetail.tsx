import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Target, Package, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const KebeleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on id
  const kebeleData = {
    id: id || "02-Bole",
    name: id?.split("-")[1] || "Bole",
    totalFarmers: 450,
    landArea: 810,
    manager: "Abebe Kebede",
    contact: "+251-91-123-4567",
    status: "active",
  };

  const quotaAllocation = [
    { product: "UREA", allocation: 200, distributed: 180, balance: 20, usage: 90 },
    { product: "DAP", allocation: 150, distributed: 140, balance: 10, usage: 93 },
    { product: "NPS", allocation: 100, distributed: 90, balance: 10, usage: 90 },
  ];

  const totalQuota = {
    allocation: quotaAllocation.reduce((sum, item) => sum + item.allocation, 0),
    distributed: quotaAllocation.reduce((sum, item) => sum + item.distributed, 0),
    balance: quotaAllocation.reduce((sum, item) => sum + item.balance, 0),
  };

  const inventory = [
    { product: "UREA", stock: 45, minLevel: 20, status: "adequate" },
    { product: "DAP", stock: 35, minLevel: 15, status: "adequate" },
    { product: "NPS", stock: 25, minLevel: 10, status: "adequate" },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge className="bg-green-500">🟢 Active</Badge>;
    }
    return <Badge className="bg-gray-500">Inactive</Badge>;
  };

  const getInventoryStatus = (status: string) => {
    if (status === "adequate") {
      return <span className="text-green-600">🟢 Adequate</span>;
    }
    return <span className="text-red-600">🔴 Low</span>;
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/kebeles/management")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-heading text-foreground">
              Kebele Detail: {kebeleData.id}
            </h1>
            <p className="text-muted-foreground mt-1">Comprehensive kebele information and analytics</p>
          </div>
        </div>
      </div>

      {/* Kebele Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">📋 Kebele Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Kebele ID:</span>
              <span>{kebeleData.id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Total Farmers:</span>
              <span>{kebeleData.totalFarmers}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Total Land Area:</span>
              <span>{kebeleData.landArea} Hectares</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Kebele Manager:</span>
              <span>{kebeleData.manager}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Contact:</span>
              <span>{kebeleData.contact}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">Status:</span>
              <span>{getStatusBadge(kebeleData.status)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Quota Allocation */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">📅 Current Quota Allocation (2024)</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Allocation</TableHead>
                <TableHead>Distributed</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotaAllocation.map((item) => (
                <TableRow key={item.product}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.allocation}Q</TableCell>
                  <TableCell>{item.distributed}Q</TableCell>
                  <TableCell>{item.balance}Q</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{item.usage}%</div>
                      <Progress value={item.usage} className="h-2" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-semibold">
                <TableCell>TOTAL</TableCell>
                <TableCell>{totalQuota.allocation}Q</TableCell>
                <TableCell>{totalQuota.distributed}Q</TableCell>
                <TableCell>{totalQuota.balance}Q</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {Math.round((totalQuota.distributed / totalQuota.allocation) * 100)}%
                    </div>
                    <Progress 
                      value={(totalQuota.distributed / totalQuota.allocation) * 100} 
                      className="h-2" 
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Current Inventory */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">📦 Current Inventory</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead>Min Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.product}>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.stock}Q</TableCell>
                  <TableCell>{item.minLevel}Q</TableCell>
                  <TableCell>{getInventoryStatus(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Action Buttons */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button className="h-auto py-6 flex-col gap-2">
            <Edit className="h-5 w-5" />
            <span>Edit Kebele</span>
          </Button>
          <Button className="h-auto py-6 flex-col gap-2">
            <Target className="h-5 w-5" />
            <span>Adjust Quota</span>
          </Button>
          <Button className="h-auto py-6 flex-col gap-2">
            <Package className="h-5 w-5" />
            <span>Transfer Stock</span>
          </Button>
          <Button className="h-auto py-6 flex-col gap-2">
            <BarChart3 className="h-5 w-5" />
            <span>View Reports</span>
          </Button>
          <Button className="h-auto py-6 flex-col gap-2">
            <Users className="h-5 w-5" />
            <span>Farmer List</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default KebeleDetail;
