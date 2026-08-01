import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Badge } from "../ui/Badge";
import { TableSkeleton } from "../ui/TableSkeleton";
import { statusVariant } from "../../data/status";
import { useEmployee } from "../hooks/useEmployee";
import {
  getLocationLabel,
  formatDate,
  getDepartmentLabel,
} from "../../utils/employeeFormatters";

export default function RecentEmployees() {
  const { employees, loading } = useEmployee();

  // Create a new list of employees and only show the first 5
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

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
        <div className="overflow-x-auto">
          {loading ? (
            <TableSkeleton columns={6} rows={5} />
          ) : (
            <table className="w-full min-w-225">
              <thead className="bg-(--dashboard-blue-bg)">
                <tr className="border-b border-(--border)">
                  <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                    Job Title
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                    Department
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                    Location
                  </th>

                  <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-(--border) last:border-none"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-(--surface-secondary) flex items-center justify-center">
                          <User size={16} />
                        </div>
                        <Link to={`/employees/${employee.id}/profile`}>
                          <span>{`${employee.firstName} ${employee.lastName}`}</span>
                        </Link>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-(--text) font-medium">
                      <Badge variant={statusVariant[employee.status]}>
                        {employee.status}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-medium">
                      {employee.jobTitle}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-medium">
                      {getDepartmentLabel(employee.department)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text-secondary) font-medium">
                      {getLocationLabel(employee.location)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-medium">
                      {formatDate(employee.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
