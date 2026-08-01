import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/Button";
import { MoreVertical } from "lucide-react";
import { Dropdown } from "../ui/Dropdown";

export function EmployeeActions() {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);

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
          <button className="w-full px-4 py-2 text-left text-sm text-(--text) hover:bg-(--primary-light)">
            View Profile
          </button>

          <button className="w-full px-4 py-2 text-left text-sm text-(--text) hover:bg-(--primary-light)">
            Edit Employee
          </button>

          <button className="w-full px-4 py-2 text-left text-sm text-(--error) hover:bg-(--primary-light)">
            Delete Employee
          </button>
        </Dropdown>
      )}
    </div>
  );
}
