import "./dashboard.css";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="stat-card">
      <div className="card-header">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
          <span>{subtitle}</span>
        </div>

        <div
          className="card-icon"
          style={{
            background: iconBg,
            color: iconColor,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;