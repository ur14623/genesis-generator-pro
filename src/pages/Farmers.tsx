import { useState } from "react";
import { Plus, Search, Filter, Download, Edit, Eye, Users, UserCheck, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/StatsCard";
import { RegisterFarmerForm } from "@/components/farmers/RegisterFarmerForm";
import { FarmerDetailView } from "@/components/farmers/FarmerDetailView";
import { AssignQuotaModal } from "@/components/farmers/AssignQuotaModal";
import { EditFarmerModal } from "@/components/farmers/EditFarmerModal";
import { DistributionHistoryModal } from "@/components/farmers/DistributionHistoryModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Farmers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [registerOpen, setRegisterOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [quotaOpen, setQuotaOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const farmers = [
    { id: "F-00123", name: "Abebe Kebede", kebele: "Kebele 01", landSize: "2.5", quota2024: "2.0", remaining: "1.5", status: "active" },
    { id: "F-00124", name: "Tigist Haile", kebele: "Kebele 02", landSize: "3.0", quota2024: "2.5", remaining: "2.5", status: "active" },
    { id: "F-00125", name: "Yohannes Tadesse", kebele: "Kebele 01", landSize: "1.8", quota2024: "1.5", remaining: "0.0", status: "completed" },
    { id: "F-00126", name: "Marta Gebre", kebele: "Kebele 03", landSize: "4.2", quota2024: "3.5", remaining: "2.0", status: "active" },
    { id: "F-00127", name: "Dawit Alem", kebele: "Kebele 02", landSize: "2.0", quota2024: "1.8", remaining: "1.8", status: "active" },
    { id: "F-00128", name: "Sara Mulugeta", kebele: "Kebele 04", landSize: "3.5", quota2024: "3.0", remaining: "1.2", status: "active" },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-foreground">Farmer Management</h1>
          <p className="text-muted-foreground mt-1">Manage farmer registrations, quotas, and profiles</p>
        </div>
        <Button onClick={() => setRegisterOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Register Farmer
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Farmers"
          value="1,250"
          icon={Users}
          variant="default"
        />
        <StatsCard
          title="Active Farmers"
          value="1,180"
          icon={UserCheck}
          variant="success"
          trend={{ value: "94%", isPositive: true }}
        />
        <StatsCard
          title="With Quota Assigned"
          value="950"
          icon={Target}
          variant="default"
          trend={{ value: "76%", isPositive: true }}
        />
      </div>

      <Card className="p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, Farmer ID, Fayda ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Kebele:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="02-bole">02 - Bole</SelectItem>
                  <SelectItem value="03-gule">03 - Gule</SelectItem>
                  <SelectItem value="04-arada">04 - Arada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Quota:</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="not-assigned">Not Assigned</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Kebele</TableHead>
                <TableHead>Land Size (Ha)</TableHead>
                <TableHead>2024 Quota (Qt)</TableHead>
                <TableHead>Remaining (Qt)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell className="font-medium">{farmer.id}</TableCell>
                  <TableCell>{farmer.name}</TableCell>
                  <TableCell>{farmer.kebele}</TableCell>
                  <TableCell>{farmer.landSize}</TableCell>
                  <TableCell>{farmer.quota2024}</TableCell>
                  <TableCell>{farmer.remaining}</TableCell>
                  <TableCell>
                    <Badge variant={farmer.status === "active" ? "default" : "outline"}>
                      {farmer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setDetailOpen(true)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setEditOpen(true)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing 1-6 of 1,250 farmers
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>

      {/* Modals */}
      <RegisterFarmerForm open={registerOpen} onOpenChange={setRegisterOpen} />
      <FarmerDetailView 
        open={detailOpen} 
        onOpenChange={setDetailOpen}
        onEdit={() => {
          setDetailOpen(false);
          setEditOpen(true);
        }}
        onAssignQuota={() => {
          setDetailOpen(false);
          setQuotaOpen(true);
        }}
        onViewHistory={() => {
          setDetailOpen(false);
          setHistoryOpen(true);
        }}
      />
      <AssignQuotaModal open={quotaOpen} onOpenChange={setQuotaOpen} />
      <EditFarmerModal open={editOpen} onOpenChange={setEditOpen} />
      <DistributionHistoryModal open={historyOpen} onOpenChange={setHistoryOpen} />
    </div>
  );
};

export default Farmers;
