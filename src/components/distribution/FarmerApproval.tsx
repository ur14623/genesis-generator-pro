import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FarmerApprovalProps {
  farmerData: any;
  scannedBags: any[];
  onComplete: () => void;
  onBack: () => void;
}

export const FarmerApproval = ({ farmerData, scannedBags, onComplete, onBack }: FarmerApprovalProps) => {
  const [fingerprintVerified, setFingerprintVerified] = useState(true);
  const [scanningProgress, setScanningProgress] = useState(100);

  const totalQuantity = scannedBags.reduce((sum, bag) => sum + bag.quantity, 0);
  const currentDate = new Date().toLocaleDateString('en-GB');
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-muted">
        <p className="font-medium mb-2">Farmer: {farmerData.name} ({farmerData.farmerId})</p>
        <p className="text-sm text-muted-foreground">Distribution Summary:</p>
      </Card>

      <Card className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">📦 Product:</span>
            <span className="font-medium">UREA Fertilizer</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">🔢 Bags:</span>
            <span className="font-medium">{scannedBags.length} bag ({totalQuantity} Quintals)</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">🏷️ Batch:</span>
            <span className="font-medium">{scannedBags[0]?.batch} ({scannedBags[0]?.barcode})</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">🎯 Quota Used:</span>
            <span className="font-medium">{totalQuantity}/2.0 Quintals</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">📅 Date:</span>
            <span className="font-medium">{currentDate}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">👤 Distribution Officer:</span>
            <span className="font-medium">Maria Tekle</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Fingerprint className="h-5 w-5 text-primary" />
          FARMER APPROVAL REQUIRED
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">Please scan fingerprint to confirm receipt:</p>
        
        <Card className="p-8 border-2 border-dashed bg-muted/50">
          <div className="text-center space-y-4">
            <p className="font-medium">Fingerprint Scanner</p>
            <div className="h-40 bg-background rounded-lg flex flex-col items-center justify-center gap-3">
              <Fingerprint className="h-16 w-16 text-primary" />
              <p className="text-lg">👆 Place Finger Here</p>
              {scanningProgress < 100 && (
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${scanningProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        {fingerprintVerified && (
          <Card className="p-4 bg-success/10 border-success mt-4">
            <p className="font-medium text-success">✅ Fingerprint Verified: {farmerData.name}</p>
            <p className="text-sm text-muted-foreground mt-1">📅 Time: {currentDate} {currentTime}</p>
          </Card>
        )}
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          ⬅️ Back
        </Button>
        <Button onClick={onComplete} disabled={!fingerprintVerified} className="flex-1">
          ✅ Complete Distribution
        </Button>
      </div>
    </div>
  );
};
