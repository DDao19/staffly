import { MoreVertical, User } from "lucide-react";
import { Badge } from "../ui/Badge";
import { employees } from "../../data/employees";
import { statusVariant } from "../../data/status";
import { Button } from "../ui/Button";

export default function EmployeeTable() {
  return (
    <div className="rounded-xl border border-(--border) bg-(--surface) shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-225">
          <thead className="bg-(--dashboard-blue-bg)">
            <tr className="border-b border-(--border)">
              <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                Name
              </th>
              <th className="w-32 whitespace-nowrap px-5 py-4 text-center font-medium text-(--dashboard-blue)">
                Status
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                Role
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                Department
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                Location
              </th>

              <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                Salary
              </th>
              <th className="whitespace-nowrap w-24 px-5 py-4 text-center font-medium text-(--dashboard-blue)">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-(--border) last:border-none"
              >
                <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-(--surface-secondary) flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <span>{employee.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-center text-xs text-(--text) font-medium">
                  <Badge variant={statusVariant[employee.status]}>
                    {employee.status}
                  </Badge>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-medium">
                  {employee.role}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-medium">
                  {employee.department}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text-secondary) font-medium">
                  {employee.location}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-medium">
                  {employee.salary}
                </td>
                <td className="text-center whitespace-nowrap px-5 py-4">
                  <Button
                    variant="ghost"
                    className="p-2"
                    aria-label="Employee actions"
                  >
                    <MoreVertical size={18} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
