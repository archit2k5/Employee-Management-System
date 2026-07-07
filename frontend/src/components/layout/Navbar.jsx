import { FiSearch, FiBell, FiSun } from "react-icons/fi";
import "./layout.css";

const Navbar = () => {
  return (
    <header className="navbar">

      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <FiSun />
        </button>

        <button className="icon-btn notification">
          <FiBell />
          <span className="badge"></span>
        </button>

        <div className="profile">

          <div className="avatar">
            SM
          </div>

          <div className="profile-info">
            <h4>Sarah Mitchell</h4>
            <p>HR Manager</p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;