import "./leave.css";

const processedData = [
  {
    id: 1,
    employee: "Emma Wilson",
    type: "Annual",
    dates: "Jun 20 - Jun 24",
    days: 5,
    action: "Approved",
    status: "Completed",
  },
  {
    id: 2,
    employee: "David Kim",
    type: "Sick",
    dates: "Jun 18",
    days: 1,
    action: "Approved",
    status: "Completed",
  },
  {
    id: 3,
    employee: "Sarah Johnson",
    type: "Personal",
    dates: "Jun 15 - Jun 16",
    days: 2,
    action: "Rejected",
    status: "Declined",
  },
];

const RecentProcessed = () => {
  return (
    <div className="processed-card">

      <div className="processed-header">
        <h3>Recently Processed</h3>
      </div>

      <div className="processed-table">

        <div className="processed-table-header">
          <div>Employee</div>
          <div>Leave Type</div>
          <div>Dates</div>
          <div>Days</div>
          <div>Action</div>
          <div>Status</div>
        </div>

        {processedData.map((item) => (
          <div className="processed-row" key={item.id}>

            <div>{item.employee}</div>

            <div>
              <span className={`leave-badge ${item.type.toLowerCase()}`}>
                {item.type}
              </span>
            </div>

            <div>{item.dates}</div>

            <div>{item.days}</div>

            <div>{item.action}</div>

            <div>
              <span
                className={
                  item.status === "Completed"
                    ? "status completed"
                    : "status declined"
                }
              >
                {item.status}
              </span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default RecentProcessed;