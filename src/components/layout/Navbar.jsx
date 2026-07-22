import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (loading) {
    return null;
  }

  return (
    <header
      ref={menuRef}
      className="fixed top-0 left-0 right-0 px-5 bg-(--surface) border-b border-slate-200"
    >
      <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-5">
        <div>
          <Link to="/">
            <h1 className="font-secondary uppercase tracking-wide text-3xl font-bold">
              Staff<span className="text-(--primary)">ly</span>
            </h1>
          </Link>
        </div>

        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <div className="hidden md:flex items-center space-x-2">
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

      {isOpen && (
        <div className="md:hidden px-5 pb-4">
          {user ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-center">Welcome back, {user.name}</p>

              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button type="button" variant="primary" className="w-full">
                  Dashboard
                </Button>
              </Link>

              <Button
                type="button"
                variant="destructive"
                className="w-full"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/signin" onClick={() => setIsOpen(false)}>
                <Button type="button" variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>

              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button type="button" variant="primary" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
