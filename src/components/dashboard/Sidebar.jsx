import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

import { Button } from "../ui/Button";

const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Employees",
    path: "/employees",
    icon: Users,
  },
];

const otherItems = [
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({ onClose = () => {} }) {
  const { user, logout } = useAuth();

  return (
    <aside className="flex flex-col w-64 h-full bg-(--surface) border-r border-(--border) p-5">
      <div>
        <h1 className="text-center font-secondary uppercase tracking-wide text-2xl font-bold">
          Staff<span className="text-(--primary)">ly</span>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto mt-8 space-y-8">
        <div className="space-y-2">
          <p className="pb-1 text-xs font-semibold uppercase tracking-widest text-(--text-secondary)">
            Main Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-(--primary-light) text-(--primary)"
                      : "text-(--text) hover:bg-(--background)"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        <div className="space-y-2">
          <p className="pb-1 text-xs font-semibold uppercase tracking-widest text-(--text-secondary)">
            Others
          </p>

          {otherItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-(--primary-light) text-(--primary)"
                      : "text-(--text) hover:bg-(--background)"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-(--border) pt-5">
        <div className="flex items-center gap-3">
          <CircleUserRound size={30} className="text-(--primary)" />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name}</p>

            <p className="text-xs text-(--text-secondary) truncate">
              {user?.email}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full mt-4 hover:bg-(--error-bg) hover:border-(--error-bg) hover:text-(--error)"
          onClick={logout}
        >
          <LogOut size={18} /> Logout
        </Button>
      </div>
    </aside>
  );
}
