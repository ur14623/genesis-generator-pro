import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const KebeleManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const kebeles = [
    { id: "02", name: "Bole", farmers: 450, status: "high" },
    { id: "03", name: "Gule", farmers: 380, status: "high" },
    { id: "04", name: "Arada", farmers: 320, status: "medium" },
    { id: "05", name: "Kolfe", farmers: 100, status: "low" },
    { id: "06", name: "Saris", farmers: 150, status: "medium" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "high":
        return <Badge className="bg-green-500">🟢</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">🟡</Badge>;
      case "low":
        return <Badge className="bg-red-500">🔴</Badge>;
      default:
        return <Badge>-</Badge>;
    }
  };

  const filteredKebeles = kebeles.filter(
    (kebele) =>
      kebele.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kebele.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground">Kebele Management</h1>
        <p className="text-muted-foreground mt-1">Manage and monitor all kebeles in the woreda</p>
      </div>

      {/* Search Bar */}
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search kebele by ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </Card>

      {/* Kebele Table */}
      <Card className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kebele ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Farmers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKebeles.map((kebele) => (
                <TableRow key={kebele.id}>
                  <TableCell className="font-medium">{kebele.id}</TableCell>
                  <TableCell>{kebele.name}</TableCell>
                  <TableCell>{kebele.farmers}</TableCell>
                  <TableCell>{getStatusBadge(kebele.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/kebeles/${kebele.id}`)}
                    >
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex gap-3 mt-6">
          <Button>➕ Add New Kebele</Button>
          <Button variant="outline">📊 Kebele Reports</Button>
        </div>
      </Card>
    </div>
  );
};

export default KebeleManagement;
