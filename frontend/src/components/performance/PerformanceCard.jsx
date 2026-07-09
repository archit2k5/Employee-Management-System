import "./performance.css";

const PerformanceCard = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="stat-card">

      <div className="card-header">

        <p>{title}</p>

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

      <h2>{value}</h2>

    </div>
  );
};

export default PerformanceCard;