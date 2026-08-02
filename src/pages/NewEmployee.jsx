import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EmployeeForm } from "../components/employees/EmployeeForm";

export default function NewEmployee() {
  return (
    <section className="max-w-7xl mx-auto pb-10 space-y-10">
      <div className="space-y-10">
        <Link to="/employees" className="flex items-center gap-2">
          <ArrowLeft size={24} />
          Employees
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-(--text)">
            Add New Employee
          </h1>

          <p className="text-(--text-secondary)">
            Create a new employee record.
          </p>
        </div>
      </div>

      <EmployeeForm />
    </section>
  );
}
