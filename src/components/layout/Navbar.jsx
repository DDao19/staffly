import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 px-5 bg-(--surface) border-b border-slate-200">
      <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-5">
        <div>
          <Link to="/">
            <h1 className="font-secondary uppercase tracking-wide text-3xl font-bold">
              Staff<span className="text-(--primary)">ly</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <p>Welcome back, {user.name}</p>
              <Button type="button" variant="destructive" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button type="button" variant="outline">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button type="button" variant="primary">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
