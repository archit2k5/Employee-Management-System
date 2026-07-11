import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Icon } from "../common/Icons";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-layout-main">
        <Topbar />
        <main className="admin-layout-content">
          <Outlet />
        </main>
        <button className="help-fab" aria-label="Help">
          <Icon.Help size={18} />
        </button>
      </div>
    </div>
  );
}
