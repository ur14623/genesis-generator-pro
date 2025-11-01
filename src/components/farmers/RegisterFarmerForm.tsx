import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, MapPin, Tractor, Upload } from "lucide-react";
import { toast } from "sonner";

interface RegisterFarmerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RegisterFarmerForm = ({ open, onOpenChange }: RegisterFarmerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Farmer registered successfully!");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Register New Farmer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <User className="h-5 w-5 text-primary" />
              <span>Personal Information</span>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" required placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input id="fatherName" required placeholder="Enter father's name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select required>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" required placeholder="+251 912345678" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
            </div>
          </div>

          {/* Identification */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">🆔</span>
              <span>Identification</span>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmerId">Farmer ID</Label>
                <Input id="farmerId" value="F-00128" disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Auto-generated</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="faydaId">Fayda ID</Label>
                <Input id="faydaId" placeholder="Enter Fayda ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type *</Label>
                <Select required>
                  <SelectTrigger id="idType">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National ID</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input id="idNumber" required placeholder="Enter ID number" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="idPhoto">ID Photo</Label>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Location Information</span>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kebele">Kebele *</Label>
                <Select required>
                  <SelectTrigger id="kebele">
                    <SelectValue placeholder="Select kebele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="02-bole">02 - Bole</SelectItem>
                    <SelectItem value="03-gule">03 - Gule</SelectItem>
                    <SelectItem value="04-arada">04 - Arada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subCity">Sub-City *</Label>
                <Select required>
                  <SelectTrigger id="subCity">
                    <SelectValue placeholder="Select sub-city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bole">Bole</SelectItem>
                    <SelectItem value="yeka">Yeka</SelectItem>
                    <SelectItem value="arada">Arada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="woreda">Woreda</Label>
                <Input id="woreda" placeholder="Enter woreda" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="houseNumber">House Number</Label>
                <Input id="houseNumber" placeholder="Enter house number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="latitude">GPS Latitude</Label>
                <Input id="latitude" type="number" step="any" placeholder="9.0320" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">GPS Longitude</Label>
                <Input id="longitude" type="number" step="any" placeholder="38.7469" />
              </div>
            </div>
          </div>

          {/* Farming Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Tractor className="h-5 w-5 text-primary" />
              <span>Farming Information</span>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="landSize">Total Land Size (Hectares) *</Label>
                <Input id="landSize" type="number" step="0.1" required placeholder="2.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmType">Farm Type *</Label>
                <Select required>
                  <SelectTrigger id="farmType">
                    <SelectValue placeholder="Select farm type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crop">Crop Farming</SelectItem>
                    <SelectItem value="livestock">Livestock</SelectItem>
                    <SelectItem value="mixed">Mixed Farming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mainCrops">Main Crops</Label>
                <Input id="mainCrops" placeholder="Maize, Teff, Wheat" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="irrigation">Irrigation Type *</Label>
                <Select required>
                  <SelectTrigger id="irrigation">
                    <SelectValue placeholder="Select irrigation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rainfed">Rain-fed</SelectItem>
                    <SelectItem value="irrigated">Irrigated</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience (Years)</Label>
                <Input id="experience" type="number" placeholder="8" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Farmer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
