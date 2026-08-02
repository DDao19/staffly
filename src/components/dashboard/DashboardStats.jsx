import { Users, UserCheck, Clock, Building2 } from "lucide-react";
import { useEmployee } from "../hooks/useEmployee";
import StatCard from "./StatCard";
import { StatCardSkeleton } from "../ui/StatCardSkeleton";

export default function DashboardStats() {
  const { employees, loading } = useEmployee();

  const activeEmployees = employees.filter(
    (employee) => employee.status === "ACTIVE",
  );

  const pendingEmployees = employees.filter(
    (employee) => employee.status === "PENDING",
  );

  const totalDepartments = new Set(
    employees.map((employee) => employee.department),
  ).size;

  const stats = [
    {
      title: "Employees",
      value: employees.length,
      icon: Users,
      iconColor: "purple",
    },
    {
      title: "Active",
      value: activeEmployees.length,
      icon: UserCheck,
      iconColor: "green",
    },
    {
      title: "Pending",
      value: pendingEmployees.length,
      icon: Clock,
      iconColor: "yellow",
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: Building2,
      iconColor: "blue",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {loading
        ? stats.map((stat) => <StatCardSkeleton key={stat.title} />)
        : stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
    </div>
  );
}
