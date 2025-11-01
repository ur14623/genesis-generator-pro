import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { toast } from "sonner";

interface NewBatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewBatchModal = ({ open, onOpenChange }: NewBatchModalProps) => {
  const [year, setYear] = useState("2025");
  const [product, setProduct] = useState("");
  const [batchNumber, setBatchNumber] = useState("");

  const handleSave = () => {
    if (!product || !batchNumber) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Batch created successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading">➕ New Batch Creation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="year">📅 Allocation Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">🧪 Product Type</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UREA">UREA</SelectItem>
                <SelectItem value="DAP">DAP</SelectItem>
                <SelectItem value="NPS">NPS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="batch">🔢 Batch Number</Label>
            <Input
              id="batch"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              placeholder="B003"
            />
          </div>

          <div className="space-y-2">
            <Label>📍 Store Location</Label>
            <Button variant="outline" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Open Map
            </Button>
          </div>

          <div className="space-y-2">
            <Label>🗺️ Kebele</Label>
            <Input value="02 - Bole" disabled />
          </div>

          <div className="space-y-2">
            <Label>📦 Current Allocation</Label>
            <Input value="100 Quintals" disabled />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ❌ Cancel
          </Button>
          <Button onClick={handleSave}>
            💾 Save Batch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
