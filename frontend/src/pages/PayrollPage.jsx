import StatCard from "../components/common/StatCard";
import { Icon } from "../components/common/Icons";
import { payrollStats, salaryByDept, payrollHistory } from "../data/mockData";
import "./PayrollPage.css";

export default function PayrollPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Payroll Processing</h1>
          <p className="page-subtitle">Salary structures and payroll management</p>
        </div>
        <button className="btn btn-primary">
          <Icon.Refresh size={16} />
          Run Payroll
        </button>
      </div>

      <div className="stat-grid">
        {payrollStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="card salary-table-card">
        <h3 className="chart-card-title">Salary Structure by Department</h3>
        <div className="salary-table-scroll">
          <table className="salary-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Avg Salary</th>
                <th>Min</th>
                <th>Max</th>
                <th>Headcount</th>
                <th>Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              {salaryByDept.map((row) => (
                <tr key={row.dept}>
                  <td className="salary-table-dept">{row.dept}</td>
                  <td>{row.avg}</td>
                  <td className="salary-table-muted">{row.min}</td>
                  <td className="salary-table-muted">{row.max}</td>
                  <td>{row.headcount}</td>
                  <td>{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card payroll-history-card">
        <h3 className="chart-card-title">Payroll History</h3>
        <div className="payroll-history-list">
          {payrollHistory.map((run) => (
            <div className="payroll-history-row" key={run.period}>
              <div className="payroll-history-info">
                <div className="payroll-history-period">{run.period}</div>
                <div className="payroll-history-meta">
                  {run.employees} employees · {run.processedOn}
                </div>
              </div>
              <div className="payroll-history-right">
                <span className="payroll-history-amount">{run.amount}</span>
                <span className="badge badge-green">{run.status}</span>
                <button className="icon-action-btn" aria-label={`Download ${run.period} payroll report`}>
                  <Icon.Download size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
