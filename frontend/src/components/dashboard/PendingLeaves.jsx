import { FiCheck, FiX } from "react-icons/fi";
import "./dashboard.css";

const leaveData = [
  {
    initials: "MS",
    name: "Maria Santos",
    type: "Annual",
    date: "Jul 15–19 (5d)",
    reason: "Family vacation",
    color: "#A855F7",
  },
  {
    initials: "JP",
    name: "James Park",
    type: "Sick",
    date: "Jul 5 (1d)",
    reason: "Medical appointment",
    color: "#10B981",
  },
  {
    initials: "TW",
    name: "Tom Walker",
    type: "Personal",
    date: "Jul 8–9 (2d)",
    reason: "Personal errands",
    color: "#EF4444",
  },
];

const PendingLeaves = () => {
  return (
    <div className="pending-card">

      <h3>Pending Leave Requests</h3>

      {leaveData.map((leave, index) => (
        <div className="leave-item" key={index}>

          <div className="leave-left">

            <div
              className="avatar"
              style={{ background: leave.color }}
            >
              {leave.initials}
            </div>

            <div className="leave-info">

              <h4>{leave.name}</h4>

              <p>
                {leave.type} · {leave.date} · {leave.reason}
              </p>

            </div>

          </div>

          <div className="leave-actions">

            <button className="approve-btn">
              <FiCheck />
            </button>

            <button className="reject-btn">
              <FiX />
            </button>

          </div>

        </div>
      ))}

    </div>
  );
};

export default PendingLeaves;