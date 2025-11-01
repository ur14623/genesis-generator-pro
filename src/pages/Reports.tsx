import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";

const Reports = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">View distribution trends and system analytics</p>
      </div>

      <Card className="p-12 flex flex-col items-center justify-center min-h-[400px]">
        <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Reports Coming Soon</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Analytics and reporting features will be available here. Track distribution trends,
          farmer statistics, and inventory movements.
        </p>
      </Card>
    </div>
  );
};

export default Reports;
