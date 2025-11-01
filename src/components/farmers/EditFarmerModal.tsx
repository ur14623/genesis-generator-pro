import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface EditFarmerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditFarmerModal = ({ open, onOpenChange }: EditFarmerModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Farmer information updated successfully!");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Edit Farmer Information</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <p className="font-semibold">Farmer: F-00123 - Abebe Kebede</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">✏️</span>
              <span>Update Information</span>
            </div>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" defaultValue="+251-91-123-4567" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="abebe@email.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="kebele">Kebele *</Label>
                <Select defaultValue="02-bole" required>
                  <SelectTrigger id="kebele">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="02-bole">02 - Bole</SelectItem>
                    <SelectItem value="03-gule">03 - Gule</SelectItem>
                    <SelectItem value="04-arada">04 - Arada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="landSize">Land Size (Hectares) *</Label>
                <Input id="landSize" type="number" step="0.1" defaultValue="2.5" required />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">⚠️</span>
              <span>Status Management</span>
            </div>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div className="p-2 bg-success/10 text-success rounded-md font-semibold">
                  ✅ Active
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newStatus">Change to</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="newStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="statusReason">Reason</Label>
                <Input id="statusReason" placeholder="Reason for status change" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Input id="effectiveDate" type="date" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
