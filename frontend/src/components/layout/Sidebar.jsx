import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiBriefcase,
  FiGrid,
  FiTrendingUp,
   FiLayers,
  FiMenu,
} from "react-icons/fi";

import "./layout.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* Logo */}

   <div className="logo">

  <div className="logo-icon">
    <FiLayers />
  </div>

  <div className="logo-text">
    <h2>Nexus HR</h2>
  </div>

  <button className="menu-toggle">
    <FiMenu />
  </button>

</div>

<p className="portal-title">HR PORTAL</p>

      {/* Navigation */}

      <nav>

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiHome />
          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink
          to="/leave"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiCalendar />
          <span>Leave Approval</span>
        </NavLink>

        <NavLink
          to="/recruitment"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiBriefcase />
          <span>Recruitment</span>
        </NavLink>

        <NavLink
          to="/departments"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiGrid />
          <span>Departments</span>
        </NavLink>

        <NavLink
          to="/performance"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <FiTrendingUp />
          <span>Performance</span>
        </NavLink>

      </nav>

    </aside>
  );
};

export default Sidebar;