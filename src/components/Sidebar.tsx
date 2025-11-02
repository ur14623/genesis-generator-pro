import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Truck, 
  BarChart3, 
  Sprout
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Kebeles", path: "/kebeles" },
  { icon: Package, label: "Inventory", path: "/inventory" },
  { icon: Truck, label: "Distribution", path: "/distribution" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
];

export const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "border-r border-sidebar-border bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-72"
      )}
    >
      <div className="h-16 border-b border-sidebar-border flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <Sprout className="h-6 w-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-heading font-semibold text-sidebar-foreground">AgriManage</h1>
              <p className="text-xs text-muted-foreground">Fertilizer System</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-sidebar-accent text-sidebar-foreground",
                    isActive && "bg-primary/10 text-primary font-medium border-l-4 border-primary",
                    collapsed && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
