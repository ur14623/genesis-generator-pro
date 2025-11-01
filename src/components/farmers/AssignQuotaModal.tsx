import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AssignQuotaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AssignQuotaModal = ({ open, onOpenChange }: AssignQuotaModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Quota assigned successfully!");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Assign Quota to Farmer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <p className="font-semibold">Farmer: Abebe Kebede (F-00123)</p>
            <p className="text-sm text-muted-foreground">Kebele: 02-Bole | Land Size: 2.5 Hectares</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">📅</span>
              <span>Quota Allocation</span>
            </div>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select defaultValue="2024" required>
                  <SelectTrigger id="year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fertilizer">Fertilizer Type *</Label>
                <Select required>
                  <SelectTrigger id="fertilizer">
                    <SelectValue placeholder="Select fertilizer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urea">UREA</SelectItem>
                    <SelectItem value="dap">DAP</SelectItem>
                    <SelectItem value="nps">NPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Allocation Amount (Quintals) *</Label>
                <Input id="amount" type="number" step="0.1" required placeholder="2.0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason *</Label>
                <Select required>
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Allocation</SelectItem>
                    <SelectItem value="additional">Additional Allocation</SelectItem>
                    <SelectItem value="adjustment">Adjustment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="effectiveDate">Effective Date *</Label>
                <Input id="effectiveDate" type="date" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input id="expiryDate" type="date" required />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes or comments" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">📊</span>
              <span>Allocation Summary</span>
            </div>
            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm p-4 bg-muted rounded-lg">
              <div>
                <p className="text-muted-foreground">Current Allocation</p>
                <p className="font-semibold">2.0 Quintals</p>
              </div>
              <div>
                <p className="text-muted-foreground">Previous Year (2023)</p>
                <p className="font-semibold">1.5 Quintals</p>
              </div>
              <div>
                <p className="text-muted-foreground">Kebele Average</p>
                <p className="font-semibold">1.8 Quintals</p>
              </div>
              <div>
                <p className="text-muted-foreground">Land Size Based</p>
                <p className="font-semibold text-success">2.0 Quintals (Recommended)</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Assigning..." : "Assign Quota"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
