import { Button } from "../ui/Button";
import { Plus } from "lucide-react";

export default function EmployeeHeader({ onAddEmployee }) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-(--text)">
          Employees
        </h1>

        <p className="text-(--text-secondary)">
          Manage your organization's employees.
        </p>
      </div>

      <Button
        variant="primary"
        onClick={onAddEmployee}
        className="text-xs whitespace-nowrap"
        aria-label="Add Employee"
      >
        <Plus size={18} />
        <span className="hidden md:inline">Add Employee</span>
      </Button>
    </div>
  );
}
