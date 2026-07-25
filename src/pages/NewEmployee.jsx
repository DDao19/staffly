import { EmployeeForm } from "../components/employees/EmployeeForm";

export default function NewEmployee() {
  return (
    <section className="max-w-7xl mx-auto py-10 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-(--text)">
          New Employee
        </h1>

        <p className="text-(--text-secondary)">Create a new employee record.</p>
      </div>

      <EmployeeForm />
    </section>
  );
}
