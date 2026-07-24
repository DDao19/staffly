import { useAuth } from "../hooks/useAuth";

export default function DashboardHero() {
  const { user } = useAuth();
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight text-(--text)">
        Welcome {user?.name}
      </h2>
      <p className="text-(--text-secondary)">
        Here's an overview of your employees and company activity.
      </p>
    </div>
  );
}
