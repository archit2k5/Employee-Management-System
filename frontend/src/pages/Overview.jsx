import {
  FiUsers,
  FiClock,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";

import StatCard from "../components/dashboard/StatCard";
import "../components/dashboard/dashboard.css";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import PendingLeaves from "../components/dashboard/PendingLeaves";
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
  iconBg="rgba(59,130,246,0.15)"
  iconColor="#3B82F6"
/>

<StatCard
  title="AVG ATTENDANCE"
  value="94.2%"
  subtitle="Across all departments"
  icon={<FiClock />}
  iconBg="rgba(6,182,212,0.15)"
  iconColor="#06B6D4"
/>

<StatCard
  title="OPEN POSITIONS"
  value="8"
  subtitle="4 departments"
  icon={<FiBriefcase />}
  iconBg="rgba(168,85,247,0.15)"
  iconColor="#A855F7"
/>

<StatCard
  title="PENDING LEAVES"
  value="3"
  subtitle="Awaiting approval"
  icon={<FiCalendar />}
  iconBg="rgba(249,115,22,0.15)"
  iconColor="#F97316"
/>

      </div>
      
<div className="charts-grid">

    <AttendanceChart />

    <DepartmentChart />

</div>
<PendingLeaves />
       
    </>
  );
};

export default Overview;