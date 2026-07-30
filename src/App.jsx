import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import PublicLayout from "./components/layout/PublicLayout";
import AuthProvider from "./components/context/AuthProvider";
import EmployeeProvider from "./components/context/EmployeeProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import GuestRoute from "./components/auth/GuestRoute";
import DashboardLayout from "./components/dashboard/layout/DashboardLayout";
import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import NewEmployee from "./pages/NewEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import EmployeeProfile from "./pages/EmployeeProfile";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <EmployeeProvider>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/new" element={<NewEmployee />} />
                <Route
                  path="/employees/:id/profile"
                  element={<EmployeeProfile />}
                />
                <Route
                  path="/employees/:id/update"
                  element={<UpdateEmployee />}
                />
              </Route>
            </Route>
          </Routes>
        </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
