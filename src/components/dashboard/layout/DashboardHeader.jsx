import { useLocation } from "react-router-dom";
import { Menu, Search, Settings, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function DashboardHeader({ onMenuClick = () => {} }) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/settings": "Settings",
  };
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <header className="h-16 bg-(--surface) border-b border-(--border) px-6">
      <div className="h-full max-w-7xl mx-auto grid grid-cols-3 items-center">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden rounded-xl bg-(--primary-light) p-2"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative hidden w-full max-w-sm md:block">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full rounded-md border border-(--border) bg-(--surface-secondary) py-2 pr-10 pl-3 text-sm text-(--text) placeholder:text-(--text-secondary) focus:outline-none focus:ring-2 focus:ring-(--primary-light)"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button className="rounded-xl p-2 text-(--text-secondary) hover:bg-(--surface-secondary) focus:outline-none focus:ring-2 focus:ring-(--primary-light)">
            <Settings size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-(--primary-light) flex items-center justify-center">
              <User size={20} />
            </div>

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
