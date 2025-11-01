import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Edit, Target, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FarmerDetailViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
  onAssignQuota: () => void;
  onViewHistory: () => void;
}

export const FarmerDetailView = ({ open, onOpenChange, onEdit, onAssignQuota, onViewHistory }: FarmerDetailViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Farmer Profile: F-00123</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">👤</span>
              <span>Personal Information</span>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-semibold">Abebe Kebede</p>
              </div>
              <div>
                <p className="text-muted-foreground">Gender</p>
                <p className="font-semibold">Male</p>
              </div>
              <div>
                <p className="text-muted-foreground">Farmer ID</p>
                <p className="font-semibold">F-00123</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge variant="default">Active</Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Fayda ID</p>
                <p className="font-semibold">1234-5678-9012</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-semibold">+251-91-123-4567</p>
              </div>
              <div>
                <p className="text-muted-foreground">Kebele</p>
                <p className="font-semibold">02-Bole</p>
              </div>
              <div>
                <p className="text-muted-foreground">Registered</p>
                <p className="font-semibold">2024</p>
              </div>
              <div>
                <p className="text-muted-foreground">Land Size</p>
                <p className="font-semibold">2.5 Hectares</p>
              </div>
              <div>
                <p className="text-muted-foreground">Experience</p>
                <p className="font-semibold">8 years</p>
              </div>
            </div>
          </div>

          {/* Quota Allocation History */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">📅</span>
              <span>Quota Allocation History</span>
            </div>
            <Separator />
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2024</TableCell>
                    <TableCell>UREA</TableCell>
                    <TableCell>2.0 Q</TableCell>
                    <TableCell>1.5 Q</TableCell>
                    <TableCell>0.5 Q</TableCell>
                    <TableCell><Badge variant="default">Active</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2024</TableCell>
                    <TableCell>DAP</TableCell>
                    <TableCell>1.5 Q</TableCell>
                    <TableCell>1.5 Q</TableCell>
                    <TableCell>0.0 Q</TableCell>
                    <TableCell><Badge variant="outline">Complete</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023</TableCell>
                    <TableCell>UREA</TableCell>
                    <TableCell>1.5 Q</TableCell>
                    <TableCell>1.5 Q</TableCell>
                    <TableCell>0.0 Q</TableCell>
                    <TableCell><Badge variant="outline">Complete</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Current Year Quota */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">🚜</span>
              <span>Current Year Quota (2024)</span>
            </div>
            <Separator />
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>UREA: 0.5/2.0 Quintals Remaining</span>
                  <span className="text-muted-foreground">75% Used</span>
                </div>
                <Progress value={75} className="h-3" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>DAP: 0.0/1.5 Quintals Remaining</span>
                  <span className="text-muted-foreground">100% Used</span>
                </div>
                <Progress value={100} className="h-3" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="outline" onClick={onAssignQuota}>
              <Target className="h-4 w-4 mr-2" />
              Assign Quota
            </Button>
            <Button variant="outline" onClick={onViewHistory}>
              <FileText className="h-4 w-4 mr-2" />
              Distribution History
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
