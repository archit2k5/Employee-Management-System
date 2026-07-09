import RequestCard from "./RequestCard";

const requests = [
  {
    id: 1,
    initials: "MS",
    color: "#8B5CF6",
    name: "Maria Santos",
    type: "Annual",
    badge: "annual",
    dates: "Jul 15 - Jul 19 (5 days)",
    reason: "Family vacation",
  },
  {
    id: 2,
    initials: "JP",
    color: "#10B981",
    name: "James Park",
    type: "Sick",
    badge: "sick",
    dates: "Jul 5 (1 day)",
    reason: "Medical appointment",
  },
  {
    id: 3,
    initials: "TW",
    color: "#EF4444",
    name: "Tom Walker",
    type: "Personal",
    badge: "personal",
    dates: "Jul 8 - Jul 9 (2 days)",
    reason: "Personal errands",
  },
];

const PendingRequests = () => {
  return (
    <div className="pending-container">

      <div className="pending-header">

        <h3>Pending Requests</h3>

        <span>{requests.length}</span>

      </div>

      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
        />
      ))}

    </div>
  );
};

export default PendingRequests;