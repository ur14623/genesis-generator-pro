import { Settings as SettingsIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-heading text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure system preferences and user settings</p>
      </div>

      <Card className="p-12 flex flex-col items-center justify-center min-h-[400px]">
        <SettingsIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Settings Coming Soon</h2>
        <p className="text-muted-foreground text-center max-w-md">
          System configuration options will be available here. Manage users,
          set quotas, and customize system behavior.
        </p>
      </Card>
    </div>
  );
};

export default Settings;
