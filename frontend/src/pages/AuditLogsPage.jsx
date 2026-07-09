import { useState } from "react";
import { Icon } from "../components/common/Icons";
import { auditLogs } from "../data/mockData";
import "./AuditLogsPage.css";

const filters = ["All", "Info", "Warning", "Critical"];

const severityBadge = {
  info: "badge-blue",
  warning: "badge-amber",
  critical: "badge-red",
};

export default function AuditLogsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredLogs =
    activeFilter === "All"
      ? auditLogs
      : auditLogs.filter((log) => log.severity === activeFilter.toLowerCase());

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Audit Logs</h1>
          <p className="page-subtitle">Track all system actions and changes</p>
        </div>
        <button className="btn btn-secondary">
          <Icon.Download size={16} />
          Export Logs
        </button>
      </div>

      <div className="audit-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={`audit-filter-btn ${activeFilter === f ? "audit-filter-btn-active" : ""}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card audit-table-card">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Severity</th>
              <th>User</th>
              <th>Action</th>
              <th>Target</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, i) => (
              <tr key={i}>
                <td>
                  <span className={`badge ${severityBadge[log.severity]}`}>{log.severity}</span>
                </td>
                <td className="audit-table-user">{log.user}</td>
                <td>{log.action}</td>
                <td className="audit-table-muted">{log.target}</td>
                <td className="audit-table-muted">{log.timestamp}</td>
              </tr>
            ))}
            {filteredLogs.length === 0 && (
              <tr>
                <td colSpan={5} className="audit-table-empty">
                  No {activeFilter.toLowerCase()} logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
