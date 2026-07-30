import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FullPageLoader } from "../ui/FullPageLoader";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <FullPageLoader />;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
