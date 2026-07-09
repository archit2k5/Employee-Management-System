const RecruitmentCard = ({
  title,
  value,
  icon,
  iconColor,
  iconBg,
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

export default RecruitmentCard;