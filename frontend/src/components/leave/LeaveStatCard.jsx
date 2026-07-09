const LeaveStatCard = ({
    title,
    value,
    icon,
    bg,
    color
}) => {

    return (

        <div className="leave-card">

            <div className="leave-card-header">

                <p>{title}</p>

                <div
                    className="leave-icon"
                    style={{
                        background: bg,
                        color: color
                    }}
                >
                    {icon}
                </div>

            </div>

            <h2>{value}</h2>

        </div>

    )

}

export default LeaveStatCard;