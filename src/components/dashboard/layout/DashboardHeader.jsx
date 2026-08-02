import { Link } from "react-router-dom";
import { EmployeeSearch } from "../../employees/EmployeeSearch";
import { Menu, Settings, House } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

import { Avatar } from "../../ui/Avatar";

export default function DashboardHeader({ onMenuClick = () => {} }) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-(--surface) border-b border-(--border) px-6">
      <div className="h-full max-w-7xl mx-auto grid grid-cols-[auto_1fr_auto] lg:grid-cols-3 gap-4 items-center">
        <div className="flex items-center gap-4 mr-2">
          <button
            className="lg:hidden rounded-xl bg-(--primary-light) p-2"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>

          <div className="hidden lg:block">
            <Link to="/dashboard">
              <House size={24} />
            </Link>
          </div>
        </div>

        <EmployeeSearch />

        <div className="flex items-center justify-end gap-4">
          <button className="rounded-xl p-2 text-(--text-secondary) hover:bg-(--surface-secondary) focus:outline-none focus:ring-2 focus:ring-(--primary-light)">
            <Settings size={20} />
          </button>

          <div className="flex items-center gap-3">
            <Avatar />

            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-(--text)">{user.name}</p>
              <p className="text-xs text-(--text-secondary)">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
