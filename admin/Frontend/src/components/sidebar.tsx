import { Scissors, Image, Star, LogOut } from "lucide-react";
import { authService } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: "content" | "testimonials";
  onTabChange: (tab: "content" | "testimonials") => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  const handleLogout = () => {
    authService.logout();
    window.location.reload();
  };

  const navLinks = [
    {
      id: "content" as const,
      label: "Konten",
      icon: Image,
    },
    {
      id: "testimonials" as const,
      label: "Testimoni",
      icon: Star,
    },
  ];

  return (
    <div
      className={cn(
        "bg-barbershop-surface border-r border-barbershop-border w-64 flex-shrink-0 transition-transform duration-300 z-50",
        "lg:relative lg:translate-x-0",
        isOpen ? "fixed inset-y-0 left-0 translate-x-0" : "fixed inset-y-0 left-0 -translate-x-full lg:block"
      )}
    >
      <div className="p-6">
        {/* Brand */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-barbershop-red rounded-lg flex items-center justify-center mr-3">
            <Scissors className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Barber Sangaji</h2>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto lg:hidden text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            
            return (
              <button
                key={link.id}
                onClick={() => {
                  onTabChange(link.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-barbershop-red text-white"
                    : "text-gray-400 hover:bg-barbershop-border hover:text-white"
                )}
              >
                <Icon className="mr-3" size={18} />
                {link.label}
              </button>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-400 hover:bg-barbershop-border hover:text-white"
          >
            <LogOut className="mr-3" size={18} />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
}
