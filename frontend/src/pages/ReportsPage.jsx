import { useState } from "react";
import { Icon } from "../components/common/Icons";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import { reportTabs, headcountGrowth, headcountByDept } from "../data/mockData";
import "./ReportsPage.css";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Headcount");

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports &amp; Analytics</h1>
          <p className="page-subtitle">Interactive data reports across all modules</p>
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
            className={`reports-tab ${activeTab === tab ? "reports-tab-active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Headcount" ? (
        <div className="reports-grid">
          <div className="card chart-card">
            <h3 className="chart-card-title">Headcount Growth</h3>
            <LineChart data={headcountGrowth} yTicks={[0, 30, 60, 90, 120]} />
          </div>
          <div className="card chart-card">
            <h3 className="chart-card-title">By Department</h3>
            <PieChart data={headcountByDept} />
          </div>
        </div>
      ) : (
        <div className="card reports-placeholder">
          <p>{activeTab} report data will appear here.</p>
        </div>
      )}
    </div>
  );
}
