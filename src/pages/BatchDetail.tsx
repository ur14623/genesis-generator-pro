import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AddProductModal } from "@/components/inventory/AddProductModal";

const BatchDetail = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Mock data
  const batchData = {
    batchNumber: "B001",
    barcode: "UREA-2025-B001",
    product: "UREA Fertilizer",
    year: "2025",
    kebele: "02 - Bole",
    quantity: 50,
    receivedDate: "15/12/2024",
    status: "Active",
    receivedFrom: "Agrosupply Co.",
    vehicleNumber: "B3-7890",
    receivedBy: "John Smith",
    deliveryNote: "DN-2024-0876",
    inspectionDate: "15/12/2024",
    qualityCheck: "Passed",
    initialQuantity: 50,
    distributed: 5,
    currentBalance: 45,
    availableProducts: 90,
    warehouse: "Warehouse A",
    section: "Section 2",
    shelf: "Shelf 3",
    storageType: "Dry Storage",
    latitude: 9.005,
    longitude: 38.763,
  };

  const products = [
    { id: 1, dateAdded: "15/12/2024", batchNo: "B001", barcode: "UREA-B001-001", farmerId: "-", distDate: "-", product: "UREA", status: "Available" },
    { id: 2, dateAdded: "15/12/2024", batchNo: "B001", barcode: "UREA-B001-002", farmerId: "-", distDate: "-", product: "UREA", status: "Available" },
    { id: 48, dateAdded: "15/12/2024", batchNo: "B001", barcode: "UREA-B001-048", farmerId: "F-00123", distDate: "20/12/2024", product: "UREA", status: "Distributed" },
    { id: 49, dateAdded: "15/12/2024", batchNo: "B001", barcode: "UREA-B001-049", farmerId: "F-00123", distDate: "20/12/2024", product: "UREA", status: "Distributed" },
    { id: 50, dateAdded: "15/12/2024", batchNo: "B001", barcode: "UREA-B001-050", farmerId: "F-00145", distDate: "22/12/2024", product: "UREA", status: "Distributed" },
    { id: 51, dateAdded: "15/12/2024", batchNo: "B001", barcode: "UREA-B001-051", farmerId: "-", distDate: "-", product: "UREA", status: "Damaged" },
    { id: 52, dateAdded: "15/12/2024", batchNo: "B001", barcode: "UREA-B001-052", farmerId: "F-00167", distDate: "-", product: "UREA", status: "Reserved" },
  ];

  const utilization = (batchData.distributed / batchData.initialQuantity) * 100;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Available": return <Badge variant="default">✅ Available</Badge>;
      case "Distributed": return <Badge variant="default">✅ Distributed</Badge>;
      case "Reserved": return <Badge variant="outline">🔄 Reserved</Badge>;
      case "Damaged": return <Badge variant="destructive">⚠️ Damaged</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/inventory")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold font-heading">Batch Details: {batchData.barcode}</h1>
      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold font-heading mb-4">🏷️ Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Product</p>
            <p className="font-medium">{batchData.product}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Batch</p>
            <p className="font-medium">{batchData.batchNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Barcode</p>
            <p className="font-medium font-mono">{batchData.barcode}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Allocation Year</p>
            <p className="font-medium">{batchData.year}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Kebele</p>
            <p className="font-medium">{batchData.kebele}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Quantity</p>
            <p className="font-medium">{batchData.quantity} Quintals</p>
          </div>
          <div>
            <p className="text-muted-foreground">Received Date</p>
            <p className="font-medium">{batchData.receivedDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Status</p>
            <p className="font-medium">✅ {batchData.status}</p>
          </div>
        </div>
      </Card>

      {/* Receiving Details */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold font-heading mb-4">🚚 Receiving Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Received From</p>
            <p className="font-medium">{batchData.receivedFrom}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Vehicle Number</p>
            <p className="font-medium">{batchData.vehicleNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Received By</p>
            <p className="font-medium">{batchData.receivedBy}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Delivery Note</p>
            <p className="font-medium">{batchData.deliveryNote}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Inspection Date</p>
            <p className="font-medium">{batchData.inspectionDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Quality Check</p>
            <p className="font-medium">✅ {batchData.qualityCheck}</p>
          </div>
        </div>
      </Card>

      {/* Quantity Tracking */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold font-heading mb-4">📊 Quantity Tracking</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Initial Quantity</p>
              <p className="font-medium text-lg">{batchData.initialQuantity} Quintals</p>
            </div>
            <div>
              <p className="text-muted-foreground">Distributed</p>
              <p className="font-medium text-lg">{batchData.distributed} Quintals</p>
            </div>
            <div>
              <p className="text-muted-foreground">Current Balance</p>
              <p className="font-medium text-lg">{batchData.currentBalance} Quintals</p>
            </div>
            <div>
              <p className="text-muted-foreground">Available Products</p>
              <p className="font-medium text-lg">{batchData.availableProducts} units</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Utilization</span>
              <span className="text-sm font-medium">{utilization.toFixed(0)}%</span>
            </div>
            <Progress value={utilization} className="h-3" />
          </div>
        </div>
      </Card>

      {/* Storage Location */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold font-heading mb-4">🗺️ Storage Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Warehouse</p>
            <p className="font-medium">{batchData.warehouse}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Section</p>
            <p className="font-medium">{batchData.section}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Shelf</p>
            <p className="font-medium">{batchData.shelf}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Storage Type</p>
            <p className="font-medium">{batchData.storageType}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Google Maps</p>
            <a 
              href={`https://maps.google.com/?q=${batchData.latitude},${batchData.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              <MapPin className="h-4 w-4" />
              View on Map
            </a>
          </div>
          <div>
            <p className="text-muted-foreground">Coordinates</p>
            <p className="font-medium">Lat {batchData.latitude}, Lng {batchData.longitude}</p>
          </div>
        </div>
      </Card>

      <Button onClick={() => setShowAddProduct(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Product to this Batch
      </Button>

      {/* Products Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold font-heading mb-4">Products in Batch: {batchData.barcode}</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by Barcode ID or Farmer ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:max-w-xs"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="md:max-w-[200px]">
              <SelectValue placeholder="Status: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Status: All</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Distributed">Distributed</SelectItem>
              <SelectItem value="Reserved">Reserved</SelectItem>
              <SelectItem value="Damaged">Damaged</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Batch No</TableHead>
                <TableHead>Barcode ID</TableHead>
                <TableHead>Farmer ID</TableHead>
                <TableHead>Dist Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.dateAdded}</TableCell>
                  <TableCell>{product.batchNo}</TableCell>
                  <TableCell className="font-mono text-xs">{product.barcode}</TableCell>
                  <TableCell>{product.farmerId}</TableCell>
                  <TableCell>{product.distDate}</TableCell>
                  <TableCell>{product.product}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing 1-7 of 100 products
        </div>
      </Card>

      <AddProductModal 
        open={showAddProduct}
        onOpenChange={setShowAddProduct}
        batchId={batchData.batchNumber}
      />
    </div>
  );
};

export default BatchDetail;
