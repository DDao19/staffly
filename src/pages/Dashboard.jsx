import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentEmployees from "../components/dashboard/RecentEmployees";

export default function Dashboard() {
  return (
    <section className="max-w-7xl mx-auto  py-10 space-y-10">
      <DashboardHero />
      <DashboardStats />
      <RecentEmployees />
    </section>
  );
}
