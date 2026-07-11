import { Icon } from "../components/common/Icons";
import { users, rolePermissions } from "../data/mockData";
import "./UserManagementPage.css";

const roleBadge = {
  Employee: "badge-blue",
  "HR Manager": "badge-purple",
  Admin: "badge-red",
};

const avatarColor = {
  blue: "#3b82f6",
  teal: "#14b8a6",
  amber: "#f59e0b",
  purple: "#a78bfa",
  red: "#ef4444",
};

export default function UserManagementPage() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Roles, permissions, and access control</p>
        </div>
        <button className="btn btn-primary">
          <Icon.Users size={16} />
          Add User
        </button>
      </div>

      <div className="card user-table-card">
        <table className="user-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Dept</th>
              <th>Last Login</th>
              <th>MFA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="user-cell">
                    <span className="user-avatar" style={{ background: avatarColor[u.color] }}>
                      {u.initials}
                    </span>
                    {u.name}
                  </div>
                </td>
                <td>
                  <span className={`badge ${roleBadge[u.role]}`}>{u.role}</span>
                </td>
                <td className="user-table-muted">{u.dept}</td>
                <td className="user-table-muted">{u.lastLogin}</td>
                <td>
                  <span className={`badge ${u.mfa ? "badge-green" : "badge-red"}`}>
                    {u.mfa ? "On" : "Off"}
                  </span>
                </td>
                <td>
                  <span className="status-cell">
                    <span className={`dot ${u.status === "Active" ? "dot-green" : "dot-red"}`} />
                    {u.status}
                  </span>
                </td>
                <td>
                  <div className="user-actions">
                    <button className="icon-action-btn" aria-label={`Edit ${u.name}`}>
                      <Icon.Edit size={15} />
                    </button>
                    <button className="icon-action-btn icon-action-btn-danger" aria-label={`Delete ${u.name}`}>
                      <Icon.Trash size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card role-permissions-card">
        <h3 className="chart-card-title">Role Permissions</h3>
        <div className="role-permissions-grid">
          {Object.entries(rolePermissions).map(([role, perms]) => (
            <div key={role} className="role-permissions-col">
              <span className={`badge ${roleBadge[role]}`}>{role}</span>
              <ul className="role-permissions-list">
                {perms.map((p) => (
                  <li key={p}>
                    <span className="role-permissions-check">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
