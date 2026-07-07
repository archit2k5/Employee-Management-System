import {
  FiUsers,
  FiClock,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";

import StatCard from "../components/dashboard/StatCard";

const Overview = () => {
  return (
    <>
      <div className="page-header">
        <h1>HR Overview</h1>
        <p>Company-wide workforce summary</p>
      </div>

      <div className="stats-grid">

        <StatCard
          title="TOTAL EMPLOYEES"
          value="108"
          subtitle="+6 this month"
          icon={<FiUsers />}
        />

        <StatCard
          title="AVG ATTENDANCE"
          value="94.2%"
          subtitle="Across all departments"
          icon={<FiClock />}
        />

        <StatCard
          title="OPEN POSITIONS"
          value="8"
          subtitle="4 departments"
          icon={<FiBriefcase />}
        />

        <StatCard
          title="PENDING LEAVES"
          value="3"
          subtitle="Awaiting approval"
          icon={<FiCalendar />}
        />

      </div>
    </>
  );
};

export default Overview;