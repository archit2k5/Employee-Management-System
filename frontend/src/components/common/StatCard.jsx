import { Icon } from "./Icons";
import "./StatCard.css";

const iconMap = {
  users: Icon.Users,
  dollar: Icon.Dollar,
  clock: Icon.Clock,
  trend: Icon.Trend,
  calendar: Icon.Calendar,
};

export default function StatCard({ label, value, sub, icon, color = "blue" }) {
  const IconCmp = iconMap[icon] || Icon.Users;
  return (
    <div className="stat-card card">
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        <span className={`stat-card-icon stat-card-icon-${color}`}>
          <IconCmp size={16} />
        </span>
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-sub">{sub}</div>
    </div>
  );
}
