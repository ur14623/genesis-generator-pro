import { useState } from "react";
import { Calendar, Download, FileText, TrendingUp, Package, Users, Activity, AlertCircle, MapPin, Star, FileSpreadsheet, Printer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { StatsCard } from "@/components/StatsCard";
import { ReportGenerationModal } from "@/components/reports/ReportGenerationModal";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [selectedKebele, setSelectedKebele] = useState("all");
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Key Metrics
  const keyMetrics = [
    { title: "Total Farmers", value: "1,250", icon: Users, variant: "default" as const },
    { title: "Total Distributed", value: "850Q", icon: Package, variant: "default" as const },
    { title: "Distribution Rate", value: "68%", icon: TrendingUp, variant: "success" as const },
    { title: "Quota Usage", value: "85%", icon: Activity, variant: "success" as const },
  ];

  // Daily Distribution Data
  const dailyDistribution = [
    { date: "25/12/2024", farmers: 45, urea: "22.5Q", dap: "15Q", nps: "7.5Q", total: "45Q" },
    { date: "24/12/2024", farmers: 38, urea: "19Q", dap: "12Q", nps: "7Q", total: "38Q" },
    { date: "23/12/2024", farmers: 52, urea: "26Q", dap: "16Q", nps: "10Q", total: "52Q" },
    { date: "22/12/2024", farmers: 41, urea: "20.5Q", dap: "13Q", nps: "7.5Q", total: "41Q" },
    { date: "21/12/2024", farmers: 35, urea: "17.5Q", dap: "11Q", nps: "6.5Q", total: "35Q" },
  ];

  // Distribution Trend (30 days)
  const distributionTrend = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    UREA: Math.floor(Math.random() * 20) + 35,
    DAP: Math.floor(Math.random() * 15) + 25,
    NPS: Math.floor(Math.random() * 10) + 15,
  }));

  // Inventory Data
  const inventoryData = [
    { product: "UREA", allocation: "100Q", received: "75Q", distributed: "30Q", balance: "45Q", percentage: 45, status: "warning" },
    { product: "DAP", allocation: "100Q", received: "60Q", distributed: "25Q", balance: "35Q", percentage: 35, status: "warning" },
    { product: "NPS", allocation: "100Q", received: "45Q", distributed: "20Q", balance: "25Q", percentage: 25, status: "critical" },
  ];

  // Expiry Tracking
  const expiryTracking = [
    { batch: "B001", product: "UREA", qty: "45Q", expiry: "01/06/2025", daysLeft: 158 },
    { batch: "B015", product: "DAP", qty: "30Q", expiry: "01/03/2025", daysLeft: 66 },
    { batch: "B045", product: "NPS", qty: "25Q", expiry: "01/04/2025", daysLeft: 97 },
  ];

  // Farmer Coverage by Kebele
  const farmerCoverage = [
    { kebele: "02-Bole", total: 450, served: 420, coverage: 93, avgQty: "1.8Q" },
    { kebele: "03-Gule", total: 380, served: 350, coverage: 92, avgQty: "1.7Q" },
    { kebele: "04-Arada", total: 320, served: 280, coverage: 88, avgQty: "1.6Q" },
    { kebele: "05-Kolfe", total: 100, served: 80, coverage: 80, avgQty: "1.5Q" },
    { kebele: "TOTAL", total: 1250, served: 1130, coverage: 90, avgQty: "1.7Q" },
  ];

  // Quota Utilization by Kebele
  const quotaUtilization = [
    { kebele: "02-Bole", allocation: "200Q", used: "180Q", balance: "20Q", usage: 90 },
    { kebele: "03-Gule", allocation: "180Q", used: "160Q", balance: "20Q", usage: 89 },
    { kebele: "04-Arada", allocation: "150Q", used: "120Q", balance: "30Q", usage: 80 },
    { kebele: "05-Kolfe", allocation: "70Q", used: "50Q", balance: "20Q", usage: 71 },
    { kebele: "TOTAL", allocation: "600Q", used: "510Q", balance: "90Q", usage: 85 },
  ];

  // Top Farmers
  const topFarmers = [
    { farmer: "Abebe K.", kebele: "02-Bole", landSize: "2.5Ha", quota: "2.0Q", used: "2.0Q" },
    { farmer: "Tigist M.", kebele: "03-Gule", landSize: "2.0Ha", quota: "1.8Q", used: "1.8Q" },
    { farmer: "Samuel G.", kebele: "02-Bole", landSize: "1.8Ha", quota: "1.6Q", used: "1.6Q" },
    { farmer: "Marta A.", kebele: "04-Arada", landSize: "1.5Ha", quota: "1.4Q", used: "1.4Q" },
  ];

  // Efficiency Metrics
  const efficiencyMetrics = [
    { metric: "Farmers Served", daily: 42, weekly: 210, monthly: 900 },
    { metric: "Quantity Distributed", daily: "21Q", weekly: "105Q", monthly: "450Q" },
    { metric: "Avg Time per Farmer", daily: "8 min", weekly: "7 min", monthly: "7 min" },
    { metric: "Success Rate", daily: "98%", weekly: "99%", monthly: "99%" },
  ];

  // Staff Performance
  const staffPerformance = [
    { officer: "Maria Tekle", farmers: 320, quantity: "160Q", avgTime: "6 min", rating: 5 },
    { officer: "John Smith", farmers: 280, quantity: "140Q", avgTime: "7 min", rating: 4 },
    { officer: "Sara M.", farmers: 250, quantity: "125Q", avgTime: "8 min", rating: 4 },
    { officer: "David K.", farmers: 200, quantity: "100Q", avgTime: "9 min", rating: 3 },
  ];

  // Issues & Exceptions
  const issues = [
    { date: "20/12/2024", type: "Quota Exceeded", farmer: "Abebe K.", status: "resolved" },
    { date: "18/12/2024", type: "System Error", farmer: "Tigist M.", status: "pending" },
    { date: "15/12/2024", type: "Invalid ID", farmer: "Samuel G.", status: "resolved" },
    { date: "12/12/2024", type: "Stock Out", farmer: "Marta A.", status: "resolved" },
  ];

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground">Reporting & Analytics</h1>
        <p className="text-muted-foreground mt-1">Comprehensive reports and data insights</p>
      </div>

      {/* Filters & Period Selection */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Report Period
            </label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full lg:w-[300px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">January 2024 - December 2024</SelectItem>
                <SelectItem value="q4-2024">Q4 2024</SelectItem>
                <SelectItem value="q3-2024">Q3 2024</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last7">Last 7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Kebele
            </label>
            <Select value={selectedKebele} onValueChange={setSelectedKebele}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Kebeles</SelectItem>
                <SelectItem value="02-bole">02-Bole</SelectItem>
                <SelectItem value="03-gule">03-Gule</SelectItem>
                <SelectItem value="04-arada">04-Arada</SelectItem>
                <SelectItem value="05-kolfe">05-Kolfe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => setReportModalOpen(true)}>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Dashboard
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <StatsCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Distribution Reports */}
      <div>
        <h2 className="text-2xl font-bold font-heading mb-4">📦 Distribution Reports</h2>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">Daily Distribution Summary</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Farmers</TableHead>
                    <TableHead>UREA</TableHead>
                    <TableHead>DAP</TableHead>
                    <TableHead>NPS</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyDistribution.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.farmers}</TableCell>
                      <TableCell>{row.urea}</TableCell>
                      <TableCell>{row.dap}</TableCell>
                      <TableCell>{row.nps}</TableCell>
                      <TableCell className="font-semibold">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">Distribution Trend (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={distributionTrend}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="day" className="text-xs" label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                <YAxis className="text-xs" label={{ value: 'Quintals', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Legend />
                <Line type="monotone" dataKey="UREA" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="DAP" stroke="hsl(var(--success))" strokeWidth={2} />
                <Line type="monotone" dataKey="NPS" stroke="hsl(var(--warning))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Detailed Report
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Chart
              </Button>
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export to Excel
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Inventory Reports */}
      <div>
        <h2 className="text-2xl font-bold font-heading mb-4">📦 Inventory Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">Stock Levels by Product</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead>Distributed</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((row) => (
                    <TableRow key={row.product}>
                      <TableCell className="font-semibold">{row.product}</TableCell>
                      <TableCell>{row.allocation}</TableCell>
                      <TableCell>{row.received}</TableCell>
                      <TableCell>{row.distributed}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {row.balance}
                          <Badge variant={row.status === "critical" ? "destructive" : "outline"}>
                            {row.percentage}%
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-semibold bg-muted/50">
                    <TableCell>TOTAL</TableCell>
                    <TableCell>300Q</TableCell>
                    <TableCell>180Q</TableCell>
                    <TableCell>75Q</TableCell>
                    <TableCell>105Q</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">⚠️ Low Stock Alerts</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="h-2 w-2 rounded-full bg-destructive mt-1.5" />
                <div>
                  <p className="font-medium">UREA - 45Q (45% remaining)</p>
                  <p className="text-sm text-muted-foreground">Reorder needed</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="h-2 w-2 rounded-full bg-warning mt-1.5" />
                <div>
                  <p className="font-medium">DAP - 35Q (35% remaining)</p>
                  <p className="text-sm text-muted-foreground">Monitor closely</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="h-2 w-2 rounded-full bg-success mt-1.5" />
                <div>
                  <p className="font-medium">NPS - 25Q (25% remaining)</p>
                  <p className="text-sm text-muted-foreground">Adequate</p>
                </div>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground">📅 Next Shipment Expected: 15/01/2025</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold font-heading mb-4">📅 Expiry Tracking</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Days Left</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiryTracking.map((row) => (
                    <TableRow key={row.batch}>
                      <TableCell>{row.batch}</TableCell>
                      <TableCell>{row.product}</TableCell>
                      <TableCell>{row.qty}</TableCell>
                      <TableCell>
                        <Badge variant={row.daysLeft < 90 ? "outline" : "default"}>
                          {row.daysLeft} days
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>

      {/* Farmer & Quota Reports */}
      <div>
        <h2 className="text-2xl font-bold font-heading mb-4">👥 Farmer & Quota Reports</h2>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">Farmer Coverage Summary</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kebele</TableHead>
                    <TableHead>Total Farmers</TableHead>
                    <TableHead>Served</TableHead>
                    <TableHead>Coverage</TableHead>
                    <TableHead>Avg Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmerCoverage.map((row) => (
                    <TableRow key={row.kebele} className={row.kebele === "TOTAL" ? "font-semibold bg-muted/50" : ""}>
                      <TableCell>{row.kebele}</TableCell>
                      <TableCell>{row.total}</TableCell>
                      <TableCell>{row.served}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={row.coverage} className="h-2 w-20" />
                          <span>{row.coverage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{row.avgQty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">Quota Utilization by Kebele</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kebele</TableHead>
                    <TableHead>Allocation</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotaUtilization.map((row) => (
                    <TableRow key={row.kebele} className={row.kebele === "TOTAL" ? "font-semibold bg-muted/50" : ""}>
                      <TableCell>{row.kebele}</TableCell>
                      <TableCell>{row.allocation}</TableCell>
                      <TableCell>{row.used}</TableCell>
                      <TableCell>{row.balance}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={row.usage} className="h-2 w-20" />
                          <span>{row.usage}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">🎯 Top Farmers by Quota Usage</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Kebele</TableHead>
                    <TableHead>Land Size</TableHead>
                    <TableHead>Quota</TableHead>
                    <TableHead>Used</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topFarmers.map((row) => (
                    <TableRow key={row.farmer}>
                      <TableCell className="font-semibold">{row.farmer}</TableCell>
                      <TableCell>{row.kebele}</TableCell>
                      <TableCell>{row.landSize}</TableCell>
                      <TableCell>{row.quota}</TableCell>
                      <TableCell>
                        <Badge variant="default">{row.used}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>

      {/* Operational Reports */}
      <div>
        <h2 className="text-2xl font-bold font-heading mb-4">📊 Operational Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">Distribution Efficiency</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Daily Avg</TableHead>
                    <TableHead>Weekly Avg</TableHead>
                    <TableHead>Monthly</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {efficiencyMetrics.map((row) => (
                    <TableRow key={row.metric}>
                      <TableCell className="font-medium">{row.metric}</TableCell>
                      <TableCell>{row.daily}</TableCell>
                      <TableCell>{row.weekly}</TableCell>
                      <TableCell>{row.monthly}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold font-heading mb-4">👥 Staff Performance</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Officer</TableHead>
                    <TableHead>Farmers</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Avg Time</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staffPerformance.map((row) => (
                    <TableRow key={row.officer}>
                      <TableCell className="font-medium">{row.officer}</TableCell>
                      <TableCell>{row.farmers}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.avgTime}</TableCell>
                      <TableCell>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < row.rating ? "fill-warning text-warning" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold font-heading mb-4">⚠️ Issues & Exceptions</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.farmer}</TableCell>
                      <TableCell>
                        <Badge variant={row.status === "resolved" ? "default" : "outline"}>
                          {row.status === "resolved" ? "✅ Resolved" : "🔄 Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>

      {/* Geographic Distribution */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold font-heading mb-4">🗺️ Distribution by Kebele (Map)</h2>
        <div className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg border-2 border-dashed border-border">
          <MapPin className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Kebele Distribution Heat Map</h3>
          <p className="text-muted-foreground text-center max-w-md mb-4">
            Interactive map visualization showing coverage levels across kebeles
          </p>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span>High (90-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-warning" />
              <span>Medium (70-89%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <span>Low (&lt;70%)</span>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button variant="outline" size="sm">
              <MapPin className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Map
            </Button>
          </div>
        </div>
      </Card>

      {/* Report Generation Modal */}
      <ReportGenerationModal open={reportModalOpen} onOpenChange={setReportModalOpen} />
    </div>
  );
};

export default Reports;
