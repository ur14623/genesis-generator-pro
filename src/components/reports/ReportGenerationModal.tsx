import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, FileText, FileSpreadsheet, Printer, BarChart3 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface ReportGenerationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReportGenerationModal = ({ open, onOpenChange }: ReportGenerationModalProps) => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [reportTypes, setReportTypes] = useState<string[]>([]);
  const [kebele, setKebele] = useState("all");
  const [product, setProduct] = useState("all");
  const [status, setStatus] = useState("all");
  const [outputFormat, setOutputFormat] = useState<string[]>([]);

  const reportTypeOptions = [
    { id: "distribution", label: "Distribution Summary" },
    { id: "inventory", label: "Inventory Status" },
    { id: "farmer", label: "Farmer Coverage" },
    { id: "quota", label: "Quota Utilization" },
    { id: "efficiency", label: "Operational Efficiency" },
    { id: "staff", label: "Staff Performance" },
    { id: "audit", label: "Audit Trail" },
    { id: "custom", label: "Custom Report" },
  ];

  const outputFormatOptions = [
    { id: "pdf", label: "PDF Report", icon: FileText },
    { id: "excel", label: "Excel Spreadsheet", icon: FileSpreadsheet },
    { id: "print", label: "Printable Summary", icon: Printer },
    { id: "chart", label: "Chart Visualization", icon: BarChart3 },
  ];

  const toggleReportType = (id: string) => {
    setReportTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleOutputFormat = (id: string) => {
    setOutputFormat((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (reportTypes.length === 0) {
      toast({
        title: "Select Report Type",
        description: "Please select at least one report type",
        variant: "destructive",
      });
      return;
    }

    if (outputFormat.length === 0) {
      toast({
        title: "Select Output Format",
        description: "Please select at least one output format",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Report Generation Started",
      description: `Generating ${reportTypes.length} report(s) in ${outputFormat.length} format(s)`,
    });

    onOpenChange(false);
  };

  const setQuickPeriod = (period: string) => {
    const today = new Date();
    setToDate(today);

    switch (period) {
      case "7days":
        setFromDate(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000));
        break;
      case "30days":
        setFromDate(new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000));
        break;
      case "thisYear":
        setFromDate(new Date(today.getFullYear(), 0, 1));
        break;
      case "lastQuarter":
        const quarter = Math.floor(today.getMonth() / 3);
        setFromDate(new Date(today.getFullYear(), quarter * 3 - 3, 1));
        setToDate(new Date(today.getFullYear(), quarter * 3, 0));
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">Generate Custom Report</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Report Type */}
          <div>
            <h3 className="text-lg font-semibold mb-3">📋 Report Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {reportTypeOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={reportTypes.includes(option.id)}
                    onCheckedChange={() => toggleReportType(option.id)}
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Time Period */}
          <div>
            <h3 className="text-lg font-semibold mb-3">⏰ Time Period</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !fromDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !toDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setQuickPeriod("7days")}>
                Last 7 days
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickPeriod("30days")}>
                Last 30 days
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickPeriod("thisYear")}>
                This Year
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickPeriod("lastQuarter")}>
                Last Quarter
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div>
            <h3 className="text-lg font-semibold mb-3">🏠 Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Kebele</Label>
                <Select value={kebele} onValueChange={setKebele}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="02-bole">02-Bole</SelectItem>
                    <SelectItem value="03-gule">03-Gule</SelectItem>
                    <SelectItem value="04-arada">04-Arada</SelectItem>
                    <SelectItem value="05-kolfe">05-Kolfe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Product</Label>
                <Select value={product} onValueChange={setProduct}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="urea">UREA</SelectItem>
                    <SelectItem value="dap">DAP</SelectItem>
                    <SelectItem value="nps">NPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Output Format */}
          <div>
            <h3 className="text-lg font-semibold mb-3">📊 Output Format</h3>
            <div className="grid grid-cols-2 gap-3">
              {outputFormatOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`format-${option.id}`}
                    checked={outputFormat.includes(option.id)}
                    onCheckedChange={() => toggleOutputFormat(option.id)}
                  />
                  <Label
                    htmlFor={`format-${option.id}`}
                    className="text-sm font-normal cursor-pointer flex items-center gap-2"
                  >
                    <option.icon className="h-4 w-4" />
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerate}>
            🚀 Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
