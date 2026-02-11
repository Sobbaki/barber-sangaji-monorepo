import { useState } from "react";
import Sidebar from "@/components/sidebar";
import ContentManagement from "@/components/content-management";
import TestimonialManagement from "@/components/testimonial-management";
import { Menu, User } from "lucide-react";
import { authService } from "@/lib/auth";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"content" | "testimonials">("content");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = authService.getCurrentUser();

  const getPageTitle = () => {
    switch (activeTab) {
      case "content":
        return "Manajemen Konten";
      case "testimonials":
        return "Manajemen Testimoni";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex bg-barbershop-bg overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-barbershop-surface border-b border-barbershop-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4 text-gray-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-white">{getPageTitle()}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white font-medium">{user?.username || "Admin User"}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
              <div className="w-8 h-8 bg-barbershop-red rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 sm:p-6">
          {activeTab === "content" && <ContentManagement />}
          {activeTab === "testimonials" && <TestimonialManagement />}
        </main>
      </div>
    </div>
  );
}
