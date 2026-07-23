import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handles <body> no scrolling when mobile menu is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex bg-(--background)">
      <div
        className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <div
          className={`relative w-64 h-full transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar
            onClose={() => setIsSidebarOpen(false)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-(--surface) border-b border-(--border)">
          <button
            className="md:hidden rounded-xl bg-(--primary-light) p-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu />
          </button>
          <div>Header Area</div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
