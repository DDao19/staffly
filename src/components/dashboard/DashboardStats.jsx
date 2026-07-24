import { Users, UserCheck, Clock, Building2 } from "lucide-react";
import StatCard from "./StatCard";

export default function DashboardStats() {
  const stats = [
    {
      title: "Employees",
      value: 0,
      icon: Users,
      iconColor: "purple",
    },
    {
      title: "Active",
      value: 0,
      icon: UserCheck,
      iconColor: "green",
    },
    {
      title: "Pending",
      value: 0,
      icon: Clock,
      iconColor: "yellow",
    },
    {
      title: "Departments",
      value: 0,
      icon: Building2,
      iconColor: "blue",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
