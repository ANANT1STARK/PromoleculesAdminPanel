import StatCard from "./StatCard";

/**
 * Renders the KPI card grid.
 * `stats` follows the shape of `statsData` in data/dashboardData.js.
 * Pass `isLoading` to show skeleton placeholders while a real fetch resolves.
 */
export default function DashboardStats({ stats, isLoading = false }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} isLoading={isLoading} />
      ))}
    </div>
  );
}