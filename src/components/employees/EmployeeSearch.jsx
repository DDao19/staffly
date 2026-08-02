import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";
import { Search, X } from "lucide-react";

export function EmployeeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);
  const { employees } = useEmployee();

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const fullName =
        `${employee.firstName} ${employee.lastName}`.toLowerCase();

      return fullName.includes(searchTerm.toLowerCase());
    });
  }, [employees, searchTerm]);

  const handleEmployeeClick = () => {
    setSearchTerm("");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full lg:max-w-sm">
      <input
        type="text"
        placeholder="Search employees..."
        className="w-full rounded-lg border border-(--border) bg-(--surface-secondary) py-2 pr-10 pl-3 text-sm text-(--text) placeholder:text-(--text-secondary) focus:outline-none focus:ring-2 focus:ring-(--primary-light)"
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          setIsOpen(value.trim().length > 0);
        }}
      />
      {searchTerm ? (
        <X
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-(--text-secondary)"
          onClick={() => {
            setSearchTerm("");
            setIsOpen(false);
          }}
        />
      ) : (
        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary)"
        />
      )}

      {/* Dropdown */}
      {isOpen && searchTerm.trim() && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-lg border border-(--border) bg-(--surface) shadow-lg">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <Link
                key={employee.id}
                to={`/employees/${employee.id}/profile`}
                onClick={handleEmployeeClick}
                className="block cursor-pointer px-4 py-2 text-sm text-(--text) hover:bg-(--primary-light)"
              >
                {employee.firstName} {employee.lastName}
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-(--text-secondary)">
              No employee match
            </div>
          )}
        </div>
      )}
    </div>
  );
}
