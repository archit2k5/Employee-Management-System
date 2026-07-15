import { useNavigate } from "react-router-dom";
import { Icon } from "../common/Icons";
import { useAuth } from "../../context/AuthContext";
import "./Topbar.css";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  function handleLogout() {
    logout();
    navigate("/login");
  }

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
          <div className="topbar-avatar">{initials}</div>
          <div className="topbar-profile-text">
            <div className="topbar-profile-name">{user?.name || "Unknown"}</div>
            <div className="topbar-profile-role">{user?.role || ""}</div>
          </div>
        </div>
        <button
          className="topbar-icon-btn"
          aria-label="Log out"
          onClick={handleLogout}
          title="Log out"
        >
          <Icon.LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
