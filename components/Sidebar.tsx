// Sidebar Component

import { FileText, Folder, X } from "lucide-react";
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const menuItems = [
    { id: "posts", label: "Posts", icon: FileText },
    { id: "categories", label: "Categories", icon: Folder },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{
          background: "rgba(21, 17, 13, 0.95)",
          borderRight: "1px solid rgba(166, 217, 206, 0.2)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div
            className="p-6 border-b"
            style={{ borderColor: "rgba(166, 217, 206, 0.2)" }}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold" style={{ color: "#a6d9ce" }}>
                Dashboard
              </h1>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all"
                  style={{
                    background: isActive
                      ? "rgba(166, 217, 206, 0.15)"
                      : "transparent",
                    color: isActive ? "#a6d9ce" : "#9ca3af",
                  }}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};
