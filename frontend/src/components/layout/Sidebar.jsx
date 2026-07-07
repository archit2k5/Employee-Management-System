import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiBriefcase,
  FiGrid,
  FiTrendingUp,
} from "react-icons/fi";

import "./layout.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>Nexus HR</h2>
      </div>

      <p className="portal-title">HR PORTAL</p>

      <nav>
        <NavLink to="/" className="menu-item">
          <FiHome />
          <span>Overview</span>
        </NavLink>

        <NavLink to="/employees" className="menu-item">
          <FiUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/leave" className="menu-item">
          <FiCalendar />
          <span>Leave Approval</span>
        </NavLink>

        <NavLink to="/recruitment" className="menu-item">
          <FiBriefcase />
          <span>Recruitment</span>
        </NavLink>

        <NavLink to="/departments" className="menu-item">
          <FiGrid />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/performance" className="menu-item">
          <FiTrendingUp />
          <span>Performance</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;