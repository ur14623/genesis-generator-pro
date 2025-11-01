import { AlertCircle, Phone, RotateCcw, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuotaExceededProps {
  farmerData: any;
  onBack: () => void;
}

export const QuotaExceeded = ({ farmerData, onBack }: QuotaExceededProps) => {
  return (
    <div className="space-y-6">
      <Card className="p-8 bg-destructive/10 border-destructive">
        <div className="text-center mb-6">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold font-heading text-destructive">❌ Quota Exceeded</h2>
        </div>

        <Card className="p-6 bg-background">
          <div className="space-y-3">
            <p className="text-lg font-semibold mb-4">🚫 CANNOT DISTRIBUTE - QUOTA EXCEEDED</p>
            
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Farmer:</span>
                <span className="font-medium">{farmerData.name} ({farmerData.farmerId})</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Product:</span>
                <span className="font-medium">UREA</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">❌ Remaining Quota:</span>
                <span className="font-medium text-destructive">0.0 Quintals</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">✅ Already Received:</span>
                <span className="font-medium">2.0/2.0 Quintals</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">🎯 Attempted:</span>
                <span className="font-medium">0.5 Quintals</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded">
              This farmer has used all their allocated quota
            </p>
          </div>
        </Card>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          ⬅️ Back to Search
        </Button>
        <Button variant="outline" className="flex-1">
          <Phone className="h-4 w-4 mr-2" />
          Contact Supervisor
        </Button>
      </div>
    </div>
  );
};

interface InvalidBarcodeProps {
  barcode: string;
  onRescan: () => void;
  onManualEntry: () => void;
  onCancel: () => void;
}

export const InvalidBarcode = ({ barcode, onRescan, onManualEntry, onCancel }: InvalidBarcodeProps) => {
  return (
    <Card className="p-6 bg-destructive/10 border-destructive">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-destructive mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-destructive mb-2">🚫 BARCODE NOT RECOGNIZED</h3>
            <p className="font-medium mb-2">Scanned: {barcode}</p>
            <p className="text-sm font-medium text-destructive mb-3">❌ This barcode is not in our system</p>
            
            <div className="bg-background p-4 rounded">
              <p className="text-sm font-medium mb-2">Possible reasons:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Not yet registered in inventory</li>
                <li>• Wrong product type</li>
                <li>• Expired batch</li>
              </ul>
            </div>

            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={onRescan} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Rescan
              </Button>
              <Button variant="outline" onClick={onManualEntry} className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Manual Entry
              </Button>
              <Button variant="outline" onClick={onCancel} className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
