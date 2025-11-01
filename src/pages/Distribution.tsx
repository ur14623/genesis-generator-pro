import { useState } from "react";
import { FarmerSearch } from "@/components/distribution/FarmerSearch";
import { BagScanning } from "@/components/distribution/BagScanning";
import { FarmerApproval } from "@/components/distribution/FarmerApproval";
import { DistributionComplete } from "@/components/distribution/DistributionComplete";

const Distribution = () => {
  const [step, setStep] = useState(1);
  const [farmerData, setFarmerData] = useState<any>(null);
  const [scannedBags, setScannedBags] = useState<any[]>([]);

  const handleFarmerSearch = (data: any) => {
    setFarmerData(data);
    setStep(2);
  };

  const handleBagScanning = (bags: any[]) => {
    setScannedBags(bags);
    setStep(3);
  };

  const handleComplete = () => {
    setStep(4);
  };

  const handleNewDistribution = () => {
    setStep(1);
    setFarmerData(null);
    setScannedBags([]);
  };

  const handleCancel = () => {
    setStep(1);
    setFarmerData(null);
    setScannedBags([]);
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground">Distribution Center</h1>
        <p className="text-muted-foreground mt-1">Process fertilizer distribution to farmers</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <span className="font-medium hidden sm:inline">Search & Verify</span>
            <span className="font-medium sm:hidden">Verify</span>
          </div>
          <div className={`flex-1 h-1 mx-2 sm:mx-4 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className="flex items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
            <span className="font-medium hidden sm:inline">Scan Bags</span>
            <span className="font-medium sm:hidden">Scan</span>
          </div>
          <div className={`flex-1 h-1 mx-2 sm:mx-4 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className="flex items-center gap-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              3
            </div>
            <span className="font-medium hidden sm:inline">Approval</span>
            <span className="font-medium sm:hidden">Done</span>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && (
          <FarmerSearch onNext={handleFarmerSearch} onCancel={handleCancel} />
        )}

        {step === 2 && farmerData && (
          <BagScanning 
            farmerData={farmerData}
            onNext={handleBagScanning}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && farmerData && scannedBags.length > 0 && (
          <FarmerApproval
            farmerData={farmerData}
            scannedBags={scannedBags}
            onComplete={handleComplete}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && farmerData && scannedBags.length > 0 && (
          <DistributionComplete
            farmerData={farmerData}
            scannedBags={scannedBags}
            onNewDistribution={handleNewDistribution}
          />
        )}
      </div>
    </div>
  );
};

export default Distribution;
