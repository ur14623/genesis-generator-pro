import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera } from "lucide-react";
import { toast } from "sonner";

interface AddProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  batchId: string;
}

export const AddProductModal = ({ open, onOpenChange, batchId }: AddProductModalProps) => {
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Quintal");
  const [dateAdded, setDateAdded] = useState("");
  const [receivedFrom, setReceivedFrom] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [receivedBy, setReceivedBy] = useState("");

  const handleSave = () => {
    if (!barcode || !quantity || !dateAdded || !receivedFrom || !vehicleNumber || !receivedBy) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Product added successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">➕ Add Product to Batch</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Batch</Label>
            <Input value={`UREA-2025-${batchId}`} disabled />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">📦 Product Information</h3>
            
            <div className="space-y-2 mb-3">
              <Label htmlFor="barcode">Product Code (Barcode)</Label>
              <div className="flex gap-2">
                <Input
                  id="barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="📷 Scan or enter code"
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" value="UREA Fertilizer" disabled />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="0.1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0.5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Measurement Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Quintal">Quintal</SelectItem>
                    <SelectItem value="Kg">Kg</SelectItem>
                    <SelectItem value="Ton">Ton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateAdded">Date Added</Label>
              <Input
                id="dateAdded"
                type="date"
                value={dateAdded}
                onChange={(e) => setDateAdded(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">🚚 Receiving Information</h3>
            
            <div className="space-y-2 mb-3">
              <Label htmlFor="receivedFrom">Received From</Label>
              <Input
                id="receivedFrom"
                value={receivedFrom}
                onChange={(e) => setReceivedFrom(e.target.value)}
                placeholder="Agrosupply Co."
              />
            </div>

            <div className="space-y-2 mb-3">
              <Label htmlFor="vehicle">Vehicle Number</Label>
              <Input
                id="vehicle"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="B3-7890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receivedBy">Received By</Label>
              <Input
                id="receivedBy"
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                placeholder="John Smith"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ❌ Cancel
          </Button>
          <Button onClick={handleSave}>
            💾 Save Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
