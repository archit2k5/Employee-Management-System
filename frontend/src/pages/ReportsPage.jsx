import { useState } from "react";
import { Icon } from "../components/common/Icons";

import LineChart from "../components/charts/LineChart";
import PayrollChart from "../components/charts/PayrollChart";
import AttendanceChart from "../components/charts/AttendanceChart";
import PieChart from "../components/charts/PieChart";
import LeaveChart from "../components/charts/LeaveChart";
import PerformanceChart from "../components/charts/PerformanceChart";
import ScoreCard from "../components/charts/ScoreCard";
import ReportsLineChart from "../components/charts/ReportsLineChart";

import {
  reportTabs,
  headcountGrowth,
  headcountByDept,
  payrollTrend,
  attendanceTrend,
  leaveTrend,
  ratingDistribution,
  avgScores
} from "../data/mockData";

import "./ReportsPage.css";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Headcount");

  return (
    <div>
 
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">
            Interactive data reports across all modules
          </p>
        </div>

        <button className="btn btn-secondary">
          <Icon.Download size={16} />
          Export
        </button>
      </div>


      <div className="reports-tabs">
        {reportTabs.map((tab) => (
          <button
            key={tab}
            className={`reports-tab ${
              activeTab === tab ? "reports-tab-active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>


      {activeTab === "Headcount" && (
        <div className="reports-grid">
          <div className="card chart-card">
            <h3 className="chart-card-title">
              Headcount Growth
            </h3>

             <ReportsLineChart
        data={headcountGrowth}
      />
          </div>

          <div className="card chart-card">
            <h3 className="chart-card-title">
              By Department
            </h3>

            <PieChart data={headcountByDept} />
          </div>
        </div>
      )}

  

      {activeTab === "Payroll" && (
        <div className="card chart-card">
          <h3 className="chart-card-title">
            Payroll Trend ($M)
          </h3>

          <PayrollChart data={payrollTrend} />
        </div>
      )}

     

      {activeTab === "Attendance" && (
        <div className="card chart-card">
          <h3 className="chart-card-title">
            Company Attendance - 2024
          </h3>

          <AttendanceChart data={attendanceTrend} />
        </div>
      )}

    

    {activeTab === "Leave" && (
  <div className="card chart-card">
    <h3 className="chart-card-title">
      Leave Utilization - 2024
    </h3>

    <LeaveChart data={leaveTrend} />
  </div>
)}
  

     {activeTab === "Performance" && (
  <div className="reports-grid">

    <div className="card chart-card">
      <h3 className="chart-card-title">
        Rating Distribution
      </h3>

      <PerformanceChart
        data={ratingDistribution}
      />
    </div>

    <div className="card chart-card">
      <h3 className="chart-card-title">
        Avg Scores by Category
      </h3>

      <ScoreCard
        data={avgScores}
      />
    </div>

  </div>
     )}
    </div>
  );
}