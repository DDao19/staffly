import { dashboardIconStyles } from "../../data/dashboardIconStyles ";

export default function StatCard({ title, value, icon: Icon, iconColor }) {
  const styles = dashboardIconStyles[iconColor] ?? dashboardIconStyles.purple;

  return (
    <div className="rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center gap-3">
        <div className={`rounded-xl ${styles.background} p-2`}>
          <Icon size={24} className={styles.color} />
        </div>

        <p className="text-lg font-semibold">{title}</p>
      </div>

      <p className="mt-4 text-3xl text-center font-semibold text-(--text)">
        {value}
      </p>
    </div>
  );
}
