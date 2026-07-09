import LeaveStats from "../components/leave/LeaveStats";
import PendingRequests from "../components/leave/PendingRequests";
import RecentProcessed from "../components/leave/RecentProcessed";
import "../components/leave/leave.css";

const LeaveApproval = () => {
  return (
    <>
      <div className="page-header">
        <h1>Leave Approval </h1>
        <p>Review and action pending leave requests</p>
      </div>

      <LeaveStats />

      <PendingRequests />

      <RecentProcessed />
    </>
  );
};

export default LeaveApproval;