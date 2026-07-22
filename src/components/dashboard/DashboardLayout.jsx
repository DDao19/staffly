import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-(--background)">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-(--surface) border-b border-(--border)">
          Dashboard Header
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
