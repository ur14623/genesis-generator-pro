import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { NewBatchModal } from "@/components/inventory/NewBatchModal";

const Inventory = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("2025");
  const [searchQuery, setSearchQuery] = useState("");
  const [productFilter, setProductFilter] = useState("All");
  const [showNewBatch, setShowNewBatch] = useState(false);

  const quotaData = [
    { product: "UREA", allocation: 100, received: 75, distributed: 30 },
    { product: "DAP", allocation: 100, received: 60, distributed: 25 },
    { product: "NPS", allocation: 100, received: 45, distributed: 20 },
  ];

  const batches = [
    { id: "B001", product: "UREA", quantity: 45, status: "active" },
    { id: "B002", product: "UREA", quantity: 25, status: "active" },
    { id: "B015", product: "DAP", quantity: 30, status: "active" },
    { id: "B016", product: "DAP", quantity: 30, status: "active" },
    { id: "B045", product: "NPS", quantity: 45, status: "active" },
    { id: "B046", product: "UREA", quantity: 0, status: "empty" },
    { id: "B047", product: "DAP", quantity: 15, status: "low" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge variant="default">✅ Active</Badge>;
      case "empty": return <Badge variant="destructive">❌ Empty</Badge>;
      case "low": return <Badge variant="outline">⚠️ Low</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-heading">Inventory Management</h1>
      </div>

      {/* Year Filter */}
      <Card className="p-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold">📅 QUOTA OVERVIEW FOR</span>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Quota Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotaData.map((item) => {
          const receivedPercentage = (item.received / item.allocation) * 100;
          const distributedPercentage = (item.distributed / item.allocation) * 100;
          
          return (
            <Card key={item.product} className="p-6">
              <h3 className="text-xl font-bold font-heading mb-4">{item.product}</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Allocation</p>
                  <p className="text-lg font-semibold">{item.allocation} Quintals</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm text-muted-foreground">Received</p>
                    <p className="text-sm font-medium">{item.received}Q ({receivedPercentage}%)</p>
                  </div>
                  <Progress value={receivedPercentage} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-sm text-muted-foreground">Distributed</p>
                    <p className="text-sm font-medium">{item.distributed}Q ({distributedPercentage}%)</p>
                  </div>
                  <Progress value={distributedPercentage} className="h-3" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Button onClick={() => setShowNewBatch(true)}>
        <Plus className="h-4 w-4 mr-2" />
        New Batch
      </Button>

      {/* Batches Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold font-heading mb-4">📋 All Inventory Batches</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Batch No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="md:w-[200px]">
              <SelectValue placeholder="🏷️ Product: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Products</SelectItem>
              <SelectItem value="UREA">UREA</SelectItem>
              <SelectItem value="DAP">DAP</SelectItem>
              <SelectItem value="NPS">NPS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">{batch.id}</TableCell>
                  <TableCell>{batch.product}</TableCell>
                  <TableCell>{batch.quantity}Q</TableCell>
                  <TableCell>{getStatusBadge(batch.status)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/inventory/${batch.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing 1–7 of 7 batches
        </div>
      </Card>

      <NewBatchModal open={showNewBatch} onOpenChange={setShowNewBatch} />
    </div>
  );
};

export default Inventory;
