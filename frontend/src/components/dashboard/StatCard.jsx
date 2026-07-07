import "./dashboard.css";

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="stat-card">

      <div className="card-header">
        <p>{title}</p>
        <div className="card-icon">
          {icon}
        </div>
      </div>

      <h2>{value}</h2>

      <span>{subtitle}</span>

    </div>
  );
};

export default StatCard;