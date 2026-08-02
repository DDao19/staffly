import { useState, useRef, useEffect } from "react";
import { useEmployee } from "../hooks/useEmployee";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { MoreVertical } from "lucide-react";
import { Dropdown } from "../ui/Dropdown";
import { deleteEmployee } from "../../services/employeeService";

export function EmployeeActions({ employee }) {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const { getAllEmployees } = useEmployee();

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const menuItemClasses =
    "block w-full px-4 py-2 text-left text-sm hover:bg-(--primary-light) transition-colors";

  const handleToggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + 8,
        left: rect.right - 160,
      });
    }

    setIsOpen((prev) => !prev);
  };

  const handleDeleteEmployee = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteEmployee(employee.id);

      if (!result.success) {
        console.log(result.message);
        return;
      }

      await getAllEmployees();

      setIsModalOpen(false);
    } catch (error) {
      console.log("Error deleting employee:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <Button
        ref={buttonRef}
        variant="ghost"
        className="p-2"
        onClick={handleToggleDropdown}
        aria-label="Employee actions"
      >
        <MoreVertical size={18} />
      </Button>

      {isOpen && (
        <Dropdown position={position} dropdownRef={dropdownRef}>
          <Link
            to={`/employees/${employee.id}/profile`}
            className={`${menuItemClasses} text-(--text)`}
          >
            View Profile
          </Link>

          <Link
            to={`/employees/${employee.id}/update`}
            className={`${menuItemClasses} text-(--text)`}
          >
            Update Employee
          </Link>

          <button
            className={`${menuItemClasses} text-(--error)`}
            onClick={() => {
              setIsOpen(false);
              setIsModalOpen(true);
            }}
          >
            Delete Employee
          </button>
        </Dropdown>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employee.firstName} ${employee.lastName}? This action cannot be undone.`}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDeleteEmployee}
        confirmText={isDeleting ? "Deleting..." : "Delete"}
        isConfirming={isDeleting}
      />
    </div>
  );
}
