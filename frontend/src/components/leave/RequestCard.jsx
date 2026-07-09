import { FiCheck, FiX } from "react-icons/fi";

const RequestCard = ({ request }) => {
  return (
    <div className="request-card">

      <div className="request-left">

        <div
          className="request-avatar"
          style={{ background: request.color }}
        >
          {request.initials}
        </div>

        <div className="request-details">

          <div className="request-title">

            <h4>{request.name}</h4>

            <span className={`leave-badge ${request.badge}`}>
              {request.type}
            </span>

          </div>

          <p>{request.dates}</p>

          <small>{request.reason}</small>

        </div>

      </div>

      <div className="request-buttons">

        <button className="approve-btn">
          <FiCheck />
          Approve
        </button>

        <button className="reject-btn">
          <FiX />
          Reject
        </button>

      </div>

    </div>
  );
};

export default RequestCard;