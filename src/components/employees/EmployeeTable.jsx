import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { TableSkeleton } from "../ui/TableSkeleton";
import { statusVariant } from "../../data/status";
import { EmployeeActions } from "../employees/EmployeeActions";
import { useEmployee } from "../hooks/useEmployee";
import {
  getLocationLabel,
  formatSalary,
  formatDate,
  getDepartmentLabel,
  getStatusLabel,
} from "../../utils/employeeFormatters";

export default function EmployeeTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const { employees, loading } = useEmployee();

  const employeesPerPage = 5;

  const lastEmployeeIndex = currentPage * employeesPerPage;
  const firstEmployeeIndex = lastEmployeeIndex - employeesPerPage;

  // Create shallow copy of employees and sort by name
  // useMemo to memoize the sorted employees list
  const sortedEmployees = useMemo(() => {
    return [...employees].sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [employees]);

  const currentEmployees = sortedEmployees.slice(
    firstEmployeeIndex,
    lastEmployeeIndex,
  );

  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const resetPage = () => {
      setCurrentPage(1);
    };

    resetPage();
  }, [employees]);

  return (
    <div className="rounded-xl border border-(--border) bg-(--surface) shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        {loading ? (
          <TableSkeleton columns={8} rows={6} />
        ) : (
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
                  Job Title
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
                <th className="whitespace-nowrap px-5 py-4 text-left font-medium text-(--dashboard-blue)">
                  Hire Date
                </th>
                <th className="whitespace-nowrap w-24 px-5 py-4 text-center font-medium text-(--dashboard-blue)">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((employee) => (
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
                    <td className="whitespace-nowrap px-5 py-4 text-center text-xs text-(--text) font-medium">
                      <Badge variant={statusVariant[employee.status]}>
                        {getStatusLabel(employee.status)}
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
                      {formatSalary(employee.salary)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-(--text) font-medium">
                      {formatDate(employee.hireDate)}
                    </td>
                    <td className="text-center whitespace-nowrap px-5 py-4">
                      <EmployeeActions employee={employee} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="h-70 text-center text-sm text-(--text-secondary)"
                  >
                    Currently no employees..
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {currentEmployees.length > 0 && (
        <div className="flex items-center justify-between border-t border-(--border) px-5 py-4">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={
                    currentPage === page
                      ? "rounded-md bg-(--primary) px-3 py-1 text-sm text-white"
                      : "rounded-md px-3 py-1 text-sm text-(--text) hover:bg-(--primary-light)"
                  }
                >
                  {page}
                </button>
              );
            })}
          </div>

          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
