import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./layout.css";
const Layout = ({ children }) => {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <main className="page-content">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;