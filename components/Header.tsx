// Header Component
import { LogOut, Menu } from "lucide-react";

export const Header: React.FC<any> = ({ onLogout, onMenuClick }) => {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-xl border-b"
      style={{
        background: "rgba(21, 17, 13, 0.8)",
        borderColor: "rgba(166, 217, 206, 0.2)",
      }}
    >
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg"
          style={{
            color: "#a6d9ce",
            background: "rgba(166, 217, 206, 0.1)",
          }}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1" />

        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
          style={{
            color: "#a6d9ce",
            background: "rgba(166, 217, 206, 0.1)",
          }}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
