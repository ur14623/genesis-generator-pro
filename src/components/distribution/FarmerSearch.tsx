import { useState } from "react";
import { Search, Camera, Fingerprint, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface FarmerSearchProps {
  onNext: (farmerData: any) => void;
  onCancel: () => void;
}

export const FarmerSearch = ({ onNext, onCancel }: FarmerSearchProps) => {
  const [searchMethod, setSearchMethod] = useState("farmerId");
  const [searchTerm, setSearchTerm] = useState("");
  const [verified, setVerified] = useState(false);
  const [showNameResults, setShowNameResults] = useState(false);

  const handleSearch = () => {
    if (searchMethod === "name") {
      setShowNameResults(true);
    } else {
      setVerified(true);
    }
  };

  const handleSelectFarmer = () => {
    setShowNameResults(false);
    setVerified(true);
  };

  const handleNext = () => {
    onNext({
      name: "Abebe Kebede",
      farmerId: "F-00123",
      faydaId: "1234-5678-9012",
      kebele: "02-Bole",
      landSize: "2.5 Hectares",
      ureaRemaining: 0.5,
      dapRemaining: 0.0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold font-heading mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          SEARCH FARMER
        </h2>

        <div className="space-y-4">
          <div>
            <Label className="mb-3 block">Search by:</Label>
            <RadioGroup value={searchMethod} onValueChange={setSearchMethod} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name" id="name" />
                <Label htmlFor="name" className="cursor-pointer">Name</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="farmerId" id="farmerId" />
                <Label htmlFor="farmerId" className="cursor-pointer">Farmer ID</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="faydaId" id="faydaId" />
                <Label htmlFor="faydaId" className="cursor-pointer">Fayda ID</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fingerprint" id="fingerprint" />
                <Label htmlFor="fingerprint" className="cursor-pointer">Fingerprint</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="searchTerm">Enter Search Term:</Label>
            <div className="flex gap-3 mt-2">
              <Input
                id="searchTerm"
                placeholder={
                  searchMethod === "name" ? "Abebe Kebede" :
                  searchMethod === "farmerId" ? "F-00123" :
                  searchMethod === "faydaId" ? "1234-5678-9012" :
                  "Fingerprint scan"
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={searchMethod === "fingerprint"}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <p className="text-sm text-muted-foreground">OR</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <QrCode className="h-4 w-4 mr-2" />
                Scan Fayda ID QR Code
              </Button>
              <Button variant="outline" className="flex-1">
                <Fingerprint className="h-4 w-4 mr-2" />
                Scan Fingerprint
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {showNameResults && (
        <Card className="p-6">
          <h3 className="font-semibold mb-3">SEARCH RESULTS:</h3>
          <div className="space-y-2">
            <Card className="p-4 cursor-pointer hover:border-primary transition-colors" onClick={handleSelectFarmer}>
              <p className="font-medium">👨 Abebe Kebede - F-00123 - 02-Bole</p>
            </Card>
            <Card className="p-4 cursor-pointer hover:border-primary transition-colors">
              <p className="font-medium">👨 Abebe Tesfaye - F-00234 - 03-Gule</p>
            </Card>
            <Card className="p-4 cursor-pointer hover:border-primary transition-colors">
              <p className="font-medium">👩 Abebech M. - F-00345 - 02-Bole</p>
            </Card>
          </div>
        </Card>
      )}

      {verified && (
        <Card className="p-6 bg-success/10 border-success">
          <h3 className="text-xl font-semibold font-heading mb-4 flex items-center gap-2">
            📋 VERIFICATION RESULTS
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">👨 Name</p>
                <p className="font-medium">Abebe Kebede</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">🆔 Farmer ID</p>
                <p className="font-medium">F-00123</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">📍 Fayda ID</p>
                <p className="font-medium">1234-5678-9012</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">🏠 Kebele</p>
                <p className="font-medium">02-Bole</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Land Size</p>
                <p className="font-medium">2.5 Hectares</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">✅ Status</p>
                <Badge>Active</Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">📅 2024 QUOTA ALLOCATION:</h4>
              <div className="space-y-3">
                <Card className="p-4 bg-background">
                  <p className="text-sm font-medium mb-2">🎯 UREA: 2.0 Quintals allocated</p>
                  <p className="text-sm text-muted-foreground">✅ 1.5 Quintals received</p>
                  <p className="text-sm font-semibold text-primary">🎯 Remaining: 0.5 Quintals</p>
                </Card>
                <Card className="p-4 bg-background">
                  <p className="text-sm font-medium mb-2">🎯 DAP: 1.5 Quintals allocated</p>
                  <p className="text-sm text-muted-foreground">✅ 1.5 Quintals received</p>
                  <p className="text-sm font-semibold text-muted-foreground">🎯 Remaining: 0.0 Quintals</p>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          ❌ Cancel
        </Button>
        <Button onClick={handleNext} disabled={!verified} className="flex-1">
          ➡️ Next: Scan Bags
        </Button>
      </div>
    </div>
  );
};
