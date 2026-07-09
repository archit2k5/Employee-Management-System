import { NavLink } from "react-router-dom";
import { Icon } from "../common/Icons";
import { currentAdmin } from "../../data/mockData";
import "./Sidebar.css";

const navItems = [
  { to: "/admin/analytics", label: "Analytics", icon: Icon.BarChart },
  { to: "/admin/users", label: "User Management", icon: Icon.Users },
  { to: "/admin/payroll", label: "Payroll", icon: Icon.Dollar },
  { to: "/admin/reports", label: "Reports", icon: Icon.FileText },
  { to: "/admin/settings", label: "System Settings", icon: Icon.Settings },
  { to: "/admin/audit-logs", label: "Audit Logs", icon: Icon.Activity },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">
          <Icon.Layers size={18} />
        </span>
        <span className="sidebar-brand-name">Nexus HR</span>
        <button className="sidebar-collapse-btn" aria-label="Toggle sidebar">
          <Icon.Menu size={18} />
        </button>
      </div>

      <div className="sidebar-section-label">Admin Portal</div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
            <span className="sidebar-link-chevron">
              <Icon.ChevronRight size={14} />
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">{currentAdmin.initials}</div>
        <div className="sidebar-footer-text">
          <div className="sidebar-footer-name">{currentAdmin.name}</div>
          <div className="sidebar-footer-role">{currentAdmin.role}</div>
        </div>
        <button className="sidebar-logout-btn" aria-label="Log out">
          <Icon.LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
