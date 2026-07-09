import { Icon } from "../common/Icons";
import { currentAdmin } from "../../data/mockData";
import "./Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <Icon.Search size={16} />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="topbar-actions">
        <button className="topbar-icon-btn" aria-label="Toggle theme">
          <Icon.Sun size={18} />
        </button>
        <button className="topbar-icon-btn topbar-icon-btn-dot" aria-label="Notifications">
          <Icon.Bell size={18} />
        </button>
        <div className="topbar-profile">
          <div className="topbar-avatar">{currentAdmin.initials}</div>
          <div className="topbar-profile-text">
            <div className="topbar-profile-name">{currentAdmin.name}</div>
            <div className="topbar-profile-role">{currentAdmin.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
