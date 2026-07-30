import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../services/employeeService";

import { Badge } from "../ui/Badge";
import { EmployeeProfileSkeleton } from "../ui/EmployeeProfileSkeleton";
import { statusLabels, statusVariant } from "../../data/status";

export default function ProfileData() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await getEmployeeById(id);

        if (!result.success) {
          console.log(result.message);
          return;
        }

        setEmployee(result.employee);
      } catch (error) {
        console.log("Fetch employee profile error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <div className="space-y-6">
      {loading ? (
        <EmployeeProfileSkeleton />
      ) : (
        <>
          <div className="rounded-xl border border-(--border) bg-(--surface) p-6">
            <h1 className="text-2xl font-semibold text-(--text)">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="mt-2 text-sm text-(--text-secondary)">
              {employee.jobTitle}
            </p>
            <div className="mt-4">
              <Badge variant={statusVariant[employee.status]}>
                {statusLabels[employee.status]}
              </Badge>
            </div>
          </div>

          <div className="rounded-xl border border-(--border) bg-(--surface) p-6">
            <h2 className="text-lg font-semibold text-(--text)">
              Personal Information
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-(--text-secondary)">Email</p>

                <p className="mt-1 font-medium text-(--text)">
                  {employee.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-(--text-secondary)">Phone</p>

                <p className="mt-1 font-medium text-(--text)">
                  {employee.phone}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-(--text-secondary)">Address</p>

                <p className="mt-1 font-medium text-(--text)">
                  {employee.street}
                  <br />
                  {employee.city}, {employee.state} {employee.zipCode}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-(--border) bg-(--surface) p-6">
            <h2 className="text-lg font-semibold text-(--text)">
              Employment Information
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-(--text-secondary)">Job Title</p>

                <p className="mt-1 font-medium text-(--text)">
                  {employee.jobTitle}
                </p>
              </div>

              <div>
                <p className="text-sm text-(--text-secondary)">Department</p>

                <p className="mt-1 font-medium text-(--text)">
                  {employee.department}
                </p>
              </div>

              <div>
                <p className="text-sm text-(--text-secondary)">Location</p>

                <p className="mt-1 font-medium text-(--text)">
                  {employee.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-(--text-secondary)">Salary</p>

                <p className="mt-1 font-medium text-(--text)">
                  ${Number(employee.salary).toLocaleString()}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-(--text-secondary)">Hire Date</p>

                <p className="mt-1 font-medium text-(--text)">
                  {new Date(employee.hireDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
