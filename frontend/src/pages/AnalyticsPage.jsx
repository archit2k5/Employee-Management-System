import StatCard from "../components/common/StatCard";
import LineChart from "../components/charts/LineChart";
import { Icon } from "../components/common/Icons";
import { analyticsStats, employeeGrowth, payrollCostTrend, systemHealth } from "../data/mockData";
import "./AnalyticsPage.css";

const statusMeta = {
  healthy: { badge: "badge-green", dot: "dot-green", label: "healthy" },
  degraded: { badge: "badge-amber", dot: "dot-amber", label: "degraded" },
  down: { badge: "badge-red", dot: "dot-red", label: "down" },
};

export default function AnalyticsPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Company-wide metrics and insights</p>
        </div>
      </div>

      <div className="stat-grid">
        {analyticsStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="analytics-charts">
        <div className="card chart-card">
          <h3 className="chart-card-title">Employee Growth — 2024</h3>
          <LineChart data={employeeGrowth} yTicks={[0, 30, 60, 90, 120]} />
        </div>
        <div className="card chart-card">
          <h3 className="chart-card-title">Payroll Cost ($M) — 2024</h3>
          <LineChart
            data={payrollCostTrend}
            yTicks={[0, 3, 6, 9, 12]}
            color="var(--color-purple)"
            valueFormatter={(v) => `$${v}M`}
          />
        </div>
      </div>

      <div className="card system-health-card">
        <div className="system-health-header">
          <h3 className="chart-card-title">System Health</h3>
          <button className="btn btn-secondary system-health-refresh">
            <Icon.Refresh size={14} />
            Refresh
          </button>
        </div>
        <div className="system-health-grid">
          {systemHealth.map((s) => {
            const meta = statusMeta[s.status];
            return (
              <div className="system-health-row" key={s.name}>
                <span className="system-health-icon">
                  <Icon.Layers size={16} />
                </span>
                <div className="system-health-info">
                  <div className="system-health-name">{s.name}</div>
                  <div className="system-health-meta">
                    Uptime {s.uptime} · Latency {s.latency}
                  </div>
                </div>
                <span className={`badge ${meta.badge}`}>
                  <span className={`dot ${meta.dot}`} />
                  {meta.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
