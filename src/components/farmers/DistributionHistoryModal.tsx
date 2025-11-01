import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DistributionHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DistributionHistoryModal = ({ open, onOpenChange }: DistributionHistoryModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Distribution History: F-00123</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <p className="font-semibold">Farmer: Abebe Kebede</p>
            <p className="text-sm text-muted-foreground">Total Distributions: 15</p>
          </div>

          {/* Distribution Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Officer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>20/12/2024</TableCell>
                  <TableCell>UREA</TableCell>
                  <TableCell>B001</TableCell>
                  <TableCell>1.0 Q</TableCell>
                  <TableCell>Maria T.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>15/11/2024</TableCell>
                  <TableCell>DAP</TableCell>
                  <TableCell>B015</TableCell>
                  <TableCell>0.5 Q</TableCell>
                  <TableCell>John S.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10/10/2024</TableCell>
                  <TableCell>UREA</TableCell>
                  <TableCell>B001</TableCell>
                  <TableCell>0.5 Q</TableCell>
                  <TableCell>Maria T.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>05/09/2024</TableCell>
                  <TableCell>DAP</TableCell>
                  <TableCell>B015</TableCell>
                  <TableCell>1.0 Q</TableCell>
                  <TableCell>John S.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>25/08/2024</TableCell>
                  <TableCell>UREA</TableCell>
                  <TableCell>B002</TableCell>
                  <TableCell>0.5 Q</TableCell>
                  <TableCell>Maria T.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Distribution Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">📈</span>
              <span>Distribution Summary</span>
            </div>
            <Separator />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Total Received</p>
                <p className="text-xl font-bold">12.5 Q</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Most Frequent</p>
                <p className="text-xl font-bold">UREA</p>
                <p className="text-xs text-muted-foreground">8 distributions</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average per Distribution</p>
                <p className="text-xl font-bold">0.8 Q</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Distribution</p>
                <p className="text-xl font-bold">20/12/2024</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
