import { useState } from "react";
import { Camera, Zap, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BagScanningProps {
  farmerData: any;
  onNext: (scannedBags: any[]) => void;
  onBack: () => void;
}

export const BagScanning = ({ farmerData, onNext, onBack }: BagScanningProps) => {
  const [scannedBags, setScannedBags] = useState([
    {
      id: 1,
      barcode: "UREA-B001-048",
      batch: "B001",
      expiry: "Dec 2024",
      quantity: 0.5,
      verified: true,
    },
  ]);

  const totalScanned = scannedBags.reduce((sum, bag) => sum + bag.quantity, 0);
  const isWithinQuota = totalScanned <= farmerData.ureaRemaining;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-muted">
        <div className="space-y-2">
          <p className="font-medium">Farmer: {farmerData.name} ({farmerData.farmerId})</p>
          <p className="text-sm text-muted-foreground">Remaining Quota: UREA {farmerData.ureaRemaining} Quintals</p>
          <p className="text-sm text-muted-foreground">Bags to Scan: 1 bag (0.5 Quintals each)</p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold font-heading mb-4 flex items-center gap-2">
          📦 SCAN FERTILIZER BAGS
        </h2>

        <Card className="p-8 border-2 border-dashed bg-muted/50 mb-4">
          <div className="text-center space-y-4">
            <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
            <p className="text-lg font-medium">🎥 Camera Active - Point at Barcode</p>
            <div className="h-40 bg-background rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Scanning...</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Capture
              </Button>
              <Button variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                Flash
              </Button>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Manual Entry
              </Button>
            </div>
          </div>
        </Card>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">✅ SCANNED BAGS ({scannedBags.length}/1)</h3>
        <div className="space-y-3">
          {scannedBags.map((bag) => (
            <Card key={bag.id} className="p-4 bg-success/10 border-success">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{bag.id}. {bag.barcode} ✅ Verified</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Batch: {bag.batch} | Expiry: {bag.expiry}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {bag.quantity} Quintals
                  </p>
                </div>
              </div>
            </Card>
          ))}
          
          <Card className={`p-4 ${isWithinQuota ? 'bg-success/10 border-success' : 'bg-destructive/10 border-destructive'}`}>
            <p className="font-medium">
              Total: {totalScanned}/{farmerData.ureaRemaining} Quintals{' '}
              {isWithinQuota ? '✅ Within quota' : '❌ Exceeds quota'}
            </p>
          </Card>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          ⬅️ Back
        </Button>
        <Button onClick={() => onNext(scannedBags)} disabled={!isWithinQuota} className="flex-1">
          ➡️ Next: Farmer Approval
        </Button>
      </div>
    </div>
  );
};
