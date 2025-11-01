import { Printer, MessageSquare, Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DistributionCompleteProps {
  farmerData: any;
  scannedBags: any[];
  onNewDistribution: () => void;
}

export const DistributionComplete = ({ farmerData, scannedBags, onNewDistribution }: DistributionCompleteProps) => {
  const totalQuantity = scannedBags.reduce((sum, bag) => sum + bag.quantity, 0);
  const currentDate = new Date().toLocaleDateString('en-GB');
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const distributionId = `DIST-2024-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-success/10 border-success">
        <div className="text-center mb-6">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-heading text-success">✅ DISTRIBUTION SUCCESSFUL</h2>
        </div>

        <Card className="p-6 bg-background">
          <div className="space-y-3">
            <p className="text-lg font-semibold mb-4">🎉 Fertilizer distributed successfully!</p>
            
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Farmer:</span>
                <span className="font-medium">{farmerData.name} ({farmerData.farmerId})</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Distribution ID:</span>
                <span className="font-medium">{distributionId}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Product:</span>
                <span className="font-medium">UREA - {totalQuantity} Quintals</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Batch:</span>
                <span className="font-medium">{scannedBags[0]?.batch} ({scannedBags[0]?.barcode})</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{currentDate} {currentTime}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t space-y-2">
              <p className="text-sm text-success flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                📧 SMS confirmation sent to farmer
              </p>
              <p className="text-sm text-success flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                🖨️ Receipt printed
              </p>
            </div>
          </div>
        </Card>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          <Printer className="h-4 w-4 mr-2" />
          Print Receipt
        </Button>
        <Button variant="outline" className="flex-1">
          <MessageSquare className="h-4 w-4 mr-2" />
          Send SMS
        </Button>
        <Button onClick={onNewDistribution} className="flex-1">
          <Plus className="h-4 w-4 mr-2" />
          New Distribution
        </Button>
      </div>
    </div>
  );
};
