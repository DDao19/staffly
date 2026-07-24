import { User } from "lucide-react";
import Badge from "../ui/Badge";

export default function RecentEmployees() {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      role: "Frontend Developer",
      department: "Engineering",
      location: "Dallas, TX",
      status: "Active",
      salary: "$90,000",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Product Designer",
      department: "Design",
      location: "Austin, TX",
      status: "Active",
      salary: "$75,000",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Engineering Manager",
      department: "Engineering",
      location: "Houston, TX",
      status: "Pending",
      salary: "$120,000",
    },
  ];

  const statusVariant = {
    Active: "success",
    Pending: "warning",
    Inactive: "error",
  };

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-(--text)">
          Recent Employees
        </h2>

        <p className="text-(--text-secondary)">
          Recently added employees in your organization.
        </p>
      </div>

      <div className="rounded-xl border border-(--border) bg-(--surface) shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-(--dashboard-blue-bg)">
            <tr className="border-b border-(--border)">
              <th className="px-6 py-4 text-left font-medium text-(--dashboard-blue)">
                Name
              </th>
              <th className="px-6 py-4 text-left font-medium text-(--dashboard-blue)">
                Role
              </th>
              <th className="px-6 py-4 text-left font-medium text-(--dashboard-blue)">
                Department
              </th>
              <th className="px-6 py-4 text-left font-medium text-(--dashboard-blue)">
                Location
              </th>
              <th className="px-6 py-4 text-left font-medium text-(--dashboard-blue)">
                Status
              </th>
              <th className="px-6 py-4 text-left font-medium text-(--dashboard-blue)">
                Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-(--border) last:border-none"
              >
                <td className="px-6 py-4 text-sm text-(--text) font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-(--surface-secondary) flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span>{employee.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-(--text) font-medium">
                  {employee.role}
                </td>
                <td className="px-6 py-4 text-sm text-(--text) font-medium">
                  {employee.department}
                </td>
                <td className="px-6 py-4 text-sm text-(--text-secondary) font-medium">
                  {employee.location}
                </td>
                <td className="px-6 py-4 text-xs text-(--text) font-medium">
                  <Badge variant={statusVariant[employee.status]}>
                    {employee.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-(--text) font-medium">
                  {employee.salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
